import { AuthProps } from "../interfaces/interface";

export const authRequest = async (auth: AuthProps, cb: any, data?: any) => {
  try {
    const idToken = await auth.currentUser?.getIdToken(true);
    return cb(idToken, data);
  } catch (e) {
    console.log("Error - ", e);
    return e;
  }
};
