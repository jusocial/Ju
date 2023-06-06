//use std::mem::size_of;
// use uuid::Uuid;

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
    ) -> Result<()> {
        let processor_pda = &mut ctx.accounts.processor_pda;
        // Validate Processor name
        processor_pda.validate_name(&processor_name)?;

        processor_pda.processor_type = processor_type;
        processor_pda.processor_name = processor_name;
        processor_pda.program_address = program_address;
        processor_pda.developer_wallet = developer_wallet;
        processor_pda.authority = *ctx.accounts.authority.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;

        // Emit new Event
        emit!(NewExternalProcessorEvent {
            program_address: program_address,
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
    pub fn delete_processor(_ctx: Context<DeleteProcessor>, program_address: Pubkey) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        // Emit new Event
        emit!(DeleteExternalProcessorEvent {
            program_address: program_address,
            deleted_at: now,
        });

        Ok(())
    }

    /// Initialize new Protocol Application
    ///
    /// # Arguments
    ///
    /// * `app_name` - Protocol unique Application name
    /// * `data` - A struct that holds Application data
    ///
    pub fn initialize_app(
        ctx: Context<InitializeApp>,
        app_name: String,
        data: AppData,
    ) -> Result<()> {
        let app = &mut ctx.accounts.app;

        // Validate App name
        app.validate_name(&app_name)?;
        app.app_name = app_name;

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        app.metadata_uri = data.metadata_uri;

        app.authority = *ctx.accounts.authority.to_account_info().key;

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
        if ctx.accounts.app.registering_processor.is_some() {
            // Check if Registering Processor account is passed
            match &ctx.accounts.registering_processor {
                Some(registering_processor) => {
                    // Processor Pubkeys assert
                    require_keys_eq!(
                        registering_processor.key(),
                        ctx.accounts
                            .app
                            .registering_processor
                            .as_ref()
                            .unwrap()
                            .key(),
                        CustomError::RegisteringProcessorMismatch
                    );
                    // Making CPI call to Processor
                    registering_processor::cpi::process(
                        ctx.accounts.process_registering_ctx(registering_processor),
                        external_processing_data,
                    )?;
                }
                None => {
                    return Err(error!(CustomError::RegisteringProcessorAccountMissed));
                }
            }
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

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }

        profile.app = *ctx.accounts.app.to_account_info().key;
        profile.authority = *ctx.accounts.authority.to_account_info().key;

        profile.alias = data.alias;
        profile.metadata_uri = data.metadata_uri;
        profile.status_text = data.status_text;

        if data.name.is_some() {
            profile.validate_name(data.name.as_ref().unwrap())?;
            profile.name = data.name;
        }
        if data.surname.is_some() {
            profile.validate_surname(data.surname.as_ref().unwrap())?;
            profile.surname = data.surname;
        }
        profile.birth_date = data.birth_date;
        profile.country_code = data.country_code;
        profile.city_code = data.city_code;
        profile.current_location = data.curent_location;

        // Assign Profile specified Connecting external Processor
        profile.connecting_processor = data.connecting_processor_to_assign;

        let now = Clock::get()?.unix_timestamp;
        profile.created_at = now;

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
    /// * data.alias = <current Profile alias value>
    ///
    /// 1) Register alias if not yet registered:
    /// * data.alias = <alias value>
    /// * current_alias_pda == None
    /// * new_alias_pda == Some
    ///
    /// 2) Update current alias (register new and delete current):
    /// * data.alias = <new alias value>
    /// * current_alias_pda == Some
    /// * new_alias_pda == Some
    ///
    /// 3) Delete current alias:
    /// * data.alias = None
    /// * current_alias_pda == Some
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
                && profile.alias != data.alias
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
                && profile.alias != data.alias
                && ctx.accounts.current_alias_pda.is_none()
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

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        profile.metadata_uri = data.metadata_uri;

        profile.status_text = data.status_text;

        let now = Clock::get()?.unix_timestamp;
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
        // TODO: Implement Application level Delete permisson
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
        // Making Connection additional processing using external Processor
        // First check if Application has assigned Connecting Processor
        if ctx.accounts.app.connecting_processor.is_some() {
            match &ctx.accounts.connecting_processor {
                Some(connecting_processor) => {
                    // Processor Pubkeys assert
                    require_keys_eq!(
                        connecting_processor.key(),
                        ctx.accounts
                            .app
                            .connecting_processor
                            .as_ref()
                            .unwrap()
                            .key(),
                        CustomError::ConnectingProcessorMismatch
                    );
                    // Making CPI call to Processor
                    connecting_processor::cpi::process(
                        ctx.accounts.process_connecting_ctx(connecting_processor),
                        external_processing_data,
                    )?;
                }
                None => {
                    return Err(error!(CustomError::ConnectingProcessorAccountMissed));
                }
            }
        }

        let connection = &mut ctx.accounts.connection;
        connection.app = *ctx.accounts.app.to_account_info().key;
        connection.authority = *ctx.accounts.authority.to_account_info().key;
        connection.initializer = *ctx.accounts.initializer.to_account_info().key;

        // Checking passed target type and assign if OK
        let target_account = &ctx.accounts.target;
        connection.connection_target_type = get_connection_target_type(target_account)?;
        connection.target = *ctx.accounts.target.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;
        connection.created_at = now;
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
        assert_connection_target_authority(&ctx.accounts.user.to_account_info().key(), &ctx.accounts.target)?;

        let connection = &mut ctx.accounts.connection;

        connection.approved = approve_status;

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

        // Assert Connection Target authority
        assert_connection_target_authority(&ctx.accounts.authority.to_account_info().key(), &ctx.accounts.target)?;

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
    pub fn create_subspace(ctx: Context<CreateSubspace>, uuid: String, data: SubspaceData) -> Result<()> {
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
        subspace.metadata_uri = data.metadata_uri;
        subspace.authority = *ctx.accounts.authority.to_account_info().key;

        // Assign Subspace specified external Processors
        match &ctx.accounts.connecting_processor_pda {
            Some(connecting_processor_pda) => {
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
                require!(
                    referencing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Referencing),
                    CustomError::ProcessorTypeMismatch
                );
                subspace.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                subspace.referencing_processor = None;
            }
        }

        let now = Clock::get()?.unix_timestamp;
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
    /// * data.alias = <current Subspace alias value>
    ///
    /// 1) Register alias if not yet registered:
    /// * data.alias = <alias value>
    /// * current_alias_pda == None
    /// * new_alias_pda == Some
    ///
    /// 2) Update current alias (register new and delete current):
    /// * data.alias = <new alias value>
    /// * current_alias_pda == Some
    /// * new_alias_pda == Some
    ///
    /// 3) Delete current alias:
    /// * data.alias = None
    /// * current_alias_pda == Some
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
                && subspace.alias != data.alias
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
                && subspace.alias != data.alias
                && ctx.accounts.current_alias_pda.is_none()
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

        // Validate metadata URI
        if data.metadata_uri.is_some() {
            validate_metadata_uri(data.metadata_uri.as_ref().unwrap())?;
        }
        subspace.metadata_uri = data.metadata_uri;

        // Assign Subspace specified external Processors
        match &ctx.accounts.connecting_processor_pda {
            Some(connecting_processor_pda) => {
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
                require!(
                    referencing_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Referencing),
                    CustomError::ProcessorTypeMismatch
                );
                subspace.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                subspace.referencing_processor = None;
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
        // TODO: Implement Application level Delete permisson
        // TODO: Implement Actions with Subspace related entities (publications/reactions etc.)

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
        // Making additianal processing using external Processor
        if !data.is_mirror {
            // This is initial Publishing or replying ...
            // Making additianal Publication processing using external Processor
            // First check if Application has assigned Publishing external Processor
            if ctx.accounts.app.publishing_processor.is_some() {
                match &ctx.accounts.publishing_processor {
                    Some(publishing_processor) => {
                        // Processor Pubkeys assert
                        require_keys_eq!(
                            publishing_processor.key(),
                            ctx.accounts
                                .app
                                .publishing_processor
                                .as_ref()
                                .unwrap()
                                .key(),
                            CustomError::PublishingProcessorMismatch
                        );

                        // Making CPI call to Processor
                        publishing_processor::cpi::process(
                            ctx.accounts.process_publishing_ctx(publishing_processor),
                            external_processing_data,
                        )?;
                    }
                    None => {
                        return Err(error!(CustomError::PublishingProcessorAccountMissed));
                    }
                }
            }
        } else {
            // This is Referencing ...
            // Making additianal Publication Reference processing using external Processor
            // Check if Application has assigned Referencing external Processor
            if ctx.accounts.app.referencing_processor.is_some() {
                match &ctx.accounts.referencing_processor {
                    Some(referencing_processor) => {
                        // Processor Pubkeys assert
                        require_keys_eq!(
                            referencing_processor.key(),
                            ctx.accounts
                                .app
                                .publishing_processor
                                .as_ref()
                                .unwrap()
                                .key(),
                            CustomError::ReferencingProcessorMismatch
                        );
                        // Making CPI call to Processor
                        referencing_processor::cpi::process(
                            ctx.accounts.process_referencing_ctx(referencing_processor),
                            external_processing_data,
                        )?;
                    }
                    None => {
                        return Err(error!(CustomError::ReferencingProcessorAccountMissed));
                    }
                }
            }
        }

        // In case this is mirroring or replying make sure Target Publication account is passed
        if (data.is_mirror || data.is_reply) && ctx.accounts.target_publication.is_none() {
            return Err(error!(CustomError::TargetPublicationRequired));
        }

        // If both flags are true
        if data.is_mirror && data.is_reply {
            return Err(error!(CustomError::BothMirrorAndReplyNotAllowed));
        }

        // Validate metadata URI
        validate_metadata_uri(&data.metadata_uri)?;

        let publication = &mut ctx.accounts.publication;

        publication.uuid = uuid;
        publication.app = *ctx.accounts.app.to_account_info().key;
        publication.profile = *ctx.accounts.profile.to_account_info().key;
        publication.metadata_uri = data.metadata_uri;
        publication.content_type = data.content_type;
        publication.tag = data.tag;
        publication.authority = *ctx.accounts.authority.to_account_info().key;

        // In case this is Subspace Publication
        if ctx.accounts.subspace.is_some() {
            publication.subspace = Some(
                *ctx.accounts
                    .subspace
                    .as_ref()
                    .unwrap()
                    .to_account_info()
                    .key,
            );
        }

        publication.is_mirror = data.is_mirror;
        publication.is_reply = data.is_reply;

        if ctx.accounts.target_publication.is_some() {
            publication.target_publication = Some(
                *ctx.accounts
                    .target_publication
                    .as_ref()
                    .unwrap()
                    .to_account_info()
                    .key,
            );
        }

        // Assign Publication specified external Processors
        match &ctx.accounts.collecting_processor_pda {
            Some(collecting_processor_pda) => {
                require!(
                    collecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Collecting),
                    CustomError::ProcessorTypeMismatch
                );
                publication.collecting_processor = Some(collecting_processor_pda.program_address);
            }
            None => {
                publication.collecting_processor = None;
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
                publication.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                publication.referencing_processor = None;
            }
        }

        let now = Clock::get()?.unix_timestamp;
        publication.created_at = now;

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

        // Validate metadata URI
        validate_metadata_uri(&data.metadata_uri)?;

        let publication = &mut ctx.accounts.publication;

        publication.metadata_uri = data.metadata_uri;
        publication.content_type = data.content_type;
        publication.tag = data.tag;

        // Assign Publication specified external Processors
        match &ctx.accounts.collecting_processor_pda {
            Some(collecting_processor_pda) => {
                require!(
                    collecting_processor_pda
                        .processor_type
                        .eq(&ProcessorType::Collecting),
                    CustomError::ProcessorTypeMismatch
                );
                publication.collecting_processor = Some(collecting_processor_pda.program_address);
            }
            None => {
                publication.collecting_processor = None;
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
                publication.referencing_processor = Some(referencing_processor_pda.program_address);
            }
            None => {
                publication.referencing_processor = None;
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
        // TODO: Implement Application level Delete permisson

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
        // Check if Application has assigned Collecting external Processor
        if ctx.accounts.app.collecting_processor.is_some() {
            match &ctx.accounts.collecting_processor {
                Some(collecting_processor) => {
                    // Processor Pubkeys assert
                    require_keys_eq!(
                        collecting_processor.key(),
                        ctx.accounts
                            .app
                            .publishing_processor
                            .as_ref()
                            .unwrap()
                            .key(),
                        CustomError::CollectingProcessorMismatch
                    );
                    // Making CPI call to Processor
                    collecting_processor::cpi::process(
                        ctx.accounts.process_collecting_ctx(collecting_processor),
                        external_processing_data,
                    )?;
                }
                None => {
                    return Err(error!(CustomError::CollectingProcessorAccountMissed));
                }
            }
        }

        let collection_item = &mut ctx.accounts.collection_item;

        collection_item.target = *ctx.accounts.target.to_account_info().key;

        let now = Clock::get()?.unix_timestamp;
        collection_item.created_at = now;

        Ok(())
    }

    /// Create publication reaction
    ///
    /// # Arguments
    ///
    /// * `data` - A struct that holds Reaction data
    ///
    pub fn create_reaction(
        ctx: Context<CreateReaction>,
        reaction_type: ReactionType,
    ) -> Result<()> {
        let reaction = &mut ctx.accounts.reaction;
        reaction.app = *ctx.accounts.app.to_account_info().key;
        reaction.authority = *ctx.accounts.authority.to_account_info().key;
        reaction.initializer = *ctx.accounts.initializer.to_account_info().key;
        reaction.target = *ctx.accounts.target.to_account_info().key;
        reaction.reaction_type = reaction_type;

        let now = Clock::get()?.unix_timestamp;
        reaction.created_at = now;

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
        report.target = *ctx.accounts.target.to_account_info().key;
        report.report_type = data.report_type;
        report.notification = data.notification_string;

        let now = Clock::get()?.unix_timestamp;
        report.created_at = now;

        // Emit new Event
        emit!(NewReportEvent {
            app: *ctx.accounts.app.to_account_info().key,
            target: *ctx.accounts.target.to_account_info().key,
            created_at: now
        });

        Ok(())
    }
}
