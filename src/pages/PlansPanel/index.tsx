import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalBlank from "../../components/ModalBlank";

import WarningBanner from "../../components/WarningBanner";
import { AuthContext } from "../../context/AuthContext";
import { checkoutPayment } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";
import NewPlan from "./NewPlan";

function PlansPanel() {
  const [paymentFailed, setPaymentFailed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const authentication = React.useContext(AuthContext);
  const location = useLocation();
  React.useEffect(() => {
    //Check if payment failed
    if (location.search === "?canceled=true") {
      setPaymentFailed(true);
    }
  }, []);
  const handleBanner = (b: boolean) => {
    setPaymentFailed(b);
  };
  const handlePayment = async (paymentId: string, newPlan: string) => {
    setPaymentFailed(false);
    if (authentication?.currentUser) {
      try {
        setLoading(true);
        const reqBody = {
          paymentId,
          newPlan,
        };
        const response = await authRequest(
          authentication?.currentUser,
          checkoutPayment,
          reqBody
        );
        setLoading(false);
        window.location.href = response.url;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main className="min-h-full bg-slate-100 ">
      <div className="mb-3">
        {paymentFailed && (
          <WarningBanner hideBanner={handleBanner}>
            Payment did not go through!
          </WarningBanner>
        )}
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold text-center">
            Get Access To EVERYTHING!
          </h1>
          <h3 className="text-lg md:text-lg text-slate-800 font-normal mb-3 text-center">
            Generate high quality content for your ecommerce store 🚀
          </h3>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-sm border border-slate-200 md:w-3/4 ">
            {/* Panel body */}
            <div className="p-6 space-y-6">
              {/* Plans */}
              <section>
                {/* Pricing */}
                <div className="grid grid-cols-8 gap-6">
                  <NewPlan
                    price={15}
                    rate={"mo"}
                    handlePayment={handlePayment}
                  />
                  <NewPlan
                    price={144}
                    rate={"yr"}
                    handlePayment={handlePayment}
                  />
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
