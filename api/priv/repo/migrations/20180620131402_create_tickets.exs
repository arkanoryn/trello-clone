defmodule TrelloCloneApi.Repo.Migrations.CreateTickets do
  use Ecto.Migration

  def change do
    create table(:tickets) do
      add(:type, :integer)
      add(:name, :string)
      add(:description, :text)
      add(:tags, :string)
      add(:estimation, :integer)
      add(:column_position, :integer)
      add(:ticket_id, references(:tickets, on_delete: :nothing))
      add(:board_id, references(:boards, on_delete: :nothing))
      add(:column_id, references(:columns, on_delete: :nothing))

      timestamps()
    end

    create(index(:tickets, [:ticket_id]))
    create(index(:tickets, [:board_id]))
    create(index(:tickets, [:column_id]))
  end
end
