import React from "react";
import { MdDescription } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { ToastContext } from "../../context/Toast";
interface NamesGeneratedProps {
  names: string[];
  loading: boolean;
  loadMore: () => void;
}
const NamesGenerated = ({ names, loading, loadMore }: NamesGeneratedProps) => {
  const toast = React.useContext(ToastContext);
  const [initial, setInitial] = React.useState(false);
  const copyToClip = (name: string) => {
    navigator.clipboard.writeText(name);
    toast?.createToast("Copied to clipboard!");
  };
  return (
    <div className="w-1/3 bg-white shadow-lg rounded-sm border border-slate-200 p-6">
      <h2 className="text-md font-medium text-center">Names Generated</h2>
      {names.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h4 className="text-slate-400">Click Generate to get names...</h4>
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-5">
          <ul>
            {names.map((name, i) => (
              <li
                key={name}
                className="py-2 px-4  mb-2 bg-indigo-500 hover:bg-indigo-600 shadow-lg rounded-sm border border-slate-200 flex justify-between items-center cursor-pointer"
                onClick={() => copyToClip(name)}
              >
                <span className="text-sm font-small text-white">{name}</span>
                <MdDescription className="text-white" />
              </li>
            ))}
          </ul>
          {/* Initial === false -> remove load more buttin */}
          {!initial && (
            <div className="flex justify-center">
              <button
                className="w-24 btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                onClick={() => {
                  setInitial(true);
                  loadMore();
                }}
                value="Generate"
                disabled={loading}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NamesGenerated;
