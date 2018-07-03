defmodule TrelloCloneApiWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: TrelloCloneApi.Repo

  alias TrelloCloneApiWeb.AccountsResolver
  alias TrelloCloneApiWeb.BoardResolver
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

    field(:boards, list_of(:board), resolve: assoc(:board))
  end

  object :board do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:description, non_null(:string))

    field(:project, :project, resolve: assoc(:project))
  end

  object :column do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:wip_limit, non_null(:integer))
    field(:position, :integer)

    field(:board, :board, resolve: assoc(:board))
    field(:tickets, list_of(non_null(:ticket)))
  end

  input_object :column_params do
    field(:name, :string)
    field(:wip_limit, :integer)
    field(:position, :integer)
  end

  object :ticket do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:description, non_null(:string))
    field(:estimation, non_null(:integer))
    field(:column_position, :integer)
    field(:tags, :string)
    field(:kind, non_null(:integer))
    field(:state, non_null(:integer))

    field(:board, :board, resolve: assoc(:board))
    field(:column, :column, resolve: assoc(:column))
  end

  input_object :ticket_params do
    field(:name, non_null(:string))
    field(:description, non_null(:string))
    field(:estimation, non_null(:integer))
    field(:column_position, :integer)
    field(:tags, :string)
    field(:kind, non_null(:integer))
    field(:state, non_null(:integer))
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

    field(:all_columns, non_null(list_of(non_null(:column)))) do
      arg(:board_id, non_null(:id))

      resolve(&BoardResolver.all_columns/3)
    end

    field(:all_column_tickets, non_null(list_of(non_null(:ticket)))) do
      arg(:column_id, non_null(:id))

      resolve(&BoardResolver.all_column_tickets/3)
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

    field(:create_column, :column) do
      arg(:name, non_null(:string))
      arg(:wip_limit, non_null(:integer))
      arg(:position, :integer)
      arg(:board_id, non_null(:id))

      resolve(&BoardResolver.create_column/3)
    end

    field(:update_column, :column) do
      arg(:id, non_null(:id))
      arg(:column_params, non_null(:column_params))

      resolve(&BoardResolver.update_column/3)
    end

    field(:delete_column, :column) do
      arg(:id, non_null(:id))

      resolve(&BoardResolver.delete_column/3)
    end

    field(:create_ticket, :ticket) do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))
      arg(:estimation, non_null(:integer))
      arg(:column_position, non_null(:integer))
      arg(:tags, :string)
      arg(:kind, non_null(:integer))
      arg(:state, non_null(:integer))
      arg(:board_id, non_null(:id))
      arg(:column_id, non_null(:id))

      resolve(&ProjectResolver.create_ticket/3)
    end

    field(:update_ticket, :ticket) do
      arg(:id, non_null(:id))
      arg(:ticket_params, non_null(:ticket_params))

      resolve(&ProjectResolver.update_ticket/3)
    end

    field(:move_ticket, :ticket) do
      arg(:id, non_null(:id))
      arg(:column_id, non_null(:id))
      arg(:column_position, :integer)

      resolve(&BoardResolver.move_ticket/3)
    end
  end
end
