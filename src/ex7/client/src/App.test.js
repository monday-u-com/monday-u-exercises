import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import '@testing-library/jest-dom'

test("renders learn react link", () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
  );
  const linkElement = screen.getByText(/To-Do App/i);
  expect(linkElement).toBeInTheDocument();
});