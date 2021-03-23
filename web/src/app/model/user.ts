export class User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  token!: string;

  constructor() {
    this.id = '';
    this.email = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
    this.token = '';
  }
}

export class Product {
  title: string;
  description: string;
  amount: string;
  constructor() {
    this.title = '';
    this.description = '';
    this.amount = '';
  }
}

export class Reply<T> {
  status!: 'success' | 'error';
  message!: string;
  data!: T;
}

