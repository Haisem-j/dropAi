import React from "react";

interface BannerProps {
  header: string;
  subHeading: string;
}
const Banner = ({ header, subHeading }: BannerProps) => {
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
          {header}
        </h1>
        <p className="font-small text-slate-600">{subHeading}</p>
      </div>
    </div>
  );
};

export default Banner;
