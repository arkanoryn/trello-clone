defmodule TrelloCloneApi.Repo.Migrations.CreateColumns do
  use Ecto.Migration

  def change do
    create table(:columns) do
      add(:name, :string)
      add(:wip_limit, :integer)
      add(:position, :integer)
      add(:board_id, references(:boards, on_delete: :nothing))

      timestamps()
    end

    create(index(:columns, [:board_id]))
  end
end
