import { User } from "firebase/auth";

export const authRequest = async (user: User, cb: any, data?: any) => {
  try {
    const idToken = await user.getIdToken(true);
    return cb(idToken, data);
  } catch (e) {
    console.log("Error - ", e);
    return e;
  }
};
