import Transport from "@ledgerhq/hw-transport";
import Eth from "@ledgerhq/hw-app-eth";
import { useCallback } from "react";

function useIsTransportSupported(
  TransportClass: typeof Transport
): () => Promise<boolean> {
  return useCallback(
    function checkSupport() {
      return TransportClass.isSupported();
    },
    [TransportClass]
  );
}

function useGetLedgerAccount(
  TransportClass: typeof Transport
): () => Promise<string> {
  return useCallback(
    async function getAccount() {
      const transport = await TransportClass.create();

      try {
        const eth = new Eth(transport);
        const { address } = await eth.getAddress("44'/60'/0'/0/0");
        return address;
      } finally {
        transport.close();
      }
    },
    [TransportClass]
  );
}

interface UseLedgerResult {
  checkSupport(): Promise<boolean>;
  getAccount(): Promise<string>;
}
export function useLedger(TransportClass: typeof Transport): UseLedgerResult {
  const checkSupport = useIsTransportSupported(TransportClass);
  const getAccount = useGetLedgerAccount(TransportClass);

  return {
    checkSupport,
    getAccount
  };
}
