defmodule TrelloCloneApiWeb.BoardResolver do
  alias TrelloCloneApi.Board

  def all_columns(_roots, %{board_id: board_id}, _info) do
    columns = Board.list_columns(board_id)

    {:ok, columns}
  end

  def create_column(_root, args, _info) do
    args = %{args | board_id: String.to_integer(args.board_id)}

    case Board.create_column(args) do
      {:ok, column} ->
        {:ok, column}

      _error ->
        {:error, "could not create user"}
    end
  end
end
