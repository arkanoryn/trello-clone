defmodule TrelloCloneApi.ProjectTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Project

  describe "boards" do
    alias TrelloCloneApi.Project.Board

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

    test "list_tickets/0 returns all tickets" do
      ticket = without_assoc(:ticket)

      assert Project.list_tickets() == [ticket]
    end

    test "get_ticket!/1 returns the ticket with given id" do
      ticket = without_assoc(:ticket)

      assert Project.get_ticket!(ticket.id) == ticket
    end

    test "create_ticket/1 with valid data creates a ticket" do
      attrs = params_for(:ticket, board: insert(:board), column: insert(:column))

      assert {:ok, %Ticket{} = ticket} = Project.create_ticket(attrs)
      assert ticket.column_position == attrs.column_position
      assert ticket.description == attrs.description
      assert ticket.estimation == attrs.estimation
      assert ticket.name == attrs.name
      assert ticket.tags == attrs.tags
      assert ticket.kind == attrs.kind
      assert ticket.board_id == attrs.board_id
      assert ticket.column_id == attrs.column_id
    end

    test "create_ticket/1 with valid data and blank tags creates a ticket" do
      attrs = params_for(:ticket, tags: "", board: insert(:board), column: insert(:column))

      assert {:ok, %Ticket{} = ticket} = Project.create_ticket(attrs)
      assert ticket.tags == ""
    end

    test "create_ticket/1 with valid data and no tags creates a ticket" do
      attrs = params_for(:ticket, tags: nil, board: insert(:board), column: insert(:column))

      assert {:ok, %Ticket{} = ticket} = Project.create_ticket(attrs)
      assert ticket.tags == ""
    end

    test "create_ticket/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Project.create_ticket(%{})
    end

    test "update_ticket/2 with valid data updates the ticket" do
      ticket = without_assoc(:ticket)
      attrs = params_for(:ticket)

      assert {:ok, ticket} = Project.update_ticket(ticket, attrs)
      assert %Ticket{} = ticket
      assert ticket.column_position == attrs.column_position
      assert ticket.description == attrs.description
      assert ticket.estimation == attrs.estimation
      assert ticket.name == attrs.name
      assert ticket.tags == attrs.tags
      assert ticket.kind == attrs.kind
    end

    test "update_ticket/2 with invalid data returns error changeset" do
      ticket = without_assoc(:ticket)

      assert {:error, %Ecto.Changeset{}} = Project.update_ticket(ticket, %{name: nil})
      assert ticket == Project.get_ticket!(ticket.id)
    end

    test "delete_ticket/1 deletes the ticket" do
      ticket = insert(:ticket)

      assert {:ok, %Ticket{}} = Project.delete_ticket(ticket)
      assert_raise Ecto.NoResultsError, fn -> Project.get_ticket!(ticket.id) end
    end

    test "change_ticket/1 returns a ticket changeset" do
      ticket = insert(:ticket)

      assert %Ecto.Changeset{} = Project.change_ticket(ticket)
    end
  end
end
