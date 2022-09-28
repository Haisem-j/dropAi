import React from "react";
import { MdDescription } from "react-icons/md";
import { ToastContext } from "../../context/Toast";
interface AdGeneratorProps {
  ads: string[];
  loading: boolean;
  loadMore: () => void;
}
const AdGenerator = ({ ads, loading, loadMore }: AdGeneratorProps) => {
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
      <h2 className="text-md font-medium text-center">Ads Generated</h2>
      {ads.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h4 className="text-slate-400">Click Generate to get ads...</h4>
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-5">
          {ads.map((ad, i) => (
            <div
              key={`Ad #${i}`}
              className="shadow-lg rounded-sm border border-slate-200 p-3 relative"
            >
              {ad}
              <div
                className="w-7 h-7 flex items-center justify-center bg-indigo-500 rounded-full absolute -top-2 -right-2 cursor-pointer hover:bg-indigo-600"
                onClick={() => copyToClip(ad)}
              >
                <MdDescription className="text-white" />
              </div>
            </div>
          ))}
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

export default AdGenerator;
