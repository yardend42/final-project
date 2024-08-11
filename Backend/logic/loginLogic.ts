import { UserCred } from "../Models/UserCred";
import { createJWT } from "../Utils/jwt";
import { ResultSetHeader } from "mysql2";
const fs = require("fs");
import dal_mysql from "../DAL/dal_mysql";

const registerUser = async (user: UserCred) => {
  let userInfo;
  try {
    // const hashedPassword = bcrypt.hashSync(user.password, 8);
    const sql = `
    INSERT INTO users (first_name, last_name, email, password, role)
    VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', '${user.role}')
`;

    const result: ResultSetHeader = await dal_mysql.execute(sql);
    console.log(result);
    user.user_id = +result.insertId;
    return "User was created";
  } catch (err: any) {
    return err;
  }
};

const loginUser = async (user: UserCred): Promise<any> => {
  let userInfo;
  //fetch user if exists
  try {
    const sql = `SELECT *, CONCAT(first_name, ' ', last_name) AS full_name 
    FROM users WHERE email = '${user.email}'`;
    userInfo = await dal_mysql.execute(sql);

    if (userInfo.length === 0) {
      return { msg: "Invalid email" };
    }
  } catch (err) {
    return { msg: "An error occurred while fetching user data" };
  }
  let singleUser = userInfo[0];

  //sending jwt if user data is o.k.
  try {
    if (singleUser.password === user.password) {
      const userInfo = {
        isLoggedIn : true,
        name: singleUser.first_name,
        email: singleUser.email,
        role: singleUser.role,
        jwt: createJWT(singleUser),
      };
      return userInfo;
    } else {
      return { msg: "Invalid password" };
    }
  } catch (err) {
    return { msg: "An error occurred during authentication" };
  }
};

const deleteUser = async (userId: number) => {
  try {
    const sql = `DELETE FROM users WHERE id=${userId}`;
    console.log(sql);
    await dal_mysql.execute(sql);
    return true;
  } catch (err) {
    console.log(err);
  }
};
export { registerUser, loginUser, deleteUser };
