defmodule TrelloCloneApi.ProjectTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Project

  describe "boards" do
    alias TrelloCloneApi.Project.Board

    def project_fixture(_attrs \\ %{}) do
      insert(:project)
    end

    def board_fixture(_attrs \\ %{}) do
      insert(:board)
    end

    test "list_boards/1 returns all boards" do
      board = insert(:board)

      assert Project.list_boards(board.project_id) == [board]
    end

    test "get_board!/1 returns the board with given id" do
      board = insert(:board)

      assert Project.get_board!(board.id) == %{
               board
               | project: %Ecto.Association.NotLoaded{
                   __field__: :project,
                   __cardinality__: :one,
                   __owner__: TrelloCloneApi.Project.Board
                 }
             }
    end

    test "create_board/1 with valid data creates a board" do
      project = insert(:project)

      attrs =
        params_for(:board)
        |> Map.put(:project_id, project.id)

      assert {:ok, %Board{} = board} = Project.create_board(attrs)
      assert board.description == attrs.description
      assert board.name == attrs.name
    end

    test "create_board/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = params_for(:board, name: nil) |> Project.create_board()
    end

    test "update_board/2 with valid data updates the board" do
      board = insert(:board)
      attrs = params_for(:board)

      assert {:ok, board} = Project.update_board(board, attrs)
      assert %Board{} = board
      assert board.description == attrs.description
      assert board.name == attrs.name
    end

    test "update_board/2 with invalid data returns error changeset" do
      board = insert(:board)
      attrs = %{description: nil, name: nil}

      assert {:error, %Ecto.Changeset{}} = Project.update_board(board, attrs)

      assert %{
               board
               | project: %Ecto.Association.NotLoaded{
                   __field__: :project,
                   __cardinality__: :one,
                   __owner__: TrelloCloneApi.Project.Board
                 }
             } == Project.get_board!(board.id)
    end

    test "delete_board/1 deletes the board" do
      board = insert(:board)

      assert {:ok, %Board{}} = Project.delete_board(board)
      assert_raise Ecto.NoResultsError, fn -> Project.get_board!(board.id) end
    end

    test "change_board/1 returns a board changeset" do
      board = insert(:board)

      assert %Ecto.Changeset{} = Project.change_board(board)
    end
  end

  describe "tickets" do
    alias TrelloCloneApi.Project.Ticket

    @valid_attrs %{
      column_position: 42,
      description: "some description",
      estimation: 42,
      name: "some name",
      tags: "some tags",
      type: 42
    }
    @update_attrs %{
      column_position: 43,
      description: "some updated description",
      estimation: 43,
      name: "some updated name",
      tags: "some updated tags",
      type: 43
    }
    @invalid_attrs %{
      column_position: nil,
      description: nil,
      estimation: nil,
      name: nil,
      tags: nil,
      type: nil
    }

    def ticket_fixture(attrs \\ %{}) do
      {:ok, ticket} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Project.create_ticket()

      ticket
    end

    test "list_tickets/0 returns all tickets" do
      ticket = ticket_fixture()
      assert Project.list_tickets() == [ticket]
    end

    test "get_ticket!/1 returns the ticket with given id" do
      ticket = ticket_fixture()
      assert Project.get_ticket!(ticket.id) == ticket
    end

    test "create_ticket/1 with valid data creates a ticket" do
      assert {:ok, %Ticket{} = ticket} = Project.create_ticket(@valid_attrs)
      assert ticket.column_position == 42
      assert ticket.description == "some description"
      assert ticket.estimation == 42
      assert ticket.name == "some name"
      assert ticket.tags == "some tags"
      assert ticket.type == 42
    end

    test "create_ticket/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Project.create_ticket(@invalid_attrs)
    end

    test "update_ticket/2 with valid data updates the ticket" do
      ticket = ticket_fixture()
      assert {:ok, ticket} = Project.update_ticket(ticket, @update_attrs)
      assert %Ticket{} = ticket
      assert ticket.column_position == 43
      assert ticket.description == "some updated description"
      assert ticket.estimation == 43
      assert ticket.name == "some updated name"
      assert ticket.tags == "some updated tags"
      assert ticket.type == 43
    end

    test "update_ticket/2 with invalid data returns error changeset" do
      ticket = ticket_fixture()
      assert {:error, %Ecto.Changeset{}} = Project.update_ticket(ticket, @invalid_attrs)
      assert ticket == Project.get_ticket!(ticket.id)
    end

    test "delete_ticket/1 deletes the ticket" do
      ticket = ticket_fixture()
      assert {:ok, %Ticket{}} = Project.delete_ticket(ticket)
      assert_raise Ecto.NoResultsError, fn -> Project.get_ticket!(ticket.id) end
    end

    test "change_ticket/1 returns a ticket changeset" do
      ticket = ticket_fixture()
      assert %Ecto.Changeset{} = Project.change_ticket(ticket)
    end
  end
end
