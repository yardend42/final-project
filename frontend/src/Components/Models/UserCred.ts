export class UserCred {
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public full_name: string;
  public email: string;
  public role: "user" | "admin";
  public password: string; //will not pass in the jwt token
  public jwt?: string;

  constructor(
    user_id: number,
    first_name: string,
    last_name: string,
    full_name: string,
    email: string,
    role: "user" | "admin",
    password: string,
    jwt?: string,

  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.full_name = full_name; // Not computed from first_name + last_name in this constructor
    this.email = email;
    this.role = role;
    this.password = password;
    this.jwt = jwt;

  }
}
