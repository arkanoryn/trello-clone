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
alias TrelloCloneApi.Organization.Project
alias TrelloCloneApi.Repo

users = [
  %User{username: "John Doe", email: "john@doe.com", password: "1234567890"},
  %User{username: "Jane Doe", email: "jane@doe.com", password: "1234567890"}
]

Enum.map(users, fn user -> Repo.insert!(user) end)

projects = [
  %Project{
    name: "Project Alpha",
    description:
      "Private contractors, some of them ex-military, have received millions in federal contracts for detention centers and tent cities."
  },
  %Project{
    name: "Project Omega",
    description:
      "President Trump returned to his tough talk and called for changes in immigration laws a day after he retreated from his hard-line position of separating immigrant children from their families."
  },
  %Project{
    name: "Project Alpha 1",
    description:
      "Private contractors, some of them ex-military, have received millions in federal contracts for detention centers and tent cities."
  },
  %Project{
    name: "Project Omega 2",
    description:
      "President Trump returned to his tough talk and called for changes in immigration laws a day after he retreated from his hard-line position of separating immigrant children from their families."
  },
  %Project{
    name: "Project Alpha 3",
    description:
      "Private contractors, some of them ex-military, have received millions in federal contracts for detention centers and tent cities."
  },
  %Project{
    name: "Project Omega 3",
    description:
      "President Trump returned to his tough talk and called for changes in immigration laws a day after he retreated from his hard-line position of separating immigrant children from their families."
  },
  %Project{
    name: "Project Alpha 4",
    description:
      "Private contractors, some of them ex-military, have received millions in federal contracts for detention centers and tent cities."
  },
  %Project{
    name: "Project Omega 4",
    description:
      "President Trump returned to his tough talk and called for changes in immigration laws a day after he retreated from his hard-line position of separating immigrant children from their families."
  }
]

Enum.map(projects, fn project -> Repo.insert!(project) end)
