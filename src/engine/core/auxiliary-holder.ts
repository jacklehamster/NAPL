import AuxiliaryDefinition from "./auxiliary-definition";

export type AuxiliaryConfig = any;

export default interface AuxiliaryHolder {
  [key: '^[A-Z]\w*$' | string]: AuxiliaryConfig;
  aux?: Record<'^[A-Z]\w*$' | string, AuxiliaryConfig>;
}