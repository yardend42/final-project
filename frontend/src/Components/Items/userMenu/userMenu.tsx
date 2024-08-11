import { Button } from "@mui/material";
import "./userMenu.css";
import { useNavigate } from "react-router-dom";

function UserMenu(): JSX.Element {
  const navigate = useNavigate();

  const buttonStyle = {
    color: "#ffffff",
  };

  return (
    <div className="userMenu">
      <Button
        variant="text"
        onClick={() => navigate("/vacations")}
        style={buttonStyle}
      >
        My Vacations
      </Button>
    </div>
  );
}
export default UserMenu;
