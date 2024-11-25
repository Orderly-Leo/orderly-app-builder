import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "./theme-provider";

// import "./styles/tailwind.css";
// import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="flex-1 h-full">
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  );
}

export default App;
