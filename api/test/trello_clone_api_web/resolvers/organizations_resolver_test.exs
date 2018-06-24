defmodule TrelloCloneApiWeb.OrganizationsResolverTest do
  use TrelloCloneApiWeb.ConnCase
  alias TrelloCloneApiWeb.AbsintheHelpers

  def sanitize_value(key, val), do: if(key === "id", do: String.to_integer(val), else: val)

  def sanitize_response(response) do
    for {key, val} <- response, into: %{}, do: {String.to_atom(key), sanitize_value(key, val)}
  end

  describe "Organization Resolver" do
    test "allProjects/0 return all projects from db with provided keys (id, name, description) only",
         context do
      project = insert(:project)

      query = """
      {
        allProjects {
          id
          name
          description
        }
      }
      """

      all_projects =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "projects"))
        |> (fn res -> json_response(res, 200)["data"]["allProjects"] end).()
        |> Enum.map(fn project -> sanitize_response(project) end)

      assert Enum.any?(all_projects, fn proj ->
               proj === %{id: project.id, name: project.name, description: project.description}
             end)

      all_projects
      |> Enum.map(fn proj ->
        assert(Enum.sort(Map.keys(proj)) === Enum.sort([:id, :description, :name]))
      end)
    end

    test "allProjects/0 called with invalid key", context do
      query = """
      {
        allProjects {
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

    test "createProject/2 with valid arguments", context do
      attrs = string_params_for(:project)

      query = """
      mutation {
          createProject(
          name: "#{attrs["name"]}",
          description: "#{attrs["description"]}",
        ) {
          id
          name
          description
        }
      }
      """

      project =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createProject"] end).()
        |> sanitize_response()

      assert Map.has_key?(project, :id)
      assert project.name === attrs["name"]
      assert project.description === attrs["description"]
    end

    test "createProject/2 with invalid arguments", context do
      attrs = string_params_for(:project)

      query = """
      mutation {
          createProject(
            name: "#{attrs["name"]}",
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
