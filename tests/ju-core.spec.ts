import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { JuCore } from "../target/types/ju_core";
import { expect } from "chai";
import * as uuid from 'uuid';
import { airdrop } from "./utils.spec";


const provider = anchor.getProvider();

describe("ju-core", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const user = provider.publicKey;
  const { SystemProgram } = anchor.web3;

  const program = anchor.workspace.JuCore as Program<JuCore>;


  /* Processors Setup */
  const testProcessor1 = anchor.web3.Keypair.generate();
  const [testProcessorPDA1, testProcessorPDA1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("processor"),
      testProcessor1.publicKey.toBuffer()
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
          testProcessor1.publicKey,
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

      /* Call the initializeApp function via RPC */
      let appData: anchor.IdlTypes<JuCore>["AppData"] = {
        metadataUri: "https://example.com/app-uri",
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
        // metadataUri: 'x'.repeat(101)
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
      // console.log('App 2 account: ', data);

      expect(data.metadataUri).to.equal(newUri);

      // } catch (err) {
      //   const e = err as anchor.AnchorError;
      //   // assert.strictEqual(e.error.errorCode.code, "InstallOwnerMismatch");
      //   expect(e.error.errorCode.code).to.equal("ProcessorTypeMismatch");
      // }

    });

  });

  describe("Profile", async () => {

    const uri = "https://example.com/profile-1-uri";

    it("Creates Profile 1", async () => {

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias1,
          metadataUri: uri,
          connectingProcessorToAssign: null
        };
        const tx = await program.methods.createProfile(profileInstructionData1, null)
          .accounts(
            {
              app: appAccount,
              profile: profileAccount1,
              aliasPda: profileAliasAccount1,
              connectingProcessorPda: null,
              registeringProcessor: testProcessor1.publicKey,
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
      // console.log('Alias acoount: ', aliasPda);

      expect(data.metadataUri.toString()).to.equal(uri);
      expect(data.alias.toString()).to.equal(profileAlias1);
      expect(aliasPda.owner.toString()).to.equal(profileAccount1.toString());
    });

    // Update Profile
    it("Update Profile 1", async () => {

      const updatedUri = "https://example.com/profile-1-updated-uri"

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias1,
          metadataUri: updatedUri,
          connectingProcessorToAssign: null
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
      expect(data.alias).to.equal(profileAlias1);
      expect(data.authority.toString()).to.equal(user.toString());

      expect(aliasPda.app.toString()).to.equal(appAccount.toString());
      expect(JSON.stringify(aliasPda.aliasType)).to.equal(JSON.stringify({ profile: {} }));
      expect(aliasPda.owner.toString()).to.equal(profileAccount1.toString());
    });


    // Update Profile 1 Alias
    it("Update Profile 1 Alias", async () => {

      const updatedUri = "https://example.com/profile-updated-uri"

      // console.log("profileAccount1 :>>", profileAccount1.toBase58());
      // console.log('profileAliasAccount1 :>> ', profileAliasAccount1.toBase58());
      // console.log('updatedProfileAliasAccount1 :>> ', updatedProfileAliasAccount1.toBase58());

      try {
        /* Call the createProfile function via RPC */
        let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: updatedProfileAlias1,
          metadataUri: updatedUri,
          connectingProcessorToAssign: null
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
      // console.log('Profile 1 account: ', data);

      /* Fetch the Alias PDA account and check the value of Profile */
      const newAliasPda = await program.account.alias.fetch(updatedProfileAliasAccount1);
      // console.log('New Alias account: ', newAliasPda);

      expect(data.app.toString()).to.equal(appAccount.toString());
      expect(data.metadataUri).to.equal(updatedUri);
      expect(data.alias).to.equal(updatedProfileAlias1);
      expect(data.authority.toString()).to.equal(user.toString());

      expect(newAliasPda.app.toString()).to.equal(appAccount.toString());
      expect(newAliasPda.owner.toString()).to.equal(profileAccount1.toString());
      expect(newAliasPda.authority.toString()).to.equal(user.toString());
      expect(newAliasPda.value.toString()).to.equal(updatedProfileAlias1.toString());
    });


    it("Creates Profile 2", async () => {

      await airdrop(user2.publicKey);

      const profile2MetadataUri = "https://example.com/profile-2"

      try {
        /* Call the create function via RPC */
        let profileInstructionData2: anchor.IdlTypes<JuCore>["ProfileData"] = {
          alias: profileAlias2,
          metadataUri: profile2MetadataUri,
          connectingProcessorToAssign: null
        };
        const tx = await program.methods.createProfile(profileInstructionData2, null)
          .accounts({
            app: appAccount,
            profile: profileAccount2,
            aliasPda: profileAliasAccount2,
            connectingProcessorPda: null,
            registeringProcessor: testProcessor1.publicKey,
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
      expect(data.alias).to.equal(profileAlias2);
      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });


  describe("Subspaces: ", async () => {

    it("Create Subspace", async () => {

      const subspaceMetadataUri = "https://example.com/subspace-1-uri"

      /* Call the createPublication function via RPC */
      let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
        alias: subspaceAlias,
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
              connectingProcessor: null,
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
              connectingProcessor: null,
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
            publishingProcessor: null,
            referencingProcessor: null,
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
            // publishingProcessor: null,
            // referencingProcessor: null,
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

      const mirrorURI = "https://example.com/publicationUpdatedMirror";
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
            publishingProcessor: null,
            referencingProcessor: null,
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

    const [reportAccount, reportAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("report"),
        appAccount.toBuffer(),
        publicationAccount.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    it("Initialize Report", async () => {

      const reportType: anchor.IdlTypes<JuCore>["ReportType"] = { scam: {} }
      const notificationString = 'Report test notification';

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
            report: reportAccount,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        // console.log("Tx signature: ", tx);
      } catch (error: any) {
        console.log('error :>> ', error);
      }
      /* Fetch the account and check the values */
      const data = await program.account.report.fetch(reportAccount);
      // console.log('Reaction data: ', data);

      expect(data.app.toString()).to.equal(appAccount.toString(), '1');
      expect(data.initializer.toString()).to.equal(profileAccount1.toString(), '2');
      expect(data.target.toString()).to.equal(publicationAccount.toString(), '3');
      expect(data.reportType.toString()).to.equal(reportType.toString(), '4');
      expect(data.notification.toString()).to.equal(notificationString.toString(), '5');
      expect(data.authority.toString()).to.equal(user.toString(), '6');
    });

  });


});
