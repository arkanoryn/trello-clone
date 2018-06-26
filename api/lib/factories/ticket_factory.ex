defmodule TrelloCloneApi.TicketFactory do
  alias TrelloCloneApi.Project.Ticket

  defmacro __using__(_opts) do
    quote do
      def ticket_factory do
        %Ticket{
          name: Faker.StarWars.quote(),
          description: Faker.Lorem.paragraphs(2..3) |> Enum.join("\n"),
          estimation: Enum.random(1..10),
          tags: Faker.Lorem.words(1..3) |> Enum.join(", "),
          column_position: Enum.random(1..10),
          kind: Enum.random(1..4),
          board: build(:board),
          column: build(:column)
        }
      end

      def without_assoc(:ticket) do
        :ticket |> insert |> unload_board |> unload_column
      end

      def unload_board(%Ticket{} = ticket) do
        ticket = Map.put(ticket, :board_id, ticket.board.id)

        %{
          ticket
          | board: %Ecto.Association.NotLoaded{
              __field__: :board,
              __cardinality__: :one,
              __owner__: Ticket
            }
        }
      end

      def unload_column(%Ticket{} = ticket) do
        ticket = Map.put(ticket, :column_id, ticket.column.id)

        %{
          ticket
          | column: %Ecto.Association.NotLoaded{
              __field__: :column,
              __cardinality__: :one,
              __owner__: Ticket
            }
        }
      end
    end
  end
end
