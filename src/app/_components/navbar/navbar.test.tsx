import { render, screen } from "@testing-library/react";
import NavbarComponent from "./navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import allProductListData from "@/../public/mockJestData/allProductListData.json";
import userEvent from "@testing-library/user-event";
import ProductListingComponent from "@/app/home/components/home/productListing/productListingComponent";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(allProductListData),
    });
  }) as jest.Mock;
});

describe("********* Load NavbarComponent & Fetch API Call *********", () => {
  it("should be match cart tab text", () => {
    render(
      <Provider store={store}>
        <NavbarComponent />
      </Provider>
    );
    const textElement = screen.getByText("Cart (0)");
    expect(textElement).toBeInTheDocument();
  });

  it("should load all product list items before filter", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );
    const productCard = await screen.findAllByTestId("product-card");
    expect(productCard.length).toBe(20);
  });

  it("should load product list items after enter the product title filter into the search box", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );

    const searchInputElement = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInputElement, "Mens Cotton Jacket");
    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();

    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButtonElement);

    const productCardsAfterSearch = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsAfterSearch.length).toBe(1);
  });

  it("should load product list after clear the product title filter from search box", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );
    const searchInputElement = screen.getByPlaceholderText("Search...");
    await userEvent.clear(searchInputElement);

    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButtonElement);

    const productCardsAfterClearSearch = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsAfterClearSearch.length).toBe(20);
  });

  it("should load product list items after choose filter category", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );

    const selectElement = screen.getByTestId("category");
    await userEvent.selectOptions(selectElement, "jewelery");

    const selectedOption = screen.getByRole("option", { name: "Jewelery" });
    expect(selectedOption.selected).toBe(true);

    const beforeFilterCategory = await screen.findAllByTestId("product-card");
    expect(beforeFilterCategory).toHaveLength(20);

    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButtonElement);

    const afterFilterCategory = await screen.findAllByTestId("product-card");
    expect(afterFilterCategory).toHaveLength(4);
  });
});
