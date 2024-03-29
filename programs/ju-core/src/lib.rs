use solana_program::{instruction::AccountMeta};

use anchor_lang::prelude::*;

mod constants;
mod errors;
mod events;
mod instructions;
mod state;
mod utils;

use constants::*;
use errors::*;
use events::*;
use instructions::*;
use state::*;
use utils::*;

/// Registering External Processor
use registering_processor::cpi::accounts::ProcessRegistering;

/// Connecting External Processor
use connecting_processor::cpi::accounts::ProcessConnecting;

/// Publishing External Processor
use publishing_processor::cpi::accounts::ProcessPublishing;

/// Collecting External Processor
use collecting_processor::cpi::accounts::ProcessCollecting;

/// Referencing External Processor
use referencing_processor::cpi::accounts::ProcessReferencing;

declare_id!("964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq");

#[program]
pub mod ju_core {
    use super::*;

    /// Approve new Developer whitelis proof
    ///
    /// # Arguments
    ///
    /// * `developer` - Developer Pubkey
    ///
    pub fn add_developer(ctx: Context<AddDeveloper>, developer: Pubkey) -> Result<()> {
        let developer_whitelist_proof = &mut ctx.accounts.developer_whitelist_proof;

        // Check if actor is protocol authority
        require_keys_eq!(
            *ctx.accounts.authority.to_account_info().key,
            PROTOCOL_AUTHORITY,
            CustomError::DeveloperNotAthorized
        );

        developer_whitelist_proof.developer = developer;
        developer_whitelist_proof.authority = *ctx.accounts.authority.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;

        // Emit new Event
        emit!(NewDeveloperEvent {
            developer: developer,
            created_at: now,
        });

        Ok(())
    }

    /// Delete existing Developer whitelis proof
    ///
    pub fn delete_developer(ctx: Context<DeleteDeveloper>) -> Result<()> {
        let developer = ctx.accounts.developer_whitelist_proof.developer;

        let now = Clock::get()?.unix_timestamp;

        // Emit new Event
        emit!(DeleteDeveloperEvent {
            developer: developer,
            deleted_at: now,
        });

        Ok(())
    }

    /// Approve new Protocol external Processor to whitelist
    ///
    /// # Arguments
    ///
    /// * `processor_type` - Processor type
    /// * `processor_name` - Processor name
    /// * `program_address` - Processor program aggress
    /// * `developer_wallet` - Processor developer wallet (optional)
    ///
    pub fn add_processor(
        ctx: Context<AddProcessor>,
        processor_type: ProcessorType,
        processor_name: String,
        program_address: Pubkey,
        developer_wallet: Option<Pubkey>,
        metadata_uri: Option<String>,
    ) -> Result<()> {
        // Validate permission
        if (*ctx.accounts.authority.to_account_info().key != PROTOCOL_AUTHORITY)
            && ctx.accounts.developer_whitelist_proof.is_none()
        {
            return Err(error!(CustomError::DeveloperActionNotAthorized));
        }

        // Check if proof is valid
        if ctx.accounts.developer_whitelist_proof.is_some() {
            require_keys_eq!(
                ctx.accounts
                    .developer_whitelist_proof
                    .as_ref()
                    .unwrap()
                    .developer,
                *ctx.accounts.authority.to_account_info().key,
                CustomError::DeveloperNotAthorized
            );
        }

        let processor_pda = &mut ctx.accounts.processor_pda;
        // Validate Processor name
        processor_pda.validate_name(&processor_name)?;
        processor_pda.processor_name = processor_name;

        // Validate metadata URI
        if metadata_uri.is_some() {
            validate_metadata_uri(metadata_uri.as_ref().unwrap())?;
        }
        processor_pda.metadata_uri = metadata_uri;

        processor_pda.processor_type = processor_type;
        processor_pda.program_address = program_address;
        processor_pda.developer_wallet = developer_wallet;
        processor_pda.authority = *ctx.accounts.authority.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;

        processor_pda.created_at = now;

        // Emit new Event
        emit!(NewExternalProcessorEvent {
            program_address: program_address,
            authority: *ctx.accounts.authority.to_account_info().key,
            created_at: now,
        });

        Ok(())
    }

    /// Delete existing Protocol external Processor from whitelist
    ///
    /// # Arguments
    ///
    /// * `program_address` - Processor program aggress
    ///
    pub fn delete_processor(ctx: Context<DeleteProcessor>, program_address: Pubkey) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        // Emit new Event
        emit!(DeleteExternalProcessorEvent {
            program_address: program_address,
            authority: *ctx.accounts.authority.to_account_info().key,
            deleted_at: now,
        });

