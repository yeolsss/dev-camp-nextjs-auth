import ThemeProvider from "@/provider/themeProvider";
import AuthProvider from "@/provider/authProvider";
import ReactQueryProvider from "@/provider/reactQueryProvider";

interface Props {
  children: React.ReactNode;
}

function ProvidersLayout({ children }: Props) {
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

export default ProvidersLayout;
