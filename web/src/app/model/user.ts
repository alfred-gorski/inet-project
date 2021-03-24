export class User {
  id!: number;
  email!: string;
  userinfo!: UserInfo;
}

export class UserInfo {
  firstname: string;
  lastname: string;

  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}


export class AuthResponse {
  user!: User;
  token!: string;
}

export class SignupDTO {
  email: string;
  password: string;
  userinfo: UserInfo;

  constructor(email: string, password: string, userinfo: UserInfo) {
    this.email = email;
    this.password = password;
    this.userinfo = userinfo;
  }
}

export class LoginDTO {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

