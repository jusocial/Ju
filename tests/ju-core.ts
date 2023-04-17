import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { JuCore } from "../target/types/ju_core";
import { expect } from "chai";
import * as uuid from 'uuid';
import { airdrop } from "./utils";


const provider = anchor.getProvider();

describe("ju-core", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const user = provider.publicKey;
  const { SystemProgram } = anchor.web3;

  const program = anchor.workspace.JuCore as Program<JuCore>;

  const testProcessor1 = anchor.web3.Keypair.generate();
  const [testProcessorPDA1, testProcessorPDA1Bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("processor"),
      testProcessor1.publicKey.toBuffer()
    ],
    program.programId
  );

  const appName = "jutube";

  const appSeed = [Buffer.from("app"), Buffer.from(appName)];
  const [appAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
    appSeed,
    program.programId
  );


  const [profileAccount1, profileAccountBump1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("profile"),
      appAccount.toBuffer(),
      user.toBuffer(),
    ],
    program.programId
  );
  const profileAlias1 = "igor";
  const [profileHadleAccount1, profileAliasAccountBump1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("alias"),
      appAccount.toBuffer(),
      Buffer.from(profileAlias1),
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

  describe("External Processor", async () => {

    it("Add Processor", async () => {

      /* Call the addProcessor function via RPC */
      const tx = await program.methods.addProcessor({ referencing: {} }, "proc1", testProcessor1.publicKey, null)
        .accounts(
          {
            processorPda: testProcessorPDA1,
            authority: user,
            systemProgram: SystemProgram.programId,
          }
        )
        .rpc();

      console.log("Tx signature: ", tx);

      /* Fetch the Processor PDA account and check the value  */
      const data = await program.account.externalProcessorPda.fetch(testProcessorPDA1);
      console.log('Processor PDA account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

  });

  describe("App", async () => {

    it("Create new App", async () => {

      /* Call the initializeApp function via RPC */
      let appInstructionData: anchor.IdlTypes<JuCore>["AppData"] = {
        appName: appName,
        metadataUri: "https://arweave.net/xxx",
      };

      const tx = await program.methods.initializeApp(appInstructionData)
        .accounts({
          app: appAccount,
          registeringProcessorPda: null,
          connectingProcessorPda: null,
          publishingProcessorPda: null,
          collectingProcessorPda: null,
          referencingProcessorPda: testProcessorPDA1,
          authority: user,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Tx signature: ", tx);

      /* Fetch the App PDA and check the value  */
      const data = await program.account.app.fetch(appAccount);
      console.log('App account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

    it("Update existing App", async () => {

      /* Call the initializeApp function via RPC */
      const app2 = "juconnect";
      let appInstructionData: anchor.IdlTypes<JuCore>["AppData"] = {
        appName: appName,
        metadataUri: "https://arweave.net/zzz",
      };

      // try {
        const tx = await program.methods.initializeApp(appInstructionData)
          .accounts({
            app: appAccount,
            registeringProcessorPda: null,
            connectingProcessorPda: null,
            publishingProcessorPda: null,
            collectingProcessorPda: testProcessorPDA1,  // Must be Error here
            referencingProcessorPda: null,
            authority: user,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        console.log("Tx signature: ", tx);

        /* Fetch the App PDA and check the value  */
        const data = await program.account.app.fetch(appAccount);
        console.log('App 2 account: ', data);

      // } catch (err) {
      //   const e = err as anchor.AnchorError;
      //   // assert.strictEqual(e.error.errorCode.code, "InstallOwnerMismatch");
      //   expect(e.error.errorCode.code).to.equal("ProcessorTypeMismatch");
      // }

    });

  });

  describe("Profile", async () => {

    it("Creates Profile 1", async () => {
      /* Call the createProfile function via RPC */
      let profileInstructionData1: anchor.IdlTypes<JuCore>["ProfileData"] = {
        alias: profileAlias1,
        metadataUri: "https://arweave.net/profile1",
        connectingProcessorToAssign: null
      };
      const tx = await program.methods.createProfile(profileInstructionData1, null)
        .accounts(
          {
            app: appAccount,
            profile: profileAccount1,
            aliasPda: profileHadleAccount1,
            connectingProcessorPda: null,
            registeringProcessor: testProcessor1.publicKey,
            authority: user,
            systemProgram: SystemProgram.programId,
          }
        )
        .rpc();

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.profile.fetch(profileAccount1);
      console.log('Profile 1 account: ', data);

      expect(data.authority.toString()).to.equal(user.toString());
    });

    it("Creates Profile 2", async () => {

      await airdrop(user2.publicKey);

      /* Call the create function via RPC */
      let profileInstructionData2: anchor.IdlTypes<JuCore>["ProfileData"] = {
        alias: profileAlias2,
        metadataUri: "https://arweave.net/profile2",
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

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.profile.fetch(profileAccount2);
      console.log('Profile 2 account: ', data);

      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

  });



  describe("Connections", async () => {
    const [connectionAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("connection"),
        appAccount.toBuffer(),
        profileAccount2.toBuffer(),
        profileAccount1.toBuffer(),
      ],
      program.programId
    );

    it("Create Connection (Following)", async () => {

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

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.connection.fetch(connectionAccount);
      console.log('Connection account: ', data);

      expect(data.authority.toString()).to.equal(user2.publicKey.toString());
    });

    it("Update Connection (Approve)", async () => {

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

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.connection.fetch(connectionAccount);
      console.log('Updated Connection account: ', data);

      expect(data.approved).to.equal(true);
    });

  });

  describe("Publication", async () => {

    const publicationId = uuid.v4().replace(/-/g, '');
    console.log("UUID: ", publicationId, "  len: ", publicationId.length);
    const [publicationAccount, publicationAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("publication"),
        appAccount.toBuffer(),
        Buffer.from(publicationId),
      ],
      program.programId
    );

    it("Create Publication", async () => {

      /* Call the createPublication function via RPC */
      let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
        uuid: publicationId,
        metadataUri: "https://arweave.net/pub1",
        isMirror: false,
        isReply: false,
        contentType: { article: {} },
      };
      const tx = await program.methods.createPublication(publicationInstructionData, null)
        .accounts({
          app: appAccount,
          profile: profileAccount1,
          publication: publicationAccount,
          subspace: null,
          targetPublication: null,
          collectingProcessorPda: null,
          referencingProcessorPda: null,
          publishingProcessor: null,
          referencingProcessor: null,
          authority: user,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.publication.fetch(publicationAccount);
      console.log('Publication data: ', data);

      expect(data.uuid.toString()).to.equal(publicationId.toString());
    });

    //   it("Update publication", async () => {

    //     // const updatePublicationId = uuid.v4().replace(/-/g, '');
    //     const newURI = "https://arweave.net/publication_updated1";
    //     /* Call the create function via RPC */
    //     let publicationInstructionData: anchor.IdlTypes<JuCore>["PublicationData"] = {
    //       uuid: publicationId,
    //       metadataUri: newURI,
    //       isMirror: false,
    //       isReply: false,
    //       contentType: { article: {} },
    //     };
    //     const tx = await program.methods.updatePublication(publicationInstructionData)
    //       .accounts({
    //         app: appAccount,
    //         profile: profileAccount1,
    //         publication: publicationAccount,
    //         // subspace: null,
    //         // targetPublication: null,
    //         collectingProcessorPda: null,
    //         referencingProcessorPda: null,
    //         // publishingProcessor: null,
    //         // referencingProcessor: null,
    //         authority: user,
    //         systemProgram: SystemProgram.programId,
    //       })
    //       .rpc();

    //     console.log("Tx signature: ", tx);

    //     /* Fetch the account and check the value of count */
    //     const data = await program.account.publication.fetch(publicationAccount);
    //     console.log('Updated Publication data: ', data);

    //     expect(data.metadataUri.toString()).to.equal(newURI);
    //   });


    // it("Create Mirror", async () => {

    //   const mirrorPublicationId = uuid.v4().replace(/-/g, '');

    //   const mirrorPublicationSeed = [
    //     Buffer.from("publication"),
    //     appAccount.toBuffer(),
    //     Buffer.from(mirrorPublicationId),
    //   ];
    //   const [mirrorPublicationAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
    //     mirrorPublicationSeed,
    //     program.programId
    //   );

    //   /* Call the create function via RPC */
    //   const tx = await program.methods.createPublication(mirrorPublicationId, "https://mirror-publication.test", true, false)
    //     .accounts({
    //       app: appAccount,
    //       profile: profileAccount,
    //       publication: mirrorPublicationAccount,
    //       targetPublication: publicationAccount,
    //       authority: user,
    //       systemProgram: SystemProgram.programId,
    //     })
    //     .rpc();

    //   console.log("Tx signature: ", tx);

    //   /* Fetch the account and check the value of count */
    //   const data = await program.account.publication.fetch(mirrorPublicationAccount);
    //   console.log('Publication Mirror account data: ', data);

    //   expect(data.authority.toString()).to.equal(user.toString());
    // });

  });

  describe("Subspace", async () => {

    const subspaceUuid = uuid.v4().replace(/-/g, '');
    console.log("Subspace UUID: ", subspaceUuid, "  len: ", subspaceUuid.length);
    const [subspaceAccount, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("subspace"),
        appAccount.toBuffer(),
        profileAccount1.toBuffer(),
        Buffer.from(subspaceUuid),
      ],
      program.programId
    );

    const subspaceAlias = "nuclear";
    const [subspaceHadleAccount, subspaceHadleAccountBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("alias"),
        appAccount.toBuffer(),
        Buffer.from(subspaceAlias),
      ],
      program.programId
    );

    it("Create Subspace", async () => {

      /* Call the createPublication function via RPC */
      let subspaceInstructionData: anchor.IdlTypes<JuCore>["SubspaceData"] = {
        uuid: subspaceUuid,
        alias: subspaceAlias,
        creator: profileAccount1,
        metadataUri: "https://arweave.net/subspace1"
      };
      const tx = await program.methods.createSubspace(subspaceInstructionData)
        .accounts({
          app: appAccount,
          creatorProfile: profileAccount1,
          subspace: subspaceAccount,
          aliasPda: subspaceHadleAccount,
          collectingProcessorPda: null,
          referencingProcessorPda: null,
          publishingProcessorPda: null,
          connectingProcessorPda: null,
          authority: user,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Tx signature: ", tx);

      /* Fetch the account and check the value of count */
      const data = await program.account.subspace.fetch(subspaceAccount);
      console.log('Subspace data: ', data);

      expect(data.uuid.toString()).to.equal(subspaceUuid.toString());
    });
  });
});
