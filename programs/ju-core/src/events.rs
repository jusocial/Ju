use anchor_lang::prelude::*;

/// An Event that is fired when new Protocol external Processor whitelisted.
#[event]
pub struct NewExternalProcessorEvent {
    /// Application PDA address
    pub program_address: Pubkey,
    /// Profile creation unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when existing Protocol external Processor deleted from "whitelist".
#[event]
pub struct DeleteExternalProcessorEvent {
    /// Application PDA address
    pub program_address: Pubkey,
    /// Profile creation unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Application Profile is created.
#[event]
pub struct NewProfileEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Profile PDA address
    pub profile: Pubkey,
    /// Profile creation unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when existing Application Profile updated.
#[event]
pub struct UpdateProfileEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Profile PDA address
    pub profile: Pubkey,
    /// Profile update unix timestamp
    pub modified_at: i64,
}

/// An Event that is fired when existing Application Profile deleted.
#[event]
pub struct DeleteProfileEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Profile PDA address
    pub profile: Pubkey,
    /// Profile delete unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Application Subspace is created.
#[event]
pub struct NewSubspaceEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Subspace PDA address
    pub subspace: Pubkey,
    /// Subspace creation unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when existing Application Subspace updated.
#[event]
pub struct UpdateSubspaceEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Subspace PDA address
    pub subspace: Pubkey,
    /// Subspace creation unix timestamp
    pub modified_at: i64,
}

/// An Event that is fired when existing Application Subspace deleted.
#[event]
pub struct DeleteSubspaceEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Subspace PDA address
    pub subspace: Pubkey,
    /// Subspace delete unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Subspace Manager added.
#[event]
pub struct NewSubspaceManagerEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Manager Profile PDA address
    pub profile: Pubkey,
    /// Subspace creation unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when new Subspace Manager modified.
#[event]
pub struct UpdateSubspaceManagerEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Manager Profile PDA address
    pub profile: Pubkey,
    /// Subspace updating unix timestamp
    pub modified_at: i64,
}

/// An Event that is fired when new Publication is created.
#[event]
pub struct NewPublicationEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Publication PDA address
    pub publication: Pubkey,
    /// Publisher's Profile PDA address
    pub profile: Pubkey,
    /// Publication creation unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when existing Publication updated.
#[event]
pub struct UpdatePublicationEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Publication PDA address
    pub publication: Pubkey,
    /// Publisher's Profile PDA address
    pub profile: Pubkey,
    /// Publication creation unix timestamp
    pub modified_at: i64,
}

/// An Event that is fired when existing Publication deleted.
#[event]
pub struct DeletePublicationEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Publication PDA address
    pub publication: Pubkey,
    /// Publisher's Profile PDA address
    pub profile: Pubkey,
    /// Publication delete unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Connection is initialized.
#[event]
pub struct NewConnectionEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Initializer's Profile PDA address
    pub initializer: Pubkey,
    /// Connection Target PDA address
    pub target: Pubkey,
    /// Connection initialization unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when Connection is updated.
#[event]
pub struct UpdateConnectionEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Connection PDA address
    pub connection: Pubkey,
    /// Connection approve status
    pub status: bool,
    /// Connection update unix timestamp
    pub modified_at: i64,
}

/// An Event that is fired when Connection deleted.
#[event]
pub struct DeleteConnectionEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Connection PDA address
    pub connection: Pubkey,
    /// Connection delete unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Reaction is created.
#[event]
pub struct NewReactionEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Target Publication PDA
    pub target: Pubkey,
    /// Reaction initialization unix timestamp
    pub created_at: i64,
}

/// An Event that is fired when existing Reaction deleted.
#[event]
pub struct DeleteReactionEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Target Publication PDA
    pub target: Pubkey,
    /// Reaction delete unix timestamp
    pub deleted_at: i64,
}

/// An Event that is fired when new Report is created.
#[event]
pub struct NewReportEvent {
    /// Application PDA address
    pub app: Pubkey,
    /// Report Target PDA
    pub target: Pubkey,
    /// Report initialization unix timestamp
    pub created_at: i64,
}
