use crate::*;

/// Validates a birth date to ensure it falls within an acceptable range.
///
/// This function calculates the minimum allowed birth date based on the current time
/// and the maximum allowed age. It then compares the provided `birth_date` with this
/// calculated minimum birth date. If the birth date is outside the acceptable range,
/// an error of type `CustomError::BirthDateIncorrect` is returned.
///
/// # Arguments
///
/// * `birth_date` - The birth date as a Unix timestamp in seconds.
///
/// # Returns
///
/// * `Ok(())` - If the birth date is within the acceptable age range.
/// * `Err(CustomError::BirthDateIncorrect)` - If the birth date is outside the
///   acceptable age range.
///
pub fn validate_birth_date(birth_date: &i64) -> Result<()> {
    const SECONDS_IN_MINUTE: i64 = 60;
    const MINUTES_IN_YEAR: i64 = 60 * 24 * 365;

     // Maximum allowed age in minutes
    const MAX_AGE_IN_MINUTES: i64 = MAX_AGE_IN_YEARS * MINUTES_IN_YEAR; 

    // Calculate the current Unix timestamp in minutes
    let current_timestamp = Clock::get()?.unix_timestamp / SECONDS_IN_MINUTE;

    // Calculate the minimum allowed birth date in minutes
    let min_birth_date = current_timestamp - MAX_AGE_IN_MINUTES;

    // Convert the input birth date to minutes (assuming it's in seconds)
    let birth_date_minutes = birth_date / SECONDS_IN_MINUTE;

    if birth_date_minutes < min_birth_date {
        return Err(error!(CustomError::BirthDateIncorrect));
    }

    // Additional validation logic can be added here, if needed.

    Ok(())
}

/// Validates the length of a metadata URI.
///
/// This function checks if the length of the provided `metadata_uri` string is within
/// the acceptable range defined by `MIN_URI_LENGTH` and `MAX_URI_LENGTH`. If the length
/// is outside the range, an error indicating an incorrect URI length is returned.
///
/// # Arguments
///
/// * `metadata_uri` - The metadata URI to validate.
///
/// # Returns
///
/// * `Ok(())` - If the length of the metadata URI is within the acceptable range.
/// * `Err(CustomError::UriLengthIncorrect)` - If the length of the metadata URI is outside
///   the acceptable range.
///
pub fn validate_metadata_uri(metadata_uri: &str) -> Result<()> {
    if metadata_uri.len() < MIN_URI_LENGTH || metadata_uri.len() > MAX_URI_LENGTH {
        return Err(error!(CustomError::UriLengthIncorrect));
    }
    Ok(())
}

/// Determines the connection target type based on the provided account information.
///
/// This function checks the type of the `target_account` and returns the corresponding
/// `ConnectionTargetType` if it is either an account of type `Account<Profile>` or
/// `Account<Subspace>`. Otherwise, it returns an error indicating an invalid connection
/// target account.
///
/// # Arguments
///
/// * `target_account` - The account information of the target account.
///
/// # Returns
///
/// * `Ok(ConnectionTargetType)` - If the target account is of type `Account<Profile>`
///   or `Account<Subspace>`, the corresponding `ConnectionTargetType` is returned.
///
/// * `Err(CustomError::ConnectionTargetAccountInvalid)` - If the target account is neither
///   `Account<Profile>` nor `Account<Subspace>`, an error is returned indicating an invalid
///   connection target account.
///
pub fn get_connection_target_type(target_account: &AccountInfo) -> Result<ConnectionTargetType> {
    if Account::<Profile>::try_from(target_account).is_ok() {
        return Ok(ConnectionTargetType::Profile);
    }

    if Account::<Subspace>::try_from(target_account).is_ok() {
        return Ok(ConnectionTargetType::Subspace);
    }

    Err(error!(CustomError::ConnectionTargetAccountInvalid))
}

/// Retrieves the `connecting_processor` value from the target account.
///
/// This function attempts to extract the `connecting_processor` value from the provided
/// `target_account`. It checks the type of the account and returns the `connecting_processor`
/// if the account is either of type `Profile` or `Subspace`. Otherwise, it returns an error
/// indicating that the target account is invalid.
///
/// # Arguments
///
/// * `target_account` - The target account from which to extract the `connecting_processor`.
///
/// # Errors
///
/// This function returns an error of type `CustomError::ConnectionTargetAccountInvalid` if the
/// target account is not of type `Profile` or `Subspace`.
///
/// # Returns
///
/// The `connecting_processor` value from the target account if it exists, or `None` if it is
/// not available.
///
pub fn get_connecting_processor_from_target(
    target_account: &AccountInfo,
) -> Result<Option<Pubkey>> {
    if let Ok(profile_account) = Account::<Profile>::try_from(target_account) {
        return Ok(profile_account.connecting_processor);
    }

    if let Ok(subspace_account) = Account::<Subspace>::try_from(target_account) {
        return Ok(subspace_account.connecting_processor);
    }

    Err(error!(CustomError::ConnectionTargetAccountInvalid))
}

