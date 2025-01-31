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

  it("should load all product list items, before filter", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );
    const productCard = await screen.findAllByTestId("product-card");
    expect(productCard.length).toBe(20);
  });

  it("should load product list items, globally after enter the product title filter into the search box", async () => {
    render(
      <Provider store={store}>
        <NavbarComponent />
        <ProductListingComponent />
      </Provider>
    );

    const searchInputElement = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInputElement, "Mens Cotton Jacket");
    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();

    // const searchButton = screen.getByTestId("searchBtn");
    // await userEvent.click(searchButton);

    const productCardsAfterSearch = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsAfterSearch.length).toBe(1);
  });

  it("should load product listitems, globally after clear the product title filter from search box", async () => {
    render(
      <Provider store={store}>
        <NavbarComponent />
        <ProductListingComponent />
      </Provider>
    );

    const searchInputElement = screen.getByPlaceholderText("Search...");
    await userEvent.clear(searchInputElement);

    // const searchButton = screen.getByTestId("searchBtn");
    // await userEvent.click(searchButton);

    const productCardsAfterClearSearch = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsAfterClearSearch.length).toBe(20);
  });

  it("should load product list items, after choose filter category", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );

    const selectElement = screen.getByTestId("category");
    await userEvent.selectOptions(selectElement, "jewelery");

    const selectedOption = screen.getByRole("option", {
      name: "Jewelery",
    }) as HTMLOptionElement;
    expect(selectedOption.selected).toBe(true);

    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButtonElement);

    const afterFilterCategory = await screen.findAllByTestId("product-card");
    expect(afterFilterCategory).toHaveLength(4);
  });

  it("should load product list items, after clear choose category filter", async () => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );

    const selectElement = screen.getByTestId("category");
    await userEvent.selectOptions(selectElement, "");

    const selectedOption = screen.getByRole("option", {
      name: "All",
    }) as HTMLOptionElement;
    expect(selectedOption.selected).toBe(true);

    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButtonElement);

    const clearFilterCategory = await screen.findAllByTestId("product-card");
    expect(clearFilterCategory).toHaveLength(20);
  });

  // input box and coose category filter apply
  it("should load product list items, after choose category & min-price filter", async() => {
    render(
      <Provider store={store}>
        <ProductListingComponent />
      </Provider>
    );

    const selectElement = screen.getByTestId("category");
    await userEvent.selectOptions(selectElement, 'jewelery');

    const selectOptionElement = screen.getByRole('option', {name: 'Jewelery'}) as HTMLOptionElement;
    expect(selectOptionElement.selected).toBe(true);

    const minPriceFilter = screen.getByRole('spinbutton', {  name: /min price/i});
    await userEvent.type(minPriceFilter, '800');

    const filterButtonElement = screen.getByRole('button', {name: 'Filter'});
    await userEvent.click(filterButtonElement);

    const productListFilterItem = await screen.findAllByTestId('product-card');
    expect(productListFilterItem.length).toBe(5);
  });
});
