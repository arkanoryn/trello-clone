defmodule TrelloCloneApi.Project.Ticket do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tickets" do
    field :column_position, :integer
    field :description, :string
    field :estimation, :integer
    field :name, :string
    field :tags, :string
    field :type, :integer
    field :ticket_id, :id
    field :board_id, :id
    field :project_id, :id
    field :column_id, :id

    timestamps()
  end

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, [:type, :name, :description, :tags, :estimation, :column_position])
    |> validate_required([:type, :name, :description, :tags, :estimation, :column_position])
  end
end
