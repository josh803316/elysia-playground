import { useState } from "react";
import { Button, TextInput, Group, Box, Text, Stack } from "@mantine/core";

interface AdminLoginFormProps {
  onAdminLogin: (apiKey: string) => void;
  onAdminLogout: () => void;
  isAdminLoggedIn: boolean;
}

const AdminLoginForm = ({
  onAdminLogin,
  onAdminLogout,
  isAdminLoggedIn,
}: AdminLoginFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!apiKey.trim()) {
      setError("API key is required");
      setIsSubmitting(false);
      return;
    }

    console.log("Logging in with API key:", apiKey);

    // In a real app, you might validate the API key here
    // For simplicity in this demo, we'll accept any non-empty key
    onAdminLogin(apiKey);
    setIsSubmitting(false);
  };

  if (isAdminLoggedIn) {
    return (
      <Box>
        <Text mb="md">You are logged in as an administrator.</Text>
        <Button color="red" onClick={onAdminLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Admin API Key"
            placeholder="Enter your admin API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            error={error}
            required
            mb="md"
          />
          <Text size="xs" c="dimmed" mb="md">
            Default test key: {process.env.REACT_APP_ADMIN_API_KEY}
          </Text>
          <Group justify="flex-end">
            <Button type="submit" loading={isSubmitting} color="blue">
              Login
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default AdminLoginForm;
