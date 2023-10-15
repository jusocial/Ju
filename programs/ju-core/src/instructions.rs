use crate::*;

/// Context to add new Protocol developer to whitelist
///
/// Accounts expected:
///
/// 0. `[]` Pubkey of the whitelisting developer
/// 1. `[signer]` Application Authority
/// 2. `[]` System program
///
#[derive(Accounts)]
#[instruction(developer: Pubkey)]
pub struct AddDeveloper<'info> {
    #[account(
        init,
        seeds = [
            DeveloperWhitelistProof::PREFIX.as_bytes(),
            developer.as_ref()
        ],
        bump,
        payer = authority,
        space = DeveloperWhitelistProof::LEN
    )]
    pub developer_witelist_proof: Account<'info, DeveloperWhitelistProof>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existing Protocol developer from whitelist
///
/// Accounts expected:
///
/// 0. `[]` Pubkey of the whitelisting developer
/// 1. `[signer]` Application Authority
/// 2. `[]` System program
///
#[derive(Accounts)]
pub struct DeleteDeveloper<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [
            DeveloperWhitelistProof::PREFIX.as_bytes(),
            developer_witelist_proof.developer.key().as_ref()
        ],
        bump,
        close = authority,
    )]
    pub developer_witelist_proof: Account<'info, DeveloperWhitelistProof>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to add new Protocol external Processor
///
/// Accounts expected:
///
/// 0. `[]` PDA of the Processor being whitelisted
/// 1. `[signer]` Application Authority
/// 2. `[]` System program
///
#[derive(Accounts)]
#[instruction(processor_type: ProcessorType, processor_name: String, program_address: Pubkey, developer_wallet: Option<Pubkey>)]
pub struct AddProcessor<'info> {
    #[account(
        init,
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            program_address.as_ref(),
        ],
        bump,
        payer = authority,
        space = ExternalProcessorPDA::LEN
    )]
    pub processor_pda: Account<'info, ExternalProcessorPDA>,

    #[account(
        has_one = authority,
        seeds = [
            DeveloperWhitelistProof::PREFIX.as_bytes(),
            developer_witelist_proof.authority.key().as_ref()
        ],
        bump
    )]
    /// Developer whitelist proof
    pub developer_witelist_proof: Option<Box<Account<'info, DeveloperWhitelistProof>>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existing Protocol external Processor from "whitelist"
///
/// Accounts expected:
///
/// 0. `[]` Processor PDA
/// 1. `[signer]` Application Authority
/// 2. `[]` System program
///
#[derive(Accounts)]
#[instruction(program_address: Pubkey)]
pub struct DeleteProcessor<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            program_address.as_ref(),
        ],
        bump,
        close = authority,
    )]
    pub processor: Account<'info, ExternalProcessorPDA>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to initialize new Protocol Application
///
/// Accounts expected:
///
/// 0. `[]` PDA of the Application being created
/// 1. `[]` Developer whitelist proof PDA
/// 2. `[]` External Registering Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 3. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 4. `[]` External Publishing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 6. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 7. `[signer]` Application Authority
/// 8. `[]` System program
///
#[derive(Accounts)]
#[instruction(app_name: String)]
pub struct InitializeApp<'info> {
    #[account(
        init,
        seeds = [
            App::PREFIX.as_bytes(),
            app_name.as_bytes().as_ref(),
        ],
        bump,
        payer = authority,
        space = App::LEN
    )]
    /// Current App (PDA) account
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            DeveloperWhitelistProof::PREFIX.as_bytes(),
            developer_witelist_proof.authority.key().as_ref()
        ],
        bump
    )]
    /// Developer whitelist proof
    pub developer_witelist_proof: Option<Box<Account<'info, DeveloperWhitelistProof>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            registering_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Registering processing
    pub registering_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            publishing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Publishing processing
    pub publishing_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to update existing Protocol Application
