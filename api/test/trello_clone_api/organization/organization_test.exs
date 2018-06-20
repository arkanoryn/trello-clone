defmodule TrelloCloneApi.OrganizationTest do
  use TrelloCloneApi.DataCase

  alias TrelloCloneApi.Organization

  describe "projects" do
    alias TrelloCloneApi.Organization.Project

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def project_fixture(attrs \\ %{}) do
      {:ok, project} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Organization.create_project()

      project
    end

    test "list_projects/0 returns all projects" do
      project = project_fixture()
      assert Organization.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = project_fixture()
      assert Organization.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      assert {:ok, %Project{} = project} = Organization.create_project(@valid_attrs)
      assert project.description == "some description"
      assert project.name == "some name"
    end

    test "create_project/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Organization.create_project(@invalid_attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = project_fixture()
      assert {:ok, project} = Organization.update_project(project, @update_attrs)
      assert %Project{} = project
      assert project.description == "some updated description"
      assert project.name == "some updated name"
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = project_fixture()
      assert {:error, %Ecto.Changeset{}} = Organization.update_project(project, @invalid_attrs)
      assert project == Organization.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = project_fixture()
      assert {:ok, %Project{}} = Organization.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Organization.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = project_fixture()
      assert %Ecto.Changeset{} = Organization.change_project(project)
    end
  end
end
