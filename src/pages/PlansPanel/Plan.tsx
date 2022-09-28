import React from "react";
import { UserContext } from "../../context/UserContext";
import {
  STANDARD_MONTHLY,
  UNLIMITED_MONTHLY,
  STANDARD_YEARLY,
  UNLIMITED_YEARLY,
} from "../../utils/paymentsIds";

interface PlanProps {
  planType: "Free" | "Standard" | "Unlimited";
  colour: string;
  subheading: string;
  price: { monthly: number; yearly: number };
  annual: boolean;
  handlePayment: (paymentId: string, newPlan: string) => Promise<void>;
}

const Plan = ({
  planType,
  annual,
  subheading,
  price,
  handlePayment,
}: PlanProps) => {
  const user = React.useContext(UserContext);
  const standardPayments = annual ? STANDARD_YEARLY : STANDARD_MONTHLY;
  const unlimitedPayments = annual ? UNLIMITED_YEARLY : UNLIMITED_MONTHLY;

  const getPlanButton = () => {
    if (user?.getPlanType() === "Free") {
      switch (planType) {
        case "Standard":
          return (
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
              onClick={() => handlePayment(standardPayments, "Standard")}
            >
              Upgrade
            </button>
          );

          break;
        default:
          return (
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
              onClick={() => handlePayment(unlimitedPayments, "Unlimited")}
            >
              Upgrade
            </button>
          );
          break;
      }
    } else if (user?.getPlanType() === "Standard") {
      switch (planType) {
        case "Free":
          return (
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 w-full">
              Downgrade
            </button>
          );

          break;
        default:
          return (
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
              onClick={() => handlePayment(unlimitedPayments, "Unlimited")}
            >
              Upgrade
            </button>
          );
          break;
      }
    } else if (user?.getPlanType() === "Unlimited") {
      switch (planType) {
        case "Free":
          return (
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 w-full">
              Downgrade
            </button>
          );

          return;
          break;
        default:
          return (
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 w-full">
              Downgrade
            </button>
          );
          break;
      }
    }
  };
  return (
    <div className="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200">
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${
          planType === "Free"
            ? "bg-emerald-500"
            : planType === "Standard"
            ? "bg-sky-500"
            : "bg-indigo-500"
        }`}
        aria-hidden="true"
      ></div>

      <div className="px-5 pt-5 pb-6 border-b border-slate-200">
        <header className="flex items-center mb-2">
          <div
            className={`w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr ${
              planType === "Free"
                ? "from-emerald-500"
                : planType === "Standard"
                ? "from-sky-500"
                : "from-indigo-500"
            }  ${
              planType === "Free"
                ? "to-emerald-300"
                : planType === "Standard"
                ? "to-sky-300"
                : "to-indigo-300"
            } mr-3`}
          >
            <svg
              className="w-6 h-6 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
            </svg>
          </div>
          <h3 className="text-lg text-slate-800 font-semibold">{planType}</h3>
        </header>
        <div className="text-sm mb-2">{subheading}</div>
        {/* Price */}
        <div className="text-slate-800 font-bold mb-4">
          <span className="text-2xl">$</span>
          <span className="text-3xl">
            {annual ? price.yearly : price.monthly}
          </span>
          <span className="text-slate-500 font-medium text-sm">
            {annual ? "/yr" : "/mo"}
          </span>
        </div>
        {/* CTA */}

        {user?.getPlanType() === planType ? (
          <button
            className="btn border-slate-200 bg-slate-100 text-slate-400 w-full cursor-not-allowed flex items-center"
            disabled
          >
            <svg
              className="w-3 h-3 shrink-0 fill-current mr-2"
              viewBox="0 0 12 12"
            >
              <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
            </svg>
            <span>Current Plan</span>
          </button>
        ) : (
          <>{getPlanButton()}</>
        )}
      </div>
    </div>
  );
};
export default Plan;
