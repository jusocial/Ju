use crate::*;

/// Helper function for validating Metadata URI
///
/// Parameters:
///
/// 1. `metadata_uri` - Reference to metadata URI String
/// 
pub fn validate_metadata_uri(metadata_uri: &String) -> Result<()> {
    if metadata_uri.len() < MIN_URI_LENGTH || metadata_uri.len() > MAX_URI_LENGTH {
        return Err(error!(CustomError::UriLengthIncorrect));
    }
    Ok(())
}

/// Helper function to get Connection target from AccountInfo
///
/// Parameters:
///
/// 1. `target_account` - Reference to the Profile/Subspace AccountInfo
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