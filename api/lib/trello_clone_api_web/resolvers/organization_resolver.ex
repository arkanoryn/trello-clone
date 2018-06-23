defmodule TrelloCloneApiWeb.OrganizationResolver do
  alias TrelloCloneApi.Organization

  def all_projects(_root, _args, _info) do
    projects = Organization.list_projects()
    {:ok, projects}
  end

  def get_project(_root, %{id: id}, _info) do
    project = Organization.get_project!(id)

    {:ok, project}
  end

  def create_project(_root, args, _info) do
    # TODO: add detailed error message handling later
    case Organization.create_project(args) do
      {:ok, project} ->
        {:ok, project}

      _error ->
        {:error, "could not create user"}
    end
  end
end
