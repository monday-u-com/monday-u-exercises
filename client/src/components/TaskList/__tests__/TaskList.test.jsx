import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import { Provider } from "react-redux";
import { store } from "../../../store";
import "@testing-library/jest-dom/extend-expect";

const tasks = [
   {
      id: 56,
      text: "Take dog out for a walk",
      status: false,
   },
   {
      id: 32,
      text: "Do the dishes",
      status: true,
   },
];

describe("TaskList", () => {
   test("should render both items (one done and one not)", () => {
      render(
         <Provider store={store}>
            <TaskList tasksToDisplay={tasks} getAPITasksAction={jest.fn(() => tasks)} />
         </Provider>
      );
      const task1 = screen.getByText("Take dog out for a walk");
      const task2 = screen.getByText("Do the dishes");

      const falsyCheckbox = screen.getByTestId(tasks[0].id);
      const trueCheckbox = screen.getByTestId(tasks[1].id);

      expect(task1).toBeInTheDocument();
      expect(falsyCheckbox.checked).toEqual(false);
      expect(task2).toBeInTheDocument();
      expect(trueCheckbox.checked).toEqual(true);
   });

   test("should call getAPITasksAction function", () => {
      const getAPITasksAction = jest.fn(() => tasks);
      render(
         <Provider store={store}>
            <TaskList tasksToDisplay={tasks} getAPITasksAction={getAPITasksAction} />
         </Provider>
      );
      expect(getAPITasksAction).toHaveBeenCalled();
   });
});
