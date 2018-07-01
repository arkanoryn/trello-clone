defmodule TrelloCloneApi.Project.Ticket do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  @doc """
    Ticket representating a task that has to be done.

    * column_position: position of the ticket inside the column
    * name: text descripting in a few words what the task is about. Equivalent to a title.
    * description: text area, description of the task.
    * estimation: weight of the task, how long the team estimate the task will take to be resolved.
    * tags: currently a string, will become a list of strings used by team to tag their task.
    * kind: ticket will belong to one of the following kind: #TODO
      - ticket (general, with all data)
      - task (simple task, only the name and the state will be filled; belongs to ticket)
      - milestone (group of multiple tickets)
    * state: state of the ticket #TODO
      - waiting
      - in progress
      - done
      - archived
      - done
  """
  schema "tickets" do
    field(:name, :string)
    field(:description, :string)
    field(:estimation, :integer)
    field(:column_position, :integer)
    field(:tags, :string, default: "")
    field(:kind, :integer)
    field(:state, :integer)

    belongs_to(:board, TrelloCloneApi.Project.Board)
    belongs_to(:column, TrelloCloneApi.Board.Column)

    # Tickets can be nested into each other, future feature, not used atm
    belongs_to(:ticket, TrelloCloneApi.Project.Ticket)
    has_many(:tickets, TrelloCloneApi.Project.Ticket)

    timestamps()
  end

  @casting_fields ~w(kind state name description tags estimation column_position board_id column_id)a
  @required_fields ~w(kind state name description estimation column_position board_id column_id)a

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, @casting_fields)
    |> validate_required(@required_fields)
  end

  def by_column(query, column_id) do
    from(
      c in query,
      where: c.column_id == ^column_id
    )
  end

  def order_by(query, field, direction \\ :asc) do
    values = [{direction, field}]

    from(c in query, order_by: ^values)
  end
end
