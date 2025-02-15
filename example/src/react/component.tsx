import { SocketClient } from "napl";
import { useSocketClient } from "./socket-client";
import ReactDOM from 'react-dom/client';

interface Props {
  socketClient: SocketClient;
}

export function SharedText({ socketClient }: Props) {
  const { useData } = useSocketClient({ socketClient });
  const [data, setData] = useData<string>("data");
  return <textarea style={{
    width: "100%",
    height: "500px",
  }} title="shared-text" value={data ?? ""} onChange={e => {
    setData(e.target.value);
  }} />;
}

export function hookupDiv(div: HTMLElement, socketClient: SocketClient) {
  const root = ReactDOM.createRoot(div);
  root.render(<SharedText socketClient={socketClient} />);
}
