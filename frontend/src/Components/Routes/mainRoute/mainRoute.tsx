import MainPage from "../../Layout/mainPage/mainPage";
import Page404 from "../../Pages/page404/page404";
import VacationsPage from "../../Pages/vacationsPage/vacationsPage";
import LoginPage from "../../Pages/loginPage/loginPage";
import RegisterPage from "../../Pages/registerPage/registerPage";
import AdminPage from "../../Pages/adminPage/adminPage";
import AddVacation from "../../Pages/addVacation/addVacation";
import VacationReports from "../../Pages/vacationReports/vacationReports";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function MainRoute(): JSX.Element {
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/adminPage"
          element={
            <PrivateRoute
              requiredRole="admin"
              element={<AdminPage />}
              path="/adminPage"
            />
          }
        />
        <Route
          path="/vacations"
          element={
            <PrivateRoute
              requiredRole="user"
              element={<VacationsPage />}
              path="/vacations"
            />
          }
        />
        <Route
          path="/addVacation"
          element={
            <PrivateRoute
              requiredRole="admin"
              element={<AddVacation />}
              path="/addVacation"
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/reports"
          element={
            <PrivateRoute
              requiredRole="admin"
              element={<VacationReports />}
              path="/reports"
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
