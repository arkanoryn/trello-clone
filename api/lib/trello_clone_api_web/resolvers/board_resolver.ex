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
        {:error, "could not create column"}
    end
  end

  def update_column(_root, %{id: id, column_params: column_params}, _info) do
    origin = Board.get_column!(id)

    case Board.update_column(origin, column_params) do
      {:ok, column} ->
        {:ok, column}

      _error ->
        {:error, "could not update column"}
    end
  end

  def delete_column(_root, %{id: id}, _info) do
    column = Board.get_column!(id)

    case Board.delete_column(column) do
      {:ok, column} ->
        {:ok, column}

      _error ->
        %{error: "could not delete column"}
    end
  end
end
