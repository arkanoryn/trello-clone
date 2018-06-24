defmodule TrelloCloneApi.Project.Board do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  schema "boards" do
    field(:description, :string)
    field(:name, :string)
    belongs_to(:project, TrelloCloneApi.Organization.Project)

    timestamps()
  end

  @doc false
  def changeset(board, attrs) do
    board
    |> cast(attrs, [:name, :description, :project_id], ~w())
    |> validate_required([:name, :description, :project_id])
    |> foreign_key_constraint(:project_id)
  end

  def by_project(query, project_id) do
    from(
      c in query,
      where: c.project_id == ^project_id,
      preload: [:project]
    )
  end

  def load_project(query) do
    from(c in query, preload: [:project])
  end
end
