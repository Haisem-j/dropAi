import React from "react";
import { Link } from "react-router-dom";
interface CardProps {
  title: string;
  subHeader: string;
  link: string;
}
const Card = ({ title, subHeader, link }: CardProps) => {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full p-5">
        <div className="grow mt-2">
          <h2 className="text-xl leading-snug font-semibold mb-2">{title}</h2>
          <div className="text-sm font-extralight">{subHeader}</div>
        </div>
        <footer className="mt-5">
          <div className="flex justify-between items-center">
            <div>
              <Link
                className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to={link}
              >
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <span className="">Open Tool</span>
                </button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Card;
