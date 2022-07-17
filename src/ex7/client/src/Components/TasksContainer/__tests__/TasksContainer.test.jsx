import renderer from "react-test-renderer";
import TasksContainer from "../TasksContainer";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const taskFactory = (tasks) => {
  if (tasks)
    return tasks.map((task) => {
      return { itemName: task, status: false };
    });
  else return [];
};

test("renders with no tasks", () => {
  const todoList = taskFactory();
  const marked = { marked: false, unmarked: false };
  const componentJSON = renderer
    .create(
      <Provider store={store}>
        <TasksContainer todoList={todoList} searchInput={""} marked={marked} />
      </Provider>
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

test("renders with 1 task", () => {
  const todoList = taskFactory(["task1"]);
  const marked = { marked: false, unmarked: false };
  const componentJSON = renderer
    .create(
      <Provider store={store}>
        <TasksContainer todoList={todoList} searchInput={""} marked={marked} />
      </Provider>
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

test("renders with multiple tasks", () => {
  const todoList = taskFactory(["task1", "task2", "task3", "task4"]);
  const marked = { marked: false, unmarked: false };
  const componentJSON = renderer
    .create(
      <Provider store={store}>
        <TasksContainer todoList={todoList} searchInput={""} marked={marked} />
      </Provider>
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

test("renders with no tasks and filterMarked is true", () => {
  const todoList = taskFactory();
  const marked = { marked: true, unmarked: false };
  const componentJSON = renderer
    .create(
      <Provider store={store}>
        <TasksContainer todoList={todoList} searchInput={""} marked={marked} />
      </Provider>
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

test("renders with no tasks and filterUnmarked is true", () => {
  const todoList = taskFactory();
  const marked = { marked: false, unmarked: true };
  const componentJSON = renderer
    .create(
      <Provider store={store}>
        <TasksContainer todoList={todoList} searchInput={""} marked={marked} />
      </Provider>
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

//Integration tests - send 2 items to the

const items = [
  {
    itemName: "Take dog out for a walk",
    status: false,
  },
  {
    itemName: "Do the dishes",
    status: true,
  },
];

//Integration tests - send 2 items to the
describe("TasksContainer with the items", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <TasksContainer filteredTodoList={items}/>
      </Provider>
    );
    const items1 = items[0];
    const items2 = items[1];
    const taskElement1 = screen.getByText(items1.itemName);
    const taskElement2 = screen.getByText(items2.itemName);

    expect(taskElement1).toBeInTheDocument();
    expect(taskElement2).toBeInTheDocument();
  });
});

