import { IProgram, Program } from "@/core/Program";
import { Data } from "@/types/Data";
import { enterWorld } from "@dobuki/hello-worker";

interface Props {
  appId: string;
  onDataCycle?: () => void;
  onUsersJoined?: (user: string, users: string[]) => void;
  onUsersLeft?: (user: string, users: string[]) => void;
  workerUrl?: URL;
}

export function createApp<T extends Data = Data>({
  appId,
  onDataCycle,
  onUsersJoined,
  onUsersLeft,
  workerUrl,
}: Props) {
  const { userId, send, enterRoom, addMessageListener, addUserListener, end } =
    enterWorld({ appId, workerUrl });

  const program: IProgram<T> = new Program<T>({
    userId,
    onDataCycle,
    comm: {
      onMessage: addMessageListener,
      onNewClient: (listener: (user: string) => void) => {
        const removeListener = addUserListener((user, action, users) => {
          if (action === "join") {
            listener(user);
            onUsersJoined?.(user, users);
          } else if (action === "leave") {
            program.setData(`users/${user}`, undefined);
            onUsersLeft?.(user, users);
          }
        });
        return () => {
          removeListener();
        };
      },
      send,
      close: end,
    },
  });

  return { userId, enterRoom, program };
}
