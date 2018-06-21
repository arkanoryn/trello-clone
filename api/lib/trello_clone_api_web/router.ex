defmodule TrelloCloneApiWeb.Router do
  use TrelloCloneApiWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  # scope "/api", TrelloCloneApiWeb do
  #   pipe_through(:api)
  # end

  forward("/api", Absinthe.Plug, schema: TrelloCloneApiWeb.Schema)

  forward(
    "/graphiql",
    Absinthe.Plug.GraphiQL,
    schema: TrelloCloneApiWeb.Schema,
    interface: :simple,
    context: %{pubsub: TrelloCloneApiWeb.Endpoint}
  )
end
