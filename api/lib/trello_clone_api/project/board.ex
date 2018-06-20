defmodule TrelloCloneApi.Project.Board do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  schema "boards" do
    field(:description, :string)
    field(:name, :string)
    field(:project_id, :id)

    timestamps()
  end

  @doc false
  def changeset(board, attrs) do
    board
    |> cast(attrs, [:name, :description, :project_id], ~w())
    |> validate_required([:name, :description])
    |> foreign_key_constraint(:project_id)
  end

  def by_project(query, project_id) do
    from(c in query, where: c.project_id == ^project_id)
  end
end
