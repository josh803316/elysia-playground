import { useState } from "react";
import {
  Textarea,
  Button,
  Paper,
  Title,
  Stack,
  Group,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNoteContext } from "../context/NoteContext";

interface AnonymousNoteFormProps {
  onNoteCreated: () => void;
}

const AnonymousNoteForm = ({ onNoteCreated }: AnonymousNoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { triggerRefresh } = useNoteContext();

  const form = useForm({
    initialValues: {
      content: "",
      isPublic: true,
    },
    validate: {
      content: (value) =>
        value.trim().length > 0 ? null : "Note content cannot be empty",
    },
  });

  const handleSubmit = async (values: {
    content: string;
    isPublic: boolean;
  }) => {
    if (!values.content.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Post a public note
      const response = await fetch("/api/public-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: values.content,
          isPublic: values.isPublic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create note");
      }

      // Reset form
      form.reset();

      // Trigger refresh for other components
      triggerRefresh();

      // Notify parent component
      onNoteCreated();
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper shadow="xs" p="md" withBorder radius="md" bg="#f9fce1">
      <Title order={3} mb="md">
        Post a Public Note
      </Title>

      {error && (
        <Alert color="red" title="Error" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Textarea
            placeholder="Write a public note..."
            minRows={3}
            {...form.getInputProps("content")}
            disabled={isSubmitting}
            required
          />

          <Group justify="flex-end">
            <Button type="submit" loading={isSubmitting} color="green">
              Post Public Note
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};

export default AnonymousNoteForm;
