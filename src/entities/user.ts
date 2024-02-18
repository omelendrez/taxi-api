export class User {
  constructor(
    public readonly name: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly mobile: string,
    public readonly role: number,
    public readonly password?: string,
    public readonly id?: number
  ) {}
}
