import React from "react";
import { render, screen } from "@testing-library/react";
import { Hello } from "../src/Hello";
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("Hello Component", () => {
  it("should render a list of post titles", async () => {
    const posts = [
      {
        id: 1,
        title: "First Post",
      },
      {
        id: 2,
        title: "Second Post",
      },
    ];
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: posts }));
    render(<Hello />);

    screen.debug();

    const liElements = await screen.findAllByTestId("post");
    const firstTitle = await screen.findByText("First Post");
    expect(firstTitle).toBeInTheDocument();
    expect(liElements).toHaveLength(2);
  });
  it("should render a list of post titles", async () => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<Hello />);

    const error = await screen.findByText("Something went wrong");
    // expect(firstTitle).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
  // it("should render Hello there when greeting prop is hello", () => {
  //   render(<Hello greeting="hello" />);

  //   const hello = screen.queryByText("Hello there");
  //   const bye = screen.queryByText("Goodbye");
  //   expect(hello).toBeInTheDocument();
  //   expect(bye).toBeNull();
  // });
  // it("should render Goodbye when greeting prop is bye", () => {
  //   render(<Hello greeting="bye" />);
  //   screen.debug();
  //   const result = screen.queryByText("Goodbye");
  //   expect(result).toBeInTheDocument();
  // });
});