        Ok(())
    }

    /// Initialize new Protocol Application
    ///
    /// # Arguments
    ///
    /// * `app_domain_name` - Protocol unique Application domain name
    /// * `data` - A struct that holds Application data
    ///
    pub fn initialize_app(
        ctx: Context<InitializeApp>,
        app_domain_name: String,
        data: AppData,
    ) -> Result<()> {
        // Validate permission
        if (*ctx.accounts.authority.to_account_info().key != PROTOCOL_AUTHORITY)
            && ctx.accounts.developer_whitelist_proof.is_none()
        {
            return Err(error!(CustomError::DeveloperActionNotAthorized));
        }

        // Check if proof is valid
        if ctx.accounts.developer_whitelist_proof.is_some() {
            require_keys_eq!(
                ctx.accounts
                    .developer_whitelist_proof
                    .as_ref()
                    .unwrap()
                    .developer,
                *ctx.accounts.authority.to_account_info().key,
                CustomError::DeveloperNotAthorized
            );
        }

        let app = &mut ctx.accounts.app;

        // Validate App domain name
        app.validate_domain_name(&app_domain_name)?;
        app.app_domain_name = app_domain_name;

        app.authority = *ctx.accounts.authority.to_account_info().key;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        app.metadata_uri = data.metadata_uri;

        // Application Settings
        app.is_profile_delete_allowed = data.is_profile_delete_allowed;
        app.is_subspace_delete_allowed = data.is_subspace_delete_allowed;
        app.is_publication_delete_allowed = data.is_publication_delete_allowed;
        app.is_profile_individual_processors_allowed = data.is_profile_individual_processors_allowed;
        app.is_subspace_individual_processors_allowed = data.is_subspace_individual_processors_allowed;
        app.is_publication_individual_processors_allowed =
            data.is_publication_individual_processors_allowed;

        // Assign external Processors to Application
        match &ctx.accounts.registering_processor_pda {
            Some(registering_processor_pda) => {
                require!(
                    registering_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Registering),
                    CustomError::ProcessorTypeMismatch
                );
                app.registering_processor = Some(registering_processor_pda.program_address);
            }
            None => {
                app.registering_processor = None;
            }
        }
        match &ctx.accounts.connecting_processor_pda {
            Some(connecting_processor_pda) => {
                require!(
                    connecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Connecting),
                    CustomError::ProcessorTypeMismatch
                );
                app.connecting_processor = Some(connecting_processor_pda.program_address);
            }
            None => {
                app.connecting_processor = None;
            }
        }
        match &ctx.accounts.publishing_processor_pda {
            Some(publishing_processor_pda) => {
                require!(
                    publishing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Publishing),
                    CustomError::ProcessorTypeMismatch
                );
                app.publishing_processor = Some(publishing_processor_pda.program_address);
            }
            None => {
                app.publishing_processor = None;
            }
        }
        match &ctx.accounts.collecting_processor_pda {
            Some(collecting_processor_pda) => {
                require!(
                    collecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Collecting),
                    CustomError::ProcessorTypeMismatch
                );
                app.collecting_processor = Some(collecting_processor_pda.program_address);
            }
            None => {
                app.collecting_processor = None;
            }
        }
        match &ctx.accounts.referencing_processor_pda {
            Some(referencing_processor_pda) => {
                require!(
                    referencing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Referencing),
                    CustomError::ProcessorTypeMismatch
                );
                app.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                app.referencing_processor = None;
            }
        }

        let now = Clock::get()?.unix_timestamp;

        app.created_at = now;
        app.creation_year = now / SECONDS_IN_YEAR;
        app.creation_month = now / SECONDS_IN_MONTH;

        // Emit new Event
        emit!(NewAppEvent {
            app: *ctx.accounts.app.to_account_info().key,
            authority: *ctx.accounts.authority.to_account_info().key,
            created_at: now,
        });

        Ok(())
    }

    /// Update existing Protocol Application
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds Application data
    ///
    pub fn update_app(ctx: Context<UpdateApp>, data: AppData) -> Result<()> {
        let app = &mut ctx.accounts.app;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        app.metadata_uri = data.metadata_uri;

        // Application Settings
        app.is_profile_delete_allowed = data.is_profile_delete_allowed;
        app.is_subspace_delete_allowed = data.is_subspace_delete_allowed;
        app.is_publication_delete_allowed = data.is_publication_delete_allowed;
        app.is_profile_individual_processors_allowed = data.is_profile_individual_processors_allowed;
        app.is_subspace_individual_processors_allowed = data.is_subspace_individual_processors_allowed;
        app.is_publication_individual_processors_allowed =
            data.is_publication_individual_processors_allowed;

        // Assign external Processors to Application
        match &ctx.accounts.registering_processor_pda {
            Some(registering_processor_pda) => {
                require!(
                    registering_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Registering),
                    CustomError::ProcessorTypeMismatch
                );
                app.registering_processor = Some(registering_processor_pda.program_address);
            }
            None => {
                app.registering_processor = None;
            }
        }
        match &ctx.accounts.connecting_processor_pda {
            Some(connecting_processor_pda) => {
                require!(
                    connecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Connecting),
                    CustomError::ProcessorTypeMismatch
                );
                app.connecting_processor = Some(connecting_processor_pda.program_address);
            }
            None => {
                app.connecting_processor = None;
            }
        }
        match &ctx.accounts.publishing_processor_pda {
            Some(publishing_processor_pda) => {
                require!(
                    publishing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Publishing),
                    CustomError::ProcessorTypeMismatch
                );
                app.publishing_processor = Some(publishing_processor_pda.program_address);
            }
            None => {
                app.publishing_processor = None;
            }
        }
        match &ctx.accounts.collecting_processor_pda {
            Some(collecting_processor_pda) => {
                require!(
                    collecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Collecting),
                    CustomError::ProcessorTypeMismatch
                );
                app.collecting_processor = Some(collecting_processor_pda.program_address);
            }
            None => {
                app.collecting_processor = None;
            }
        }
        match &ctx.accounts.referencing_processor_pda {
            Some(referencing_processor_pda) => {
                require!(
                    referencing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Referencing),
                    CustomError::ProcessorTypeMismatch
                );
                app.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                app.referencing_processor = None;
            }
        }

        Ok(())
    }

    /// Create new user Profile
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds user Profile data
    /// * `external_processing_data` - additional data that could be passed to an external Processor
    ///
    pub fn create_profile(
        ctx: Context<CreateProfile>,
        data: ProfileData,
        external_processing_data: Option<String>, // TODO: Replace String with some other type ?
    ) -> Result<()> {
        // Making additional Profile Registering processing using external Processor
        // Check if Application has assigned Registering Processor
        if let Some(assigned_registering_processor) = ctx.accounts.app.registering_processor {
            // Check if Connecting JXP is passed
            if ctx.accounts.registering_processor.is_none() {
                return Err(error!(CustomError::ConnectingProcessorAccountMissed));
            }

            let registering_processor_account =
                ctx.accounts.registering_processor.as_ref().unwrap();

            // Processor Pubkeys assert
            require_keys_eq!(
                assigned_registering_processor.key(),
                registering_processor_account.key(),
                CustomError::RegisteringProcessorMismatch
            );

            // Making CPI call to JXP
            registering_processor::cpi::process(
                ctx.accounts
                    .process_registering_ctx(registering_processor_account),
                external_processing_data,
            )?;
        }

        // if user want to register a Alias - make sure Alias PDA account is passed
        if data.alias.is_some() && ctx.accounts.alias_pda.is_none() {
            return Err(error!(CustomError::AliasAccountRequired));
        }

        let profile = &mut ctx.accounts.profile;

        // Validate Alias and Assign to PDA if present
        if data.alias.is_some() && ctx.accounts.alias_pda.is_some() {
            profile.validate_alias(data.alias.as_ref().unwrap())?;
            let alias_pda = &mut ctx.accounts.alias_pda.as_mut().unwrap();
            alias_pda.app = *ctx.accounts.app.to_account_info().key;
            alias_pda.alias_type = AliasType::Profile;
            alias_pda.owner = *profile.to_account_info().key;
            alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
            alias_pda.value = data.alias.as_ref().unwrap().clone();
        }
        profile.alias = data.alias;

        profile.app = *ctx.accounts.app.to_account_info().key;
        profile.authority = *ctx.accounts.authority.to_account_info().key;

        // Validate and assign first name
        profile.first_name = profile.validate_first_name(&data.first_name.unwrap_or_default())?;
        // Validate and assign last name
        profile.last_name = profile.validate_last_name(&data.last_name.unwrap_or_default())?;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        profile.metadata_uri = data.metadata_uri;

        profile.gender = data.gender.unwrap_or_default();
        profile.personal_data_1 = data.personal_data_1.unwrap_or_default();
        profile.personal_data_2 = data.personal_data_2.unwrap_or_default();
        profile.personal_data_3 = data.personal_data_3.unwrap_or_default();
        profile.personal_data_4 = data.personal_data_4.unwrap_or_default();
        profile.personal_data_5 = data.personal_data_5.unwrap_or_default();
        profile.personal_data_6 = data.personal_data_6.unwrap_or_default();
        profile.personal_data_7 = data.personal_data_7.unwrap_or_default();
        profile.personal_data_8 = data.personal_data_8.unwrap_or_default();

        profile.country_code = data.country_code.unwrap_or_default();
        profile.region_code = data.region_code.unwrap_or_default();
        profile.city_code = data.city_code.unwrap_or_default();

        // Assign Profile specified Connecting external Processor
        if ctx.accounts.app.is_profile_individual_processors_allowed {
            match &ctx.accounts.connecting_processor_pda {
                Some(connecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        connecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        connecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Connecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    profile.connecting_processor = Some(connecting_processor_pda.program_address);
                }
                None => {
                    profile.connecting_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;

        let birth_date = get_birth_date(data.birth_date)?;
        profile.birth_date = birth_date;
        profile.birth_date_10_years = (now - birth_date) / SECONDS_IN_10_YEARS;
        profile.birth_date_5_years = (now - birth_date) / SECONDS_IN_5_YEARS;
        profile.birth_date_year = (now - birth_date) / SECONDS_IN_YEAR;

        profile.created_at = now;
        profile.creation_year = now / SECONDS_IN_YEAR;
        profile.creation_month = now / SECONDS_IN_MONTH;
        profile.creation_week = now / SECONDS_IN_WEEK;
        profile.creation_day = now / SECONDS_IN_DAY;

        // Emit new Event
        emit!(NewProfileEvent {
            app: *ctx.accounts.app.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            created_at: now,
        });

        Ok(())
    }

    /// Update existing user profile
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds user Profile data
    ///
    /// # Alias management cases:
    ///  
    /// 0) Do nothing:
    /// * data.alias = <current_alias_value>
    /// * current_alias_pda == None
    /// * new_alias_pda == None
    ///
    /// 1) Register alias if not yet registered:
    /// * data.alias = <alias_value>
    /// * current_alias_pda == None
    /// * new_alias_pda == Some(alias_value)
    ///
    /// 2) Update current alias (register new and delete current):
    /// * data.alias = <new_alias_value>
    /// * current_alias_pda == Some(current_alias_value)
    /// * new_alias_pda == Some(new_alias_value)
    ///
    /// 3) Delete current alias:
    /// * data.alias = None
    /// * current_alias_pda == Some(current_alias_value)
    /// * new_alias_pda == None
    ///
    pub fn update_profile(ctx: Context<UpdateProfile>, data: ProfileData) -> Result<()> {
        let profile = &mut ctx.accounts.profile;

        // Alias management cases
        if profile.alias != data.alias {
            // Case 1 (update current Alias):
            if data.alias.is_some()
                && ctx.accounts.current_alias_pda.is_some()
                && ctx.accounts.new_alias_pda.is_some()
            {
                profile.validate_alias(data.alias.as_ref().unwrap())?;
                let new_alias_pda = &mut ctx.accounts.new_alias_pda.as_mut().unwrap();
                new_alias_pda.app = *ctx.accounts.app.to_account_info().key;
                new_alias_pda.alias_type = AliasType::Profile;
                new_alias_pda.owner = *profile.to_account_info().key;
                new_alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
                new_alias_pda.value = data.alias.as_ref().unwrap().clone();

                profile.alias = data.alias.clone();
            }

            // Case 2 (register alias if not registered):
            if data.alias.is_some()
                && ctx.accounts.current_alias_pda.is_none()
                && ctx.accounts.new_alias_pda.is_some()
            {
                profile.validate_alias(data.alias.as_ref().unwrap())?;
                let new_alias_pda = &mut ctx.accounts.new_alias_pda.as_mut().unwrap();
                new_alias_pda.app = *ctx.accounts.app.to_account_info().key;
                new_alias_pda.alias_type = AliasType::Profile;
                new_alias_pda.owner = *profile.to_account_info().key;
                new_alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
                new_alias_pda.value = data.alias.as_ref().unwrap().clone();

                profile.alias = data.alias.clone();
            }

            // Case 3 (delete current alias):
            if data.alias.is_none()
                && ctx.accounts.current_alias_pda.is_some()
                && ctx.accounts.new_alias_pda.is_none()
            {
                // Assign None
                profile.alias = None;
            }
        } else {
            // Ensure that current_alias_pda and new_alias_pda not passed (to prevent account deleting)
            if ctx.accounts.current_alias_pda.is_some() || ctx.accounts.new_alias_pda.is_some() {
                return Err(error!(CustomError::AliasAccountsMustBeNone));
            }
        }

        // Validate and assign first name
        profile.first_name = profile.validate_first_name(&data.first_name.unwrap_or_default())?;
        // Validate and assign last name
        profile.last_name = profile.validate_last_name(&data.last_name.unwrap_or_default())?;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        profile.metadata_uri = data.metadata_uri;

        profile.gender = data.gender.unwrap_or_default();

        profile.personal_data_1 = data.personal_data_1.unwrap_or_default();
        profile.personal_data_2 = data.personal_data_2.unwrap_or_default();
        profile.personal_data_3 = data.personal_data_3.unwrap_or_default();
        profile.personal_data_4 = data.personal_data_4.unwrap_or_default();
        profile.personal_data_5 = data.personal_data_5.unwrap_or_default();
        profile.personal_data_6 = data.personal_data_6.unwrap_or_default();
        profile.personal_data_7 = data.personal_data_7.unwrap_or_default();
        profile.personal_data_8 = data.personal_data_8.unwrap_or_default();

        profile.country_code = data.country_code.unwrap_or_default();
        profile.region_code = data.region_code.unwrap_or_default();
        profile.city_code = data.city_code.unwrap_or_default();

        // Assign Profile specified Connecting external Processor
        if ctx.accounts.app.is_profile_individual_processors_allowed {
            match &ctx.accounts.connecting_processor_pda {
                Some(connecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        connecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        connecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Connecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    profile.connecting_processor = Some(connecting_processor_pda.program_address);
                }
                None => {
                    profile.connecting_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;

        let birth_date = get_birth_date(data.birth_date)?;
        profile.birth_date = birth_date;
        profile.birth_date_10_years = (now - birth_date) / SECONDS_IN_10_YEARS;
        profile.birth_date_5_years = (now - birth_date) / SECONDS_IN_5_YEARS;
        profile.birth_date_year = (now - birth_date) / SECONDS_IN_YEAR;

        profile.created_at = now;

        // Emit new Event
        emit!(UpdateProfileEvent {
            app: *ctx.accounts.app.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            modified_at: now,
        });

        Ok(())
    }

    // Delete existing Profile
    pub fn delete_profile(ctx: Context<DeleteProfile>) -> Result<()> {
        // Check Application level Delete permisson
        if !ctx.accounts.app.is_profile_delete_allowed {
            return Err(error!(CustomError::ActionProhibitedByAppSettings));
        }

        // TODO: Implement Actions with Profile related entities (publications/subspaces/reactions etc.)

        // if user has registered Alias - make sure that Alias account is passed to delete
        if ctx.accounts.profile.alias.is_some() && ctx.accounts.alias_pda.is_none() {
            return Err(error!(CustomError::CurrentAliasAccountRequired));
        }

        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(DeleteProfileEvent {
            app: *ctx.accounts.app.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            deleted_at: now,
        });

        Ok(())
    }

    // Create new connection between two entities (e.g. profile-to-profile or profile-to-subspace)
    ///
    /// # Arguments
    ///
    /// * `external_processing_data` - additional data that could be passed to an external Processor
    ///
    pub fn initialize_connection(
        ctx: Context<InitializeConnection>,
        external_processing_data: Option<String>, // TODO: Replace String with some other type ?
    ) -> Result<()> {
        // Checking passed target type
        let connection_target_type = get_connection_target_type(&ctx.accounts.target)?;

        // Making Connection additional processing using external Processor
        // First check if Application has assigned Connecting Processor
        if let Some(assigned_connecting_processor) = ctx.accounts.app.connecting_processor {
            // Check if Connecting JXP is passed
            if ctx.accounts.connecting_processor.is_none() {
                return Err(error!(CustomError::ConnectingProcessorAccountMissed));
            }

            let connection_processor_account = ctx.accounts.connecting_processor.as_ref().unwrap();

            // Processor Pubkeys assert
            require_keys_eq!(
                assigned_connecting_processor.key(),
                ctx.accounts.connecting_processor.as_ref().unwrap().key(),
                CustomError::ConnectingProcessorMismatch
            );

            // Making CPI call to JXP
            connecting_processor::cpi::process(
                ctx.accounts
                    .process_connecting_ctx(connection_processor_account),
                external_processing_data.clone(),
            )?;
        }

        // Second check if Target has assigned individual Connecting Processor and app setting allow this feature
        let target_connecting_processor =
            get_connecting_processor_from_target(&ctx.accounts.target)?;

        if ctx.accounts.app.is_profile_individual_processors_allowed {
            if let Some(assigned_connecting_processor_individual) = target_connecting_processor {
                // Check if Connecting JXP is passed
                if ctx.accounts.connecting_processor_individual.is_none() {
                    return Err(error!(CustomError::ConnectingProcessorAccountMissed));
                }

                let connection_processor_individual_account = ctx
                    .accounts
                    .connecting_processor_individual
                    .as_ref()
                    .unwrap();

                // JXP Pubkeys assert
                require_keys_eq!(
                    assigned_connecting_processor_individual.key(),
                    connection_processor_individual_account.key(),
                    CustomError::ConnectingProcessorMismatch
                );

                // Making CPI call to JXP
                connecting_processor::cpi::process(
                    ctx.accounts
                        .process_connecting_ctx(connection_processor_individual_account),
                    external_processing_data,
                )?;
            }
        }

        let connection = &mut ctx.accounts.connection;
        connection.app = *ctx.accounts.app.to_account_info().key;
        connection.authority = *ctx.accounts.authority.to_account_info().key;
        connection.initializer = *ctx.accounts.initializer.to_account_info().key;

        connection.connection_target_type = connection_target_type;
        connection.target = *ctx.accounts.target.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;
        connection.created_at = now;
        connection.creation_week = now / SECONDS_IN_WEEK;
        connection.creation_3_day = now / (SECONDS_IN_DAY * 3);
        connection.creation_day = now / SECONDS_IN_DAY;
        
        connection.modified_at = None;

        // Emit new Event
        emit!(NewConnectionEvent {
            app: *ctx.accounts.app.to_account_info().key,
            initializer: *ctx.accounts.authority.to_account_info().key,
            target: *ctx.accounts.target.to_account_info().key,
            created_at: now
        });

        Ok(())
    }

    /// Update connection (approve by Target profile, e.g. - accept friend request)
    ///
    /// # Arguments
    ///
    /// * `approve_status` - A boolean that holds connection approve status (by Target)
    ///
    pub fn update_connection(ctx: Context<UpdateConnection>, approve_status: bool) -> Result<()> {
        // Assert Connection Target authority
        assert_connection_target_authority(
            &ctx.accounts.user.to_account_info().key(),
            &ctx.accounts.target,
        )?;

        let connection = &mut ctx.accounts.connection;

        connection.is_approved = approve_status;

        let now = Clock::get()?.unix_timestamp;
        connection.modified_at = Some(now);

        // Emit new Event
        emit!(UpdateConnectionEvent {
            app: *ctx.accounts.app.to_account_info().key,
            connection: *ctx.accounts.connection.to_account_info().key,
            status: approve_status,
            modified_at: now
        });

        Ok(())
    }

    // Delete existing connection
    pub fn delete_connection(ctx: Context<DeleteConnection>) -> Result<()> {

        // Emit new Event
        let now = Clock::get()?.unix_timestamp;
        emit!(DeleteConnectionEvent {
            app: *ctx.accounts.app.to_account_info().key,
            connection: *ctx.accounts.connection.to_account_info().key,
            deleted_at: now
        });

        Ok(())
    }

    /// Create application Subspace owned by specified Profile (e.g. group or "public")
    ///
    /// # Arguments
    ///
    /// * `uuid` - A Subspace UUID
    /// * `data` - A struct that holds Subspace data
    ///
    pub fn create_subspace(
        ctx: Context<CreateSubspace>,
        uuid: String,
        data: SubspaceData,
    ) -> Result<()> {
        // if user want to register a Alias - make sure Alias account is passed
        if data.alias.is_some() && ctx.accounts.alias_pda.is_none() {
            return Err(error!(CustomError::AliasAccountRequired));
        }

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }

        let subspace = &mut ctx.accounts.subspace;

        // Validate Alias and Assign to PDA if present
        if data.alias.is_some() && ctx.accounts.alias_pda.is_some() {
            subspace.validate_alias(data.alias.as_ref().unwrap())?;
            let alias_pda = &mut ctx.accounts.alias_pda.as_mut().unwrap();
            alias_pda.app = *ctx.accounts.app.to_account_info().key;
            alias_pda.alias_type = AliasType::Subspace;
            alias_pda.owner = *subspace.to_account_info().key;
            alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
            alias_pda.value = data.alias.as_ref().unwrap().clone();
        }

        subspace.uuid = uuid;
        subspace.app = *ctx.accounts.app.to_account_info().key;
        subspace.creator = *ctx.accounts.creator_profile.to_account_info().key;
        subspace.alias = data.alias;
        subspace.authority = *ctx.accounts.authority.to_account_info().key;

        // Validate name
        subspace.name = subspace.validate_name(&data.name)?;

        subspace.publishing_permission = data.publishing_permission;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        subspace.metadata_uri = data.metadata_uri;

        // Assign Subspace specified external Processors
        if ctx.accounts.app.is_subspace_individual_processors_allowed {
            match &ctx.accounts.connecting_processor_pda {
                Some(connecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        connecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        connecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Connecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.connecting_processor = Some(connecting_processor_pda.program_address);
                }
                None => {
                    subspace.connecting_processor = None;
                }
            }
            match &ctx.accounts.publishing_processor_pda {
                Some(publishing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        publishing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        publishing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Publishing),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.publishing_processor = Some(publishing_processor_pda.program_address);
                }
                None => {
                    subspace.publishing_processor = None;
                }
            }
            match &ctx.accounts.collecting_processor_pda {
                Some(collecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        collecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        collecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Collecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.collecting_processor = Some(collecting_processor_pda.program_address);
                }
                None => {
                    subspace.collecting_processor = None;
                }
            }
            match &ctx.accounts.referencing_processor_pda {
                Some(referencing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        referencing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        referencing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Referencing),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.referencing_processor =
                        Some(referencing_processor_pda.program_address);
                }
                None => {
                    subspace.referencing_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;

        subspace.creation_year = now / (SECONDS_IN_YEAR);
        subspace.creation_month = now / (SECONDS_IN_MONTH);
        subspace.creation_week = now / SECONDS_IN_WEEK;
        subspace.creation_day = now / SECONDS_IN_DAY;

        // Emit new Event
        emit!(NewSubspaceEvent {
            app: *ctx.accounts.app.to_account_info().key,
            subspace: *ctx.accounts.subspace.to_account_info().key,
            created_at: now
        });

        Ok(())
    }

    /// Update existing Application Subspace
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds Subspace data
    ///
    /// # Alias management cases:
    ///  
    /// 0) Do nothing:
    /// * data.alias = <current_alias_value>
    /// * current_alias_pda == None
    /// * new_alias_pda == None
    ///
    /// 1) Register alias if not yet registered:
    /// * data.alias = alias_value
    /// * current_alias_pda == None
    /// * new_alias_pda == Some(alias_value)
    ///
    /// 2) Update current alias (register new and delete current):
    /// * data.alias = new_alias_value
    /// * current_alias_pda == Some(current_alias_value)
    /// * new_alias_pda == Some(new_alias_value)
    ///
    /// 3) Delete current alias:
    /// * data.alias = None
    /// * current_alias_pda == Some(current_alias_value)
    /// * new_alias_pda == None
    ///
    pub fn update_subspace(ctx: Context<UpdateSubspace>, data: SubspaceData) -> Result<()> {
        let subspace = &mut ctx.accounts.subspace;

        // Alias management cases
        if subspace.alias != data.alias {
            // Case 1 (update current Alias):
            if data.alias.is_some()
                && ctx.accounts.current_alias_pda.is_some()
                && ctx.accounts.new_alias_pda.is_some()
            {
                subspace.validate_alias(data.alias.as_ref().unwrap())?;
                let new_alias_pda = &mut ctx.accounts.new_alias_pda.as_mut().unwrap();
                new_alias_pda.app = *ctx.accounts.app.to_account_info().key;
                new_alias_pda.alias_type = AliasType::Subspace;
                new_alias_pda.owner = *subspace.to_account_info().key;
                new_alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
                new_alias_pda.value = data.alias.as_ref().unwrap().clone();

                subspace.alias = data.alias.clone();
            }

            // Case 2 (register alias if not registered):
            if data.alias.is_some()
                && ctx.accounts.current_alias_pda.is_none()
                && ctx.accounts.new_alias_pda.is_some()
            {
                subspace.validate_alias(data.alias.as_ref().unwrap())?;
                let new_alias_pda = &mut ctx.accounts.new_alias_pda.as_mut().unwrap();
                new_alias_pda.app = *ctx.accounts.app.to_account_info().key;
                new_alias_pda.alias_type = AliasType::Subspace;
                new_alias_pda.owner = *subspace.to_account_info().key;
                new_alias_pda.authority = *ctx.accounts.authority.to_account_info().key;
                new_alias_pda.value = data.alias.as_ref().unwrap().clone();

                subspace.alias = data.alias.clone();
            }

            // Case 3 (delete current alias):
            if data.alias.is_none()
                && ctx.accounts.current_alias_pda.is_some()
                && ctx.accounts.new_alias_pda.is_none()
            {
                // Assign None
                subspace.alias = None;
            }
        } else {
            // Ensure that current_alias_pda and new_alias_pda not passed (to prevent account deleting)
            if ctx.accounts.current_alias_pda.is_some() || ctx.accounts.new_alias_pda.is_some() {
                return Err(error!(CustomError::AliasAccountsMustBeNone));
            }
        }

        // Validate name
        subspace.name = subspace.validate_name(&data.name)?;

        subspace.publishing_permission = data.publishing_permission;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        subspace.metadata_uri = data.metadata_uri;

        // Assign Subspace specified external Processors
        if ctx.accounts.app.is_subspace_individual_processors_allowed {
            match &ctx.accounts.connecting_processor_pda {
                Some(connecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        connecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        connecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Connecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.connecting_processor = Some(connecting_processor_pda.program_address);
                }
                None => {
                    subspace.connecting_processor = None;
                }
            }
            match &ctx.accounts.publishing_processor_pda {
                Some(publishing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        publishing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        publishing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Publishing),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.publishing_processor = Some(publishing_processor_pda.program_address);
                }
                None => {
                    subspace.publishing_processor = None;
                }
            }
            match &ctx.accounts.collecting_processor_pda {
                Some(collecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        collecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        collecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Collecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.collecting_processor = Some(collecting_processor_pda.program_address);
                }
                None => {
                    subspace.collecting_processor = None;
                }
            }
            match &ctx.accounts.referencing_processor_pda {
                Some(referencing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        referencing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        referencing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Referencing),
                        CustomError::ProcessorTypeMismatch
                    );
                    subspace.referencing_processor =
                        Some(referencing_processor_pda.program_address);
                }
                None => {
                    subspace.referencing_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(UpdateSubspaceEvent {
            app: *ctx.accounts.app.to_account_info().key,
            subspace: *ctx.accounts.subspace.to_account_info().key,
            modified_at: now
        });

        Ok(())
    }

    // Delete existing Subspace
    pub fn delete_subspace(ctx: Context<DeleteSubpace>) -> Result<()> {
        // Check Application level Delete permisson
        if !ctx.accounts.app.is_subspace_delete_allowed {
            return Err(error!(CustomError::ActionProhibitedByAppSettings));
        }

        // TODO: Implement Actions with Subspace related existing entities (publications/reactions etc.)

        // if Subspace has registered Alias - make sure that Alias account is passed to delete
        if ctx.accounts.subspace.alias.is_some() && ctx.accounts.alias_pda.is_none() {
            return Err(error!(CustomError::CurrentAliasAccountRequired));
        }

        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(DeleteSubspaceEvent {
            app: *ctx.accounts.app.to_account_info().key,
            subspace: *ctx.accounts.subspace.to_account_info().key,
            deleted_at: now
        });

        Ok(())
    }

    /// Approve new Subspace manager
    ///
    /// /// # Arguments
    ///
    /// * `manager_role` - Subspace manager Role
    ///
    pub fn add_subspace_manager(
        ctx: Context<AddSubspaceManager>,
        manager_role: SubspaceManagementRoleType,
    ) -> Result<()> {
        let manager = &mut ctx.accounts.manager;

        manager.app = *ctx.accounts.app.to_account_info().key;
        manager.subspace = *ctx.accounts.subspace.to_account_info().key;
        manager.profile = *ctx.accounts.profile.to_account_info().key;
        manager.role = manager_role;

        manager.authority = *ctx.accounts.authority.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(NewSubspaceManagerEvent {
            app: *ctx.accounts.app.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            created_at: now,
        });

        Ok(())
    }

    /// Update an existing Subspace manager
    ///
    /// /// # Arguments
    ///
    /// * `manager_role` - Subspace manager Role
    ///
    pub fn update_subspace_manager(
        ctx: Context<UpdateSubspaceManager>,
        manager_role: SubspaceManagementRoleType,
    ) -> Result<()> {
        let manager = &mut ctx.accounts.manager;

        manager.role = manager_role;

        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(UpdateSubspaceManagerEvent {
            app: *ctx.accounts.app.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            modified_at: now,
        });

        Ok(())
    }

    /// Delete existing Subspace manager
    ///
    pub fn delete_subspace_manager(_ctx: Context<DeleteSubspaceManager>) -> Result<()> {
        Ok(())
    }

    /// Create new publication
    ///
    /// # Arguments
    ///
    /// * `uuid` - Publication UUID
    /// * `data` - A struct that holds Publication parameters
    /// * `external_processing_data` - additional data that can be passed to an external processor
    ///
    pub fn create_publication(
        ctx: Context<CreatePublication>,
        uuid: String,
        data: PublicationData,
        external_processing_data: Option<String>, // TODO: Replace String with some other type ?
    ) -> Result<()> {
        // In case this is mirroring or replying make sure Target Publication account is passed
        if (data.is_mirror || data.is_reply) && ctx.accounts.target_publication.is_none() {
            return Err(error!(CustomError::TargetPublicationRequired));
        }

        // If both flags are true
        if data.is_mirror && data.is_reply {
            return Err(error!(CustomError::BothMirrorAndReplyNotAllowed));
        }

        // Making additianal processing using external Processor
        if !data.is_mirror {
            // This is initial Publishing or replying ...
            // Making additianal Publication processing using external Processor

            // First check if Application has assigned Publishing external Processor
            if let Some(assigned_publishing_processor) = ctx.accounts.app.publishing_processor {
                // Check if JXP is passed
                if ctx.accounts.publishing_processor.is_none() {
                    return Err(error!(CustomError::PublishingProcessorAccountMissed));
                }

                let publishing_processor_account =
                    ctx.accounts.publishing_processor.as_ref().unwrap();

                // JXPs Pubkeys assert
                require_keys_eq!(
                    assigned_publishing_processor.key(),
                    publishing_processor_account.key(),
                    CustomError::PublishingProcessorMismatch
                );

                // Making CPI call to JXP
                publishing_processor::cpi::process(
                    ctx.accounts
                        .process_publishing_ctx(publishing_processor_account),
                    external_processing_data.clone(),
                )?;
            }
        } else {
            // This is Referencing ...
            // Making additianal Publication Reference processing using external Processor

            // First check if Application has assigned Referencing external Processor
            if let Some(assigned_referencing_processor) = ctx.accounts.app.referencing_processor {
                // Check if JXP is passed
                if ctx.accounts.referencing_processor.is_none() {
                    return Err(error!(CustomError::ReferencingProcessorAccountMissed));
                }

                let referencing_processor_account =
                    ctx.accounts.referencing_processor.as_ref().unwrap();

                // JXPs Pubkeys assert
                require_keys_eq!(
                    assigned_referencing_processor.key(),
                    referencing_processor_account.key(),
                    CustomError::ReferencingProcessorMismatch
                );

                // Making CPI call to JXP
                referencing_processor::cpi::process(
                    ctx.accounts
                        .process_referencing_ctx(referencing_processor_account),
                    external_processing_data.clone(),
                )?;
            }

            // Second check if Target Publication has individual assigned Referencing external Processor
            if ctx.accounts.app.is_publication_individual_processors_allowed
                && ctx.accounts.target_publication.is_some()
            {
                if let Some(assigned_referencing_processor_individual) = ctx
                    .accounts
                    .target_publication
                    .as_ref()
                    .unwrap()
                    .referencing_processor
                {
                    // Check if JXP is passed
                    if ctx.accounts.referencing_processor_individual.is_none() {
                        return Err(error!(CustomError::ReferencingProcessorAccountMissed));
                    }

                    let referencing_processor_account_individual = ctx
                        .accounts
                        .referencing_processor_individual
                        .as_ref()
                        .unwrap();

                    // JXPs Pubkeys assert
                    require_keys_eq!(
                        assigned_referencing_processor_individual.key(),
                        referencing_processor_account_individual.key(),
                        CustomError::ReferencingProcessorMismatch
                    );

                    // Making CPI call to JXP
                    referencing_processor::cpi::process(
                        ctx.accounts
                            .process_referencing_ctx(referencing_processor_account_individual),
                        external_processing_data,
                    )?;
                }
            }
        }

        let publication = &mut ctx.accounts.publication;

        // ************************************
        //
        // TODO: ?
        // Implement validation in case someone
        // trying to mirror or reply
        // Publication from Subspace
        // into his own Profile
        //
        // ************************************

        publication.uuid = uuid;
        publication.app = *ctx.accounts.app.to_account_info().key;
        publication.profile = *ctx.accounts.profile.to_account_info().key;
        publication.content_type = data.content_type;

        publication.tag = publication.validate_tag(&data.tag)?;

        publication.authority = *ctx.accounts.authority.to_account_info().key;

        // In case target of the Publication is a Subspace
        if ctx.accounts.subspace.is_some() {
            let target_subspace = ctx.accounts.subspace.as_ref().unwrap();

            let is_publishing_allowed = is_publishing_allowed(
                target_subspace,
                &ctx.accounts.profile.to_account_info().key,
                &ctx.accounts.authority.key,
                ctx.accounts.connection_proof.as_ref(),
                ctx.accounts.subspace_manager_proof.as_ref(),
            );

            require!(
                is_publishing_allowed,
                CustomError::SubspacePublishingPermissionViolation
            );

            if !data.is_reply {
                // Only on initial publishing or miroring
                publication.subspace = *target_subspace.to_account_info().key;
            }
        }

        publication.is_mirror = data.is_mirror;
        publication.is_reply = data.is_reply;

        if ctx.accounts.target_publication.is_some() {
            publication.target_publication = *ctx
                .accounts
                .target_publication
                .as_ref()
                .unwrap()
                .to_account_info()
                .key;
        }

        // Validate metadata URI
        validate_metadata_uri(&data.metadata_uri)?;
        publication.metadata_uri = data.metadata_uri;

        // Assign Publication specified external Processors
        if ctx.accounts.app.is_publication_individual_processors_allowed {
            match &ctx.accounts.collecting_processor_pda {
                Some(collecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        collecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        collecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Collecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    publication.collecting_processor =
                        Some(collecting_processor_pda.program_address);
                }
                None => {
                    publication.collecting_processor = None;
                }
            }
            match &ctx.accounts.referencing_processor_pda {
                Some(referencing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        referencing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        referencing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Referencing),
                        CustomError::ProcessorTypeMismatch
                    );
                    publication.referencing_processor =
                        Some(referencing_processor_pda.program_address);
                }
                None => {
                    publication.referencing_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;
        publication.created_at = now;

        publication.creation_week = now / SECONDS_IN_WEEK;
        publication.creation_3_day = now / (SECONDS_IN_DAY * 3);
        publication.creation_day = now / SECONDS_IN_DAY;

        // Emit an Event
        emit!(NewPublicationEvent {
            app: *ctx.accounts.app.to_account_info().key,
            publication: *ctx.accounts.publication.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            created_at: now
        });

        Ok(())
    }

    /// Update existing Publication
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds Publication data
    ///
    pub fn update_publication(
        ctx: Context<UpdatePublication>,
        data: PublicationData,
    ) -> Result<()> {
        // TODO: Implement Application level Update permisson

        let publication = &mut ctx.accounts.publication;

        publication.content_type = data.content_type;

        publication.tag = publication.validate_tag(&data.tag)?;

        // Validate metadata URI
        validate_metadata_uri(&data.metadata_uri)?;
        publication.metadata_uri = data.metadata_uri;

        // Assign Publication specified external Processors
        if ctx.accounts.app.is_publication_individual_processors_allowed {
            match &ctx.accounts.collecting_processor_pda {
                Some(collecting_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        collecting_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        collecting_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Collecting),
                        CustomError::ProcessorTypeMismatch
                    );
                    publication.collecting_processor =
                        Some(collecting_processor_pda.program_address);
                }
                None => {
                    publication.collecting_processor = None;
                }
            }
            match &ctx.accounts.referencing_processor_pda {
                Some(referencing_processor_pda) => {
                    // Check JXP authority
                    require_keys_eq!(
                        referencing_processor_pda.authority,
                        ctx.accounts.app.authority,
                        CustomError::ProcessorAuthorityMismatch
                    );
                    
                    // Check JXP type
                    require!(
                        referencing_processor_pda
                            .processor_type
                            .eq(&ProcessorType::Referencing),
                        CustomError::ProcessorTypeMismatch
                    );
                    publication.referencing_processor =
                        Some(referencing_processor_pda.program_address);
                }
                None => {
                    publication.referencing_processor = None;
                }
            }
        }

        let now = Clock::get()?.unix_timestamp;
        publication.modified_at = Some(now);

        // Emit an Event
        emit!(UpdatePublicationEvent {
            app: *ctx.accounts.app.to_account_info().key,
            publication: *ctx.accounts.publication.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            modified_at: now
        });

        Ok(())
    }

    // Delete existing publication
    pub fn delete_publication(ctx: Context<DeletePublication>) -> Result<()> {
        // Check Application level Delete permisson
        if !ctx.accounts.app.is_publication_delete_allowed {
            return Err(error!(CustomError::ActionProhibitedByAppSettings));
        }

        let now = Clock::get()?.unix_timestamp;
        // Emit an Event
        emit!(DeletePublicationEvent {
            app: *ctx.accounts.app.to_account_info().key,
            publication: *ctx.accounts.publication.to_account_info().key,
            profile: *ctx.accounts.profile.to_account_info().key,
            deleted_at: now
        });
        Ok(())
    }

    /// Collect existing Publication
    ///
    /// # Arguments
    ///
    /// * `external_processing_data` - additional data that can be passed to an external Collecting Processor
    ///
    pub fn collect_publication(
        ctx: Context<CollectPublication>,
        external_processing_data: Option<String>, // TODO: Replace String with some other type ?
    ) -> Result<()> {
        // Making additianal Collection processing using external Processor

        // First check if Application has assigned Collecting external Processor
        if let Some(assigned_collecting_processor) = ctx.accounts.app.collecting_processor {
            // Check if JXP is passed
            if ctx.accounts.collecting_processor.is_none() {
                return Err(error!(CustomError::CollectingProcessorAccountMissed));
            }

            let collecting_processor_account = ctx.accounts.collecting_processor.as_ref().unwrap();

            // JXPs Pubkeys assert
            require_keys_eq!(
                assigned_collecting_processor.key(),
                collecting_processor_account.key(),
                CustomError::CollectingProcessorMismatch
            );

            // Making CPI call to JXP
            collecting_processor::cpi::process(
                ctx.accounts
                    .process_collecting_ctx(collecting_processor_account),
                external_processing_data.clone(),
            )?;
        }

        // Second check if Target Publication has individual assigned Collectiong external Processor
        if ctx.accounts.app.is_publication_individual_processors_allowed {
            if let Some(assigned_collecting_processor_individual) =
                ctx.accounts.target.collecting_processor
            {
                // Check if JXP is passed
                if ctx.accounts.collecting_processor_individual.is_none() {
                    return Err(error!(CustomError::CollectingProcessorAccountMissed));
                }

                let collecting_processor_individual_account =
                    ctx.accounts.collecting_processor.as_ref().unwrap();

                // JXPs Pubkeys assert
                require_keys_eq!(
                    assigned_collecting_processor_individual.key(),
                    collecting_processor_individual_account.key(),
                    CustomError::CollectingProcessorMismatch
                );

                // Making CPI call to JXP
                collecting_processor::cpi::process(
                    ctx.accounts
                        .process_collecting_ctx(collecting_processor_individual_account),
                    external_processing_data,
                )?;
            }
        }

        let collection_item = &mut ctx.accounts.collection_item;

        collection_item.target = *ctx.accounts.target.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;

        collection_item.creation_3_day = now / (SECONDS_IN_DAY * 3);
        collection_item.creation_day = now / SECONDS_IN_DAY;
        collection_item.created_at = now;

        // Emit an Event
        emit!(NewCollectionItemEvent {
            app: *ctx.accounts.app.to_account_info().key,
            publication: *ctx.accounts.target.to_account_info().key,
            initializer: *ctx.accounts.initializer.to_account_info().key,
            created_at: now
        });

        Ok(())
    }

    /// Create publication reaction
    ///
    /// # Arguments
    ///
    /// * `reaction_type` - Reaction type
    ///
    pub fn create_reaction(
        ctx: Context<CreateReaction>,
        reaction_type: ReactionType,
    ) -> Result<()> {
        let reaction = &mut ctx.accounts.reaction;
        reaction.app = *ctx.accounts.app.to_account_info().key;
        reaction.authority = *ctx.accounts.authority.to_account_info().key;
        reaction.initializer = *ctx.accounts.initializer.to_account_info().key;

        // Validating passed target account and assign pubkey if Ok
        let target_type = validate_reaction_target(
            &ctx.accounts.app.to_account_info().key,
            &ctx.accounts.target,
        )?;
        reaction.target_type = target_type;

        reaction.target = *ctx.accounts.target.to_account_info().key;
        reaction.reaction_type = reaction_type;

        let now = Clock::get()?.unix_timestamp;
        reaction.created_at = now;
        reaction.creation_week = now / SECONDS_IN_WEEK;
        reaction.creation_3_day = now / (SECONDS_IN_DAY * 3);
        reaction.creation_day = now / SECONDS_IN_DAY;

        // Emit new Event
        emit!(NewReactionEvent {
            app: *ctx.accounts.app.to_account_info().key,
            target: *ctx.accounts.target.to_account_info().key,
            created_at: now
        });

        Ok(())
    }

    /// Delete existing Publication Reaction
    pub fn delete_reaction(ctx: Context<DeleteReaction>) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;
        // Emit new Event
        emit!(DeleteReactionEvent {
            app: *ctx.accounts.app.to_account_info().key,
            target: *ctx.accounts.target.to_account_info().key,
            deleted_at: now
        });

        Ok(())
    }

    /// Initialize new Report
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds Report data
    ///
    pub fn initialize_report(ctx: Context<InitializeReport>, data: ReportData) -> Result<()> {
        let report = &mut ctx.accounts.report;
        report.app = *ctx.accounts.app.to_account_info().key;
        report.authority = *ctx.accounts.authority.to_account_info().key;
        report.initializer = *ctx.accounts.initializer.to_account_info().key;

        // Validating passed target account and assign pubkey if Ok
        let target_type = validate_report_target(
            &ctx.accounts.app.to_account_info().key,
            &ctx.accounts.target,
        )?;
        report.target_type = target_type;

        report.target = *ctx.accounts.target.to_account_info().key;

        report.report_type = data.report_type;
        report.notification = data.notification_string;

        let now = Clock::get()?.unix_timestamp;

        report.created_at = now;
        report.creation_week = now / SECONDS_IN_WEEK;
        report.creation_3_day = now / (SECONDS_IN_DAY * 3);
        report.creation_day = now / SECONDS_IN_DAY;

        // Emit new Event
        emit!(NewReportEvent {
            app: *ctx.accounts.app.to_account_info().key,
            target: *ctx.accounts.target.to_account_info().key,
            created_at: now
        });

        Ok(())
    }
}
