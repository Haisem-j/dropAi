import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../../components/AuthForm";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { DASHBOARD } from "../../constants";
import { authRequest } from "../../../utils/authenticationRequest";
import { createUser } from "../../../Requests";
import { UserContext } from "../../../context/UserContext";

const Register = () => {
  const [err, setErr] = React.useState<any>({});
  const [redirectPath, setRedirectPath] = React.useState<string>("");
  const authentication = useContext(AuthContext);
  const userC = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const toLogin = location.search ? "/login" + location.search : "/login";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  React.useEffect(() => {
    // Payments redirect ?ref=plans&key=payments&val=mo
    // Other redirect ?ref=/landing/tagline-generator
    if (location.search) {
      let rLink;
      const redirect = location.search.substring(1).split("&");
      if (redirect.length > 1) {
        // Payments
        rLink =
          "/" +
          redirect[0].split("=")[1] +
          "?" +
          redirect[1].split("=")[1] +
          "=" +
          redirect[2].split("=")[1];
      } else {
        // Other
        rLink = redirect[0].split("=")[1];
      }

      setRedirectPath(rLink);
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let { password, email, confirmPassword } = data;
    setErr({});
    try {
      const matches = password.localeCompare(confirmPassword);
      if (matches === -1) throw new Error("confirmPassword");
      const userCreds = await authentication?.signup(email, password);
      const user = userCreds?.user;

      // Create user in db
      if (user) {
        await authRequest(user, createUser, { uid: user.uid });
        if (userCreds) await authentication?.verifyEmail(user);
        redirectPath ? navigate(redirectPath) : navigate(DASHBOARD);
      }
    } catch (e: any) {
      if (e.message === "confirmPassword") {
        setErr({ password: true });
      } else {
        setErr({ email: true });
      }
    }
  };
  const onSignInWithGoogle = async () => {
    const userCreds = await authentication?.loginWithGoogle();
    const user = userCreds?.user;
    if (user) {
      const response = await authRequest(user, createUser, { uid: user.uid });
      userC?.setUserInfo(response.result);
      redirectPath ? navigate(redirectPath) : navigate(DASHBOARD);
    }
  };
  React.useEffect(() => {
    if (authentication?.currentUser) {
      redirectPath ? navigate(redirectPath) : navigate(DASHBOARD);
    }
  }, []);

  return (
    <AuthForm>
      <div className="w-full md:min-w-[30%] max-w-sm mx-auto px-4 py-8 shadow-lg rounded-sm border border-slate-200 bg-white">
        <h1 className="text-3xl text-slate-800 font-bold mb-6 text-center">
          Create your Account ✨
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className={`mt-5 ${err?.email ? "" : "hidden"}`}>
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">Email already taken...</span>
              </div>
            </div>
            <div className={`mt-5 ${errors["email"] ? "" : "hidden"}`}>
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">Email address required...</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                id="email"
                className="form-input w-full"
                type="email"
              />
            </div>
            <div className={`mt-5 ${errors["password"] ? "" : "hidden"}`}>
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">Password required...</span>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                {...register("password", { required: true })}
              />
            </div>
            <div className={`mt-5 ${err?.password ? "" : "hidden"}`}>
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">Passwords don't match...</span>
              </div>
            </div>
            <div
              className={`mt-5 ${errors["confirmPassword"] ? "" : "hidden"}`}
            >
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">Confirm password required...</span>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                {...register("confirmPassword", { required: true })}
              />
            </div>
          </div>
          <div className="pt-5 mt-6 border-t border-slate-200">
            <div
              className="btn bg-white border-blue-500 hover:border-blue-300 text-blue-500 hover:text-blue-300 w-full whitespace-nowrap cursor-pointer"
              onClick={() => onSignInWithGoogle()}
            >
              <FcGoogle className="mr-2" />
              Login with Google
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="mr-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm ml-2">
                  Email me about product news.
                </span>
              </label>
            </div>
            <input
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap cursor-pointer"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
        {/* Footer */}
        <div className="pt-5 mt-6 border-t border-slate-200">
          <div className="text-sm">
            Have an account?{" "}
            <Link
              className="font-medium text-indigo-500 hover:text-indigo-600"
              to={toLogin}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthForm>
  );
};

export default Register;
