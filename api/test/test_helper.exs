ExUnit.configure formatters: [ExUnit.CLIFormatter, ExUnitNotifier]

ExUnit.start()
Faker.start()

Ecto.Adapters.SQL.Sandbox.mode(TrelloCloneApi.Repo, :manual)

