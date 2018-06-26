defmodule TrelloCloneApi.Project.Ticket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tickets" do
    field(:column_position, :integer)
    field(:description, :string)
    field(:estimation, :integer)
    field(:name, :string)
    field(:tags, :string)
    field(:type, :integer)

    belongs_to(:board, TrelloCloneApi.Project.Board)
    belongs_to(:column, TrelloCloneApi.Board.Column)

    # Tickets can be nested into each other
    belongs_to(:ticket, TrelloCloneApi.Project.Ticket)
    has_many(:tickets, TrelloCloneApi.Project.Ticket)

    timestamps()
  end

  @required_fields ~w[type, name, description, tags, estimation, column_position, board_id, column_id]

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, [
      :type,
      :name,
      :description,
      :tags,
      :estimation,
      :column_position,
      :board_id,
      :column_id
    ])
    |> validate_required(@required_fields)
  end
end
