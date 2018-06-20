defmodule TrelloCloneApi.Board.Column do
  use Ecto.Schema
  import Ecto.Changeset

  schema "columns" do
    field(:name, :string)
    field(:wip_limit, :integer)
    field(:board_id, :id)

    timestamps()
  end

  @doc false
  def changeset(column, attrs) do
    column
    |> cast(attrs, [:name, :wip_limit])
    |> validate_required([:name, :wip_limit])
    |> foreign_key_constraint(:board_id)
  end
end
