import ReactQueryProvider from "@/provider/reactQueryProvider";
import ThemeProvider from "@/provider/themeProvider";
import AuthProvider from "@/provider/authProvider";

interface Props {
  children: React.ReactNode;
}

function RootProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>;
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootProvider;
