defmodule TrelloCloneApi.Factory do
  use ExMachina.Ecto, repo: TrelloCloneApi.Repo

  use TrelloCloneApi.ProjectFactory
  use TrelloCloneApi.BoardFactory
end
