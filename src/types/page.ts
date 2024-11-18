export interface PageComponent {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  packages?: string[];
  defaultConfig: {
    pageName: string;
    route: string;
  };
  props: Record<string, any>;
}

// export interface PageComponent {
//   id: string;
//   name: string;
//   category: string;
//   description: string;
//   thumbnail?: string;
// }

export interface PageConfig {
  id: string;
  name: string;
  route: string;
  template: string;
  components?: string[];
  pages?: Array<{
    type: string;
    name: string;
    route: string;
  }>;
  props: Record<string, any>;
}
