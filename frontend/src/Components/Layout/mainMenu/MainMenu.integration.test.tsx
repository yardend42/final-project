import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MainMenu from "./mainMenu";
import * as jwtUtils from "../../Utils/jwt";

// Mock the JWT utility functions
jest.mock("../../Utils/jwt");

const mockStore = configureStore([]);

describe("Integration Test for <MainMenu />", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  it("sets role and renders AdminMenu when an admin is logged in", async () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
    });

    // Mock the JWT utility functions to return an admin role
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(true);
    (jwtUtils.getDecodedToken as jest.Mock).mockResolvedValue({ role: "admin" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Vacations/i)).toBeInTheDocument();
    });
  });

  it("sets role and renders UserMenu when a user is logged in", async () => {
    const store = mockStore({
      auth: { isLoggedIn: true },
    });

    // Mock the JWT utility functions to return a user role
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(true);
    (jwtUtils.getDecodedToken as jest.Mock).mockResolvedValue({ role: "user" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/My Vacations/i)).toBeInTheDocument();
    });
  });

  it("renders 'Please log in' when no user is logged in", () => {
    const store = mockStore({
      auth: { isLoggedIn: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Please log in/i)).toBeInTheDocument();
  });
});
