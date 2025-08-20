import { Button } from "@mantine/core";

export default function LoadingBtn() {
  return (
    <Button loading loaderProps={{ type: "dots" }}>
      Loading button
    </Button>
  );
}
