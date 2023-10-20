import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { JuCore } from "../target/types/ju_core";
import { expect } from "chai";
import * as uuid from 'uuid';
import { airdrop, birthDate, toText } from "./utils.spec";


const provider = anchor.getProvider();

describe("ju-core", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const user = provider.publicKey;
  console.log('user :>> ', user);
  const { SystemProgram } = anchor.web3;

  const program = anchor.workspace.JuCore as Program<JuCore>;


  /* Processors Setup */
  // const testProcessor1 = anchor.web3.Keypair.generate();
  const testProcessor1 = new anchor.web3.PublicKey('DYMYbpkfNK99TajeWCJU8K8iwbn24GCEu9YPN5qHCXnq')
  const [testProcessorPDA1, testProcessorPDA1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("processor"),
      testProcessor1.toBuffer()
    ],
    program.programId
  );

  /* Apps Setup */
  const appName = "jutube";
  const appSeed = [Buffer.from("app"), Buffer.from(appName)];
  const [appAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
    appSeed,
    program.programId
  );


  /* Profiles Setup */
  const [profileAccount1, profileAccountBump1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("profile"),
      appAccount.toBuffer(),
      user.toBuffer(),
    ],
    program.programId
  );
  const profileAlias1 = "igor";
  const [profileAliasAccount1, profileAliasAccountBump1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("alias"),
      appAccount.toBuffer(),
      Buffer.from(profileAlias1),
    ],
    program.programId
  );

  const updatedProfileAlias1 = "konrad";
  const [updatedProfileAliasAccount1, updatedProfileAliasAccountBump1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("alias"),
      appAccount.toBuffer(),
      Buffer.from(updatedProfileAlias1),
    ],
    program.programId
  );

  let user2 = anchor.web3.Keypair.generate();
  // airdrop(anotherUser.publicKey);
  const [profileAccount2, profileAccountBump2] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("profile"),
      appAccount.toBuffer(),
      user2.publicKey.toBuffer(),
    ],
    program.programId
  );
  const profileAlias2 = "julia_2";
  const [profileAliasAccount2, profileAliasAccountBump2] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("alias"),
      appAccount.toBuffer(),
      Buffer.from(profileAlias2),
    ],
    program.programId
  );

  /* Subspace Setup */
  const subspaceUuid = uuid.v4().replace(/-/g, '');
  const [subspaceAccount, subspaceAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("subspace"),
      appAccount.toBuffer(),
      profileAccount1.toBuffer(),
      Buffer.from(subspaceUuid),
    ],
    program.programId
  );

  const subspaceAlias = "nuclear";
  const [subspaceAliasAccount, subspaceAliasAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("alias"),
      appAccount.toBuffer(),
      Buffer.from(subspaceAlias),
    ],
    program.programId
  );


  /* Publications Setup */
  const publicationId = uuid.v4().replace(/-/g, '');
  const uri = "https://example.com/publication-1";
  const contentType = { article: {} };

  const [publicationAccount, publicationAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("publication"),
      appAccount.toBuffer(),
      Buffer.from(publicationId),
    ],
    program.programId
  );


  const mirrorPublicationId = uuid.v4().replace(/-/g, '');
  const mirrorPublication1Seed = [
    Buffer.from("publication"),
    appAccount.toBuffer(),
    Buffer.from(mirrorPublicationId),
  ];
  const [mirrorPublication1Account, mirrorPublication1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    mirrorPublication1Seed,
    program.programId
  );


  const publication1ReplyId = uuid.v4().replace(/-/g, '');
  const publication1ReplySeed = [
    Buffer.from("publication"),
    appAccount.toBuffer(),
    Buffer.from(publication1ReplyId),
  ];
  const [publication1ReplyAccount, publication1ReplyBump] = anchor.web3.PublicKey.findProgramAddressSync(
    publication1ReplySeed,
    program.programId
  );


  const subspacePublicationId = uuid.v4().replace(/-/g, '');

  const subspacePublicationSeed = [
    Buffer.from("publication"),
    appAccount.toBuffer(),
    Buffer.from(subspacePublicationId),
  ];
  const [subspacePublicationAccount, _subspacePublicationBump] = anchor.web3.PublicKey.findProgramAddressSync(
    subspacePublicationSeed,
    program.programId
  );


  // Profile2-to-Profile1
  const [connectionAccount_2_1, connectionAccount_2_1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("connection"),
      appAccount.toBuffer(),
      profileAccount2.toBuffer(),
      profileAccount1.toBuffer(),
      profileAccount2.toBuffer(),
    ],
    program.programId
  );

  // Profile1-to-Profile2
  const [connectionAccount_1_2, connectionAccount_1_2Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("connection"),
      appAccount.toBuffer(),
      profileAccount1.toBuffer(),
      profileAccount2.toBuffer(),
      profileAccount1.toBuffer(),
    ],
    program.programId
  );

  // Profile1-to-Subspace
  const [connectionAccount_1_sub, connectionAccount_1_sub_Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("connection"),
      appAccount.toBuffer(),
      profileAccount1.toBuffer(),
      subspaceAccount.toBuffer(),
      profileAccount1.toBuffer(),
    ],
    program.programId
  );

  // Profile2-to-Subspace
  const [connectionAccount_2_sub, connectionAccount_2_sub_Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("connection"),
      appAccount.toBuffer(),
      profileAccount2.toBuffer(),
      subspaceAccount.toBuffer(),
      profileAccount2.toBuffer(),
    ],
    program.programId
  );


  // Profile2 -> Subspace Manager
  const [subspaceManager2, subspaceManager2Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("subspace_manager"),
      subspaceAccount.toBuffer(),
      profileAccount2.toBuffer(),
    ],
    program.programId
  );


  // Messenger keys
  const profile1MessengerKey = anchor.web3.Keypair.generate().publicKey;
  const profile2MessengerKey = anchor.web3.Keypair.generate().publicKey;
  const profile3MessengerKey = anchor.web3.Keypair.generate().publicKey;
  const profile4MessengerKey = anchor.web3.Keypair.generate().publicKey;

  const genderMale: anchor.IdlTypes<JuCore>["Gender"] = { male: {} }
  const genderFemale: anchor.IdlTypes<JuCore>["Gender"] = { female: {} }
  const genderOtherOrPreferNotToSay: anchor.IdlTypes<JuCore>["Gender"] = { otherOrPreferNotToSay: {} }


  const [developerWhitelistProof1, developerWhitelistProof1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("developer"),
      user.toBuffer(),
    ],
    program.programId
  );


  describe("Developers whitelist", async () => {

    it("Add Developer", async () => {

      try {
        /* Call the addProcessor function via RPC */
        const tx = await program.methods.addDeveloper(user)
          .accounts(
            {
              developerWhitelistProof: developerWhitelistProof1,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the Processor PDA account and check the value  */
      const data = await program.account.developerWhitelistProof.fetch(developerWhitelistProof1);
      // console.log('Developer whitelist-proof PDA account: ', data);

      expect(data.developer.toString()).to.equal(user.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });

  });
  
  describe("External Processor", async () => {

    it("Add Processor", async () => {

      try {
        /* Call the addProcessor function via RPC */
        const tx = await program.methods.addProcessor(
          { registering: {} },
          "proc1",
          testProcessor1,
          // testProcessor1.publicKey,
          null
        )
          .accounts(
            {
              processorPda: testProcessorPDA1,
              developerWhitelistProof: null,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the Processor PDA account and check the value  */
      const data = await program.account.externalProcessorPda.fetch(testProcessorPDA1);
      console.log('Processor PDA account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

  });

  describe("App", async () => {

    it("Create new App", async () => {

      const appMetadataUri = null;

      /* Call the initializeApp function via RPC */
      let appData: anchor.IdlTypes<JuCore>["AppData"] = {
        metadataUri: appMetadataUri,

        profileMetadataRequired: true,
        subspaceMetadataRequired: true,

        profileIndividualProcessorsAllowed: false,
        subspaceIndividualProcessorsAllowed: false,
        publicationIndividualProcessorsAllowed: false,

        profileDeleteAllowed: false,
        subspaceDeleteAllowed: false,
        publicationDeleteAllowed: false,
      };

      // console.log('appAccount: ', appAccount)
      // console.log('user: :>> ', user);

      try {
        const tx = await program.methods.initializeApp(appName, appData)
          .accounts({
            app: appAccount,
            developerWhitelistProof: null,
            registeringProcessorPda: testProcessorPDA1,
            connectingProcessorPda: null,
            publishingProcessorPda: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            // developer: developer1,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>>', error)
      }
      /* Fetch the App PDA and check the value  */
      const data = await program.account.app.fetch(appAccount);
      console.log('App account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
      expect(data.registeringProcessor.toString()).to.equal(testProcessor1.toString());
    });

    it("Update existing App", async () => {

      const newUri = "https://example.com/app-updated-uri";
      let appData2: anchor.IdlTypes<JuCore>["AppData"] = {
        metadataUri: newUri,

        profileMetadataRequired: true,
        subspaceMetadataRequired: true,

        profileIndividualProcessorsAllowed: false,
        subspaceIndividualProcessorsAllowed: false,
        publicationIndividualProcessorsAllowed: false,

        profileDeleteAllowed: true,
        subspaceDeleteAllowed: true,
        publicationDeleteAllowed: true,
      };

      try {
        /* Call ix via RPC */
        const tx = await program.methods.updateApp(appData2)
          .accounts({
            app: appAccount,
            registeringProcessorPda: null,
            connectingProcessorPda: null,
            publishingProcessorPda: null,
            collectingProcessorPda: null,
            // collectingProcessorPda: testProcessorPDA1,  // Must be Error here
            // referencingProcessorPda: testProcessorPDA1,
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the App PDA and check the value  */
      const data = await program.account.app.fetch(appAccount);
      // console.log('Updated App account: ', data);

      expect(data.metadataUri).to.equal(newUri);

      // } catch (err) {
      //   const e = err as anchor.AnchorError;
      //   // assert.strictEqual(e.error.errorCode.code, "InstallOwnerMismatch");
      //   expect(e.error.errorCode.code).to.equal("ProcessorTypeMismatch");
      // }

    });

  });

  describe("Profile", async () => {

    const profile1Name = 'John';
    const profile1Surname = 'Doe';
    const profile1Birthdate = birthDate(1972, 1, 24);
    const uri = "https://example.com/profile-1-uri";
    const profile1StatusText = 'Hey there!';


    const updatedProfile1Name = 'Bob';
    const updatedProfile1Surname = 'Jackson';
    const updatedProfile1Birthdate = birthDate(1984, 1, 26);


    const profile2Name = 'Alice';
    const profile2Surname = 'Smith';
    const profile2Birthdate = birthDate(1982, 11, 29);

    console.log('birthDate(1972, 0, 24) :>> ', birthDate(1972, 0, 24).toNumber());

    it("Creates Profile 1", async () => {

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias1,
          metadataUri: uri,
          statusText: profile1StatusText,
          gender: genderMale,
          firstName: profile1Name,
          lastName: profile1Surname,
          birthDate: birthDate(1972, 0, 24),
          countryCode: 0,
          regionCode: 0,
          cityCode: 0,
          currentLocation: null
        };
        const tx = await program.methods.createProfile(profileInstructionData1, null)
          .accounts(
            {
              app: appAccount,
              profile: profileAccount1,
              aliasPda: profileAliasAccount1,
              connectingProcessorPda: null,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.profile.fetch(profileAccount1);
      // console.log('profileAccount1 :>> ', profileAccount1);
      // console.log('Profile 1 account: ', data);

      /* Fetch the Alias PDA account and check the value of Profile */
      const aliasPda = await program.account.alias.fetch(profileAliasAccount1);
      // console.log('Alias acoount: ', aliasPda);

      expect(data.metadataUri.toString()).to.equal(uri);
      expect(data.gender.toString()).to.equal(genderMale.toString());
      expect(toText(data.firstName)).to.equal(profile1Name);
      expect(toText(data.lastName)).to.equal(profile1Surname);
      expect(data.birthDate.toString()).to.equal(birthDate(1972, 0, 24).toString());

      expect(data.alias.toString()).to.equal(profileAlias1);
      expect(data.statusText.toString()).to.equal(profile1StatusText);

      expect(aliasPda.owner.toString()).to.equal(profileAccount1.toString());
      expect(aliasPda.value.toString()).to.equal(profileAlias1.toString());
    });

    // Update Profile
    it("Update Profile 1", async () => {

      const updatedUri = "https://example.com/profile-1-updated-uri"
      const updatedProfile1StatusText = 'LFG!!!';
      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias1,
          metadataUri: updatedUri,
          statusText: updatedProfile1StatusText,
          gender: genderMale,
          firstName: profile1Name,
          lastName: profile1Surname,
          birthDate: profile1Birthdate,
          countryCode: 0,
          regionCode: 0,
          cityCode: 0,
          currentLocation: null
        };
        const tx = await program.methods.updateProfile(profileInstructionData1)
          .accounts(
            {
              app: appAccount,
              profile: profileAccount1,
              currentAliasPda: null,
              newAliasPda: null,
              connectingProcessorPda: null,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.profile.fetch(profileAccount1);
      // console.log('Profile 1 account: ', data);

      /* Fetch the Alias PDA account and check the value of Profile */
      const aliasPda = await program.account.alias.fetch(profileAliasAccount1);
      // console.log(`Alias account (${profileAliasAccount1}) data : `, aliasPda);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.metadataUri).to.equal(updatedUri);

      expect(data.gender.toString()).to.equal(genderMale.toString());
      expect(toText(data.firstName)).to.equal(profile1Name);
      expect(toText(data.lastName)).to.equal(profile1Surname);
      expect(data.birthDate.toString()).to.equal(profile1Birthdate.toString());

      expect(data.statusText.toString()).to.equal(updatedProfile1StatusText);
      expect(data.alias).to.equal(profileAlias1);
      expect(data.authority.toString()).to.equal(user.toString());

      expect(aliasPda.app.toString()).to.equal(appAccount.toString());
      expect(JSON.stringify(aliasPda.aliasType)).to.equal(JSON.stringify({ profile: {} }));
      expect(aliasPda.owner.toString()).to.equal(profileAccount1.toString());
      expect(aliasPda.value.toString()).to.equal(profileAlias1.toString());
    });


    // Update Profile 1 Alias
    it("Update Alias for Profile 1 & delete metadata", async () => {



      const updatedUri = "https://example.com/profile-1-updated-uri"

      // console.log("profileAccount1 :>>", profileAccount1.toBase58());
      // console.log('profileAliasAccount1 :>> ', profileAliasAccount1.toBase58());
      // console.log('updatedProfileAliasAccount1 :>> ', updatedProfileAliasAccount1.toBase58());

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: updatedProfileAlias1,
          metadataUri: updatedUri,
          gender: genderOtherOrPreferNotToSay,
          statusText: '',
          firstName: updatedProfile1Name,
          lastName: updatedProfile1Surname,
          birthDate: updatedProfile1Birthdate,
          countryCode: 7,
          regionCode: 333,
          cityCode: 31,
          currentLocation: null
        };
        const tx = await program.methods.updateProfile(profileInstructionData1)
          .accounts(
            {
              app: appAccount,
              profile: profileAccount1,
              currentAliasPda: profileAliasAccount1,
              newAliasPda: updatedProfileAliasAccount1,
              connectingProcessorPda: null,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);

      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.profile.fetch(profileAccount1);
      // console.log('Updated Profile 1 account: ', data);

      /* Fetch the Alias PDA account and check the value of Profile */
      const newAliasPda = await program.account.alias.fetch(updatedProfileAliasAccount1);
      // console.log('New Alias account: ', newAliasPda);

      try {
        const oldAliasPda = await program.account.alias.fetch(profileAliasAccount1);
      } catch (error) {
        // console.log('oldAliasPda error :>> ', error);
        // expect(error).to.be('Error: Account does not exist or has no data');
      }

      expect(data.app.toString()).to.equal(appAccount.toString());

      expect(data.gender.toString()).to.equal(genderOtherOrPreferNotToSay.toString());
      expect(toText(data.firstName)).to.equal(updatedProfile1Name);
      expect(toText(data.lastName)).to.equal(updatedProfile1Surname);
      expect(data.birthDate.toString()).to.equal(updatedProfile1Birthdate.toString());

      expect(data.metadataUri).to.equal(updatedUri);
      expect(data.alias).to.equal(updatedProfileAlias1);
      expect(data.authority.toString()).to.equal(user.toString());

      expect(newAliasPda.app.toString()).to.equal(appAccount.toString());
      expect(newAliasPda.owner.toString()).to.equal(profileAccount1.toString());
      expect(newAliasPda.authority.toString()).to.equal(user.toString());
      expect(newAliasPda.value.toString()).to.equal(updatedProfileAlias1.toString());
    });


    // Update Profile 1 Alias
    it("Delete Alias for Profile 1", async () => {

      // console.log("profileAccount1 :>>", profileAccount1.toBase58());
      // console.log('profileAliasAccount1 :>> ', profileAliasAccount1.toBase58());
      // console.log('updatedProfileAliasAccount1 :>> ', updatedProfileAliasAccount1.toBase58());

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: null,
          metadataUri: uri,
          statusText: '',
          gender: genderMale,
          firstName: 'Konrad',
          lastName: 'Mikhelson',
          birthDate: birthDate(1984, 0, 26),
          countryCode: 7,
          regionCode: 321,
          cityCode: 31,
          currentLocation: null
        };
        const tx = await program.methods.updateProfile(profileInstructionData1)
          .accounts(
            {
              app: appAccount,
              profile: profileAccount1,
              currentAliasPda: updatedProfileAliasAccount1,
              newAliasPda: null,
              connectingProcessorPda: null,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);

      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.profile.fetch(profileAccount1);
      console.log('Updated Profile 1 account: ', data);

      try {
        const aliasPda = await program.account.alias.fetch(updatedProfileAliasAccount1);
        console.log('alias account: ', aliasPda);
      } catch (error) {
        // console.log('aliasPda error :>> ', error);
        // expect(error).to.be('Error: Account does not exist or has no data');
      }

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.metadataUri).to.equal(uri);
      expect(data.alias).to.equal(null);
      expect(data.gender.toString()).to.equal(genderMale.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Creates Profile 2", async () => {

      await airdrop(user2.publicKey);

      const profile2MetadataUri = "https://example.com/profile-2-uri"
      const profile2StatusText = 'Looking for friendship...';

      try {
        /* Call the create function via RPC */
        let profileInstructionData2: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias2,
          statusText: profile2StatusText,
          metadataUri: profile2MetadataUri,
          gender: genderFemale,
          firstName: profile2Name,
          lastName: profile2Surname,
          birthDate: profile2Birthdate,
          countryCode: 0,
          regionCode: 0,
          cityCode: 0,
          currentLocation: null
        };
        const tx = await program.methods.createProfile(profileInstructionData2, null)
          .accounts({
            app: appAccount,
            profile: profileAccount2,
            aliasPda: profileAliasAccount2,
            connectingProcessorPda: null,
            authority: user2.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);

      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.profile.fetch(profileAccount2);
      // console.log('Profile 2 account: ', data);

      expect(data.metadataUri).to.equal(profile2MetadataUri);

      expect(data.gender.toString()).to.equal(genderFemale.toString());
      expect(toText(data.firstName)).to.equal(profile2Name);
      expect(toText(data.lastName)).to.equal(profile2Surname);
      expect(data.birthDate.toString()).to.equal(profile2Birthdate.toString());

      expect(data.statusText.toString()).to.equal(profile2StatusText);
      expect(data.alias).to.equal(profileAlias2);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });


  describe("Subspaces: ", async () => {

    const subspaceName = 'Nuclear Block'

    it("Create Subspace", async () => {

      const publishingPermission: anchor.IdlTypes<JuCore>["SubspacePublishingPermissionLevel"] = { all: {} }
      const subspaceMetadataUri = "https://example.com/profile-1-uri";

      /* Call the createPublication function via RPC */
      let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
        alias: subspaceAlias,
        name: subspaceName,
        publishingPermission: { all: {} },
        metadataUri: subspaceMetadataUri
      };

      try {
        const tx = await program.methods.createSubspace(subspaceUuid, subspaceInstructionData)
          .accounts({
            app: appAccount,
            creatorProfile: profileAccount1,
            subspace: subspaceAccount,
            aliasPda: subspaceAliasAccount,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            publishingProcessorPda: null,
            connectingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.subspace.fetch(subspaceAccount);
      // console.log('Subspace address: ', subspaceAccount.toBase58());
      // console.log('Subspace data: ', data);

      expect(data.uuid.toString()).to.equal(subspaceUuid.toString());
      expect(data.alias).to.equal(subspaceAlias);
      expect(data.creator.toString()).to.equal(profileAccount1.toString());
      expect(data.publishingPermission.toString()).to.equal(publishingPermission.toString());
      expect(data.metadataUri).to.equal(subspaceMetadataUri);
    });

    it("Update Subspace", async () => {

      const publishingPermission: anchor.IdlTypes<JuCore>["SubspacePublishingPermissionLevel"] = { admins: {} }
      const newUri = "https://example.com/subspace-1-updated-uri";

      try {
        /* Call ix via RPC */
        let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
          alias: subspaceAlias,
          name: subspaceName,
          publishingPermission: publishingPermission,
          metadataUri: newUri
        };
        const tx = await program.methods.updateSubspace(subspaceInstructionData)
          .accounts({
            app: appAccount,
            creatorProfile: profileAccount1,
            subspace: subspaceAccount,
            currentAliasPda: null,
            newAliasPda: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            publishingProcessorPda: null,
            connectingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.subspace.fetch(subspaceAccount);
      // console.log('Updated Subspace data: ', data);

      expect(data.uuid.toString()).to.equal(subspaceUuid.toString());
      expect(data.alias).to.equal(subspaceAlias);
      expect(data.creator.toString()).to.equal(profileAccount1.toString());
      expect(data.publishingPermission.toString()).to.equal(publishingPermission.toString());
      expect(data.metadataUri).to.equal(newUri);
    });
  });


  describe("Connections", async () => {

    it("Create Connection to Profile (Following)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount_2_1,
              initializer: profileAccount2,
              target: profileAccount1,
              authority: user2.publicKey,
              systemProgram: SystemProgram.programId,
            }
          )
          .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.connection.fetch(connectionAccount_2_1);
      console.log('Connection (following) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(profileAccount1.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ profile: {} }));
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });


    it("Create backward Connection to Profile (reFollowing)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount_1_2,
              initializer: profileAccount1,
              target: profileAccount2,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.connection.fetch(connectionAccount_1_2);
      // console.log('Connection (following) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.initializer.toString()).to.equal(profileAccount1.toString());
      expect(data.target.toString()).to.equal(profileAccount2.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ profile: {} }));
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Update Connection (Approve)", async () => {

      try {
        /* Call the updateConnection function via RPC */
        const tx = await program.methods.updateConnection(true)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount_2_1,
              initializer: profileAccount2,
              target: profileAccount1,
              user: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.connection.fetch(connectionAccount_2_1);
      // console.log('Updated Connection account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(profileAccount1.toString());
      expect(data.approved).to.equal(true);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });


    it("Create Connection Profile 1 to Subspace (Subscribing)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount_1_sub,
              initializer: profileAccount1,
              target: subspaceAccount,
              authority: user,
              systemProgram: SystemProgram.programId,
            }
          )
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.connection.fetch(connectionAccount_1_sub);
      // console.log('Connection (subscribing to Subspace) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ subspace: {} }));
      expect(data.initializer.toString()).to.equal(profileAccount1.toString());
      expect(data.target.toString()).to.equal(subspaceAccount.toString());
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user.toString());
    });



    it("Create Connection Profile 2 to Subspace (Subscribing)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount_2_sub,
              initializer: profileAccount2,
              target: subspaceAccount,
              authority: user2.publicKey,
              systemProgram: SystemProgram.programId,
            }
          )
          .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.connection.fetch(connectionAccount_2_sub);
      // console.log('Connection (subscribing to Subspace) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ subspace: {} }));
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(subspaceAccount.toString());
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });


  describe("Subspaces Management: ", async () => {

    it("Add Profile 2 as Subspace Manager", async () => {

      const managerRole: anchor.IdlTypes<JuCore>["SubspaceManagementRoleType"] = { publisher: {} }

      try {
        /* Call ix via RPC */
        const tx = await program.methods.addSubspaceManager(managerRole)
          .accounts({
            app: appAccount,
            subspace: subspaceAccount,
            profile: profileAccount2,
            connectionProof: connectionAccount_2_sub,
            manager: subspaceManager2,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          // .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.subspaceManager.fetch(subspaceManager2);
      // console.log('Updated Subspace data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.profile.toString()).to.equal(profileAccount2.toString(), '2');
      expect(data.subspace.toString()).to.equal(subspaceAccount.toString(), '3');
      expect(data.role.toString()).to.equal(managerRole.toString(), '4');
    });


    it("it can Update Subspace Manager (Profile 2) with {Admin} credentials", async () => {

      const managerRole: anchor.IdlTypes<JuCore>["SubspaceManagementRoleType"] = { admin: {} }

      try {
        /* Call ix via RPC */
        const tx = await program.methods.updateSubspaceManager(managerRole)
          .accounts({
            app: appAccount,
            subspace: subspaceAccount,
            profile: profileAccount2,
            connectionProof: connectionAccount_2_sub,
            manager: subspaceManager2,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          // .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.subspaceManager.fetch(subspaceManager2);
      // console.log('Updated Subspace Manager data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.profile.toString()).to.equal(profileAccount2.toString(), '2');
      expect(data.subspace.toString()).to.equal(subspaceAccount.toString(), '3');
      expect(data.role.toString()).to.equal(managerRole.toString(), '4');
    });

  });


  describe("Publication", async () => {

    it("Create Publication into Profile1 space", async () => {

      /* Call the createPublication function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: false,
        metadataUri: uri,
        isMirror: false,
        isReply: false,
        contentType: contentType,
        tag: ''
      };
      try {
        const tx = await program.methods.createPublication(publicationId, publicationInstructionData, null)
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: publicationAccount,
            subspace: null,
            targetPublication: null,
            connectionProof: null,
            subspaceManagerProof: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.publication.fetch(publicationAccount);
      // console.log('Publication data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.profile.toString()).to.equal(profileAccount1.toString());
      expect(data.uuid.toString()).to.equal(publicationId.toString());
      expect(data.metadataUri.toString()).to.equal(uri.toString());
      expect(data.isMirror).to.equal(false);
      expect(data.isReply).to.equal(false);
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Update publication", async () => {

      // const updatePublicationId = uuid.v4().replace(/-/g, '');
      const newURI = "https://example.com/publication_updated1";
      const contentType = { article: {} };
      const publicationTag = 'solana';

      /* Call the create function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: false,
        metadataUri: newURI,
        isMirror: false,
        isReply: false,
        contentType: contentType,
        tag: publicationTag,
      };

      try {
        const tx = await program.methods.updatePublication(publicationInstructionData)
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: publicationAccount,
            subspace: null,
            // targetPublication: null,
            connectionProof: null,
            subspaceManagerProof: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);

      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.publication.fetch(publicationAccount);
      // console.log('Updated Publication data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.profile.toString()).to.equal(profileAccount1.toString());
      expect(data.uuid.toString()).to.equal(publicationId.toString());
      expect(data.metadataUri.toString()).to.equal(newURI.toString());
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(toText(data.tag)).to.equal(publicationTag.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Create Publication1 Mirror", async () => {

      const mirrorURI = "https://example.com/publication-mirror-uri";
      const contentType = { article: {} };

      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: true,
        metadataUri: mirrorURI,
        isMirror: true,
        isReply: false,
        contentType: contentType,
        tag: ''
      };

      try {
        /* Call the create function via RPC */
        const tx = await program.methods.createPublication(
          mirrorPublicationId,
          publicationInstructionData,
          null
        )
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: mirrorPublication1Account,
            subspace: null,
            targetPublication: publicationAccount,
            connectionProof: null,
            subspaceManagerProof: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.publication.fetch(mirrorPublication1Account);
      // console.log('Publication Mirror account data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.profile.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.uuid.toString()).to.equal(mirrorPublicationId.toString(), '3');
      expect(data.metadataUri.toString()).to.equal(mirrorURI.toString(), '4');
      expect(data.isMirror).to.equal(true, '5');
      expect(data.isReply).to.equal(false, '6');
      expect(data.targetPublication.toString()).to.equal(publicationAccount.toString(), '7');
      expect(data.contentType.toString()).to.equal(contentType.toString(), '8');
      expect(data.authority.toString()).to.equal(user.toString(), '9');
    });


    it("Profile 2 can Create Publication1 Reply into Profile space", async () => {

      const replyURI = "https://example.com/publication-1-reply-uri";

      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: false,
        metadataUri: replyURI,
        isMirror: false,
        isReply: true,
        contentType: { article: {} },
        tag: ''
      };

      try {
        /* Call the create function via RPC */
        const tx = await program.methods.createPublication(
          publication1ReplyId,
          publicationInstructionData,
          null
        )
          .accounts({
            app: appAccount,
            profile: profileAccount2,
            publication: publication1ReplyAccount,
            subspace: null,
            targetPublication: publicationAccount,
            connectionProof: null,
            subspaceManagerProof: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user2.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([user2])
          .rpc();

        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      /* Fetch the account and check the values */
      const data = await program.account.publication.fetch(publication1ReplyAccount);
      console.log('Publication 1 Reply account data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.profile.toString()).to.equal(profileAccount2.toString(), '2');
      expect(data.uuid.toString()).to.equal(publication1ReplyId.toString(), '3');
      expect(data.metadataUri.toString()).to.equal(replyURI.toString(), '4');
      expect(data.isMirror).to.equal(false, '5');
      expect(data.isReply).to.equal(true, '6');
      expect(data.targetPublication.toString()).to.equal(publicationAccount.toString(), '7');
      expect(data.authority.toString()).to.equal(user2.publicKey.toString(), '9');
    });


    it("Profile2 CAN'T create Publication into Subspace without connection proof", async () => {

      const uri = "https://example.com/publication-to-subspace";
      const isMirror = false;
      const isReply = false;
      const contentType = { video: {} };
      const publicationTag = 'subspacepub';


      /* Call the create function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: true,
        metadataUri: uri,
        isMirror: isMirror,
        isReply: isReply,
        contentType: contentType,
        tag: publicationTag,
      };

      try {
        const tx = await program.methods.createPublication(subspacePublicationId, publicationInstructionData, null)
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: subspacePublicationAccount,
            subspace: subspaceAccount,
            targetPublication: null,
            connectionProof: null,  // Connection account here
            subspaceManagerProof: null,
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        // console.log('error :>> ', error);
        expect(String(error)).contain('Error Code: SubspacePublishingPermissionViolation.')
      }
    });

    it("Profile2 CAN createPublication into Subspace with subspace-manager proof", async () => {

      const subspacePublicationId = uuid.v4().replace(/-/g, '');

      const subspacePublicationSeed = [
        Buffer.from("publication"),
        appAccount.toBuffer(),
        Buffer.from(subspacePublicationId),
      ];
      const [subspacePublicationAccount, _subspacePublicationBump] = anchor.web3.PublicKey.findProgramAddressSync(
        subspacePublicationSeed,
        program.programId
      );

      const uri = "https://example.com/publication-to-subspace";
      const contentType = { video: {} };
      const publicationTag = 'subspacepub';

      /* Call the create function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        isEncrypted: true,
        metadataUri: uri,
        isMirror: false,
        isReply: false,
        contentType: contentType,
        tag: publicationTag,
      };

      try {
        const tx = await program.methods.createPublication(subspacePublicationId, publicationInstructionData, null)
          .accounts({
            app: appAccount,
            profile: profileAccount2,
            publication: subspacePublicationAccount,
            subspace: subspaceAccount,
            targetPublication: null,
            connectionProof: null,  // Connection proof here
            subspaceManagerProof: subspaceManager2, // Management proof here
            collectingProcessorPda: null,
            referencingProcessorPda: null,
            authority: user2.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([user2])
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
        // expect(String(error)).contain('Error Code: SubspacePublishingPermissionViolation.')
      }
      /* Fetch the account and check the values */
      const data = await program.account.publication.fetch(subspacePublicationAccount);
      // console.log('Publication data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.profile.toString()).to.equal(profileAccount2.toString(), '2');
      expect(data.uuid.toString()).to.equal(subspacePublicationId.toString(), '3');
      expect(data.metadataUri.toString()).to.equal(uri.toString(), '4');
      expect(data.isMirror).to.equal(false, '5');
      expect(data.isReply).to.equal(false, '6');
      expect(data.contentType.toString()).to.equal(contentType.toString(), '7');
      expect(data.subspace.toString()).to.equal(subspaceAccount.toString(), '8');
      expect(data.authority.toString()).to.equal(user2.publicKey.toString(), '9');
    });

    // it("It can query all Subspace publications", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 213, 
    //         bytes: subspaceAccount.toBase58(),
    //       }
    //     }
    //   ]);
    //   // console.log('Publication data: ', data);

    //   expect(data.length).to.equal(2);
    //   // data.forEach(item => {console.log('item :>> ', item);})
    //   // expect(data.every(account => {
    //   //   return account.account.profile.toBase58() === profileAccount1.toBase58()
    //   // }))
    // });

    // it("It can query all Mirrored publications", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 145, // is_mirror
    //         bytes: '2',  // '2' = `1 (true)` in base58
    //       }
    //     }
    //   ]);

    //   expect(data.length).to.equal(1);
    //   // data.forEach(item => {console.log('item :>> ', item);})
    //   // expect(data.every(account => {
    //   //   return account.account.metadataUri.toString() === "https://example.com/publication-mirror-uri";
    //   // }))
    // });

    // it("It can query all Replyed publications", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 146, // is_reply
    //         bytes: '2',  // '2' = `1 (true)` in base58
    //       }
    //     }
    //   ]);

    //   expect(data.length).to.equal(1);
    //   // data.forEach(item => {console.log('item :>> ', item);})
    //   // expect(data.every(account => {
    //   //   console.log('account.account :>> ', account.account);
    //   //   return account.account.isReply === true;
    //   // }))
    // });


    // it("It can query all publications Targeted to Publication1", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 180, // `target_publication` offset
    //         bytes: publicationAccount.toBase58(),
    //       }
    //     }
    //   ]);
    //   // console.log('Publication data: ', data);

    //   expect(data.length).to.equal(2);
    //   data.forEach(item => {console.log('item :>> ', item);})
    //   // expect(data.every(account => {
    //   //   return account.account.profile.toBase58() === profileAccount1.toBase58()
    //   // }))
    // });

    // it("It can query all replyes for Publication1", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 146, // is_reply
    //         bytes: '2',  // '2' = `1 (true)` in base58
    //       }
    //     },
    //     {
    //       memcmp: {
    //         offset: 180, // `target_publication` offset
    //         bytes: publicationAccount.toBase58(),
    //       }
    //     }
    //   ]);
    //   // console.log('Publication data: ', data);

    //   expect(data.length).to.equal(1);
    // });

    // it("It can query all replyes for Publication1", async () => {

    //   /* Fetch the account and check the values */
    //   const data = await program.account.publication.all([
    //     {
    //       memcmp: {
    //         offset: 146, // is_reply
    //         bytes: '2',  // '2' = `1 (true)` in base58
    //       }
    //     },
    //     {
    //       memcmp: {
    //         offset: 180, // `target_publication` offset
    //         bytes: publicationAccount.toBase58(),
    //       }
    //     }
    //   ]);
    //   // console.log('Publication data: ', data);

    //   expect(data.length).to.equal(1);
    // });

    // it("It can query all Profiles that 20 years old", async () => {

    //   const data = await program.account.profile.all([
    //     {
    //       memcmp: {
    //         offset: 146, // is_reply
    //         bytes: '2',  // '2' = `1 (true)` in base58
    //       }
    //     },
    //   ]);

    //   expect(data.length).to.equal(1);
    // });

  });


  describe("Reaction", async () => {

    const [reactionToProfileAccount, reactionToProfileAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("reaction"),
        appAccount.toBuffer(),
        profileAccount2.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    const [reactionToPublicationAccount, reactionToPublicationAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("reaction"),
        appAccount.toBuffer(),
        publicationAccount.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    it("Create Reaction to Profile", async () => {

      const reactionTargetType: anchor.IdlTypes<JuCore>["ReactionTargetType"] = { profile: {} }
      let reactionType: anchor.IdlTypes<JuCore>["ReactionType"] = { upVote: {} }

      try {
        const tx = await program.methods.createReaction(reactionType)
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: profileAccount2,
            reaction: reactionToProfileAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.reaction.fetch(reactionToProfileAccount);
      console.log('Reaction data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.targetType.toString()).to.equal(reactionTargetType.toString(), '3');
      expect(data.target.toString()).to.equal(profileAccount2.toString(), '4');
      expect(data.reactionType.toString()).to.equal(reactionType.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });

    it("Create Reaction to Publication", async () => {

      const reactionTargetType: anchor.IdlTypes<JuCore>["ReactionTargetType"] = { publication: {} }
      let reactionType: anchor.IdlTypes<JuCore>["ReactionType"] = { upVote: {} }

      try {
        const tx = await program.methods.createReaction(reactionType)
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: publicationAccount,
            reaction: reactionToPublicationAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.reaction.fetch(reactionToPublicationAccount);
      // console.log('Reaction data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.targetType.toString()).to.equal(reactionTargetType.toString(), '3');
      expect(data.target.toString()).to.equal(publicationAccount.toString(), '4');
      expect(data.reactionType.toString()).to.equal(reactionType.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });


    it("Delete Reaction", async () => {

      try {
        const tx = await program.methods.deleteReaction()
          .accounts({
            app: appAccount,
            target: publicationAccount,
            initializer: profileAccount1,
            reaction: reactionToPublicationAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      try {
        await program.account.reaction.fetch(reactionToPublicationAccount);
      } catch (error: any) {
        expect(error).to.be.an("error");
        expect(error.toString()).to.contain(
          `Account does not exist or has no data ${reactionToPublicationAccount.toString()}`
        );
      }

    });

  });


  describe("Report", async () => {

    const [publicationReportAccount, publicationReportAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("report"),
        appAccount.toBuffer(),
        publicationAccount.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    const [profileReportAccount, profileReportAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("report"),
        appAccount.toBuffer(),
        profileAccount2.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    const [subspaceReportAccount, subspaceReportAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("report"),
        appAccount.toBuffer(),
        subspaceAccount.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    it("Initialize Report for Publication", async () => {

      const reportTargetType: anchor.IdlTypes<JuCore>["ReportTargetType"] = { publication: {} }
      const reportType: anchor.IdlTypes<JuCore>["ReportType"] = { scam: {} }
      const notificationString = 'Publication Report test';

      try {
        const tx = await program.methods.initializeReport(
          {
            reportType,
            notificationString
          }
        )
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: publicationAccount,
            report: publicationReportAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.report.fetch(publicationReportAccount);
      // console.log('Publication Report target pubkey: ', publicationAccount.toBase58());
      // console.log('Publication Report data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.targetType.toString()).to.equal(reportTargetType.toString(), '3');
      expect(data.target.toString()).to.equal(publicationAccount.toString(), '4');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '4');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '6');
      expect(data.authority.toString()).to.equal(user.toString(), '7');
    });

    it("Initialize Report for Profile", async () => {

      const reportTargetType: anchor.IdlTypes<JuCore>["ReportTargetType"] = { profile: {} }
      const reportType: anchor.IdlTypes<JuCore>["ReportType"] = { scam: {} }
      const notificationString = 'Profile Report test';

      try {
        const tx = await program.methods.initializeReport(
          {
            reportType,
            notificationString
          }
        )
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: profileAccount2,
            report: profileReportAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.report.fetch(profileReportAccount);
      // console.log('Profile Report target pubkey: ', profileAccount2.toBase58());
      // console.log('Profile Report data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.targetType.toString()).to.equal(reportTargetType.toString(), '3');
      expect(data.target.toString()).to.equal(profileAccount2.toString(), '4');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '5');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '6');
      expect(data.authority.toString()).to.equal(user.toString(), '7');
    });

    it("Initialize Report for Subspace", async () => {

      const reportTargetType: anchor.IdlTypes<JuCore>["ReportTargetType"] = { subspace: {} }

      const reportType: anchor.IdlTypes<JuCore>["ReportType"] = { scam: {} }

      const notificationString = 'Subspace Report test';

      try {
        const tx = await program.methods.initializeReport(
          {
            reportType,
            notificationString
          }
        )
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: subspaceAccount,
            report: subspaceReportAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.report.fetch(subspaceReportAccount);
      // console.log('Subspace Report target pubkey: ', subspaceAccount.toBase58());
      // console.log('Subspace Report data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.targetType.toString()).to.equal(reportTargetType.toString(), '3');
      expect(data.target.toString()).to.equal(subspaceAccount.toString(), '4');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '5');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '6');
      expect(data.authority.toString()).to.equal(user.toString(), '7');
    });

  });


});
