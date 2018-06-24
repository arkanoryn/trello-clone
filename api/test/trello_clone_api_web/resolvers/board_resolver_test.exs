defmodule TrelloCloneApiWeb.BoardResolverTest do
  use TrelloCloneApiWeb.ConnCase

  alias TrelloCloneApiWeb.AbsintheHelpers

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
  end
end
