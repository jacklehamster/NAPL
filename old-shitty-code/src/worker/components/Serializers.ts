import { hookSerializers } from "../../app/utils/serializers";

export function Serializers() {
  const { messageToBytes, bytesToMessage, serialize, deserialize } =
    hookSerializers();
  return {
    messageToBytes,
    bytesToMessage,
    serialize,
    deserialize,
  };
}
