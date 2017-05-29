export class User {
  public id: number;
  public name: string;
  public token?: string;

  constructor(id?: number, name?: string, token?: string) {
    this.id = id;
    this.name = name;
    this.token = token;
  }
}
