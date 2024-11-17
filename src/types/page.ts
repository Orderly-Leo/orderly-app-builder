export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  props?: {
    [key: string]: any;
    // [key: string]: {
    //   type: "string" | "number" | "boolean" | "object" | "array";
    //   description?: string;
    //   default?: any;
    //   required?: boolean;
    // };
  };
}

export interface PageConfig {
  id: string;
  name: string;
  route: string;
  template: string;
  props: Record<string, any>;
}
