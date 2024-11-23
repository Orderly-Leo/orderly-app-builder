import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "@radix-ui/themes/styles.css";

// import "./styles/tailwind.css";
import { Theme } from "@radix-ui/themes";

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
