import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { JuCore } from "../target/types/ju_core";
import { expect } from "chai";
import * as uuid from 'uuid';
import { airdrop, birthDate } from "./utils.spec";


const provider = anchor.getProvider();

describe("ju-core", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const user = provider.publicKey;
  const { SystemProgram } = anchor.web3;

  const program = anchor.workspace.JuCore as Program<JuCore>;


  /* Processors Setup */
  // const testProcessor1 = anchor.web3.Keypair.generate();
  const testProcessor1 = new anchor.web3.PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS')
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
  const profileAlias2 = "julia";
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
  const isMirror = false;
  const isReply = false;
  const contentType = { article: {} };

  const [publicationAccount, publicationAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("publication"),
      appAccount.toBuffer(),
      Buffer.from(publicationId),
    ],
    program.programId
  );


  describe("External Processor", async () => {

    it("Add Processor", async () => {

      try {
        /* Call the addProcessor function via RPC */
        const tx = await program.methods.addProcessor(
          { referencing: {} },
          "proc1",
          testProcessor1,
          // testProcessor1.publicKey,
          null
        )
          .accounts(
            {
              processorPda: testProcessorPDA1,
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
      // console.log('Processor PDA account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

  });

  describe("App", async () => {

    it("Create new App", async () => {

      const appMetadataUri = null;

      /* Call the initializeApp function via RPC */
      let appData: anchor.IdlTypes<JuCore>["AppData"] = {
        metadataUri: appMetadataUri,
        profileNameRequired: true,
        profileSurnameRequired: true,
        profileBirthdateRequired: true,
        profileCountryRequired: false,
        profileCityRequired: false,
        profileMetadataUriRequired: true,

        subspaceNameRequired: true,
        subspaceMetadataUriRequired: true,

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
            registeringProcessorPda: null,
            connectingProcessorPda: null,
            publishingProcessorPda: null,
            collectingProcessorPda: null,
            referencingProcessorPda: testProcessorPDA1,
            // referencingProcessorPda: null,
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
      // console.log('App account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

    it("Update existing App", async () => {

      const newUri = "https://example.com/app-updated-uri";
      let appData2: anchor.IdlTypes<JuCore>["AppData"] = {
        metadataUri: newUri,
        profileNameRequired: true,
        profileSurnameRequired: true,
        profileBirthdateRequired: true,
        profileCountryRequired: false,
        profileCityRequired: false,
        profileMetadataUriRequired: true,

        subspaceNameRequired: true,
        subspaceMetadataUriRequired: true,

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
    const profile1Birthdate = birthDate(1972, 0, 24);
    const uri = "https://example.com/profile-1-uri";
    const profile1StatusText = 'Hey there!';


    const updatedProfile1Name = 'Bob';
    const updatedProfile1Surname = 'Jackson';
    const updatedProfile1Birthdate = birthDate(1984, 0, 26);


    const profile2Name = 'Alice';
    const profile2Surname = 'Smith';
    const profile2Birthdate = birthDate(1982, 11, 29);

    it("Creates Profile 1", async () => {

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias1,
          metadataUri: uri,
          statusText: profile1StatusText,
          name: profile1Name,
          surname: profile1Surname,
          birthDate: birthDate(1972, 0, 24),
          countryCode: null,
          cityCode: null,
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
      console.log('Profile 1 account: ', data);

      /* Fetch the Alias PDA account and check the value of Profile */
      const aliasPda = await program.account.alias.fetch(profileAliasAccount1);
      // console.log('Alias acoount: ', aliasPda);

      expect(data.metadataUri.toString()).to.equal(uri);
      expect(data.name.toString()).to.equal(profile1Name);
      expect(data.surname.toString()).to.equal(profile1Surname);
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
          name: profile1Name,
          surname: profile1Surname,
          birthDate: profile1Birthdate,
          countryCode: null,
          cityCode: null,
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

      expect(data.name.toString()).to.equal(profile1Name);
      expect(data.surname.toString()).to.equal(profile1Surname);
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
          statusText: null,
          name: updatedProfile1Name,
          surname: updatedProfile1Surname,
          birthDate: updatedProfile1Birthdate,
          countryCode: 7,
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

      expect(data.name.toString()).to.equal(updatedProfile1Name);
      expect(data.surname.toString()).to.equal(updatedProfile1Surname);
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
          statusText: null,
          name: 'Konrad',
          surname: 'Mikhelson',
          birthDate: birthDate(1984, 0, 26),
          countryCode: 7,
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
      // console.log('Updated Profile 1 account: ', data);

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
          name: profile2Name,
          surname: profile2Surname,
          birthDate: profile2Birthdate,
          countryCode: null,
          cityCode: null,
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

      expect(data.name.toString()).to.equal(profile2Name);
      expect(data.surname.toString()).to.equal(profile2Surname);
      expect(data.birthDate.toString()).to.equal(profile2Birthdate.toString());

      expect(data.statusText.toString()).to.equal(profile2StatusText);
      expect(data.alias).to.equal(profileAlias2);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });


  describe("Subspaces: ", async () => {

    const subspaceName = 'Nuclear Block'

    it("Create Subspace", async () => {
      
      const subspaceMetadataUri = "https://example.com/profile-1-uri";

      /* Call the createPublication function via RPC */
      let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
        alias: subspaceAlias,
        name: subspaceName,
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
      expect(data.metadataUri).to.equal(subspaceMetadataUri);
    });

    it("Update Subspace", async () => {

      const newUri = "https://example.com/subspace-1-updated-uri";

      try {
        /* Call ix via RPC */
        let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
          alias: subspaceAlias,
          name: subspaceName,
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
      expect(data.metadataUri).to.equal(newUri);
    });
  });


  describe("Connections", async () => {
    // Profile-to-Profile
    const [connectionAccount, connectionAccount1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("connection"),
        appAccount.toBuffer(),
        profileAccount2.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );
    // Profile-to-Subspace
    const [connectionAccount2, connectionAccount2Bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("connection"),
        appAccount.toBuffer(),
        profileAccount2.toBuffer(),
        subspaceAccount.toBuffer(),
      ],
      program.programId
    );

    it("Create Connection to Profile (Following)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount,
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
      const data = await program.account.connection.fetch(connectionAccount);
      // console.log('Connection (following) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(profileAccount1.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ profile: {} }));
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });


    it("Update Connection (Approve)", async () => {

      try {
        /* Call the updateConnection function via RPC */
        const tx = await program.methods.updateConnection(true)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount,
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
      const data = await program.account.connection.fetch(connectionAccount);
      // console.log('Updated Connection account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(profileAccount1.toString());
      expect(data.approved).to.equal(true);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });


    it("Create Connection to Subspace (Subscribing)", async () => {

      try {
        /* Call the createConnection function via RPC */
        const tx = await program.methods.initializeConnection(null)
          .accounts(
            {
              app: appAccount,
              connection: connectionAccount2,
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
      const data = await program.account.connection.fetch(connectionAccount2);
      // console.log('Connection (subscribing to Subspace) account: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(JSON.stringify(data.connectionTargetType)).to.equal(JSON.stringify({ subspace: {} }));
      expect(data.initializer.toString()).to.equal(profileAccount2.toString());
      expect(data.target.toString()).to.equal(subspaceAccount.toString());
      expect(data.approved).to.equal(false);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });


  describe("Publication", async () => {

    it("Create Publication", async () => {

      /* Call the createPublication function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        metadataUri: uri,
        isMirror: isMirror,
        isReply: isReply,
        contentType: contentType,
        tag: null
      };
      try {
        const tx = await program.methods.createPublication(publicationId, publicationInstructionData, null)
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: publicationAccount,
            subspace: null,
            targetPublication: program.programId,
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
      expect(data.isMirror).to.equal(isMirror);
      expect(data.isReply).to.equal(isReply);
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Update publication", async () => {

      // const updatePublicationId = uuid.v4().replace(/-/g, '');
      const newURI = "https://example.com/publication_updated1";
      const isMirror = false;
      const isReply = false;
      const contentType = { article: {} };
      const publicationTag = 'solana';

      /* Call the create function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        metadataUri: newURI,
        isMirror: isMirror,
        isReply: isReply,
        contentType: contentType,
        tag: publicationTag,
      };

      try {
        const tx = await program.methods.updatePublication(publicationInstructionData)
          .accounts({
            app: appAccount,
            profile: profileAccount1,
            publication: publicationAccount,
            // subspace: null,
            // targetPublication: null,
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
      expect(data.isMirror).to.equal(isMirror);
      expect(data.isReply).to.equal(isReply);
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(data.tag.toString()).to.equal(publicationTag.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });


    it("Create Mirror", async () => {

      const mirrorPublicationId = uuid.v4().replace(/-/g, '');

      const mirrorPublicationSeed = [
        Buffer.from("publication"),
        appAccount.toBuffer(),
        Buffer.from(mirrorPublicationId),
      ];

      const [mirrorPublicationAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
        mirrorPublicationSeed,
        program.programId
      );

      const mirrorURI = "https://example.com/publication-mirror-uri";
      const isMirror = true;
      const isReply = false;
      const contentType = { article: {} };

      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        metadataUri: mirrorURI,
        isMirror: isMirror,
        isReply: isReply,
        contentType: contentType,
        tag: null
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
            publication: mirrorPublicationAccount,
            subspace: null,
            targetPublication: publicationAccount,
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
      const data = await program.account.publication.fetch(mirrorPublicationAccount);
      // console.log('Publication Mirror account data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.profile.toString()).to.equal(profileAccount1.toString());
      expect(data.uuid.toString()).to.equal(mirrorPublicationId.toString());
      expect(data.metadataUri.toString()).to.equal(mirrorURI.toString());
      expect(data.isMirror).to.equal(isMirror);
      expect(data.isReply).to.equal(isReply);
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });

    it("Create Publication into Subspace", async () => {

      const subspacePublicationId = uuid.v4().replace(/-/g, '');

      const uri = "https://example.com/publication-to-subspace";
      const isMirror = false;
      const isReply = false;
      const contentType = { video: {} };
      const publicationTag = 'subspacepub';

      const subspacePublicationSeed = [
        Buffer.from("publication"),
        appAccount.toBuffer(),
        Buffer.from(subspacePublicationId),
      ];
      const [subspacePublicationAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
        subspacePublicationSeed,
        program.programId
      );

      /* Call the create function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
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
      const data = await program.account.publication.fetch(subspacePublicationAccount);
      // console.log('Publication data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.profile.toString()).to.equal(profileAccount1.toString());
      expect(data.uuid.toString()).to.equal(subspacePublicationId.toString());
      expect(data.metadataUri.toString()).to.equal(uri.toString());
      expect(data.isMirror).to.equal(isMirror);
      expect(data.isReply).to.equal(isReply);
      expect(data.contentType.toString()).to.equal(contentType.toString());
      expect(data.subspace.toString()).to.equal(subspaceAccount.toString());
      expect(data.authority.toString()).to.equal(user.toString());
    });

  });


  describe("Reaction", async () => {

    const [reactionAccount, reactionAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("reaction"),
        appAccount.toBuffer(),
        publicationAccount.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    it("Create Reaction", async () => {

      let reactionType: anchor.IdlTypes<JuCore>["ReactionType"] = { upVote: {} }

      try {
        const tx = await program.methods.createReaction(reactionType)
          .accounts({
            app: appAccount,
            initializer: profileAccount1,
            target: publicationAccount,
            reaction: reactionAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.reaction.fetch(reactionAccount);
      // console.log('Reaction data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.target.toString()).to.equal(publicationAccount.toString(), '3');
      expect(data.reactionType.toString()).to.equal(reactionType.toString(), '4');
      expect(data.authority.toString()).to.equal(user.toString(), '5');
    });


    it("Delete Reaction", async () => {

      try {
        const tx = await program.methods.deleteReaction()
          .accounts({
            app: appAccount,
            target: publicationAccount,
            initializer: profileAccount1,
            reaction: reactionAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }

      try {
        await program.account.reaction.fetch(reactionAccount);
      } catch (error: any) {
        expect(error).to.be.an("error");
        expect(error.toString()).to.contain(
          `Account does not exist or has no data ${reactionAccount.toString()}`
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
      expect(data.target.toString()).to.equal(publicationAccount.toString(), '3');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '4');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });

    it("Initialize Report for Profile", async () => {

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
      expect(data.target.toString()).to.equal(profileAccount2.toString(), '3');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '4');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });

    it("Initialize Report for Subspace", async () => {

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
      expect(data.target.toString()).to.equal(subspaceAccount.toString(), '3');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '4');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });

  });


});
