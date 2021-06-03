import React from "react";
import type Transport from "@ledgerhq/hw-transport";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import TransportBlu from "@ledgerhq/hw-transport-web-ble";

import { TransportComponent } from "./TransportComponent";

const TransportsMap: Record<string, new (...args: any[]) => Transport> = {
  U2F: TransportU2F,
  WebUSB: TransportWebUSB,
  WebHID: TransportWebHID,
  Bluetooth: TransportBlu,
};

export const Transports = (): JSX.Element => {
  return (
    <>
      {Object.entries(TransportsMap).map(([label, TransportClass]) => (
        <TransportComponent
          key={label}
          label={label}
          TransportClass={TransportClass as typeof Transport}
        />
      ))}
    </>
  );
};
