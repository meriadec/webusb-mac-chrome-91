import type Transport from "@ledgerhq/hw-transport";
import React, { useEffect, useState } from "react";
import { useLedger } from "./hooks";

interface TrasnportIsSupportedProps {
  checkSupport(): Promise<boolean>;
}

const TrasnportIsSupported = ({
  checkSupport,
}: TrasnportIsSupportedProps): JSX.Element => {
  const [isSupported, setIsSupported] = useState<boolean | "?">("?");
  const [supportedError, setSupportedError] = useState<null | Error>(null);

  useEffect(
    function checkTransportSupport() {
      checkSupport().then(setIsSupported, setSupportedError);
    },
    [checkSupport]
  );

  return (
    <>
      <p>IS SUPPORTED {String(isSupported)}</p>
      {supportedError && <pre>Supported Error: {supportedError.message}</pre>}
    </>
  );
};

interface TransportGetAccountProps {
  getAccount(): Promise<string>;
}

const TransportGetAccount = ({
  getAccount,
}: TransportGetAccountProps): JSX.Element => {
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState<null | Error>(null);

  const onGetAccount = async () => {
    try {
      setAccountError(null);
      setAccount("");

      const account = await getAccount();
      setAccount(account);
    } catch (error) {
      console.error("Error getting account:", error);
      setAccountError(error);
    }
  };
  return (
    <>
      <button onClick={onGetAccount}>Get Account</button>
      <p>Account: {account}</p>
      {accountError && <pre>Account Error: {accountError.message}</pre>}
    </>
  );
};

interface TransportComponentProps {
  TransportClass: typeof Transport;
  label: string;
}

export const TransportComponent = ({
  TransportClass,
  label,
}: TransportComponentProps): JSX.Element => {
  const { checkSupport, getAccount } = useLedger(TransportClass);

  return (
    <div className="transport-component">
      <h3>{label} Transport</h3>
      <TrasnportIsSupported checkSupport={checkSupport} />
      <TransportGetAccount getAccount={getAccount} />
    </div>
  );
};
