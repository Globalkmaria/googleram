import { ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: ReactNode;
};

export default function SwrContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
