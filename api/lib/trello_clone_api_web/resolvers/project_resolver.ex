defmodule TrelloCloneApiWeb.ProjectResolver do
  alias TrelloCloneApi.Organization
  alias TrelloCloneApi.Project

  def all_boards(_root, %{project_id: project_id}, _info) do
    projects = Project.list_boards(project_id)

    {:ok, projects}
  end

  def create_board(_root, args, _info) do
    args = %{args | project_id: String.to_integer(args.project_id)}

    case Project.create_board(args) do
      {:ok, board} ->
        board = assign_assoc(board)
        {:ok, board}

      _error ->
        {:error, "could not create user"}
    end
  end

  defp assign_assoc(board) do
    Map.put(board, :project, Organization.get_project!(board.project_id))
  end
end
