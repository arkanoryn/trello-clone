defmodule TrelloCloneApi.OrganizationTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Organization

  describe "projects" do
    alias TrelloCloneApi.Organization.Project

    test "list_projects/0 returns all projects" do
      project = insert(:project)

      assert Organization.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = insert(:project)

      assert Organization.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      attrs = params_for(:project)

      assert {:ok, %Project{} = project} = Organization.create_project(attrs)
      assert project.description == attrs.description
      assert project.name == attrs.name
    end

    test "create_project/1 with invalid data returns error changeset" do
      attrs = params_for(:project, name: nil)

      assert {:error, %Ecto.Changeset{}} = Organization.create_project(attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = insert(:project)

      attrs =
        params_for(
          :project,
          name: Faker.Pokemon.name(),
          description: Faker.Lorem.paragraph(10..12)
        )

      assert {:ok, project} = Organization.update_project(project, attrs)
      assert %Project{} = project
      assert project.name == attrs.name
      assert project.description == attrs.description
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = insert(:project)
      attrs = %{name: nil, description: nil}

      assert {:error, %Ecto.Changeset{}} = Organization.update_project(project, attrs)
      assert project == Organization.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = insert(:project)

      assert {:ok, %Project{}} = Organization.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Organization.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = insert(:project)
      assert %Ecto.Changeset{} = Organization.change_project(project)
    end
  end
end
