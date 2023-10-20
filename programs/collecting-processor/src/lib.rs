use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod collecting_processor {
    use super::*;

    pub fn process(_ctx: Context<ProcessCollecting>, _processing_data: Option<String>) -> Result<()> {

        // TODO: Make some processing ...
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ProcessCollecting<'info> {
    /// CHECK: Checked in core program
    pub app: UncheckedAccount<'info>,

    /// CHECK: Checked in core program
    pub initializer: UncheckedAccount<'info>,

    /// CHECK: Checked in core program
    pub target: UncheckedAccount<'info>,

    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
