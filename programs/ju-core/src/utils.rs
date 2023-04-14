use crate::*;

/// Helper function for validating Metadata URI
///
/// Parameters:
///
/// 1. `metadata_uri` - Reference to metadata URI String
/// 
pub fn validate_metadata_uri(metadata_uri: &String) -> Result<()> {
    if metadata_uri.len() < MIN_URI_LENGTH && metadata_uri.len() > MAX_URI_LENGTH {
        return Err(error!(CustomError::UriLengthIncorrect));
    }
    Ok(())
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