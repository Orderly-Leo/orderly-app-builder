export class CustomError extends Error {
  // title:string;
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly message: string
  ) {
    super(message);
  }
}
