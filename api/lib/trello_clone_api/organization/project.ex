defmodule TrelloCloneApi.Organization.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field(:description, :string)
    field(:name, :string)

    has_many(:boards, TrelloCloneApi.Project.Board)

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
