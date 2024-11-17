import { IFramework } from "./framework";

export class Nextjs implements IFramework {
  run(): void {
    throw new Error("Method not implemented.");
  }
  restart(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
  generateFiles(config: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  createProject(): Promise<any> {
    /**
    call shell command to create a new nextjs project using npx create-next-app
    */
    throw new Error("Method not implemented.");
  }
}