///
/// Accounts expected:
///
/// 0. `[]` PDA of the Application being created
/// 1. `[]` External Registering Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 2. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 3. `[]` External Publishing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 4. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 6. `[signer]` Application Authority
/// 7. `[]` System program
///
#[derive(Accounts)]
pub struct UpdateApp<'info> {
    #[account(
        mut,
        has_one = authority @CustomError::UpdateNotAuthorized,
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump,
    )]
    /// Current App (PDA) account
    pub app: Account<'info, App>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            registering_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Registering processing
    pub registering_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            publishing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Publishing processing
    pub publishing_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted
    /// Must be passed if user wants to assign External Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to create new protocol Application user Profile
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[]` PDA of the Profile being created
/// 2. `[]` PDA of the Alias to be registered (optional)
/// 3. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 4. `[signer]` Profile Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
#[instruction(data: ProfileData)]
pub struct CreateProfile<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        init,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
        payer = authority,
        space = Profile::LEN
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        init,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            data.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        payer = authority,
        space = Alias::LEN
    )]
    /// PDA to register Profile Alias (user can change Alias in the future - delete old PDA and create new one available)
    pub alias_pda: Option<Account<'info, Alias>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user wants to assign Profile specified Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to update application user profile
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[]` PDA of the Profile being created
/// 2. `[]` PDA of the Alias to be deleted (optional)
/// 3. `[]` PDA of the Alias to be registered (optional)
/// 4. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[signer]` Profile Authority
/// 6. `[]` System program
///
#[derive(Accounts)]
#[instruction(data: ProfileData)]
pub struct UpdateProfile<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        mut,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
        has_one = authority @CustomError::UpdateNotAuthorized,
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            current_alias_pda.value.as_bytes().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub current_alias_pda: Option<Account<'info, Alias>>,

    #[account(
        init,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            data.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        payer = authority,
        space = Alias::LEN
    )]
    /// Alias account (PDA) to register new available Alias instead old one being delete
    pub new_alias_pda: Option<Account<'info, Alias>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Profile specified Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to Delete existing Application user Profile
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[writable]` PDA of the existing Profile
/// 2. `[writable]` PDA of the Profile's current Alias (optional)
/// 3. `[signer]` Profile Authority
/// 4. `[]` System program
///
#[derive(Accounts)]
pub struct DeleteProfile<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        close = authority
    )]
    /// Aliasr PDA to delete
    /// Must be passed if user has a Aliasr registered
    pub alias_pda: Option<Account<'info, Alias>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to create new Connection between two Application entities
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[writable]` PDA of the Connection, it stores all Connection data
/// 2. `[]` PDA of the initializer Profile
/// 3. `[]` PDA of the Target (another Profile or Subspace)
/// 4. `[signer]` Connection Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct InitializeConnection<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        init,
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           initializer.key().as_ref(),
           target.key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           initializer.key().as_ref(), 
        ],
        bump,
        payer = authority,
        constraint = target.key() != initializer.key() @CustomError::SelfConnectionNotAllowed,
        space = Connection::LEN
    )]
    pub connection: Account<'info, Connection>,

    #[account(
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
        has_one = authority
    )]
    pub initializer: Box<Account<'info, Profile>>,

    /// CHECK: This account is checked in the instruction
    pub target: AccountInfo<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to update existing connection - e.g. change approve status
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[writable]` Connection PDA
/// 2. `[]` Connection Initializer PDA
/// 3. `[]` Connection Target PDA
/// 4. `[signer]` Connection Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct UpdateConnection<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        mut,
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           initializer.key().as_ref(),
           target.key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           initializer.key().as_ref(), 
        ],
        bump
    )]
    pub connection: Account<'info, Connection>,

    #[account(
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer.authority.key().as_ref(),
        ],
        bump
    )]
    pub initializer: Box<Account<'info, Profile>>,

    /// CHECK: This account is checked inside instruction
    pub target: AccountInfo<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existing Connection
///
/// Accounts expected:
///
/// 0. `[]` The PDA of the current Application
/// 1. `[writable]` Connection PDA, it stores all Connection data
/// 2. `[]` Connection initializer Profile PDA
/// 3. `[]` Connectiom Target PDA
/// 4. `[signer]` Connection Authority
/// 5. `[]` The System program
///
#[derive(Accounts)]
pub struct DeleteConnection<'info> {
    pub app: Account<'info, App>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Connection::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer_profile.key().as_ref(),
            target.key().as_ref(),
            // another one Initializer seed for making unique connection for each initializer
            initializer_profile.key().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub connection: Account<'info, Connection>,

    pub initializer_profile: Box<Account<'info, Profile>>,

    /// CHECK: This account is checked in the instruction
    pub target: AccountInfo<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to create new Subspace inside Application and owned by specified Profile
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[]` Subspace creator Profile (PDA)
/// 2. `[writable]` Subspace PDA, it stores Subspace data
/// 3. `[]` Subspace Alias PDA (optional)
/// 3. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 4. `[]` External Publishing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 6. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 7. `[signer]` Subspace Authority
/// 8. `[]` System program
///
#[derive(Accounts)]
#[instruction(uuid: String, data: SubspaceData)]
pub struct CreateSubspace<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Box<Account<'info, App>>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump
    )]
    pub creator_profile: Box<Account<'info, Profile>>,

    #[account(
        init,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            creator_profile.key().as_ref(),
            uuid.as_bytes().as_ref(),
        ],
        bump,
        payer = authority,
        space = Subspace::LEN
    )]
    pub subspace: Box<Account<'info, Subspace>>,

    #[account(
        init,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            data.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        payer = authority,
        space = Alias::LEN
    )]
    /// A PDA to claim Subspace alias - this way Subspace owner can change alias in the future (delete old PDA and create new one available)
    pub alias_pda: Option<Account<'info, Alias>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            publishing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Publishing processing
    pub publishing_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to update existing application Subspace