/// Asserts the authority field of a Connection target account.
///
/// This function checks the authority field of the given connection target account
/// and verifies it against the provided authority public key. The connection target
/// account can be one of two types: `Account<Profile>` or `Account<Subspace>`.
///
/// # Parameters
/// - `authority`: The public key of the authority to assert.
/// - `target_account`: The account info of the connection target account.
///
/// # Returns
/// Returns `Ok()` if the authority field matches. Otherwise, returns an error.
///
pub fn assert_connection_target_authority(
    authority: &Pubkey,
    target_account: &AccountInfo,
) -> Result<()> {
    // Check if the target account is of type `Account<Profile>`
    if let Ok(profile_account) = Account::<Profile>::try_from(target_account) {
        require_keys_eq!(
            profile_account.authority,
            *authority,
            CustomError::ConnectionTargetAuthorityMismatch
        );
        return Ok(());
    }

    // Check if the target account is of type `Account<Subspace>`
    if let Ok(subspace_account) = Account::<Subspace>::try_from(target_account) {
        require_keys_eq!(
            subspace_account.authority,
            *authority,
            CustomError::ConnectionTargetAuthorityMismatch
        );
        return Ok(());
    }

    // If the account is neither `Account<Profile>` nor `Account<Subspace>`,
    // return an error indicating an invalid connection target account.
    Err(error!(CustomError::ConnectionTargetAccountInvalid))
}

/// Validates the target account for a reaction
/// based on the provided app and target account information.
///
/// # Arguments
///
/// * `app` - The public key of the application.
/// * `target_account` - The account information of the target account.
///
/// # Errors
///
/// Returns an error of type `CustomError::ReactionTargetAccountInvalid`
/// if the target account is invalid or does not belong to the specified application.
///
/// # Returns
///
/// Returns `Ok(ReactionTargetType)` if the target account is valid and belongs to the specified application.
/// Otherwise, returns an error.
///
pub fn validate_reaction_target(
    app: &Pubkey,
    target_account: &AccountInfo,
) -> Result<ReactionTargetType> {
    if let Ok(profile_account) = Account::<Profile>::try_from(target_account) {
        if profile_account.app == *app {
            return Ok(ReactionTargetType::Profile);
        }
    }

    if let Ok(publication_account) = Account::<Publication>::try_from(target_account) {
        if publication_account.app == *app {
            return Ok(ReactionTargetType::Publication);
        }
    }

    Err(error!(CustomError::ReactionTargetAccountInvalid))
}

/// Validates the target account for a report
/// based on the provided app and target account information.
///
/// # Arguments
///
/// * `app` - The public key of the application.
/// * `target_account` - The account information of the target account.
///
/// # Errors
///
/// Returns an error of type `CustomError::ReportTargetAccountInvalid`
/// if the target account is invalid or does not belong to the specified application.
///
/// # Returns
///
/// Returns `Ok(ReportTargetType)` if the target account is valid and belongs to the specified application.
/// Otherwise, returns an error.
///
pub fn validate_report_target(
    app: &Pubkey,
    target_account: &AccountInfo,
) -> Result<ReportTargetType> {
    if let Ok(profile_account) = Account::<Profile>::try_from(target_account) {
        if profile_account.app == *app {
            return Ok(ReportTargetType::Profile);
        }
    }

    if let Ok(subspace_account) = Account::<Subspace>::try_from(target_account) {
        if subspace_account.app == *app {
            return Ok(ReportTargetType::Subspace);
        }
    }

    if let Ok(publication_account) = Account::<Publication>::try_from(target_account) {
        if publication_account.app == *app {
            return Ok(ReportTargetType::Publication);
        }
    }

    Err(error!(CustomError::ReportTargetAccountInvalid))
}

/// Checks if a profile has permission to publish content in a given subspace.
///
/// # Arguments
///
/// * `subspace` - The subspace for which publishing permission is being checked.
/// * `profile_key` - The public key of the profile attempting to publish.
/// * `authority_key` - The public key of the authority overseeing the subspace.
/// * `connection_proof` - An optional Connection-proof PDA that may grant publishing permission.
/// * `subspace_manager_proof` - An optional Subspace-manager-proof that may grant publishing permission.
///
/// # Returns
///
/// Returns `true` if the profile has permission to publish in the subspace, `false` otherwise.
///
pub fn is_publishing_allowed(
    subspace: &Box<Account<'_, Subspace>>,
    profile_key: &Pubkey,
    authority_key: &Pubkey,
    connection_proof: Option<&Box<Account<'_, Connection>>>,
    subspace_manager_proof: Option<&Box<Account<'_, SubspaceManager>>>,
) -> bool {
    match subspace.publishing_permission {
        SubspacePublishingPermissionLevel::All => true,
        SubspacePublishingPermissionLevel::AllMembers => {
            if let Some(connection_proof) = connection_proof {
                if connection_proof.initializer == *profile_key
                    && connection_proof.target == *subspace.to_account_info().key
                {
                    return true;
                }
            }
            if let Some(subspace_manager_proof) = subspace_manager_proof {
                if subspace_manager_proof.profile == *profile_key {
                    return true;
                }
            }
            authority_key == &subspace.authority.key()
        }
        SubspacePublishingPermissionLevel::ApprovedMembers => {
            if let Some(connection_proof) = connection_proof {
                if connection_proof.initializer == *profile_key
                    && connection_proof.target == *subspace.to_account_info().key
                    && connection_proof.approved
                {
                    return true;
                }
            }
            if let Some(subspace_manager_proof) = subspace_manager_proof {
                if subspace_manager_proof.profile == *profile_key {
                    return true;
                }
            }
            authority_key == &subspace.authority.key()
        }
        SubspacePublishingPermissionLevel::Admins => {
            if let Some(subspace_manager_proof) = subspace_manager_proof {
                if subspace_manager_proof.profile == *profile_key
                    && subspace_manager_proof.role == SubspaceManagementRoleType::Admin
                {
                    return true;
                }
            }
            authority_key == &subspace.authority.key()
        }
        SubspacePublishingPermissionLevel::Owner => authority_key == &subspace.authority.key(),
    }
}
