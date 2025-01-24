import { render, screen } from "@testing-library/react";
import NavbarComponent from "./navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import allProductListData from "@/../public/mockJestData/allProductListData.json";
import HomePage from "@/app/home/page";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(allProductListData);
    },
  });
}) as jest.Mock;

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
        <HomePage />
      </Provider>
    );
    const productCard = await screen.findAllByTestId("product-card");
    expect(productCard.length).toBe(20);
  });

  it("should load product list items after enter the product title filter", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const productCardsBeforeFilter = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsBeforeFilter.length).toBe(20);
    const searchInputElement = screen.getByPlaceholderText("Search...");
    const filterButtonElement = screen.getByRole("button", { name: "Filter" });
    await userEvent.type(searchInputElement, "Mens Cotton Jacket");
    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
    await userEvent.click(filterButtonElement);
    const productCardsAfterSearch = await screen.findAllByTestId(
      "product-card"
    );
    expect(productCardsAfterSearch.length).toBe(1);
  });

  // it("should load product list items after choose filter category", async () => {
  //   render(
  //     <Provider store={store}>
  //       <HomePage />
  //     </Provider>
  //   );

  //   const productCardsBeforeFilter = await screen.findAllByTestId(
  //     "product-card"
  //   );
  //   expect(productCardsBeforeFilter.length).toBe(20);

  //   // const filterButtonElement = screen.getByRole("button", { name: "Filter" });
  //   // expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
  //   // await userEvent.click(filterButtonElement);
  //   // const productCardsAfterSearch = screen.getAllByTestId("product-card");

  //   // expect(productCardsAfterSearch).toHaveLength(1);
  // });
});
