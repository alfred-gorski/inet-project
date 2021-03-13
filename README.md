# inet-project

Final project for HTW-Saarland course Internet-Technologien (KIB-INET/PIB-INET).

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
yarn run build:watch  # compile angular project
```

#### Backend

```shell
cd ..           # go to project root dir
air             # use air perform file change auto-detect and rebuild 
```

#### Browser

open localhost:3000
