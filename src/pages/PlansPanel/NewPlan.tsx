import React from "react";
import { useLocation } from "react-router-dom";

import ModalBlank from "../../components/ModalBlank";
import { STANDARD_MONTHLY, STANDARD_YEARLY } from "../../utils/paymentsIds";

interface NewPlanProps {
  price: number;
  rate: "mo" | "yr";
  handlePayment: (paymentId: string, newPlan: string) => Promise<void>;
}

const NewPlan = ({ price, rate, handlePayment }: NewPlanProps) => {
  const [paymentModal, setPaymentModal] = React.useState(false);
  const location = useLocation();

  const paymentId = rate === "yr" ? STANDARD_YEARLY : STANDARD_MONTHLY;
  const planName = "Standard";

  React.useEffect(() => {
    //Check if payment failed
    if (location.search === "?payments=" + rate) {
      setPaymentModal(true);
    }
  }, []);
  return (
    <div className="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200">
      <ModalBlank
        id="payment-modal"
        modalOpen={paymentModal}
        setModalOpen={setPaymentModal}
      >
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-emerald-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">
                Purchase {rate === "mo" ? "Monthly" : "Yearly"} Subscription?
              </div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>
                  Click below and you will be redirected to our payment gateway
                </p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => handlePayment(paymentId, planName)}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${
          rate === "mo" ? "bg-indigo-500" : "bg-sky-500"
        }`}
        aria-hidden="true"
      ></div>
      <div className="px-5 pt-5 pb-6 border-b border-slate-200">
        <header className="flex items-center mb-2">
          <div
            className={`w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr
            ${rate === "mo" ? "from-indigo-500" : "from-sky-500"}
            ${rate === "mo" ? "to-indigo-300" : "from-sky-300"}
             mr-3`}
          >
            <svg
              className="w-6 h-6 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
            </svg>
          </div>
          <h3 className="text-lg text-slate-800 font-semibold">
            Pay {rate === "mo" ? "Monthly" : "Yearly"}{" "}
            {rate === "yr" && <span className="text-emerald-500">(-20%)</span>}
          </h3>
        </header>
        <div className="text-slate-800 font-bold mb-4">
          <span className="text-2xl">$</span>
          <span className="text-3xl">{price}</span>
          <span className="text-slate-500 font-medium text-sm">/{rate}</span>
        </div>
        <button
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
          onClick={() => setPaymentModal(true)}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};
export default NewPlan;
