import { RegistryConfig } from "./RegistryConfig";

export interface Code {
  type?: string;
  registry?: RegistryConfig[];
  [key: string]: any;
}
