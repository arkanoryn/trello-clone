defmodule TrelloCloneApiWeb.ProjectResolverTest do
  use TrelloCloneApiWeb.ConnCase
  alias TrelloCloneApiWeb.AbsintheHelpers

  def sanitize_value(key, val) when key === "id", do: String.to_integer(val)
  def sanitize_value(_key, val) when is_map(val), do: sanitize_response(val)
  def sanitize_value(_key, val), do: val

  def sanitize_response(response) do
    for {key, val} <- response, into: %{}, do: {String.to_atom(key), sanitize_value(key, val)}
  end

  describe "Project Resolver" do
    test "allBoards/1 return all boards attached to project from db with provided keys (id, name, description) only",
         context do
      project = insert(:project)
      board_1 = insert(:board, project: project)
      board_2 = insert(:board, project: project)
      board_3 = insert(:board)

      query = """
      {
        allBoards(project_id: #{project.id}) {
          id
          name
          description
        }
      }
      """

      all_boards =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "boards"))
        |> (fn res -> json_response(res, 200)["data"]["allBoards"] end).()
        |> Enum.map(fn board -> sanitize_response(board) end)

      assert Enum.any?(all_boards, fn board ->
               board === %{id: board_1.id, name: board_1.name, description: board_1.description}
             end)

      assert Enum.any?(all_boards, fn board ->
               board === %{id: board_2.id, name: board_2.name, description: board_2.description}
             end)

      assert !Enum.any?(all_boards, fn board ->
               board === %{id: board_3.id, name: board_3.name, description: board_3.description}
             end)

      all_boards
      |> Enum.map(fn board ->
        assert(Enum.sort(Map.keys(board)) === Enum.sort([:id, :description, :name]))
      end)
    end

    test "allBoards/1 called with invalid key", context do
      project = insert(:project)

      query = """
      {
        allBoards(project_id: #{project.id}) {
          id
          invalid
        }
      }
      """

      res =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "projects"))

      response = json_response(res, 400)
      errors = response["errors"]
      [e | _] = errors

      assert res.status === 400
      assert Map.has_key?(response, "errors")
      assert String.contains?(e["message"], "invalid")
    end

    test "createBoard/3 with valid arguments", context do
      project = insert(:project)
      board_params = string_params_for(:board)

      query = """
      mutation {
        createBoard(
          name: "#{board_params["name"]}",
          description: "#{board_params["description"]}",
          projectId: #{project.id}
        ) {
          id
          name
          description
          project {
            id
            name
            description
          }
        }
      }
      """

      board =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createBoard"] end).()
        |> sanitize_response()

      assert Map.has_key?(board, :id)
      assert board.name === board_params["name"]
      assert board.description === board_params["description"]
      assert board.project.id === project.id
      assert board.project.name === project.name
      assert board.project.description === project.description
    end

    test "createBoard/3 with invalid arguments", context do
      query = """
      mutation {
          createProject(
            name: "#{string_params_for(:board)["name"]}",
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
