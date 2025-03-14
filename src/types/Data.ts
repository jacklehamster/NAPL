import { Update } from "@/types/Update";

// ~{}  data evaluation, evaluated on the fly
// ~<>  coded variable. Causes data binding to the variable
export interface Data {
  type?: string;
  updates?: Update[];
  blobs?: Record<string, Blob>;
  [key: string]: any;
}
