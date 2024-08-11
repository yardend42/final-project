import "./mainMenu.css";
import { useEffect, useState } from "react";
import { checkJWT, getDecodedToken } from "../../Utils/jwt";
import UserMenu from "../../Items/userMenu/userMenu";
import AdminMenu from "../../Items/adminMenu/adminMenu";
import { useNavigate } from "react-router-dom";
import { store } from "../../Redux/store";
import { logoutAction } from "../../Redux/AuthReducer";
import { Box, Button } from "@mui/material";

function MainMenu(): JSX.Element {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //check if user is logged in
  useEffect(() => {
    const isLoggedIn = checkJWT();
    setIsLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      checkRole();
    } else {
    }
  }, [navigate]);

  const checkRole = async () => {
    const decodedToken = await getDecodedToken();
    setRole(decodedToken.role);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("jwt");
    store.dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className="mainMenu">
      <Box display="flex" alignItems="center">
      {isLoggedIn ? (
          <>
            {role === "admin" && <AdminMenu />}
            {role === "user" && <UserMenu />}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleLogout}
              sx={{ ml: 2, borderRadius: 2 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <p>Please log in</p>
        )}
      </Box>
    </div>
  );
}

export default MainMenu;
