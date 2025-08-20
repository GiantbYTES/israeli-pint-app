import { useState } from "react";
import { TextInput, PasswordInput, Button, Group, Stack } from "@mantine/core";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Sign In</h2>
      <Stack>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Group grow mt="md">
          <Button variant="filled" color="blue">
            Sign In
          </Button>
          <Button variant="outline" color="blue">
            Register
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
