import { SocketClient } from "napl";
import { useState } from "react";

export function useSocketClient(client: SocketClient) {
  function useData<T>(path: string): [T | null, (value: T | ((prev: T | null) => T)) => void] {
    const [data, setData] = useState<T | null>(null);

    client.observe(path).onChange((value) => {
      setData(value.value);
    });

    return [
      data,
      (value: T | ((prev: T | null) => T)) => {
        if (typeof value === "function") {
          const updater = value as (prev: T | null) => T;
          const val = updater(client.getData(path) ?? null);
          client.setData(path, val);
        } else {
          client.setData(path, value);
        }
      },
    ];
  }

  return {
    useData,
  };
}
