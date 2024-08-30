import { render, screen } from "@testing-library/react";
import MainMenu from "./mainMenu";
import * as jwtUtils from "../../Utils/jwt";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

// Mock the child components
jest.mock("../../Items/userMenu/userMenu", () => () => <div>UserMenu Component</div>);
jest.mock("../../Items/adminMenu/adminMenu", () => () => <div>AdminMenu Component</div>);

// Mock the JWT utility functions
jest.mock("../../Utils/jwt");

const mockStore = configureStore([]);
const store = mockStore({
  auth: { isLoggedIn: true },
});

describe("<MainMenu />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders 'Please log in' when no user is logged in", () => {
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Please log in/i)).toBeInTheDocument();
  });

  it("renders UserMenu when role is 'user'", async () => {
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(true);
    (jwtUtils.getDecodedToken as jest.Mock).mockResolvedValue({ role: "user" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/UserMenu Component/i)).toBeInTheDocument();
  });

  it("renders AdminMenu when role is 'admin'", async () => {
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(true);
    (jwtUtils.getDecodedToken as jest.Mock).mockResolvedValue({ role: "admin" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/AdminMenu Component/i)).toBeInTheDocument();
  });

  it("renders Logout button when user is logged in", () => {
    (jwtUtils.checkJWT as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});
