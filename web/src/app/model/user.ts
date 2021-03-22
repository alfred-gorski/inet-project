export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token!: string;

  constructor() {
    this.id = '';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
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

