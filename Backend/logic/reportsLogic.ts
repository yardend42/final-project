import dal_mysql from "../DAL/dal_mysql";

const getFollowersReport = async () => {
  try {
    const sql = `
        SELECT vacations.destination, COUNT(followers.user_id) as followers_count
              FROM followers
              JOIN vacations ON followers.vacation_id = vacations.vacation_id
              GROUP BY followers.vacation_id, vacations.destination
      `;
    const result = await dal_mysql.execute(sql);
    return result;
  } catch (err: any) {
    return { msg: "An error occurred during authentication", error: err };
  }
};

export { getFollowersReport };
