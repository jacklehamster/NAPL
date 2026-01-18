import { CommInterface } from "@/clients/CommInterface";
import { IProgram, Program } from "@/core/Program";
import { enterWorld } from "@dobuki/hello-worker";

interface Props {
  appId: string;
  onDataCycle?: () => void;
  onUsersJoined?: (user: string, users: string[]) => void;
  onUsersLeft?: (user: string, users: string[]) => void;
  workerUrl?: URL;
  onReceivedIncomingUpdates?(): void;
}

export function createApp({
  appId,
  onDataCycle,
  onUsersJoined,
  onUsersLeft,
  onReceivedIncomingUpdates,
  workerUrl,
}: Props) {
  const { userId, send, enterRoom, addMessageListener, addUserListener, end } =
    enterWorld<Uint8Array>({ worldId: appId, workerUrl });

  function setData(path: string, data: any) {
    program.setData(path, data);
  }

  const comm: CommInterface = {
    onMessage: addMessageListener,
    onNewClient: (listener: (user: string) => void) => {
      const removeListener = addUserListener((user, action, users) => {
        if (action === "join") {
          listener(user);
          onUsersJoined?.(user, users);
        } else if (action === "leave") {
          setData(`users/${user}`, undefined);
          onUsersLeft?.(user, users);
        }
      });
      return () => {
        removeListener();
      };
    },
    send,
    close: end,
  };

  const program: IProgram = new Program({
    appId,
    userId,
    onDataCycle,
    comm,
    onReceivedIncomingUpdates,
  });

  return { userId, enterRoom, program };
}
