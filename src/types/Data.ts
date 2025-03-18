import { Update } from "@/types/Update";

// ~{}  data evaluation, evaluated on the fly
// ~<>  coded variable. Causes data binding to the variable
export interface Data {
  frame?: number;
  type?: string;
  updates?: Update[];
  [key: string]: any;
}
