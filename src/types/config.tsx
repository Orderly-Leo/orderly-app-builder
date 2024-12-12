import { Link } from "react-router-dom";
import { z } from "zod";

export const configArgTypes = {
  app: {
    brokerId: {
      _description: (
        <div>
          The broker ID,
          <Link to="#" className="text-indigo-500">
            how to get brokerId?
          </Link>
        </div>
      ),

      _control: {
        // type: "text",
        placeholder: "Enter broker ID",
      },
      z: z.string().min(1, "Broker ID is required"),
    },
  },
  projectConfig: {
    paths: {
      src: {
        _description: "The path to the src directory",
        _control: {
          type: "path",
        },
        // z: z.string().min(1, "src path is required"),
      },
      themeCSS: {
        _description: "The path to the theme CSS file",
        _control: {
          type: "path",
        },
        // z: z.string().min(1, "Theme CSS path is required"),
      },
    },
  },
};
