import { Data } from "@/napl";

export function ActComponent({
  action,
  param,
  onReturn,
}: {
  action: (
    param: Data,
    onReturn?: (returnValue?: Data) => void,
  ) => Promise<Data | undefined>;
  param: Data;
  onReturn?: (returnValue?: Data) => void;
}) {
  action(param, onReturn);
}
