import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import mockAxios from "jest-mock-axios";

describe("App component", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("Story view", () => {
    it("contains a title 'Top Stories from Hacker News'", () => {
      //build
      render(<App />);
      //check
      const headingElement = screen.getByText("Top Stories from Hacker News");
      expect(headingElement).toBeInTheDocument();
    });

    it("should display the story name", async () => {
      // build
      const mockStoryIds = [1, 2];
      const mockStoryDetails = [
        { title: "Story 1", url: "http://example.com/story1", score: 100 },
        { title: "Story 2", url: "http://example.com/story2", score: 200 },
      ];

      // Mock the get function of axios to return the mockStoryIds response
      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockStoryIds });

      // Mock the get function of axios to return the mockStoryDetails responses
      mockStoryIds.forEach((id, index) => {
        jest
          .spyOn(axios, "get")
          .mockResolvedValueOnce({ data: mockStoryDetails[index] });
      });

      render(<App />);

      // check
      await screen.findByText(/Story 1/i);
      await screen.findByText(/Story 2/i);
    });

    it("should navigate to the story link when clicked", () => {
      // build
      // operate
      // check
    });

    it("should write a 🔥 emoji besides the title if the story has a score higher than 100", () => {
      // build
      // operate
      // check
    });

    it("should not write a 🔥 emoji besides the title if the story has a score lower than 100", () => {
      // build
      // operate
      // check
    });
  });

  describe("Data fetching", () => {
    it("should fetch the top Hacker News stories with details", () => {
      // build
      // operate
      // check
    });

    it("should limit to 10 stories", () => {
      // build
      // operate
      // check
    });
  });
});
