import React from "react";
interface GeneratorHeaderProps {
  loading: boolean;
  header: string;
}
const GeneratorHeader = ({ loading, header }: GeneratorHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-3">
        {header}
      </h1>
      <div>
        <div className="text-xs md:text-sm inline-flex font-medium bg-slate-700 text-slate-100 rounded-full text-center px-2.5 py-1">
          {!loading && "30 Tokens per Request"}
          {loading && (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin w-4 h-4 fill-current shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
              <span className="ml-2">Calculating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratorHeader;
