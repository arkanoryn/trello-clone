defmodule TrelloCloneApiWeb.ProjectResolver do
  alias TrelloCloneApi.Project

  def all_boards(_root, %{project_id: project_id}, _info) do
    projects = Project.list_boards(project_id)

    {:ok, projects}
  end

  # def create_project(_root, args, _info) do
  #   # TODO: add detailed error message handling later
  #   case Project.create_project(args) do
  #     {:ok, project} ->
  #       {:ok, project}

  #     _error ->
  #       {:error, "could not create user"}
  #   end
  # end
end
