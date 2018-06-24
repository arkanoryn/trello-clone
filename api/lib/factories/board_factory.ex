defmodule TrelloCloneApi.BoardFactory do
  alias TrelloCloneApi.Project.Board

  defmacro __using__(_opts) do
    quote do
      def board_factory do
        %Board{
          name: Faker.Pokemon.name(),
          description: Faker.Lorem.paragraph(),
          project: build(:project)
        }
      end
    end
  end
end
