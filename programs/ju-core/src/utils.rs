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