import { Button } from "@mui/material";
import "./adminMenu.css";
import { useNavigate } from "react-router-dom";

function AdminMenu(): JSX.Element {
  const navigate = useNavigate();

  const buttonStyle = {
    color: "#ffffff",
  };

  return (
    <div className="adminMenu">
      <Button
        variant="text"
        onClick={() => navigate("/adminPage")}
        style={buttonStyle}
      >
        Vacations
      </Button>{" "}
      <Button
        variant="text"
        onClick={() => navigate("/addVacation")}
        style={buttonStyle}
      >
        Add Vacation
      </Button>
      <Button
        variant="text"
        onClick={() => navigate("/reports")}
        style={buttonStyle}
      >
        Reports
      </Button>
    </div>
  );
}

export default AdminMenu;
