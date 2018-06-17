# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TrelloCloneApi.Repo.insert!(%TrelloCloneApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TrelloCloneApi.Accounts.User
alias TrelloCloneApi.Repo

users = [
  %User{username: "John Doe", email: "john@doe.com", password: "1234567890"},
  %User{username: "Jane Doe", email: "jane@doe.com", password: "1234567890"}
]

Enum.map(users, fn user -> Repo.insert!(user) end)
