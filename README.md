# TypeScript react-mobx boilerplate [![Build Status](https://travis-ci.org/lozinsky/typescript-react-mobx-boilerplate.svg?branch=master)](https://travis-ci.org/lozinsky/typescript-react-mobx-boilerplate)
![Pic](http://i.imgur.com/uB7Dtbc.jpg)
Simple boilerplate for single page applications.
___

## Installation
You should have git, node and npm.

Fork this repository, and run:
```sh
git clone https://github.com/<account>/typescript-react-mobx-boilerplate.git
```
where ```<account>``` is your github username.

Install global packages:

```sh
npm i -g webpack stylelint eslint eslint-plugin-node jest-cli tslint typescript@2.0.3
```

Go to dir:

```
cd typescript-react-mobx-boilerplate/
```

Install dependencies:

```sh
npm i
```

Edit ```misc/settings.js``` as you need.

___
## Using
Run server:

```sh
npm start
```

> **Note:** or you can use ```npm run server```

Production build:

```sh
npm run build
```

Delete build folder:

```sh
npm run clean
```

Run tests:

```sh
npm test
```

Lint project:

```sh
npm run lint
```

> **Note:** or you can use ```npm run lint:scripts``` and ```npm run lint:styles```