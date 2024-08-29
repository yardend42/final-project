import { useEffect, useState } from "react";
import { Vacation } from "../../Models/vacations";
import { getDecodedToken } from "../../Utils/jwt";
import FollowBtn from "../followBtn/followBtn";
import "./singleVacation.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AdminBtns from "../adminBtns/adminBtns";

interface SingleVacationProps {
  vacation: Vacation;
  likedVacations?: number[];
  onDelete?: (vacationId: number) => void;
  onEdit?: () => void;
}

function SingleVacation(props: SingleVacationProps): JSX.Element {
  const { vacation, likedVacations = [], onDelete, onEdit } = props;
  const [role, setRole] = useState<string | null>(null);
  const [userID, setUserId] = useState<number>(NaN);

  const formattedStartDate = vacation.start_date.toString().slice(0, 10);
  const formattedEndDate = vacation.end_date.toString().slice(0, 10);

  useEffect(() => {
    const decodedToken = getDecodedToken();
    setRole(decodedToken.role);
    setUserId(decodedToken.user_id);
  }, []);

  return (
    <Card className="singleVacation">
      {role === "admin" ? (
        <AdminBtns vacation={vacation} onDelete={onDelete} onEdit={onEdit} />
      ) : (
        <FollowBtn
          vacation={vacation}
          user_id={userID}
          likedVacations={likedVacations}
        />
      )}
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:8080/uploads/vacationImg/${vacation.image_filename}`}
        alt={vacation.destination}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {vacation.destination}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {vacation.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Start Date: {formattedStartDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          End Date: {formattedEndDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: ${vacation.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SingleVacation;
