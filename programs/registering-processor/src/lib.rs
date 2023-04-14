use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod registering_processor {
    use super::*;

    pub fn process(_ctx: Context<ProcessRegistering>, _processing_data: Option<String>) -> Result<()> {

        // TODO: Make some processing ...
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ProcessRegistering<'info> {
    /// CHECK: Checked in core program
    pub app: AccountInfo<'info>,
    
    /// CHECK: Checked in core program
    pub profile: AccountInfo<'info>,

    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}
