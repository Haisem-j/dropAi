import React from "react";

interface WarningBannerProps {
  children: React.ReactNode;
  hideBanner: (h: boolean) => void;
}
const WarningBanner = ({ children, hideBanner }: WarningBannerProps) => {
  return (
    <div
      className={`px-4 py-2 rounded-sm text-sm border bg-amber-100 border-amber-200 text-amber-600`}
    >
      <div className="flex w-full justify-between items-start">
        <div className="flex">
          <svg
            className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
          <div>{children}</div>
        </div>
        <button
          className="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
          onClick={() => hideBanner(false)}
        >
          <div className="sr-only">Close</div>
          <svg className="w-4 h-4 fill-current">
            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WarningBanner;
