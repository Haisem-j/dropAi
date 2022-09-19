import React from "react";
import { Link } from "react-router-dom";
import { DASHBOARD } from "./constants";
import NotFoundImage from "../images/404-illustration.svg";
const NotFound: React.FC = () => {
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="max-w-2xl m-auto mt-16">
          <div className="text-center px-4">
            <div className="inline-flex mb-8">
              <img
                src={NotFoundImage}
                width="176"
                height="176"
                alt="404 illustration"
              />
            </div>
            <div className="mb-6">
              Hmm...this page doesn’t exist. Try searching for something else!
            </div>
            <Link
              to={DASHBOARD}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
