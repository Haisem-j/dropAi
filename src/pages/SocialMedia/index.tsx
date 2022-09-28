import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";
import GeneratorHeader from "../../components/GeneratorHeader";

import Tooltip from "../../components/Tooltip";
import WarningBanner from "../../components/WarningBanner";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/Toast";
import { UserContext } from "../../context/UserContext";
import { generateAd, generateMoreAds } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";
import AdGenerator from "./AdGenerator";

interface FVals {
  productName: string;
  shortDescription: string;
  targetAudience: string;
}
interface L extends FVals {
  platform: string;
}
const SocialMedia = () => {
  const [showHint, setShowHint] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ads, setAds] = React.useState<string[]>([]);
  const [initialState, setInitialState] = React.useState<L | null>(null);
  const [platformState, setPlatformState] = React.useState("facebook");

  const authentication = React.useContext(AuthContext);
  const costOfRequest = 30;
  const user = React.useContext(UserContext);
  const toast = React.useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues | FVals> = async ({
    productName,
    shortDescription,
    targetAudience,
  }) => {
    setLoading(true);
    const reqBody = {
      platform: platformState,
      targetAudience,
      productName,
      shortDescription,
    };

    if (user) {
      const checkTokens = user.checkTokenAvailablity(costOfRequest);
      if (!checkTokens) {
        toast?.toastError("Error: Not enough tokens available.");
      } else {
        if (authentication?.currentUser) {
          await user.updateUserTokens(costOfRequest);
          const response: { result: string } = await authRequest(
            authentication?.currentUser,
            generateAd,
            reqBody
          );
          setAds([response.result]);
          setInitialState({
            productName,
            targetAudience,
            shortDescription,
            platform: platformState,
          });
        }
      }
    }
    setLoading(false);
  };
  const loadMore = async () => {
    setLoading(true);
    if (user) {
      const checkTokens = user.checkTokenAvailablity(costOfRequest);
      if (!checkTokens) {
        toast?.toastError("Error: Not enough tokens available.");
      } else {
        if (authentication?.currentUser && initialState) {
          const reqBody = {
            productName: initialState.productName,
            shortDescription: initialState.shortDescription,
            targetAudience: initialState.targetAudience,
            previousOutput: ads,
          };
          await user.updateUserTokens(costOfRequest);
          const response = await authRequest(
            authentication?.currentUser,
            generateMoreAds,
            reqBody
          );
          setAds([...ads, response.result]);
          setShowHint(true);
        }
      }
    }
    setLoading(false);
  };
  const handleBanner = (b: boolean) => {
    setShowHint(b);
  };

  const handlePlatform = (platformName: string) => {
    if (platformName !== platformState) {
      setPlatformState(platformName);
    }
  };
  const renderTabs = () => {
    const platforms = [
      {
        p: "facebook",
        icon: <FaFacebook />,
      },
      {
        p: "instagram",
        icon: <FaInstagram />,
      },
      {
        p: "tiktok",
        icon: <FaTiktok />,
      },
    ];
    return platforms.map(({ p, icon }) => (
      <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
        <div
          className={`whitespace-nowrap flex items-center gap-1 cursor-pointer ${
            platformState === p
              ? "text-indigo-500"
              : "text-slate-500 hover:text-slate-600"
          }`}
          onClick={() => handlePlatform(p)}
        >
          {icon}
          <span>{p[0].toUpperCase() + p.substring(1)}</span>
        </div>
      </li>
    ));
  };
  const clearForm = () => {};
  return (
    <main className="h-full bg-slate-100 scroll-smooth">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <GeneratorHeader
          loading={loading}
          header={"Social Media Ad Generator"}
        />
        <div className="my-3 ">
          {showHint && (
            <WarningBanner hideBanner={handleBanner}>
              Hint! If you are getting the same output repeatedly or are getting
              bad results, change your description by making it more detailed or
              coming up with a new one!
            </WarningBanner>
          )}
        </div>
        <div className="h-full flex flex-col md:flex-row gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/3 flex flex-col gap-5 bg-white shadow-lg rounded-sm border border-slate-200 p-6 max-h-[450px]"
          >
            <h2 className="text-md font-medium text-center">
              Generator Settings
            </h2>

            <div className="border-b border-slate-200">
              <ul className="text-sm font-medium flex justify-between flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                {renderTabs()}
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="tooltip"
                >
                  Product Name (Up to 60 words)
                  <span className="text-rose-500 ml-1">*</span>
                </label>
              </div>
              <input
                {...register("productName", { required: true })}
                id="productName"
                className={`form-input w-full ${
                  errors["productName"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
              {errors["productName"] && (
                <div className="text-xs mt-1 text-rose-500">
                  This field is required!
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="tooltip"
                >
                  Short Description
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    Include a very short description of what you're product
                    does. IE: For a portable blender it would be (home milkshake
                    maker). This will help the AI generate a creative
                    description.
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("shortDescription", { required: true })}
                id="shortDescription"
                className={`form-input w-full ${
                  errors["shortDescription"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
              {errors["shortDescription"] && (
                <div className="text-xs mt-1 text-rose-500">
                  This field is required!
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="tooltip"
                >
                  Target Audience
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    Include the target audience that you'd wish this the ad
                    would reach.
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("targetAudience", { required: true })}
                id="targetAudience"
                className={`form-input w-full ${
                  errors["targetAudience"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
              {errors["targetAudience"] && (
                <div className="text-xs mt-1 text-rose-500">
                  This field is required!
                </div>
              )}
            </div>
            <button
              className="items-baseline btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none mt-auto"
              type="submit"
              value="Generate"
              disabled={loading}
            >
              {!loading && "Generate"}
              {loading && (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </div>
              )}
            </button>
          </form>
          <AdGenerator ads={ads} loading={loading} loadMore={loadMore} />
        </div>
      </div>
    </main>
  );
};
export default SocialMedia;
