# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

if Mix.env() == :dev do
  config :mix_test_watch,
    clear: true
end

# General application configuration
config :trello_clone_api,
  ecto_repos: [TrelloCloneApi.Repo]

# Configures the endpoint
config :trello_clone_api, TrelloCloneApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "yu3UC0NUSRbgx3y3w2VW+wYN9lbjoIocSGYdSsjNh0nBcHevckUpMJAVgLe1KWKC",
  render_errors: [view: TrelloCloneApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: TrelloCloneApi.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