///
/// Accounts expected:
///
/// 0. `[]` PDA of the current Application
/// 1. `[]` Subspace creator Profile (PDA)
/// 2. `[writable]` Subspace account, it stores Subspace data
/// 3. `[writable]` Current Subspace alias PDA to be deleted (PDA, optional)
/// 4. `[]` New Subspace alias to be registered (PDA, optional)
/// 4. `[]` External Connecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[]` External Publishing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 6. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 7. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 8. `[signer]` Subspace Autority
/// 9. `[]` System program
///
#[derive(Accounts)]
#[instruction(data: SubspaceData)]
pub struct UpdateSubspace<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Box<Account<'info, App>>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump
    )]
    pub creator_profile: Box<Account<'info, Profile>>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            creator_profile.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    pub subspace: Box<Account<'info, Subspace>>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            current_alias_pda.value.as_bytes().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub current_alias_pda: Option<Account<'info, Alias>>,

    #[account(
        init,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            data.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        payer = authority,
        space = Alias::LEN
    )]
    pub new_alias_pda: Option<Account<'info, Alias>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            connecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Connecting processing
    pub connecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            publishing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Publishing processing
    pub publishing_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Subspace specified Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existiong application Space
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Subspace creator Profile (PDA)
/// 2. `[writable]` Subspace PDA to be deleted
/// 3. `[writable]` Subspace current Alias PDA (optional)
/// 3. `[signer]` Publication Autority
/// 4. `[]` System program
///
#[derive(Accounts)]
pub struct DeleteSubpace<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub subspace: Account<'info, Subspace>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Alias::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.alias.as_ref().unwrap().as_bytes(),
        ],
        bump,
        close = authority
    )]
    /// Aliasr PDA to delete
    /// Must be passed if user has a Aliasr registered
    pub alias_pda: Option<Account<'info, Alias>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to add new Subspace manager
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Subspace (PDA)
/// 2. `[]` Profile as Subspace manager (PDA)
/// 3. `[writable]` SubspaceManager PDA, it stores all SubspaceManager data
/// 4. `[signer]` Application Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct AddSubspaceManager<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    pub subspace: Account<'info, Subspace>,

    #[account(
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           profile.key().as_ref(),
           subspace.key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           profile.key().as_ref(), 
        ],
        bump
    )]
    pub connection_proof: Box<Account<'info, Connection>>,

    #[account(
        init,
        seeds = [
            SubspaceManager::PREFIX.as_bytes(),
            subspace.key().as_ref(),
            profile.key().as_ref(),
        ],
        bump,
        payer = authority,
        space = SubspaceManager::LEN
    )]
    pub manager: Account<'info, SubspaceManager>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Update an existing Subspace manager
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Subspace (PDA)
/// 2. `[]` Profile as Subspace manager (PDA)
/// 3. `[writable]` SubspaceManager PDA, it stores all SubspaceManager data
/// 4. `[signer]` Application Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct UpdateSubspaceManager<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    pub subspace: Account<'info, Subspace>,

    #[account(
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           profile.key().as_ref(),
           subspace.key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           profile.key().as_ref(), 
        ],
        bump
    )]
    pub connection_proof: Box<Account<'info, Connection>>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            SubspaceManager::PREFIX.as_bytes(),
            subspace.key().as_ref(),
            profile.key().as_ref(),
        ],
        bump
    )]
    pub manager: Account<'info, SubspaceManager>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existing Subspace manager
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Subspace (PDA)
/// 2. `[]` Profile as Subspace manager (PDA)
/// 3. `[writable]` SubspaceManager PDA, it stores all SubspaceManager data
/// 4. `[signer]` Application Authority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct DeleteSubspaceManager<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    pub subspace: Account<'info, Subspace>,

    #[account(     
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            SubspaceManager::PREFIX.as_bytes(),
            subspace.key().as_ref(),
            profile.key().as_ref(),
        ],
        bump,
        close = authority,
    )]
    pub manager: Account<'info, SubspaceManager>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to create new Publication
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Publication creator Profile (PDA)
/// 2. `[writable]` Publication PDA, it stores all Publication data
/// 3. `[]` Target Subspace (PDA) in which Publication being publishing (optional)
/// 4. `[]` Target Publication which has to be replyed or referenced (optional)
/// 5. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 6. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 7. `[signer]` Publication Autority
/// 8. `[]` System program
///
#[derive(Accounts)]
#[instruction(uuid: String, data: PublicationData)]
pub struct CreatePublication<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        init,
        seeds = [
            Publication::PREFIX.as_bytes(),
            app.key().as_ref(),
            uuid.as_bytes().as_ref(),
        ],
        bump,
        payer = authority,
        space = Publication::LEN
    )]
    pub publication: Account<'info, Publication>,

    #[account(
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    /// Subspace (PDA) 
    /// Must be passed if Publication will store in Subspace
    pub subspace: Option<Box<Account<'info, Subspace>>>,

    #[account(
        seeds = [
            Publication::PREFIX.as_bytes(),
            app.key().as_ref(),
            target_publication.uuid.as_bytes().as_ref(),
        ],
        bump
    )]
    /// Publication PDA which has to be replyed or referenced
    /// Must be passed if this mirroring or replying
    pub target_publication: Option<Box<Account<'info, Publication>>>,

    #[account(
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           profile.key().as_ref(),
           subspace.as_ref().unwrap().key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           profile.key().as_ref(), 
        ],
        bump
    )]
    /// Connection PDA that proof Publisher (Profile) is connected to Subspace
    /// Must be passed in case Publication target is a Subspace
    pub connection_proof: Option<Box<Account<'info, Connection>>>,

    #[account(
        seeds = [
            SubspaceManager::PREFIX.as_bytes(),
            subspace.as_ref().unwrap().key().as_ref(),
            profile.key().as_ref(),
        ],
        bump
    )]
    /// SubspaceManager PDA that proof Publisher (Subspace member Profile) is a Manager of Subspace
    /// Must be passed in case Publication target is a Subspace
    pub subspace_manager_proof: Option<Box<Account<'info, SubspaceManager>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Publication specified Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Publication specified Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Box<Account<'info, ExternalProcessorPDA>>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to update existing Publication
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Publication creator Profile (PDA)
/// 2. `[writable]` Publication account (PDA), it stores Publication data
/// 3. `[]` External Collecting Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 4. `[]` External Referencing Processor PDA that proof Processor passed to assign is whitelisted (optional)
/// 5. `[signer]` Publication Autority
/// 6. `[]` System program
///
#[derive(Accounts)]
#[instruction(data: PublicationData)]
pub struct UpdatePublication<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Box<Account<'info, App>>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.authority.key().as_ref(),
        ],
        bump
    )]
    pub profile: Box<Account<'info, Profile>>,

    #[account(
        mut,
        has_one = profile,
        seeds = [
            Publication::PREFIX.as_bytes(),
            app.key().as_ref(),
            publication.uuid.as_bytes().as_ref(),
        ],
        bump
    )]
    pub publication: Account<'info, Publication>,

    #[account(
        seeds = [
            Subspace::PREFIX.as_bytes(),
            app.key().as_ref(),
            subspace.creator.key().as_ref(),
            subspace.uuid.as_bytes().as_ref(),
        ],
        bump,
    )]
    /// Subspace (PDA) 
    /// Must be passed if Publication store in Subspace
    pub subspace: Option<Box<Account<'info, Subspace>>>,

    #[account(
        seeds = [
           Connection::PREFIX.as_bytes(),
           app.key().as_ref(),
           profile.key().as_ref(),
           subspace.as_ref().unwrap().key().as_ref(),
           // another one Initializer seed for making unique connection for each initializer
           profile.key().as_ref(), 
        ],
        bump
    )]
    /// Connection PDA that proof Publisher (Profile) is connected to Subspace
    /// Must be passed in case Publication target is a Subspace
    pub connection_proof: Option<Box<Account<'info, Connection>>>,

    #[account(
        seeds = [
            SubspaceManager::PREFIX.as_bytes(),
            subspace.as_ref().unwrap().key().as_ref(),
            profile.key().as_ref(),
        ],
        bump
    )]
    /// SubspaceManager PDA that proof Publisher (Subspace member Profile) is a Manager of Subspace
    /// Must be passed in case Publication target is a Subspace
    pub subspace_manager_proof: Option<Box<Account<'info, SubspaceManager>>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            collecting_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Publication specified Processor for additional Collecting processing
    pub collecting_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(
        seeds = [
            ExternalProcessorPDA::PREFIX.as_bytes(),
            referencing_processor_pda.program_address.as_ref(),
        ],
        bump,
    )]
    /// External Processor PDA that proof Processor passed to assign is whitelisted.
    /// Must be passed if user want to assign Publication specified Processor for additional Referencing processing
    pub referencing_processor_pda: Option<Account<'info, ExternalProcessorPDA>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to Collect existing Publication
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Collect initializer Profile (PDA)
/// 2. `[]` Target Publication account (PDA)
/// 3. `[writable]` Collection item account (PDA) being created, it will store Collection data
/// 4. `[signer]` Collection item Autority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct CollectPublication<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer.authority.as_ref(),
        ],
        bump
    )]
    pub initializer: Box<Account<'info, Profile>>,

    #[account(
        constraint = target.authority != initializer.authority @CustomError::SelfPublicationCollecting,
        seeds = [
            Publication::PREFIX.as_bytes(),
            app.key().as_ref(),
            target.uuid.as_bytes().as_ref(),
        ],
        bump
    )]
    pub target: Account<'info, Publication>,

    #[account(
        init,
        seeds = [
            CollectionItem::PREFIX.as_bytes(),
            app.key().as_ref(),
            target.key().as_ref(),
        ],
        bump,
        payer = authority,
        space = CollectionItem::LEN
    )]
    pub collection_item: Account<'info, CollectionItem>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete existing Publication
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Publication creator (PDA)
/// 2. `[writable]` Publication account (PDA) to be deleted
/// 3. `[signer]` Publication Authority
/// 4. `[]` System program
///
#[derive(Accounts)]
pub struct DeletePublication<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            profile.authority.as_ref(),
        ],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(
        mut,
        has_one = profile,
        seeds = [
            Publication::PREFIX.as_bytes(),
            app.key().as_ref(),
            publication.uuid.as_bytes().as_ref(),
        ],
        bump,
        close = authority
    )]
    pub publication: Account<'info, Publication>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete Publication Reaction
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Reaction initializer Profile (PDA)
/// 2. `[]` The Target for which the Reaction is being initialized
/// 3. `[writable]` Reaction account (PDA), it will stores Reaction data
/// 4. `[signer]` Reaction Autority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct CreateReaction<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer.authority.key().as_ref(),
        ],
        bump
    )]
    pub initializer: Box<Account<'info, Profile>>,

    /// Report target - potentialy could be a Profile or Publication
    /// CHECK: Account checked inside instruction
    pub target: AccountInfo<'info>,

    #[account(
        init,
        seeds = [
            Reaction::PREFIX.as_bytes(),
            app.key().as_ref(),
            target.key().as_ref(),
            initializer.key().as_ref(),
        ],
        bump,
        payer = authority,
        space = Reaction::LEN
    )]
    pub reaction: Account<'info, Reaction>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to delete Publication Reaction
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Reaction initializer Profile (PDA)
/// 2. `[]` The Target for which the Reaction is being initialized
/// 3. `[writable]` Reaction account (PDA) to be deleted
/// 4. `[signer]` Reaction Autority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct DeleteReaction<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer.authority.key().as_ref(),
        ],
        bump
    )]
    pub initializer: Box<Account<'info, Profile>>,

    /// Report target - potentialy could be a Profile or Publication
    /// CHECK: Account checked inside instruction
    pub target: AccountInfo<'info>,

    #[account(
        mut,
        has_one = authority,
        seeds = [
            Reaction::PREFIX.as_bytes(),
            app.key().as_ref(),
            target.key().as_ref(),
            initializer.key().as_ref(),
        ],
        bump,
        close = authority,
    )]
    pub reaction: Account<'info, Reaction>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Context to initialize Publication Report
