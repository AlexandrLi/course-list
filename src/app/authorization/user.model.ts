export class User {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public set setId(id: number) {
    this.id = id;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getId(): number {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }
}
