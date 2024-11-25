export interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: {
    wallet?: string;
    broker?: string;
    pages?: Array<{
      type: string;
      name: string;
      route: string;
    }>;
    // ... other data fields
  };
}

export enum CreateProjectIds {
  CREATE_PROJECT = "create-project",
  UPDATE_PROJECT = "update-project",
  INSTALL_DEPENDENCIES = "install-dependencies",
  // CREATE_ENV_FILE = "create-env-file",
  // CREATE_ROUTES = "create-routes",
  // CREATE_PAGES = "create-pages",
}
