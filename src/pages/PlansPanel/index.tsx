import React, { useState } from "react";
import WarningBanner from "../../components/WarningBanner";

function PlansPanel() {
  const [annual, setAnnual] = useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const handleBanner = (b: boolean) => {
    setShowHint(b);
  };
  return (
    <main className="min-h-full bg-slate-100 ">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold text-center">
            Get Access To EVERYTHING!
          </h1>
          <h3 className="text-lg md:text-lg text-slate-800 font-normal mb-3 text-center">
            Generate high quality content for your ecommerce store 🚀
          </h3>
        </div>
        <div className="mb-3">
          {showHint && (
            <WarningBanner hideBanner={handleBanner}>
              Payment did not go through!
            </WarningBanner>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-sm border border-slate-200 w-2/3 ">
            {/* Panel body */}
            <div className="p-6 space-y-6">
              {/* Plans */}
              <section>
                {/* Pricing */}
                <div className="flex gap-6">
                  {/* Tab 3 */}
                  <div className="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200 w-2/3">
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500"
                      aria-hidden="true"
                    ></div>
                    <div className="px-5 pt-5 pb-6 border-b border-slate-200">
                      <header className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3">
                          <svg
                            className="w-6 h-6 fill-current text-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                          </svg>
                        </div>
                        <h3 className="text-lg text-slate-800 font-semibold">
                          Monthly Payments
                        </h3>
                      </header>
                      <div className="text-sm mb-2">
                        Ideal for individuals that are just starting to test
                        products.
                      </div>
                      {/* Price */}
                      <div className="text-slate-800 font-bold mb-4">
                        <span className="text-2xl">$</span>
                        <span className="text-3xl">
                          {annual ? "278" : "29"}
                        </span>
                        <span className="text-slate-500 font-medium text-sm">
                          /mo
                        </span>
                      </div>
                      {/* CTA */}
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full">
                        Upgrade
                      </button>
                    </div>
                    <div className="px-5 pt-4 pb-5">
                      <div className="text-xs text-slate-800 font-semibold uppercase mb-4">
                        What's included
                      </div>
                      {/* List */}
                      <ul>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Unlimited access to all the tools
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            No limit to any content generated
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Exceptional customer support
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Guaranteed money back within 24 hours
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200 w-2/3">
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500"
                      aria-hidden="true"
                    ></div>
                    <div className="px-5 pt-5 pb-6 border-b border-slate-200">
                      <header className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3">
                          <svg
                            className="w-6 h-6 fill-current text-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                          </svg>
                        </div>
                        <h3 className="text-lg text-slate-800 font-semibold">
                          Yearly Payments
                        </h3>
                      </header>
                      <div className="text-sm mb-2">
                        Ideal for individuals that are constantly testing new
                        products/stores.
                      </div>
                      {/* Price */}
                      <div className="text-slate-800 font-bold mb-4">
                        <span className="text-2xl">$</span>
                        <span className="text-3xl">278</span>
                        <span className="text-slate-500 font-medium text-sm">
                          /year
                        </span>
                        <span className="text-emerald-500 text-sm font-normal ml-1">
                          (-20%)
                        </span>
                      </div>
                      {/* CTA */}
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full">
                        Upgrade
                      </button>
                    </div>
                    <div className="px-5 pt-4 pb-5">
                      <div className="text-xs text-slate-800 font-semibold uppercase mb-4">
                        What's included
                      </div>
                      {/* List */}
                      <ul>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Unlimited access to all the tools
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            No limit to any content generated
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Exceptional customer support
                          </div>
                        </li>
                        <li className="flex items-center py-1">
                          <svg
                            className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                            viewBox="0 0 12 12"
                          >
                            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                          </svg>
                          <div className="text-sm">
                            Guaranteed money back within 24 hours
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section>
                <div className="my-8">
                  <h2 className="text-2xl text-slate-800 font-bold">FAQs</h2>
                </div>
                <ul className="space-y-5">
                  <li>
                    <div className="font-semibold text-slate-800 mb-1">
                      Can I cancel my plan?
                    </div>
                    <div className="text-sm">
                      Yes, you can cancel your plan at any time and will not be
                      charged again.
                    </div>
                  </li>
                  <li>
                    <div className="font-semibold text-slate-800 mb-1">
                      Are the payments secure?
                    </div>
                    <div className="text-sm">
                      The payments are 100% safe as they are processed by
                      <a
                        href="https://stripe.com/en-ca/customers"
                        target="_blank"
                        className="text-indigo-500 ml-1 hover:text-indigo-600"
                      >
                        Stripe
                      </a>
                      .
                    </div>
                  </li>
                  <li>
                    <div className="font-semibold text-slate-800 mb-1">
                      Can I get a refund?
                    </div>
                    <div className="text-sm">
                      Yes, you can if you apply within the first 24 hours of the
                      payment.
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PlansPanel;
