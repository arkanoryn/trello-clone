defmodule TrelloCloneApiWeb.AccountsResolver do
  alias TrelloCloneApi.Accounts

  def all_users(_root, _args, _info) do
    users = Accounts.list_users()
    {:ok, users}
  end

  def create_user(_root, args, _info) do
    # TODO: add detailed error message handling later
    case Accounts.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "could not create user"}
    end
  end
end
