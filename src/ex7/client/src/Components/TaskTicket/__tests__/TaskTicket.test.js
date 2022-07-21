import renderer from "react-test-renderer";
import TaskTicket from "../TaskTicket";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
configure({ adapter: new Adapter() });

const createTask = (task, status) => {
  return { itemName: task, status: status };
};

test("renders task with static:false", () => {
  const deleteTaskAction = jest.fn(() => {});
  const updateTaskAction = jest.fn(() => {});
  const newTask = createTask("TestTaskTicketComponent", false);
  const componentJSON = renderer
    .create(
      <TaskTicket
        task={newTask}
        deleteTaskAction={deleteTaskAction}
        updateTaskAction={updateTaskAction}
      />
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

test("renders task with static:true", () => {
  const deleteTaskAction = jest.fn(() => {});
  const updateTaskAction = jest.fn(() => {});
  const newTask = createTask("TestTaskTicketComponent", true);
  const componentJSON = renderer
    .create(
      <TaskTicket
        task={newTask}
        deleteTaskAction={deleteTaskAction}
        updateTaskAction={updateTaskAction}
      />
    )
    .toJSON();

  expect(componentJSON).toMatchSnapshot();
});

describe("spyOn function", () => {
  test("click it", () => {
    const deleteTaskAction = jest.fn(() => {});
    const updateTaskAction = jest.fn(() => {});
    const newTask = createTask("TestTaskTicketComponent", true);
    const wrapper =
      mount(
        <TaskTicket
          task={newTask}
          deleteTaskAction={deleteTaskAction}
          updateTaskAction={updateTaskAction}
        />
      );
    wrapper.find(".delete").at(0).simulate("click");
    expect(deleteTaskAction).toHaveBeenCalledTimes(1);
  });
});
