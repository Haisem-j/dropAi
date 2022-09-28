import React from "react";
import { MdDescription } from "react-icons/md";
import { ToastContext } from "../../context/Toast";
interface NamesGeneratedProps {
  names: string[];
  loading: boolean;
  loadMore: () => void;
}
const NamesGenerated = ({ names, loading, loadMore }: NamesGeneratedProps) => {
  const toast = React.useContext(ToastContext);
  const loadMoreRef = React.useRef<HTMLButtonElement>(null);

  const copyToClip = (name: string) => {
    navigator.clipboard.writeText(name);
    toast?.createToast("Copied to clipboard!");
  };
  const executeScroll = () => {
    if (loadMoreRef?.current) loadMoreRef.current.scrollIntoView();
  };

  React.useEffect(() => {
    if (!loading && loadMoreRef?.current) {
      executeScroll();
    }
  }, [loading]);
  return (
    <div className="md:w-2/3 bg-white shadow-lg rounded-sm border border-slate-200 p-6">
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
          <div className="flex justify-center">
            <button
              className="w-24 btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
              onClick={() => {
                loadMore();
              }}
              value="Generate"
              disabled={loading}
              ref={loadMoreRef}
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NamesGenerated;
