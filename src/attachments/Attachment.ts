import { Context } from "@/context/Context";
import { Program } from "@/core/Program";

export interface Attachment {
  onAttach?(program: Program): () => void;
  refresh?(context: Context): void;
}
