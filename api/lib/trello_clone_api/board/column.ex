defmodule TrelloCloneApi.Board.Column do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  schema "columns" do
    field(:name, :string)
    field(:wip_limit, :integer)
    belongs_to(:board, TrelloCloneApi.Project.Board)

    timestamps()
  end

  @doc false
  def changeset(column, attrs) do
    column
    |> cast(attrs, [:name, :wip_limit, :board_id])
    |> validate_required([:name, :wip_limit, :board_id])
    |> foreign_key_constraint(:board_id)
  end

  def by_board(query, board_id) do
    from(
      c in query,
      where: c.board_id == ^board_id
    )
  end
end
