defmodule TrelloCloneApiWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: TrelloCloneApi.Repo

  alias TrelloCloneApiWeb.AccountsResolver
  alias TrelloCloneApiWeb.OrganizationResolver
  alias TrelloCloneApiWeb.ProjectResolver

  object :user do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
    field(:email, non_null(:string))
  end

  object :project do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:description, non_null(:string))

    field(:boards, list_of(:board))
  end

  object :board do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:description, non_null(:string))

    field(:project, :project, resolve: assoc(:project))
  end

  query do
    field(:all_users, non_null(list_of(non_null(:user)))) do
      resolve(&AccountsResolver.all_users/3)
    end

    field(:all_projects, non_null(list_of(non_null(:project)))) do
      resolve(&OrganizationResolver.all_projects/3)
    end

    field(:get_project, non_null(:project)) do
      arg(:id, non_null(:id))

      resolve(&OrganizationResolver.get_project/3)
    end

    field(:all_boards, non_null(list_of(non_null(:board)))) do
      arg(:project_id, non_null(:id))

      resolve(&ProjectResolver.all_boards/3)
    end
  end

  mutation do
    field(:create_user, :user) do
      arg(:username, non_null(:string))
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&AccountsResolver.create_user/3)
    end

    field(:create_project, :project) do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&OrganizationResolver.create_project/3)
    end

    field(:create_board, :board) do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))
      arg(:project_id, non_null(:id))

      resolve(&ProjectResolver.create_board/3)
    end
  end
end