///
/// Accounts expected:
///
/// 0. `[]` Current Application (PDA)
/// 1. `[]` Report initializer Profile account (PDA)
/// 2. `[]` PDA of the `Target` for which the report is being initialized
/// 3. `[writable]` Report account (PDA), it will stores all Report data
/// 4. `[signer]` Report Autority
/// 5. `[]` System program
///
#[derive(Accounts)]
pub struct InitializeReport<'info> {
    #[account(
        seeds = [
            App::PREFIX.as_bytes(),
            app.app_name.as_bytes().as_ref(),
        ],
        bump
    )]
    pub app: Account<'info, App>,

    #[account(
        has_one = authority,
        seeds = [
            Profile::PREFIX.as_bytes(),
            app.key().as_ref(),
            initializer.authority.key().as_ref(),
        ],
        bump
    )]
    pub initializer: Box<Account<'info, Profile>>,

    /// Report target - potentialy could be a Profile, Subspace or Publication
    /// CHECK: Account checked inside instruction
    pub target: AccountInfo<'info>,

    #[account(
        init,
        seeds = [
            Report::PREFIX.as_bytes(),
            app.key().as_ref(),
            target.key().as_ref(),
            initializer.key().as_ref(),
        ],
        bump,
        payer = authority,
        space = Report::LEN
    )]
    pub report: Account<'info, Report>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
