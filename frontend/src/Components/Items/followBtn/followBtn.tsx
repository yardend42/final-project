import { Button } from "@mui/material";
import "./followBtn.css";
import { Vacation } from "../../Models/vacations";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import notify from "../../Utils/Notify";
import { useEffect, useState } from "react";

interface FollowBtnProps {
  vacation: Vacation;
  user_id: number;
  likedVacations: number[];

}

function FollowBtn(props: FollowBtnProps): JSX.Element {
  const { vacation, user_id,likedVacations } = props;
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    getFavoriteCount();
    setIsLiked(likedVacations.includes(vacation.vacation_id));
  }, [likedVacations, vacation.vacation_id]);


  const toggleFavorite = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vacations/toggleFavorite",
        { user_id, vacation_id: vacation.vacation_id }
      );
      console.log("Vacation toggled:", response.data);
      notify.success(response.data.message);
      setIsLiked(!isLiked);
      getFavoriteCount();
    } catch (error: any) {
      notify.error("Error adding vacation");
      console.log(error);
    }
    // Implement followers count and icon change
  };

  const getFavoriteCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vacations/followersCount"
      );
      const vacationData = response.data.find((item: any) => item.vacation_id === vacation.vacation_id);
      
      if (vacationData) {
        setFollowersCount(vacationData.followers_count);
      }
    } catch (error: any) {
      notify.error("Error fetching vacation followers count");
      console.log(error);
    }
  
  };

 

  return (
    <div className="followBtn">
      <Button
        variant="contained"
        className="follow-btn"
        onClick={toggleFavorite}
        startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      >
        {isLiked ? "Liked" : "Like"} {followersCount}

      </Button>
    </div>
  );
}

export default FollowBtn;
