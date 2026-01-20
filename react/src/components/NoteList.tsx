import { Note } from "../hooks/useNotes";
import { Table, ActionIcon, Group, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  if (!notes || notes.length === 0) {
    return <Text>No notes found.</Text>;
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Content</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Updated</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {notes.map((note) => (
          <Table.Tr key={note.id}>
            <Table.Td>{note.title}</Table.Td>
            <Table.Td>{note.content}</Table.Td>
            <Table.Td>
              {typeof note.isPublic === "string"
                ? note.isPublic === "true"
                : note.isPublic
                  ? "Public"
                  : "Private"}
            </Table.Td>
            <Table.Td>{formatDate(note.createdAt)}</Table.Td>
            <Table.Td>{formatDate(note.updatedAt)}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => onEdit(note.id)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => onDelete(note.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default NoteList;
