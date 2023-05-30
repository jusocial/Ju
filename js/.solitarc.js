// @ts-check
const path = require('path');
const programDir = path.join(__dirname, '..', 'programs', 'ju-core');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = path.join(__dirname, '..', '.crates');

module.exports = {
    idlGenerator: 'anchor',
    programName: 'ju_core',
    programId: '964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq',
    idlDir,
    sdkDir,
    binaryInstallDir,
    programDir,
    anchorRemainingAccounts: false
};