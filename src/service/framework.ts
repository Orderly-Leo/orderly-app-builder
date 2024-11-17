export interface IFramework {
  run(): void;
  restart(): void;
  stop(): void;

  generateFiles(config: any): Promise<any>;
  createProject(): Promise<any>;
}
