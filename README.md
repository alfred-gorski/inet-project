# inet-project

Final project for HTW-Saarland course Internet-Technologien (KIB-INET/PIB-INET).

## Features

* RESTful-API
* jwt Authentication
* [Material Design](https://material.io)
* Persistence using database
* ORM framework in SQL request

## How to Build

### Dependencies

* Operating System: Linux/macOS
* backend: [golang](https://golang.org)
* frontend: [angular](https://angular.io)
* package manager: [npm](https://www.npmjs.com)
* developing: [yarn](https://yarnpkg.com/getting-started/install), [air](https://github.com/cosmtrek/air)

### Compile

#### Frontend

```shell
cd inet-project/web
npm install           # install frontend dependencies
ng serve --open
```

#### Backend

```shell
cd ..           # go to project root dir
go run main.go
```

#### Browser

open localhost:4200

#### Database

* driver: sqlite3
* database name: database.db
* dir ./

## TODOs

* improve URL query parameter
* make image aquire authorized
* POST Restaurant page
  
## Known issues

* Last line of layout is abnormal
  