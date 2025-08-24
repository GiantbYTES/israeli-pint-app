import {
  Alert,
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";

function Login() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const { onLogin } = useAuth();

  async function handleLogin() {
    setLoginError(false);
    const validation = form.validate();
    if (validation.hasErrors) {
      console.log(validation);
    } else {
      setLoading(true);
      const error = await onLogin(form.values.email, form.values.password);
      if (error) {
        setLoading(false);
        setLoginError(true);
      }
    }
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className="title">
        Login
      </Title>

      <Text className="subtitle">
        Do not have an account yet?{" "}
        <Anchor href="/register">Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        {loginError && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Login Failed"
            color="red"
            variant="light"
          >
            {loginError.message}
          </Alert>
        )}

        <TextInput
          label="Email"
          placeholder="example@email.com"
          required
          radius="md"
          value={form.values.email}
          onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="•••••••••••••"
          required
          mt="md"
          radius="md"
          value={form.values.password}
          onChange={(e) =>
            form.setFieldValue("password", e.currentTarget.value)
          }
          error={form.errors.password}
        />
        <Button
          fullWidth
          mt="xl"
          radius="md"
          component={Link}
          loading={loading}
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Anchor
          component={Link}
          to="/"
          style={{ display: "block", textAlign: "center", marginTop: 16 }}
        >
          Home
        </Anchor>
      </Paper>
    </Container>
  );
}

export default Login;
