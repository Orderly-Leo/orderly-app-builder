import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./styles/tailwind.css";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <Theme>
      <main className="flex-1 h-full">
        <RouterProvider router={router} />
      </main>
    </Theme>
  );
}

export default App;
