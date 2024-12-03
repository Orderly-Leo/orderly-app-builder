import { Link } from "@radix-ui/themes";

export const configArgTypes = {
  app: {
    brokerId: {
      description: (
        <div>
          The broker ID,
          <Link href="#" color="indigo">
            how to get brokerId?
          </Link>
        </div>
      ),

      control: {
        // type: "text",
        placeholder: "Enter broker ID",
      },
    },
    // brokerName: {
    //   description: <h2>Description test</h2>,
    // },
  },
  projectConfig: {
    paths: {
      themeCSS: {
        description: "The path to the theme CSS file",
        control: {
          type: "file",
        },
      },
    },
  },
};
