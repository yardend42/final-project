import { UserCred } from "../models/UserCred";
import { createJWT } from "../utils/jwt";
import { ResultSetHeader } from "mysql2";
import dal_mysql from "../DAL/dal_mysql";

const registerUser = async (user: UserCred) => {
  try {
    const checkEmailSql = `SELECT email FROM users WHERE email = '${user.email}'`;
    const existingUsers = await dal_mysql.execute(checkEmailSql);

    if (existingUsers.length > 0) {
      return { msg: "Email already exists" }; // Return an error message if email exists
    }

    const sql = `
    INSERT INTO users (first_name, last_name, email, password, role)
    VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', '${user.role}')
`;

    const result: ResultSetHeader = await dal_mysql.execute(sql);
    user.user_id = +result.insertId;

    // Generate JWT after registration
    const token = createJWT(user);

    return {
      msg: "User was created",
      token, // Send back the JWT token
      user_id: user.user_id,
    };
  } catch (err: any) {
    return err;
  }
};

const loginUser = async (user: UserCred): Promise<any> => {
  let userInfo: any;
  //fetch user if exists
  try {
    const sql = `SELECT *, CONCAT(first_name, ' ', last_name) AS full_name 
    FROM users WHERE email = '${user.email}'`;

    userInfo = await dal_mysql.execute(sql);

    if (userInfo.length === 0) {
      return { msg: "Invalid email or password" };
    }

    let singleUser = userInfo[0];

    // Compare the provided password
    if (singleUser.password === user.password) {
      const userInfo = {
        isLoggedIn: true,
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


export { registerUser, loginUser };
