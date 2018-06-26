defmodule TrelloCloneApi.Project.Ticket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tickets" do
    field(:column_position, :integer)
    field(:description, :string)
    field(:estimation, :integer)
    field(:name, :string)
    field(:tags, :string, default: "")
    field(:kind, :integer)

    belongs_to(:board, TrelloCloneApi.Project.Board)
    belongs_to(:column, TrelloCloneApi.Board.Column)

    # Tickets can be nested into each other, future feature, not used atm
    belongs_to(:ticket, TrelloCloneApi.Project.Ticket)
    has_many(:tickets, TrelloCloneApi.Project.Ticket)

    timestamps()
  end

  @casting_fields ~w(kind name description tags estimation column_position board_id column_id)a
  @required_fields ~w(kind name description estimation column_position board_id column_id)a

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, @casting_fields)
    |> validate_required(@required_fields)
  end
end
