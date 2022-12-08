import React from "react";
import { findByRole, fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<App />);
});

async function addSix() {
  const addButton = screen.getByTestId("add");
  const sixButton = screen.getByTestId("number-6");

  await userEvent.click(sixButton);
  await userEvent.click(addButton);
}

describe("Calculator", () => {
  it("should display a value of 0 on initialization", () => {
    const valueElement = screen.queryByTestId("value");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement?.innerHTML).toEqual("0");
  });
  it("should update the calculation field when a operation and number is pressed", () => {
    const calculationField = screen.getByTestId("calculation");
    const subtractButton = screen.getByTestId("subtract");
    const sixButton = screen.getByTestId("number-6");

    fireEvent.click(sixButton);
    fireEvent.click(subtractButton);

    expect(calculationField.innerHTML).toEqual("0 subtract 6");
  });
  it("should update the valueField when a valid evaluation was performed", async () => {
    const evaluateButton = screen.getByTestId("evaluate");
    await addSix();

    await userEvent.click(evaluateButton);

    const valueField = await screen.findByTestId("value");
    expect(valueField.innerHTML).toEqual("6");
  });
  it("should reset the calculationField to the new value when a valid evaluation was performed", async () => {
    const evaluateButton = screen.getByTestId("evaluate");
    await addSix();

    await userEvent.click(evaluateButton);

    const valueField = await screen.findByTestId("calculation");
    expect(valueField.innerHTML.trim()).toEqual("6");
  });
  it("should clear the value to 0 after performing a calculation", async () => {
    const evaluateButton = screen.getByTestId("evaluate");
    const clearButton = screen.getByTestId("clear");

    await addSix();
    await userEvent.click(evaluateButton);
    await userEvent.click(clearButton);

    const valueField = await screen.findByTestId("value");
    expect(valueField.innerHTML).toEqual("0");
  });
});
