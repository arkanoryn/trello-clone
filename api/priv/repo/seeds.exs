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

alias TrelloCloneApi.Factory
alias TrelloCloneApi.Accounts.User
alias TrelloCloneApi.Repo

{:ok, _} = Application.ensure_all_started(:ex_machina)

users = [
  %User{username: "John Doe", email: "john@doe.com", password: "1234567890"},
  %User{username: "Jane Doe", email: "jane@doe.com", password: "1234567890"}
]

Enum.map(users, fn user -> Repo.insert!(user) end)

project = Factory.project_factory() |> Repo.insert!()
Enum.each(1..10, fn _ -> Factory.project_factory() |> Repo.insert!() end)

board = Factory.board_factory() |> Map.put(:project, project) |> Repo.insert!()

Enum.each(1..7, fn _ ->
  Factory.board_factory() |> Map.put(:project, project) |> Repo.insert!()
end)

column =
  Factory.column_factory()
  |> Map.put(:board, board)
  |> (fn col -> %{col | position: 0} end).()
  |> Repo.insert!()

Enum.each(1..2, fn _ ->
  Factory.column_factory()
  |> Map.put(:board, board)
  |> Repo.insert!()
end)

Enum.each(1..6, fn _ ->
  Factory.ticket_factory()
  |> Map.put(:column, column)
  |> Repo.insert!()
end)
