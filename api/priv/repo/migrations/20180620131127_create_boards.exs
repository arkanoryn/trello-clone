defmodule TrelloCloneApi.Repo.Migrations.CreateBoards do
  use Ecto.Migration

  def change do
    create table(:boards) do
      add :name, :string
      add :description, :text
      add :project_id, references(:projects, on_delete: :nothing)

      timestamps()
    end

    create index(:boards, [:project_id])
  end
end
