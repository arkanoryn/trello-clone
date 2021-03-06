defmodule TrelloCloneApiWeb.ChannelCase do
  @moduledoc """
  This module defines the test case to be used by
  channel tests.

  Such tests rely on `Phoenix.ChannelTest` and also
  import other functionality to make it easier
  to build common datastructures and query the data layer.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with channels
      use Phoenix.ChannelTest

      import TrelloCloneApi.Factory

      # The default endpoint for testing
      @endpoint TrelloCloneApiWeb.Endpoint
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(TrelloCloneApi.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(TrelloCloneApi.Repo, {:shared, self()})
    end

    :ok
  end
end
