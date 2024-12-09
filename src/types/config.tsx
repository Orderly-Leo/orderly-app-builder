import { Link } from "@radix-ui/themes";
import { z } from "zod";

export const configArgTypes = {
  app: {
    brokerId: {
      _description: (
        <div>
          The broker ID,
          <Link href="#" color="indigo">
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
