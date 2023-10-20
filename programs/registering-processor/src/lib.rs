use anchor_lang::prelude::*;

declare_id!("DYMYbpkfNK99TajeWCJU8K8iwbn24GCEu9YPN5qHCXnq");

#[program]
pub mod registering_processor {
    use super::*;

    pub fn process(
        ctx: Context<ProcessRegistering>,
        processing_data: Option<String>,
    ) -> Result<()> {
        // TODO: Make some processing ...

        msg!("App key into JXP: {}", ctx.accounts.app.key);
        msg!("Profile key into JXP: {}", ctx.accounts.profile.key);
        msg!("Authority key into JXP: {}", ctx.accounts.authority.key);

        if processing_data.is_some() {
            msg!(
                "processing_data into JXP: {}",
                processing_data.as_ref().unwrap()
            );
        }

        // require_keys_eq!(
        //     *ctx.accounts.app.key,
        //     *ctx.accounts.profile.key,
        //     CustomError::ValidationError
        // );

        if let Some(processing_data) = processing_data {
            if processing_data != "test" {
                return Err(error!(CustomError::ValidationError));
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct ProcessRegistering<'info> {
    /// CHECK: Checked in core program
    pub app: AccountInfo<'info>,

    /// CHECK: Checked in core program
    pub profile: AccountInfo<'info>,

    /// CHECK: Checked in core program
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum CustomError {
    #[msg("JXP validation error")]
    ValidationError,
}
