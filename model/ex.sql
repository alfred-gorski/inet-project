create table users(
  id int primary key not null,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime,
  username varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  names varchar(255) not null
);