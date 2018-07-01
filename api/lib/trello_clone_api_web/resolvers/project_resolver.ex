defmodule TrelloCloneApiWeb.ProjectResolver do
  alias TrelloCloneApi.Project

  def all_boards(_root, %{project_id: project_id}, _info) do
    projects = Project.list_boards(project_id)

    {:ok, projects}
  end

  def create_board(_root, args, _info) do
    args = %{args | project_id: String.to_integer(args.project_id)}

    case Project.create_board(args) do
      {:ok, board} ->
        {:ok, board}

      _error ->
        {:error, "could not create user"}
    end
  end

  def create_ticket(_root, args, _info) do
    # TODO: if column_position is not set, fetch all column's tickets and set the column_position to the last one

    case Project.create_ticket(args) do
      {:ok, ticket} ->
        {:ok, ticket}

      _error ->
        {:error, "could not create user"}
    end
  end

  def update_ticket(_root, %{id: id, ticket_params: ticket_params}, _info) do
    origin = Project.get_ticket!(id)

    case(Project.update_ticket(origin, ticket_params)) do
      {:ok, ticket} ->
        {:ok, ticket}

      _error ->
        {:error, "could not create user"}
    end
  end
end
