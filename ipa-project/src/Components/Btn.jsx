import { Button } from "@mantine/core";

export default function Btn(props) {
  return (
    <Button
      variant="filled"
      size={props.size || "compact-xl"}
      onClick={props.onClick}
    >
      {props.name}
    </Button>
  );
}
