
import { render, screen } from "@testing-library/react";
import App, { storyIds } from "../../App";
import axios from "axios";

jest.mock('axios');
describe("App component with mocked Axios", () => {
  describe("Story view", () => {
    it("should display the story name", async () => {
      const mockStoryDetails = [
        { title: "Story 1", url: "http://example.com/story1", score: 100 },
        { title: "Story 2", url: "http://example.com/story2", score: 200 },
      ];

      // Mock the get function of axios to return the mockStoryDetails responses
      storyIds.forEach((id, index) => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockStoryDetails[index] });
      });
      render(<App />);

      // Check
      await screen.findByText(/Story 1/i);
      await screen.findByText(/Story 2/i);
    });
  });
});