defmodule TrelloCloneApi.ColumnFactory do
  alias TrelloCloneApi.Board.Column

  defmacro __using__(_opts) do
    quote do
      def column_factory do
        %Column{
          name: Faker.Pokemon.location(),
          wip_limit: Enum.random(0..42),
          board: build(:board)
        }
      end

      def unload_assoc(column) do
        column = Map.put(column, :board_id, column.board.id)

        %{
          column
          | board: %Ecto.Association.NotLoaded{
              __field__: :board,
              __cardinality__: :one,
              __owner__: Column
            }
        }
      end
    end
  end
end
