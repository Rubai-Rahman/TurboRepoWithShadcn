import { IconType } from "react-icons";

export interface Icon {
  name: IconType;
  className?: string;
  size?:
    | "text-xs"
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl";
  onClick?: () => void;
}
