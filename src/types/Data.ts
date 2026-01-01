// ~{}  data evaluation, evaluated on the fly
// ~<>  coded variable. Causes data binding to the variable

export type Data =
  | null
  | boolean
  | number
  | string
  | ArrayBuffer
  | Data[]
  | { [k: string]: Data };
