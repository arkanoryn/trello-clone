defmodule TrelloCloneApiWeb.BoardResolverTest do
  use TrelloCloneApiWeb.ConnCase

  alias TrelloCloneApiWeb.AbsintheHelpers
  alias TrelloCloneApi.Factory
  alias TrelloCloneApi.Board

  def sanitize_value(key, val) when key === "id", do: String.to_integer(val)
  def sanitize_value(_key, val) when is_map(val), do: sanitize_response(val)
  def sanitize_value(_key, val), do: val

  def sanitize_response(response) do
    for {key, val} <- response, into: %{}, do: {String.to_atom(key), sanitize_value(key, val)}
  end

  describe "Board resolver" do
    test "allColumns/3 return all columns attached to board with provided keys", context do
      board = insert(:board)
      column_1 = insert(:column, board: board)
      column_2 = insert(:column, board: board)
      column_3 = insert(:column)

      query = """
      {
        allColumns(board_id: #{board.id}) {
          id
          name
          wip_limit
        }
      }
      """

      all_columns =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "columns"))
        |> (fn res -> json_response(res, 200)["data"]["allColumns"] end).()
        |> Enum.map(fn column -> sanitize_response(column) end)

      assert Enum.any?(all_columns, fn column ->
               column === %{
                 id: column_1.id,
                 name: column_1.name,
                 wip_limit: column_1.wip_limit
               }
             end)

      assert Enum.any?(all_columns, fn column ->
               column === %{
                 id: column_2.id,
                 name: column_2.name,
                 wip_limit: column_2.wip_limit
               }
             end)

      assert !Enum.any?(all_columns, fn column ->
               column === %{
                 id: column_3.id,
                 name: column_3.name,
                 wip_limit: column_3.wip_limit
               }
             end)

      all_columns
      |> Enum.map(fn column ->
        assert(Enum.sort(Map.keys(column)) === Enum.sort([:id, :wip_limit, :name]))
      end)
    end

    test "allColumns/3 called with invalid key", context do
      board = insert(:board)

      query = """
      {
        allColumns(board_id: #{board.id}) {
          id
          invalid
        }
      }
      """

      res =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "columns"))

      response = json_response(res, 400)
      errors = response["errors"]
      [e | _] = errors

      assert res.status === 400
      assert Map.has_key?(response, "errors")
      assert String.contains?(e["message"], "invalid")
    end

    test "createColumns/3 with valid arguments", context do
      board = insert(:board)
      column_params = string_params_for(:column)

      query = """
      mutation {
        createColumn(
          name: "#{column_params["name"]}",
          wip_limit: #{column_params["wip_limit"]},
          position: #{column_params["position"]},
          boardId: #{board.id}
        ) {
          id
          name
          wip_limit
          board {
            id
            name
            description
          }
        }
      }
      """

      column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createColumn"] end).()
        |> sanitize_response()

      assert Map.has_key?(column, :id)
      assert column.name === column_params["name"]
      assert column.wip_limit === column_params["wip_limit"]
      assert column.board.id === board.id
      assert column.board.name === board.name
      assert column.board.description === board.description
    end

    test "createColumns/3 with valid arguments but without position", context do
      board = insert(:board)
      column_params = string_params_for(:column)

      query = """
      mutation {
        createColumn(
          name: "#{column_params["name"]}",
          wip_limit: #{column_params["wip_limit"]},
          boardId: #{board.id}
        ) {
          id
          position
        }
      }
      """

      first_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createColumn"] end).()
        |> sanitize_response()

      second_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createColumn"] end).()
        |> sanitize_response()

      third_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createColumn"] end).()
        |> sanitize_response()

      fourth_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createColumn"] end).()
        |> sanitize_response()

      assert Map.has_key?(first_column, :id)
      assert Map.has_key?(second_column, :id)
      assert first_column.position === 0
      assert second_column.position === 1
      assert third_column.position === 2
      assert fourth_column.position === 3
    end

    test "createColumn/3 with invalid arguments", context do
      query = """
      mutation {
          createColumn(
            name: "#{string_params_for(:column)["name"]}",
        ) {
          id
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> json_response(400)

      assert Map.has_key?(response, "errors")
    end

    test "updateColumn/3 with all valid arguments", context do
      column = insert(:column)
      column_params = string_params_for(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
          column_params: {
            name: "#{column_params["name"]}",
            wip_limit: #{column_params["wip_limit"]}
          }
        ) {
          id
          name
          wip_limit
        }
      }
      """

      res_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["updateColumn"] end).()
        |> sanitize_response()

      assert res_column.id === column.id
      assert res_column.name === column_params["name"]
      assert res_column.wip_limit === column_params["wip_limit"]
    end

    test "updateColumn/3 with only the name to update", context do
      column = insert(:column)
      column_params = string_params_for(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
          columnParams: {
            name: "#{column_params["name"]}",
          }
        ) {
          id
          name
          wip_limit
        }
      }
      """

      res_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["updateColumn"] end).()
        |> sanitize_response()

      assert res_column.id === column.id
      assert res_column.name === column_params["name"]
      assert res_column.wip_limit === column.wip_limit
    end

    test "updateColumn/3 with only the wip_limit to update", context do
      column = insert(:column)
      column_params = string_params_for(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
          column_params: {
            wip_limit: #{column_params["wip_limit"]}
          }
        ) {
          id
          name
          wip_limit
        }
      }
      """

      res_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["updateColumn"] end).()
        |> sanitize_response()

      assert res_column.id === column.id
      assert res_column.wip_limit === column_params["wip_limit"]
      assert res_column.name === column.name
    end

    test "updateColumn/3 without empty column", context do
      column = insert(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
          column_params: {
          }
        ) {
          id
          name
          wip_limit
        }
      }
      """

      res_column =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["updateColumn"] end).()
        |> sanitize_response()

      assert res_column.id === column.id
      assert res_column.name === column.name
      assert res_column.wip_limit === column.wip_limit
    end

    test "updateColumn/3 without args", context do
      column = insert(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
        ) {
          id
          name
          wip_limit
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> json_response(400)

      assert Map.has_key?(response, "errors")
    end

    test "updateColumn/3 with invalid args", context do
      column = insert(:column)

      query = """
      mutation {
        updateColumn(
          id: #{column.id},
          column_params: {
            name: 42
          }
        ) {
          id
          name
          wip_limit
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> json_response(400)

      assert Map.has_key?(response, "errors")
    end

    test "deleteColumn/3", context do
      board = insert(:board)
      column = insert(:column, board: board)
      ref_column = insert(:column, board: board) |> Factory.unload_assoc()

      query = """
      mutation {
        deleteColumn(
          id: #{column.id},
        ) {
          id
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["deleteColumn"] end).()

      assert column.id === String.to_integer(response["id"])
      assert Board.list_columns(board.id) === [ref_column]
    end
  end

  describe "tickets" do
    test "moveTicket/3 with only columnId change", context do
      board = insert(:board)
      origin_column = insert(:column, board: board)
      destination_column = insert(:column, board: board)
      ticket = insert(:ticket, column: origin_column)

      query = """
      mutation {
        moveTicket(
          id: #{ticket.id},
          columnId: #{destination_column.id}
        ) {
          id
          column {
            id
          }
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["moveTicket"] end).()
        |> sanitize_response()

      assert response.id === ticket.id
      assert response.column.id === destination_column.id
    end

    test "moveTicket/3 with columnId and position change", context do
      board = insert(:board)
      origin_column = insert(:column, board: board)
      destination_column = insert(:column, board: board)
      new_position = Enum.random(1..4)
      ticket = insert(:ticket, column: origin_column)

      query = """
      mutation {
        moveTicket(
          id: #{ticket.id},
          columnId: #{destination_column.id},
          columnPosition:#{new_position}
        ) {
          id
          columnPosition
          column {
            id
          }
        }
      }
      """

      response =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["moveTicket"] end).()
        |> sanitize_response()

      assert response.id === ticket.id
      assert response.column.id === destination_column.id
      assert response.columnPosition === new_position
    end

    test "all_column_ticket/3 fetch all tickets from column", context do
      column = insert(:column)
      insert(:column)

      other_ticket = insert(:ticket)
      tickets = insert_list(4, :ticket, column: column)

      query = """
      {
        allColumnTickets(column_id: #{column.id}) {
          id
          column {
            id
          }
        }
      }
      """

      all_tickets =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "columnTickets"))
        |> (fn res -> json_response(res, 200)["data"]["allColumnTickets"] end).()
        |> Enum.map(fn ticket -> sanitize_response(ticket) end)

      Enum.map(tickets, fn ticket ->
        assert Enum.any?(all_tickets, fn t -> t.id === ticket.id end)
        assert ticket.column.id === column.id
      end)

      assert !Enum.any?(all_tickets, fn t -> t.id === other_ticket.id end)
      assert other_ticket.column_id !== column.id
    end
  end
end
