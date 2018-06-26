defmodule TrelloCloneApi.Board do
  @moduledoc """
  The Board context.
  """

  import Ecto.Query, warn: false
  alias TrelloCloneApi.Repo

  alias TrelloCloneApi.Board.Column

  @doc """
  Returns the list of columns.

  ## Examples

  iex> list_columns()
  [%Column{}, ...]

  """
  require IEx

  def list_columns(board_id, %{order_by: [field, direction]}) do
    Column
    |> Column.by_board(board_id)
    |> Column.order_by(field, direction)
    |> Repo.all()
  end

  def list_columns(board_id) do
    Column
    |> Column.by_board(board_id)
    |> Repo.all()
  end

  @doc """
  Gets a single column.

  Raises `Ecto.NoResultsError` if the Column does not exist.

  ## Examples

      iex> get_column!(123)
      %Column{}

      iex> get_column!(456)
      ** (Ecto.NoResultsError)

  """
  def get_column!(id), do: Repo.get!(Column, id)

  @doc """
  Creates a column.

  ## Examples

      iex> create_column(%{field: value})
      {:ok, %Column{}}

      iex> create_column(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_column(attrs \\ %{}) do
    %Column{}
    |> Column.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a column.

  ## Examples

      iex> update_column(column, %{field: new_value})
      {:ok, %Column{}}

      iex> update_column(column, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_column(%Column{} = column, attrs) do
    column
    |> Column.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Column.

  ## Examples

      iex> delete_column(column)
      {:ok, %Column{}}

      iex> delete_column(column)
      {:error, %Ecto.Changeset{}}

  """
  def delete_column(%Column{} = column) do
    Repo.delete(column)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking column changes.

  ## Examples

      iex> change_column(column)
      %Ecto.Changeset{source: %Column{}}

  """
  def change_column(%Column{} = column) do
    Column.changeset(column, %{})
  end
end
