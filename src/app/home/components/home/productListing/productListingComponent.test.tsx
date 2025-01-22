import { render, screen } from "@testing-library/react";
import ProductListingComponent from "./productListingComponent";

describe("multiple test cases write here", () => {
  test("render all product heading", () => {
    render(<ProductListingComponent />);
    const headingElement = screen.getByText(/Product Listing/i);
    expect(headingElement).toBeInTheDocument();
  });
});
