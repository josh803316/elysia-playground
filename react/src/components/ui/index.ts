// Export Mantine components with optimized imports
// This barrel file helps with tree-shaking and better code-splitting

// Core layout components
export { Container } from "@mantine/core";
export { Grid } from "@mantine/core";
export { Group } from "@mantine/core";
export { Stack } from "@mantine/core";
export { Flex } from "@mantine/core";
export { Card } from "@mantine/core";
export { Divider } from "@mantine/core";

// Typography components
export { Title } from "@mantine/core";
export { Text } from "@mantine/core";
export { Badge } from "@mantine/core";

// Form components
export { Button } from "@mantine/core";
export { TextInput } from "@mantine/core";
export { Textarea } from "@mantine/core";
export { Checkbox } from "@mantine/core";
export { ActionIcon } from "@mantine/core";
export { Select } from "@mantine/core";
export { PasswordInput } from "@mantine/core";

// Feedback components
export { Alert } from "@mantine/core";
export { Modal } from "@mantine/core";
export { LoadingOverlay } from "@mantine/core";
export { Loader } from "@mantine/core";
export { Notification } from "@mantine/core";

// Navigation components
export { AppShell } from "@mantine/core";
// Note: In Mantine v7, use AppShell.Navbar and AppShell.Header instead of separate components
export { Tabs } from "@mantine/core";

// This pattern still supports tree-shaking in modern bundlers
// Import these components from './components/ui' instead of '@mantine/core'
