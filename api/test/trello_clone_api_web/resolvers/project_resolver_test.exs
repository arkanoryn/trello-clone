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

  describe "ticket related resolver" do
    test "create_tickets/3 with valid arguments", context do
      board = insert(:board)
      column = insert(:column, board: board)
      ticket_params = string_params_for(:ticket)

      query = """
      mutation {
        createTicket(
          name: "#{ticket_params["name"]}",
          description: "#{ticket_params["name"]}",
          estimation: #{ticket_params["estimation"]},
          columnPosition: #{ticket_params["column_position"]},
          tags: "#{ticket_params["tags"]}",
          kind: #{ticket_params["kind"]},
          state: #{ticket_params["state"]},
          boardId: #{board.id},
          columnId: #{column.id}
        ) {
          id
          name
          description
          estimation
          columnPosition
          tags
          kind
          tags
          state
          board {
            id
          }
          column {
            id
          }
        }
      }
      """

      ticket =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createTicket"] end).()
        |> sanitize_response()

      assert Map.has_key?(ticket, :id)
      assert ticket.name === ticket_params["name"]
      assert ticket.description === ticket_params["name"]
      assert ticket.estimation === ticket_params["estimation"]
      assert ticket.columnPosition === ticket_params["column_position"]
      assert ticket.tags === ticket_params["tags"]
      assert ticket.kind === ticket_params["kind"]
      assert ticket.state === ticket_params["state"]
      assert ticket.board.id === board.id
      assert ticket.column.id === column.id
    end

    test "update_tickets/3 with valid arguments", context do
      ticket = insert(:ticket)
      ticket_params = string_params_for(:ticket)

      query = """
      mutation {
        updateTicket(
          id: #{ticket.id},
          ticket_params: {
            name: "#{ticket_params["name"]}",
            description: "#{ticket_params["name"]}",
            estimation: #{ticket_params["estimation"]},
            columnPosition: #{ticket_params["column_position"]},
            tags: "#{ticket_params["tags"]}",
            kind: #{ticket_params["kind"]},
            state: #{ticket_params["state"]},
          }
        ) {
          id
          name
          description
          estimation
          columnPosition
          tags
          kind
          tags
          state
          board {
            id
          }
          column {
            id
          }
        }
      }
      """

      updated_ticket =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["updateTicket"] end).()
        |> sanitize_response()

      assert updated_ticket.id === ticket.id
      assert updated_ticket.name === ticket_params["name"]
      assert updated_ticket.description === ticket_params["name"]
      assert updated_ticket.estimation === ticket_params["estimation"]
      assert updated_ticket.columnPosition === ticket_params["column_position"]
      assert updated_ticket.tags === ticket_params["tags"]
      assert updated_ticket.kind === ticket_params["kind"]
      assert updated_ticket.state === ticket_params["state"]
      assert updated_ticket.board.id === ticket.board.id
      assert updated_ticket.column.id === ticket.column.id
    end
  end
end
