import { Component, ErrorInfo, ReactNode } from "react";
import { Alert, Button, Group, Text, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Something went wrong"
          color="red"
          variant="filled"
        >
          <Stack>
            <Text>
              {this.state.error?.message || "An unexpected error occurred"}
            </Text>
            <Group>
              <Button
                variant="light"
                onClick={() => {
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  });
                }}
              >
                Try again
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload page
              </Button>
            </Group>
          </Stack>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
