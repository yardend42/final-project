import { SyntheticEvent, useEffect, useState } from "react";
import "./vacationsPage.css";
import { getDecodedToken } from "../../Utils/jwt";
import { Vacation } from "../../Models/vacations";
import axios from "axios";
import SingleVacation from "../../Items/singleVacation/singleVacation";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

type Filters = {
  favorite: boolean;
  future: boolean;
  active: boolean;
};

function VacationsPage(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [likedVacations, setLikedVacations] = useState<number[]>([]);
  const [displayedVacations, setDisplayedVacations] = useState<Vacation[]>([]);

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  // Checkbox
  const [filters, setFilters] = useState<Filters>({
    favorite: false,
    future: false,
    active: false,
  });

    // filters and initial vacations load
    useEffect(() => {
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        getAllVacations();
        // Get user favorites
      }
  
      let filtered = vacations;
  
      if (filters.favorite) {
        getUserFavorites(decodedToken.user_id);
        filtered = favoriteFilter(filtered);
      }
      if (filters.active) {
        filtered = activeFilter(filtered);
      }
      if (filters.future) {
        filtered = futureFilter(filtered);
      }
      if (!filters.favorite && !filters.active && !filters.future) {
        filtered = vacations;
      }
  
      // Update displayed vacations based on the current page
      const start = (page - 1) * limit;
      const end = start + limit;
      setDisplayedVacations(filtered.slice(start, end));
    }, [filters, vacations, page]);

  // Get all vacations
  const getAllVacations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vacations/all"
      );
      const currentDate = new Date();

      // Filter out expired vacations
      const validVacations = response.data.filter((vacation: Vacation) => {
        return new Date(vacation.end_date) >= currentDate;
      });

      // Sort vacations by start date
      validVacations.sort((a: Vacation, b: Vacation) => {
        return (
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
      });

      setVacations(validVacations);
    } catch (error: any) {
      console.log(error);
    }
  };

  //get user favories
  const getUserFavorites = async (user_id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/vacations/liked/${user_id}`
      );
      const likedVacationIds = response.data.map(
        (vacation: Vacation) => vacation.vacation_id
      );

      setLikedVacations(likedVacationIds);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handle filter change
  const handleFilterChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
    console.log(target.checked, event);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };


  const favoriteFilter = (vacations: Vacation[]) => {
    return vacations.filter((vacation) =>
      likedVacations.includes(vacation.vacation_id)
    );
  };

  const activeFilter = (vacations: Vacation[]) => {
    const currentDate = new Date();
    return vacations.filter(
      (vacation) =>
        new Date(vacation.start_date) <= currentDate &&
        new Date(vacation.end_date) >= currentDate
    );
  };

  const futureFilter = (vacations: Vacation[]) => {
    return vacations.filter(
      (vacation) => new Date(vacation.start_date) > new Date()
    );
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="vacations">
      <div className="filterContainer">
        <FormGroup row className="filterRow">
          <FormControlLabel
            label="Favorite"
            control={
              <Checkbox
                name="favorite"
                checked={filters.favorite}
                onChange={handleFilterChange}
              />
            }
          />
          <FormControlLabel
            label="Future"
            control={
              <Checkbox
                name="future"
                checked={filters.future}
                onChange={handleFilterChange}
              />
            }
          />
          <FormControlLabel
            label="Active"
            control={
              <Checkbox
                name="active"
                checked={filters.active}
                onChange={handleFilterChange}
              />
            }
          />
        </FormGroup>
      </div>
      <div className="vacationsContainer">
        {displayedVacations.map((item) => (
          <SingleVacation
            key={item.vacation_id}
            vacation={item}
            likedVacations={likedVacations}
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

export default VacationsPage;
