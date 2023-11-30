import React from "react";
import { render, screen } from "@testing-library/react";
import App, { storyIds } from "../../App";
import axios from "axios";

describe("App component", () => {
  let axiosSpy: jest.SpyInstance;

  beforeEach(() => {
    axiosSpy = jest.spyOn(axios, "get").mockClear();
  });

  afterAll(() => {
    axiosSpy.mockRestore();
  });

  describe("Story view", () => {
    it("should display the story name", async () => {
      // Build
      const mockStoryDetails = [
        { title: "Story 1", url: "http://example.com/story1", score: 100 },
        { title: "Story 2", url: "http://example.com/story2", score: 200 },
      ];

      // Mock the get function of axios to return the mockStoryDetails responses
      storyIds.forEach((id, index) => {
        axiosSpy.mockResolvedValueOnce({ data: mockStoryDetails[index] });
      });

      render(<App />);

      // Check
      await screen.findByText(/Story 1/i);
      await screen.findByText(/Story 2/i);
    });
  });
});
