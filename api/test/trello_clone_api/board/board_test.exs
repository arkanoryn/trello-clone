defmodule TrelloCloneApi.BoardTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Board

  describe "columns" do
    alias TrelloCloneApi.Board.Column

    @valid_attrs %{name: "some name", wip_limit: 42}
    @update_attrs %{name: "some updated name", wip_limit: 43}
    @invalid_attrs %{name: nil, wip_limit: nil}

    def column_fixture(attrs \\ %{}) do
      {:ok, column} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Board.create_column()

      column
    end

    test "list_columns/0 returns all columns" do
      column = column_fixture()
      assert Board.list_columns() == [column]
    end

    test "get_column!/1 returns the column with given id" do
      column = column_fixture()
      assert Board.get_column!(column.id) == column
    end

    test "create_column/1 with valid data creates a column" do
      assert {:ok, %Column{} = column} = Board.create_column(@valid_attrs)
      assert column.name == "some name"
      assert column.wip_limit == 42
    end

    test "create_column/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Board.create_column(@invalid_attrs)
    end

    test "update_column/2 with valid data updates the column" do
      column = column_fixture()
      assert {:ok, column} = Board.update_column(column, @update_attrs)
      assert %Column{} = column
      assert column.name == "some updated name"
      assert column.wip_limit == 43
    end

    test "update_column/2 with invalid data returns error changeset" do
      column = column_fixture()
      assert {:error, %Ecto.Changeset{}} = Board.update_column(column, @invalid_attrs)
      assert column == Board.get_column!(column.id)
    end

    test "delete_column/1 deletes the column" do
      column = column_fixture()
      assert {:ok, %Column{}} = Board.delete_column(column)
      assert_raise Ecto.NoResultsError, fn -> Board.get_column!(column.id) end
    end

    test "change_column/1 returns a column changeset" do
      column = column_fixture()
      assert %Ecto.Changeset{} = Board.change_column(column)
    end
  end
end
