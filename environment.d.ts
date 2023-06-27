declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RPC_URL: string;
      REST_URL: string;
      FAUCET_URL: string;
      CHAIN_ID: string;
      MNEMONIC_TEST_ALICE: string;
      ADDRESS_TEST_ALICE: string;
      MNEMONIC_TEST_BOB: string;
      ADDRESS_TEST_BOB: string;
    }
  }
}

export {};
