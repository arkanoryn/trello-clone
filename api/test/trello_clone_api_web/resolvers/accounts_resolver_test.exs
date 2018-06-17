require IEx

defmodule TrelloCloneApiWeb.NoteResolverTest do
  use TrelloCloneApiWeb.ConnCase
  alias TrelloCloneApiWeb.AbsintheHelpers

  alias TrelloCloneApi.Accounts

  @user %{"username" => "john@test.com", "email" => "john@test.com", "password" => "password"}

  def sanitize_value(key, val), do: if(key === "id", do: String.to_integer(val), else: val)

  def sanitize_response(response) do
    for {key, val} <- response, into: %{}, do: {String.to_atom(key), sanitize_value(key, val)}
  end

  describe "Accounts Resolver" do
    test "allUsers/0 return all users from db with provided keys (id, username, email) only",
         context do
      {:ok, user} = Accounts.create_user(@user)

      query = """
      {
        allUsers {
          id
          username
          email
        }
      }
      """

      all_users =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "users"))
        |> (fn res -> json_response(res, 200)["data"]["allUsers"] end).()
        |> Enum.map(fn user -> sanitize_response(user) end)

      assert Enum.any?(all_users, fn usr ->
               usr === %{id: user.id, username: user.username, email: user.email}
             end)

      all_users
      |> Enum.map(fn usr ->
        assert(Enum.sort(Map.keys(usr)) === Enum.sort([:id, :email, :username]))
      end)
    end

    test "allUsers/0 return all users from db with provided keys (id, username) only", context do
      {:ok, user} = Accounts.create_user(@user)

      query = """
      {
        allUsers {
          id
          username
        }
      }
      """

      all_users =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "users"))
        |> (fn res -> json_response(res, 200)["data"]["allUsers"] end).()
        |> Enum.map(fn user -> sanitize_response(user) end)

      assert Enum.any?(all_users, fn usr ->
               usr === %{id: user.id, username: user.username}
             end)

      all_users
      |> Enum.map(fn usr -> assert(Enum.sort(Map.keys(usr)) === Enum.sort([:id, :username])) end)
    end

    test "allUsers/0 called with invalid key", context do
      {:ok, _user} = Accounts.create_user(@user)

      query = """
      {
        allUsers {
          id
          username
          invalid
        }
      }
      """

      res =
        context.conn
        |> post("/graphiql", AbsintheHelpers.query_skeleton(query, "users"))

      response = json_response(res, 400)
      errors = response["errors"]
      [e | _] = errors

      assert res.status === 400
      assert Map.has_key?(response, "errors")
      assert String.contains?(e["message"], "invalid")
    end

    test "createUser with valid arguments", context do
      query = """
      mutation {
          createUser(
          username: "#{@user["username"]}",
          email: "#{@user["email"]}",
          password: "#{@user["password"]}",
        ) {
          id
          username
          email
        }
      }
      """

      user =
        context.conn
        |> post("/graphiql", AbsintheHelpers.mutation_skeleton(query))
        |> (fn res -> json_response(res, 200)["data"]["createUser"] end).()
        |> sanitize_response()

      assert Map.has_key?(user, :id)
      assert !Map.has_key?(user, :password)
      assert user.username === @user["username"]
      assert user.email === @user["email"]
    end

    test "createUser with invalid arguments", context do
      query = """
      mutation {
          createUser(
          username: "#{@user["username"]}",
          email: "#{@user["email"]}",
        ) {
          id
          username
          email
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
