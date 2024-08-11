import "./Header.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MainMenu from "../mainMenu/mainMenu";
import { AuthState } from "../../Redux/AuthReducer";
import { useSelector } from "react-redux";

function Header(): JSX.Element {
  const name = useSelector((state: { auth: AuthState }) => state.auth.name);

  return (
    <div className="Header">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
            <AirplanemodeActiveIcon sx={{ marginRight: 1 }} />
            Welcome {name}
          </Typography>
          <MainMenu/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
