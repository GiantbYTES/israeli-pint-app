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
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { supabase } from "../data/supabase";
import "./Login.css";

function Register() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleRegister() {
    setRegisterError(null);
    setRegisterSuccess(false);
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }
    setLoading(true);
    const { email, password } = form.values;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      setRegisterError(error.message || "Registration failed");
      return;
    }

    if (data?.user) {
      const { error: businessError } = await supabase
        .from("Businesses")
        .insert([
          {
            user_id: data.user.id,
            store_name: "",
            location: "",
          },
        ]);
      if (businessError) {
        setRegisterError(
          "User created, but failed to create business: " +
            businessError.message
        );
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setRegisterSuccess(true);
    form.reset();
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className="title">
        Register
      </Title>
      <Text className="subtitle">
        Already have an account? <Anchor href="/login">Login</Anchor>
      </Text>
      <Paper
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
        className="login-form-container"
      >
        {registerError && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Registration Failed"
            color="red"
            variant="light"
          >
            {registerError}
          </Alert>
        )}
        {registerSuccess && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Registration Successful"
            color="green"
            variant="light"
          >
            Please check your email to confirm your account.
          </Alert>
        )}
        <TextInput
          label="Email"
          required
          radius="md"
          value={form.values.email}
          onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          required
          mt="md"
          radius="md"
          value={form.values.password}
          onChange={(e) =>
            form.setFieldValue("password", e.currentTarget.value)
          }
          error={form.errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          required
          mt="md"
          radius="md"
          value={form.values.confirmPassword}
          onChange={(e) =>
            form.setFieldValue("confirmPassword", e.currentTarget.value)
          }
          error={form.errors.confirmPassword}
        />
        <Button
          fullWidth
          mt="xl"
          radius="md"
          loading={loading}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
}

export default Register;
