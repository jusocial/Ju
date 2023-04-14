use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod publishing_processor {
    use super::*;

    pub fn process(_ctx: Context<ProcessPublishing>, _processing_data: Option<String>) -> Result<()> {

        // TODO: Make some additional processing logic ...
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ProcessPublishing<'info> {
    /// CHECK: Checked in core program
    pub app: AccountInfo<'info>,

    /// CHECK: Checked in core program
    pub profile: AccountInfo<'info>,
    
    /// CHECK: Checked in core program
    pub publication: AccountInfo<'info>,

    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}