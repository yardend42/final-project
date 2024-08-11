import { useEffect, useState } from "react";
import "./adminPage.css";
import { Vacation } from "../../Models/vacations";
import axios from "axios";
import SingleVacation from "../../Items/singleVacation/singleVacation";
import { Button } from "@mui/material";

function AdminPage(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [displayedVacations, setDisplayedVacations] = useState<Vacation[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 10; // Number of vacations to display per page

  useEffect(() => {
    fetchAllVacations();
  }, []);

  // Fetch all vacations once
  const fetchAllVacations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vacations/all"
      );
      console.log(response);
      const currentDate = new Date();

      // Filter out expired vacations
      const validVacations = response.data
        .filter(
          (vacation: Vacation) => new Date(vacation.end_date) >= currentDate
        )
        .sort(
          (a: Vacation, b: Vacation) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );

      setVacations(validVacations);
      setDisplayedVacations(validVacations.slice(0, limit));
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const start = (newPage - 1) * limit;
    const end = start + limit;
    setDisplayedVacations(vacations.slice(start, end));
  };

  // Update vacations display after a vacation is deleted
  const handleDeleteVacation = (vacationId: number) => {
    setVacations((prevVacations) =>
      prevVacations.filter((vacation) => vacation.vacation_id !== vacationId)
    );
    setDisplayedVacations((prevVacations) =>
      prevVacations
        .filter((vacation) => vacation.vacation_id !== vacationId)
        .slice(0, page * limit)
    );
  };

  // Update vacations display after a vacation is edited
  const handleEditVacation = () => {
    fetchAllVacations();
  };

  return (
    <div className="vacations">
      <div className="vacationsContainer">
        {displayedVacations.map((item) => (
          <SingleVacation
            key={item.vacation_id}
            vacation={item}
            onDelete={handleDeleteVacation}
            onEdit={handleEditVacation}
          />
        ))}
      </div>
      <div className="paginationButtons">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(page + 1)}
          disabled={page * limit >= vacations.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default AdminPage;
