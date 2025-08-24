import React from "react";
import { Container, Title, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container style={{ textAlign: "center", marginTop: 80 }}>
      <Title order={1} color="red">
        404
      </Title>
      <Title order={2} mb={20}>
        Page Not Found
      </Title>
      <Text mb={30} color="dimmed">
        Sorry, the page you are looking for does not exist.
      </Text>
      <Button component={Link} to="/" color="blue" radius="md">
        Go Home
      </Button>
    </Container>
  );
}

export default NotFound;
