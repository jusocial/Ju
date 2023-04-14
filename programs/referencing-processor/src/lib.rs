use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod referencing_processor {
    use super::*;

    pub fn process(_ctx: Context<ProcessReferencing>, _processing_data: Option<String>) -> Result<()> {

        // TODO: Make some processing logic ...
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ProcessReferencing<'info> {
    /// CHECK: Checked in core program
    pub app: AccountInfo<'info>,

    /// CHECK: Checked in core program
    pub initializer: AccountInfo<'info>,

    /// CHECK: Checked in core program
    pub target: AccountInfo<'info>,

    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
