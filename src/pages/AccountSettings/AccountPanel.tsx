import React from "react";
import { Link } from "react-router-dom";
import ModalBlank from "../../components/ModalBlank";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { DropAiUser } from "../../interfaces/interface";
import { cancelSubscription } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";

const AccountPanel = () => {
  const [cancelModal, setCancelModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const authentication = React.useContext(AuthContext);
  const user = React.useContext(UserContext);
  const plan = user?.getPlanType();
  const handleCancelSub = async () => {
    setCancelModal(false);
    if (authentication?.currentUser) {
      try {
        setLoading(true);
        const reqBody = {
          customerId: user?.user?.paymentId,
          uid: authentication?.currentUser?.uid,
        };
        const response = await authRequest(
          authentication?.currentUser,
          cancelSubscription,
          reqBody
        );
        setLoading(false);
        if (user?.user) {
          const updatedUser: DropAiUser = {
            ...user?.user,
            endOfCycle: response.data.periodEnd,
          };
          user?.setUserInfo(updatedUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="grow">
      <ModalBlank
        id="cancel-modal"
        modalOpen={cancelModal}
        setModalOpen={setCancelModal}
      >
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-rose-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">
                Cancel Subscription?
              </div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>
                  If you cancel your subscription you will not be able to access
                  premium features after the end of the current billing cycle.
                </p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setCancelModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => handleCancelSub()}
              >
                Yes, Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h3 className="text-2xl text-slate-800 font-bold mb-5">My Account</h3>
        {/* Business Profile */}
        {authentication?.currentUser?.displayName && (
          <section>
            <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
              Full Name
            </h3>
            <div className="text-sm font-light">
              {authentication?.currentUser?.displayName}
            </div>
          </section>
        )}
        {/* Email */}
        <section>
          <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
            Email
          </h3>
          <div className="text-sm font-light">
            <span className="mr-3">{authentication?.currentUser?.email}</span>
            <div className="text-sm inline-flex font-medium bg-slate-100 text-slate-500 rounded-full text-center px-2.5 py-1">
              {authentication?.currentUser?.emailVerified
                ? "VERIFIED"
                : "UNVERIFIED"}
            </div>
          </div>
        </section>
        {/* Plan */}
        <section>
          <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
            Plan
          </h3>
          <div className="text-sm font-light flex items-center">
            {plan === "Standard" ? (
              <>
                <div className="text-sm inline-flex font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-center px-2.5 py-1 mr-5">
                  {plan}
                </div>

                {!user?.user?.endOfCycle && (
                  <div>
                    <div
                      className="btn shadow-sm bg-rose-600 text-rose-100 hover:text-rose-300 cursor-pointer"
                      onClick={() => setCancelModal(true)}
                    >
                      Deactivate
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-sm inline-flex font-medium bg-rose-100 text-rose-600 rounded-full text-center px-2.5 py-1 mr-5">
                  {plan}
                </div>

                <div>
                  <Link
                    to="/plans"
                    className="btn border-slate-200 shadow-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Upgrade
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
export default AccountPanel;
