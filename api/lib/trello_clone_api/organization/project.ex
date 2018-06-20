defmodule TrelloCloneApi.Organization.Project do
  use Ecto.Schema
  import Ecto.Changeset


  schema "projects" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
