import { SocketClient } from "napl";
import { useEffect, useState } from "react";

interface SocketClientProps {
  room?: string;
  host: string;
}

interface Props {
  socketClient: SocketClient;
}

export function useSocketClient(props: Props | SocketClientProps) {
  const socketClient = "socketClient" in props ? props.socketClient : new SocketClient(props.host, props.room);
  function useData<T>(path: string): [T | null, (value: T | ((prev: T | null) => T)) => void] {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      const observer = socketClient.observe(path).onChange((value) => {
        setData(value.value);
      });
      return () => {
        observer.close();
      };
    }, [path]);

    return [
      data,
      (value: T | ((prev: T | null) => T)) => {
        socketClient.setData(path, value);
      },
    ];
  }

  return {
    useData,
  };
}
