import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./theme-provider";
import "./App.css";

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
