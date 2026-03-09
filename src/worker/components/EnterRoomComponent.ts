export function EnterRoomComponent({
  room: { host, room },
  enterRoom,
  exitRoom,
}: {
  room: {
    host: string;
    room: string;
  };
  enterRoom(arg: { host: string; room: string }): void;
  exitRoom(arg: { host: string; room: string }): void;
}) {
  return {
    execute() {
      enterRoom({ host, room });
    },
    stop: () => {
      exitRoom({ host, room });
    },
  };
}
