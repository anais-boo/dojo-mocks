
import { render, screen } from "@testing-library/react";
import App from "../../App";


describe("App component with mocked Axios", () => {
  describe("Story view", () => {
    it("should display the story name", async () => {
      // Build

      render(<App />);

      // Check
      await screen.findByText(/Story 1/i);
      await screen.findByText(/Story 2/i);
    });
  });
});