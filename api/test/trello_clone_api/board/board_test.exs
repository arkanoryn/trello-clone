defmodule TrelloCloneApi.BoardTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Factory
  alias TrelloCloneApi.Board

  describe "columns" do
    alias TrelloCloneApi.Board.Column

    test "list_columns/0 returns all columns" do
      column = insert(:column) |> Factory.unload_assoc()
      _placebo = insert(:column)

      assert Board.list_columns(column.board_id) == [column]
    end

    test "get_column!/1 returns the column with given id" do
      column = insert(:column) |> Factory.unload_assoc()

      assert Board.get_column!(column.id) == column
    end

    test "create_column/1 with valid data creates a column" do
      attrs = params_for(:column, board: insert(:board))

      assert {:ok, %Column{} = column} = Board.create_column(attrs)
      assert column.name == attrs.name
      assert column.wip_limit == attrs.wip_limit
    end

    test "create_column/1 with invalid data returns error changeset" do
      attrs = %{name: nil, wip_limit: nil}

      assert {:error, %Ecto.Changeset{}} = Board.create_column(attrs)
    end

    test "create_column/1 without board_id returns error changeset" do
      attrs = params_for(:column)

      assert {:error, %Ecto.Changeset{} = changeset} = Board.create_column(attrs)
      assert "can't be blank" in errors_on(changeset).board_id
    end

    test "update_column/2 with valid data updates the column" do
      column = insert(:column)
      attrs = params_for(:column)

      assert {:ok, column} = Board.update_column(column, attrs)
      assert %Column{} = column
      assert column.name == attrs.name
      assert column.wip_limit == attrs.wip_limit
    end

    test "update_column/2 with only one arg updates the column's arg and leave the rest untouched" do
      origin = insert(:column)
      attrs = %{name: Faker.Pokemon.name()}

      assert {:ok, column} = Board.update_column(origin, attrs)
      assert %Column{} = column
      assert column.name == attrs.name
      assert column.wip_limit == origin.wip_limit
    end

    test "update_column/2 with invalid data returns error changeset" do
      column = insert(:column) |> Factory.unload_assoc()
      attrs = %{name: nil, wip_limit: nil}

      assert {:error, %Ecto.Changeset{}} = Board.update_column(column, attrs)
      assert column == Board.get_column!(column.id)
    end

    test "delete_column/1 deletes the column" do
      column = insert(:column)

      assert {:ok, %Column{}} = Board.delete_column(column)
      assert_raise Ecto.NoResultsError, fn -> Board.get_column!(column.id) end
    end

    test "change_column/1 returns a column changeset" do
      column = insert(:column)

      assert %Ecto.Changeset{} = Board.change_column(column)
    end
  end
end
