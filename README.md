# Trello clone

> Simple playground in order to get (back) in touch with [Elixir](https://elixir-lang.org/), [GraphQL](https://graphql.org/) [Apollo](https://www.apollographql.com/) and [React/redux](https://redux.js.org/).
> The purpose is to reproduce [Trello](https://trello.com/), or any of the other Kanban board app' out there, while learning new things.
> I'll tried as much as possible to write tests for Elixir. React will **eventually** come later.

## Initialization

### Vagrant
Everything (webapp and api) should run on the vagrant machine.
If you do not know how to set it up, take a [look at the vagrant's README](vagrant.d/README.md).

### API
The API is built using [Phoenix](http://phoenixframework.org/) and [Absinthe](http://absinthe-graphql.org/).

Refere to the [API - README](api/README.md) for further details.

### Webapp
The Webapp (front-end app) is built using React, Redux and Apollo.
It has been create from a `create-react-app` and is using `ant.design` as a UI framework.

In order to run it, you need to install the modules (`yarn install`) and then start it (`yarn start`).
It assumes it will find the API server on the vagrant virtual machine.
You can also create a `API_URL` env variable.

## TODOs

### API
- [ ] rework api/seed to use factories
- [ ] rework schema by adding notation
- [X] CRUD column
- [ ] CRUD board's ticket
- [ ] CRUD users
- [ ] Assign user to ticket
- [ ] Link board's tickets to project
- [ ] Create ghost tickets
- [ ] Delete Project
- [ ] Delete Board
- [ ] Update Project
- [ ] Update Board

### Webapp
- [ ] CRUD columns
- [ ] CRUD tickets
- [ ] Assign user's to ticket
- [ ] Move tickets from column to column
- [ ] Move tickets inside the columns
- [ ] Design tags
