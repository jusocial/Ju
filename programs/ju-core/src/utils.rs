use crate::*;

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
pub fn get_connection_target_type(
    target_account: &AccountInfo,
) -> Result<ConnectionTargetType> {
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
pub fn get_connecting_processor_from_target(target_account: &AccountInfo) -> Result<Option<Pubkey>> {
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
/// Returns an error of type `CustomError::ConnectionTargetAccountInvalid` 
/// if the target account is invalid or does not belong to the specified application.
///
/// # Returns
///
/// Returns `Ok(())` if the target account is valid and belongs to the specified application.
/// Otherwise, returns an error.
/// 
pub fn validate_report_target(
    app: &Pubkey,
    target_account: &AccountInfo,
) -> Result<()> {
    if let Ok(profile_account) = Account::<Profile>::try_from(target_account) {
        if profile_account.app == *app {
            return Ok(());
        }
    }

    if let Ok(subspace_account) = Account::<Subspace>::try_from(target_account) {
        if subspace_account.app == *app {
            return Ok(());
        }
    }

    if let Ok(publication_account) = Account::<Publication>::try_from(target_account) {
        if publication_account.app == *app {
            return Ok(());
        }
    }

    Err(error!(CustomError::ConnectionTargetAccountInvalid))
}



/// Helper function to get assigned External Processor from AccountInfo
///
/// Parameters:
///
/// 1. `target` - Reference to Profile/Subspace AccountInfo
/// 
pub fn _try_get_target_connecting_processor(target: &AccountInfo) -> Result<Option<Pubkey>> {
    let _data = target.try_borrow_data();

    // TODO: implemet logic or return None

    Ok(None)
}