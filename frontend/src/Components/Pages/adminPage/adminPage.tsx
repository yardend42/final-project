import { useEffect, useState } from "react";
import "./adminPage.css";
import { Vacation } from "../../Models/vacations";
import axios from "axios";
import SingleVacation from "../../Items/singleVacation/singleVacation";
import { Button } from "@mui/material";

function AdminPage(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [displayedVacations, setDisplayedVacations] = useState<Vacation[]>([]);
  //pagination
  const [page, setPage] = useState<number>(1);
  const limit = 10;  // Display 10 vacations per page
  const batchSize = 50; // Fetch 50 vacations at a time

  useEffect(() => {
    loadBatch(1); // Load the first batch initially
  }, []);

  // Fetch all vacations once
  const loadBatch = async (batchNumber: number) => {
    const offset = (batchNumber - 1) * batchSize;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/vacations/all?limit=${batchSize}&offset=${offset}`
      );

      // Filter out expired vacations
      const currentDate = new Date();
      const validVacations = response.data
        .filter(
          (vacation: Vacation) => new Date(vacation.end_date) >= currentDate
        )
        .sort(
          (a: Vacation, b: Vacation) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );

        setVacations((prev) => [...prev, ...validVacations]);
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
    const start = (page - 1) * limit;
    const end = start + limit;
    setDisplayedVacations((prevVacations) =>
      prevVacations
        .filter((vacation) => vacation.vacation_id !== vacationId)
        .slice(start, end)
    );
  };

  // Update vacations display after a vacation is edited
  const handleEditVacation = () => {
    const batchNumber = Math.ceil(page / (batchSize / limit));
    loadBatch(batchNumber); // Reload the current batch to reflect the edited vacation
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
