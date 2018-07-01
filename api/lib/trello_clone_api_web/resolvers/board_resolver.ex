defmodule TrelloCloneApiWeb.BoardResolver do
  alias TrelloCloneApi.{Board, Project}

  def all_columns(_roots, %{board_id: board_id}, _info) do
    columns = Board.list_columns(board_id)

    {:ok, columns}
  end

  def create_column(_root, %{position: _position} = args, _info) do
    %{args | board_id: String.to_integer(args.board_id)}
    |> create_column
  end

  def create_column(_root, args, _info) do
    columns = Board.list_columns(args.board_id, %{order_by: [:position, :desc]})

    case columns do
      [] -> Map.put(args, :position, 0) |> create_column
      [first | _] -> Map.put(args, :position, first.position + 1) |> create_column
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

  def move_ticket(
        _root,
        %{id: ticket_id, column_id: column_id, column_position: column_position},
        _info
      ) do
    ticket = Project.get_ticket!(ticket_id)

    case Project.update_ticket(ticket, %{column_id: column_id, column_position: column_position}) do
      {:ok, ticket} ->
        {:ok, ticket}

      _error ->
        %{error: "could not move ticket"}
    end
  end

  def move_ticket(_root, %{id: ticket_id, column_id: column_id}, _info) do
    ticket = Project.get_ticket!(ticket_id)

    case Project.update_ticket(ticket, %{column_id: column_id}) do
      {:ok, ticket} ->
        {:ok, ticket}

      _error ->
        %{error: "could not move ticket"}
    end
  end

  def all_column_tickets(_roots, %{column_id: column_id}, _info) do
    columns = Board.list_tickets(column_id, %{order_by: [:column_position, :asc]})

    {:ok, columns}
  end

  defp create_column(args) do
    case Board.create_column(args) do
      {:ok, column} ->
        {:ok, column}

      _error ->
        {:error, "could not create column"}
    end
  end
end
