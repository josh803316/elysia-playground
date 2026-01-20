import { useNavigate, useParams } from "react-router-dom";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Checkbox,
  Stack,
  Text,
  Paper,
  Title,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotes } from "../hooks/useNotes";
import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface ApiError extends Error {
  details?: string;
  status?: number;
  technicalDetails?: string;
}

interface FormValues {
  title: string;
  content: string;
  isPublic: boolean;
}

interface NoteFormProps {
  initialValues?: FormValues;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}

const NoteFormContent = ({
  initialValues,
  isOpen,
  onClose,
  onSubmitSuccess,
}: NoteFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createNote, updateNote, isLoading, error } = useNotes();
  const isEditing = !!id;
  const [localInitialValues, setLocalInitialValues] =
    useState<FormValues | null>(null);

  // Initialize form with default values
  const form = useForm<FormValues>({
    initialValues: initialValues || {
      title: "",
      content: "",
      isPublic: false,
    },
    validate: {
      title: (value) => (value.trim().length < 1 ? "Title is required" : null),
      content: (value) =>
        value.trim().length < 1 ? "Content is required" : null,
    },
  });

  // Check for stored note data in localStorage on component mount
  useEffect(() => {
    if (isEditing) {
      // Try to get note data from localStorage (used when editing from admin view)
      const storedNote = localStorage.getItem("editingNote");
      if (storedNote) {
        try {
          const parsedNote = JSON.parse(storedNote);
          if (parsedNote && parsedNote.id === id) {
            console.log("Found note data in localStorage:", parsedNote);
            // Convert string 'true'/'false' to boolean
            const noteData = {
              title: parsedNote.title,
              content: parsedNote.content,
              isPublic:
                parsedNote.isPublic === "true" || parsedNote.isPublic === true,
            };
            setLocalInitialValues(noteData);
            form.setValues(noteData);
          }
          // Clear localStorage after retrieving the data
          localStorage.removeItem("editingNote");
        } catch (e) {
          console.error("Error parsing stored note:", e);
        }
      }
    }
  }, [id, isEditing]);

  // Update form values when initialValues or localInitialValues changes
  useEffect(() => {
    if (initialValues) {
      console.log("Updating form with initialValues:", initialValues);
      form.setValues(initialValues);
    } else if (localInitialValues) {
      console.log("Updating form with localInitialValues:", localInitialValues);
      form.setValues(localInitialValues);
    }
  }, [initialValues, localInitialValues]);

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isEditing && id) {
        await updateNote(Number(id), values);
      } else {
        await createNote(values);
      }
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      if (!isOpen) {
        navigate("/notes");
      }
    } catch (err) {
      console.error("Error saving note:", err);
      // Don't close the modal on error
      // Re-throw the error to be caught by ErrorBoundary
      throw err;
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/notes");
    }
  };

  const formContent = (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="Enter note title"
          {...form.getInputProps("title")}
          required
        />
        <Textarea
          label="Content"
          placeholder="Enter note content"
          minRows={8}
          {...form.getInputProps("content")}
          required
        />
        <Checkbox
          label="Make this note public"
          {...form.getInputProps("isPublic", { type: "checkbox" })}
        />
        {error && (
          <Stack gap="xs">
            <Text color="red" size="sm" fw={500}>
              Error: {(error as ApiError).message || "Failed to save note"}
            </Text>
            {(error as ApiError).details && (
              <Text color="red" size="sm">
                Details: {(error as ApiError).details}
              </Text>
            )}
            {(error as ApiError).technicalDetails && (
              <Text color="dimmed" size="xs">
                Technical details: {(error as ApiError).technicalDetails}
              </Text>
            )}
          </Stack>
        )}
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </Group>
      </Stack>
    </form>
  );

  // If used as a modal
  if (isOpen !== undefined) {
    return (
      <Modal
        opened={isOpen}
        onClose={handleClose}
        title={
          isEditing
            ? "Edit Note"
            : initialValues?.isPublic
              ? "Create Public Note"
              : "Create Private Note"
        }
        centered
        size="lg"
      >
        {formContent}
      </Modal>
    );
  }

  // If used as a page
  return (
    <Paper p="lg" shadow="sm" radius="md" withBorder>
      <Title order={2} mb="xl">
        {isEditing ? "Edit Note" : "Create New Note"}
      </Title>
      {formContent}
    </Paper>
  );
};

export const NoteForm = (props: NoteFormProps) => {
  return (
    <ErrorBoundary>
      <NoteFormContent {...props} />
    </ErrorBoundary>
  );
};
