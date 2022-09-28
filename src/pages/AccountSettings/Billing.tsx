import moment from "moment";
import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { BillingInfo } from "../../interfaces/interface";
import { getBillingInfo } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";

const Billing = () => {
  const [billingInfo, setBillingInfo] = React.useState<BillingInfo | null>(
    null
  );
  const user = React.useContext(UserContext);
  const authentication = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authentication?.currentUser && user?.user?.paymentId) {
      authRequest(authentication?.currentUser, getBillingInfo, {
        paymentId: user?.user?.paymentId,
      }).then((bInfo) => {
        setBillingInfo(bInfo.billingInfo);
      });
    }
  }, [user?.user]);

  const renderSubHeader = () => {
    const plan = billingInfo?.invoices[0];
    return (
      <div className="text-sm font-light">
        This workspace’s Plan is set to a {plan?.plan?.slice(4)} and will renew
        on{" "}
        <strong className="font-medium">
          {plan?.period &&
            moment.unix(plan?.period.end).format("MMMM Do, YYYY")}
        </strong>
        .
      </div>
    );
  };
  return (
    <div className="grow overflow-auto">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl text-slate-800 font-bold mb-5">
            Billing & Invoices
          </h3>
          {billingInfo && renderSubHeader()}
        </div>
        {!user?.user?.paymentId ? (
          <div className="flex items-center justify-center">
            <h2 className="text-lg text-slate-500">Nothing to see here...</h2>
          </div>
        ) : (
          billingInfo && (
            <>
              {/* Billing Information */}
              <section>
                <h3 className="text-lg leading-snug text-slate-800 font-bold mb-1">
                  Billing Information
                </h3>
                <ul>
                  <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
                    {/* Left */}
                    <div className="text-sm text-slate-800 font-medium">
                      Payment Method
                    </div>
                    {/* Right */}
                    <div className="text-sm text-slate-800ml-4">
                      <span className="mr-3">
                        {billingInfo.payment.brand} ending{" "}
                        {billingInfo.payment.ending}
                      </span>
                    </div>
                  </li>
                  <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
                    {/* Left */}
                    <div className="text-sm text-slate-800 font-medium">
                      Billing Interval
                    </div>
                    {/* Right */}
                    <div className="text-sm text-slate-800ml-4">
                      <span className="mr-3">
                        {billingInfo.billingInterval}
                      </span>
                    </div>
                  </li>
                </ul>
              </section>
              {/* Invoices */}
              <section>
                <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">
                  Invoices
                </h3>
                {/* Table */}
                <table className="table-auto w-full">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400">
                    <tr className="flex flex-wrap md:table-row md:flex-no-wrap">
                      <th className="w-full block md:w-auto md:table-cell py-2">
                        <div className="font-semibold text-left">Period</div>
                      </th>
                      <th className="w-full hidden md:w-auto md:table-cell py-2">
                        <div className="font-semibold text-left">Plan</div>
                      </th>
                      <th className="w-full hidden md:w-auto md:table-cell py-2">
                        <div className="font-semibold text-left">Amount</div>
                      </th>
                      <th className="w-full hidden md:w-auto md:table-cell py-2">
                        <div className="font-semibold text-right"></div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm">
                    {/* Row */}
                    {billingInfo.invoices.map((inv) => (
                      <tr
                        className="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
                        key={`Invoice - ${inv.invoiceId}`}
                      >
                        <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                          <div className="text-left font-medium text-slate-800">
                            {moment
                              .unix(inv.period.start)
                              .format("dddd, MMMM Do, YYYY")}
                          </div>
                        </td>
                        <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                          <div className="text-left">{inv.plan}</div>
                        </td>
                        <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                          <div className="text-left font-medium">
                            ${inv.amount}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Row */}
                  </tbody>
                </table>
              </section>
            </>
          )
        )}
      </div>
    </div>
  );
};
export default Billing;
