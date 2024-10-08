# React testing library workshop

A simple task management app to showcase writing tests using React Testing Library (with some bonus content on Cypress Testing Library).

## Getting started

### Running the application

#### Install pnpm

`npm i -g pnpm`

#### Install project dependencies

`pnpm i`

#### Run the application

`pnpm run start`

#### Load default data

The database can be populated with some default data using the script `pnpm run populate-db`

### React Testing

#### Install Node 20+

The array method "toSorted" is used in one of the tests, which is only supported by Node 20+.

Assuming you have NVM installed in your EC2, please run `nvm install --lts`. This will install the latest
LTS version of Node (v20 at the time of writing) and use it. If you already have this version installed and
need to change to it run `nvm use 20` or `nvm use node` or `nvm use --lts`

#### Run the tests

To run all tests run `pnpm run test`

To run a single test file run `pnpm run test -- path/to/test`

### Cypress Testing

Remember to have the application running via `pnpm run server` prior to running Cypress tests

#### Run headed

Using a VNC viewer of your choice, head to the root directory of this repo and run `pnpm cypress open`

#### Run headless

From the root directory of this repo, run `pnpm cypress run`
