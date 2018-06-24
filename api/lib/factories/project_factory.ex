defmodule TrelloCloneApi.ProjectFactory do
  alias TrelloCloneApi.Organization.Project

  defmacro __using__(_opts) do
    quote do
      def project_factory do
        %Project{
          name: Faker.Pokemon.name(),
          description: Faker.Lorem.paragraph()
        }
      end
    end
  end
end
