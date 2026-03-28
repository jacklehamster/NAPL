export const LoggerComponent = ({ info }: { info: any | any[] }) => {
  const infoToLog = Array.isArray(info) ? info : [info];
  console.log(...infoToLog);
};
