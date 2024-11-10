import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./styles/blueprint-theme.css";
import "./styles/tailwind.css";

function App() {
  return (
    <main className="flex-1 h-full">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
