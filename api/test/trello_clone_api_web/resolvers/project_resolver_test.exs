defmodule TrelloCloneApiWeb.ProjectResolverTest do
  use TrelloCloneApiWeb.ConnCase
  alias TrelloCloneApiWeb.AbsintheHelpers

  alias TrelloCloneApi.Organization
  alias TrelloCloneApi.Project

  @project_attrs %{
    "name" => Faker.Company.name(),
    "description" => Faker.Company.bs()
  }
  @board_attrs %{
    "name" => Faker.Pokemon.name(),
    "description" => Faker.Company.bs()
  }

  def sanitize_value(key, val), do: if(key === "id", do: String.to_integer(val), else: val)

  def sanitize_response(response) do
    for {key, val} <- response, into: %{}, do: {String.to_atom(key), sanitize_value(key, val)}
  end

  describe "Project Resolver" do
    test "allBoards/0 return all boards attached to project from db with provided keys (id, name, description) only",
         context do
      {:ok, project} = Organization.create_project(@project_attrs)
      {:ok, project_2} = Organization.create_project(@project_attrs)
      {:ok, board_1} = Project.create_board(Map.put(@board_attrs, "project_id", project.id))
      {:ok, board_2} = Project.create_board(Map.put(@board_attrs, "project_id", project.id))

      {:ok, board_3} = Project.create_board(Map.put(@board_attrs, "project_id", project_2.id))

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

    # test "allProjects/0 called with invalid key", context do
    #   {:ok, _project} = Organization.create_project(@project_valid_attr)

    #   query = """
    #   {
    #     allProjects {
    #       id
    #       invalid
    #     }
    #   }
    #   """

    #   res =
    #     context.conn
    #     |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "projects"))

    #   response = json_response(res, 400)
    #   errors = response["errors"]
    #   [e | _] = errors

    #   assert res.status === 400
    #   assert Map.has_key?(response, "errors")
    #   assert String.contains?(e["message"], "invalid")
    # end

    # test "createProject with valid arguments", context do
    #   query = """
    #   mutation {
    #       createProject(
    #       name: "#{@project_valid_attr["name"]}",
    #       description: "#{@project_valid_attr["description"]}",
    #     ) {
    #       id
    #       name
    #       description
    #     }
    #   }
    #   """

    #   project =
    #     context.conn
    #     |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
    #     |> (fn res -> json_response(res, 200)["data"]["createProject"] end).()
    #     |> sanitize_response()

    #   assert Map.has_key?(project, :id)
    #   assert project.name === @project_valid_attr["name"]
    #   assert project.description === @project_valid_attr["description"]
    # end

    # test "createProject with invalid arguments", context do
    #   query = """
    #   mutation {
    #       createProject(
    #         name: "#{@project_valid_attr["name"]}",
    #     ) {
    #       id
    #     }
    #   }
    #   """

    #   response =
    #     context.conn
    #     |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
    #     |> json_response(400)

    #   assert Map.has_key?(response, "errors")
    # end
  end
end
