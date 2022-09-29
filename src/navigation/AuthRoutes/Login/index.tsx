import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import AuthForm from "../../../components/AuthForm";
import { AuthContext } from "../../../context/AuthContext";
import { DASHBOARD } from "../../constants";
import { createUser } from "../../../Requests";
import { authRequest } from "../../../utils/authenticationRequest";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  const [err, setErr] = React.useState(false);
  const [errorBody, setErrorBody] = React.useState({});

  const authentication = React.useContext(AuthContext);
  const userC = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let { password, email } = data;
    setErr(false);
    try {
      await authentication?.login(email, password);
      navigate(DASHBOARD);
    } catch (e) {
      setErr(true);
    }
  };
  const onSignInWithGoogle = async () => {
    const userCreds = await authentication?.loginWithGoogle();
    const user = userCreds?.user;
    if (user) {
      const response = await authRequest(user, createUser, { uid: user.uid });
      userC?.setUserInfo(response.result);
      navigate(DASHBOARD);
    }
  };
  React.useEffect(() => {
    if (authentication?.currentUser) {
      navigate(DASHBOARD);
    }
  }, [authentication]);

  return (
    <AuthForm>
      <div className="w-full md:min-w-[30%] max-w-sm mx-auto px-4 py-8 shadow-lg rounded-sm border border-slate-200 bg-white">
        <h1 className="text-3xl text-slate-800 font-bold mb-6 text-center">
          Welcome back! ✨
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className={`mt-5 ${err ? "" : "hidden"}`}>
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
                <span className="text-sm">User not registered...</span>
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
                {...register("password", { required: true })}
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
              />
            </div>
          </div>
          <div className="pt-5 mt-6 border-t border-slate-200">
            <div
              className="cursor-pointer btn bg-white border-blue-500 hover:border-blue-300 text-blue-500 hover:text-blue-300 w-full whitespace-nowrap"
              onClick={() => onSignInWithGoogle()}
            >
              <FcGoogle className="mr-2" />
              Login with Google
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="mr-1">
              <Link
                className="text-sm underline hover:no-underline"
                to="/reset-password"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        {/* Footer */}
        <div className="pt-5 mt-6 border-t border-slate-200">
          <div className="text-sm">
            Don’t have an account?{" "}
            <Link
              className="font-medium text-indigo-500 hover:text-indigo-600"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </AuthForm>
  );
};

export default Login;
