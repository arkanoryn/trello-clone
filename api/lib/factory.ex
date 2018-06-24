defmodule TrelloCloneApi.Factory do
  use ExMachina.Ecto, repo: TrelloCloneApi.Repo

  use TrelloCloneApi.BoardFactory
  use TrelloCloneApi.ColumnFactory
  use TrelloCloneApi.ProjectFactory
end
