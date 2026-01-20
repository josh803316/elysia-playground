import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Stack,
  Group,
  Alert,
  Radio,
  RadioGroup,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface Note {
  id: string;
  title: string;
  content: string;
  isPublic: string;
  userId: string | null;
}

interface EditNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isAdmin?: boolean;
}

const EditNoteModal = ({
  note,
  isOpen,
  onClose,
  onSuccess,
  isAdmin = false,
}: EditNoteModalProps) => {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      title: note?.title || "",
      content: note?.content || "",
      isPublic: note?.isPublic === "true" || false,
    },
    validate: {
      title: (value) =>
        value.trim().length > 0 ? null : "Title cannot be empty",
      content: (value) =>
        value.trim().length > 0 ? null : "Content cannot be empty",
    },
  });

  // Update form values when note changes
  if (note && form.values.title !== note.title) {
    form.setValues({
      title: note.title,
      content: note.content,
      isPublic: note.isPublic === "true",
    });
  }

  const handleSubmit = async (values: {
    title: string;
    content: string;
    isPublic: boolean;
  }) => {
    if (!note || !note.id) {
      setError("Cannot edit: note data is missing");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let response;
      const token = isAdmin
        ? localStorage.getItem("adminApiKey") || ""
        : await getToken();

      if (isAdmin) {
        // Admin update path
        response = await fetch(`/api/notes/${note.id}/admin`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": token as string,
          },
          body: JSON.stringify(values),
        });
      } else if (note.isPublic === "true" && !note.userId) {
        // Public anonymous notes
        response = await fetch(`/api/public-notes/${note.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // User's own notes
        response = await fetch(`/api/notes/${note.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update note");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating note:", err);
      setError(err instanceof Error ? err.message : "Failed to update note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Edit Note"
      size="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        },
      }}
    >
      {error && (
        <Alert color="red" title="Error" mb="md" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Note title"
            {...form.getInputProps("title")}
            disabled={isSubmitting}
            required
          />

          <Textarea
            label="Content"
            placeholder="Note content"
            minRows={4}
            {...form.getInputProps("content")}
            disabled={isSubmitting}
            required
          />

          {(isAdmin || note?.userId) && (
            <RadioGroup
              value={form.values.isPublic ? "true" : "false"}
              onChange={(value) =>
                form.setFieldValue("isPublic", value === "true")
              }
              label="Note visibility"
              description="Choose who can see this note"
            >
              <Flex gap="md" mt="xs">
                <Radio
                  value="false"
                  label="Private - Only you can see this note"
                />
                <Radio value="true" label="Public - Anyone can see this note" />
              </Flex>
            </RadioGroup>
          )}

          <Group justify="space-between" mt="md">
            <Button variant="subtle" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditNoteModal;
