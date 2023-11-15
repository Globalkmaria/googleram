import { MouseEvent } from "react";
import { IconType } from "react-icons";

type Props = {
  OnIcon: IconType;
  OffIcon: IconType;
  on: boolean;
  toggle: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function ToggleButton({ OnIcon, OffIcon, on, toggle }: Props) {
  return (
    <button type={"button"} onClick={toggle}>
      {on ? <OnIcon /> : <OffIcon />}
    </button>
  );
}
