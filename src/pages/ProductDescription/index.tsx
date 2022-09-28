import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import GeneratorHeader from "../../components/GeneratorHeader";

import Tooltip from "../../components/Tooltip";
import WarningBanner from "../../components/WarningBanner";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/Toast";
import { UserContext } from "../../context/UserContext";
import { generateDescription, generateMoreDescription } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";
import DescriptionGenerator from "./DescriptionGenerator";

interface FVals {
  productName: string;
  shortDescription: string;
  maxLength: string | number;
  seed?: string;
}
const ProductDescription = () => {
  const [descriptions, setDescriptions] = React.useState<string[]>([]);
  const [descriptionLength, setDescriptionLength] = React.useState(300);
  const [initialState, setInitialState] = React.useState<FVals | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);

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
    maxLength,
    seed,
  }) => {
    setLoading(true);
    const reqBody: FVals = {
      productName: productName,
      shortDescription: shortDescription
        .split(" ")
        .map((i: string) => i.toLowerCase())
        .join(" "),
      maxLength: Number(maxLength),
    };
    if (seed) {
      reqBody["seed"] = seed;
    }
    if (user) {
      const checkTokens = user.checkTokenAvailablity(costOfRequest);
      if (!checkTokens) {
        toast?.toastError("Error: Not enough tokens available.");
      } else {
        if (authentication?.currentUser) {
          await user.updateUserTokens(costOfRequest);
          const response = await authRequest(
            authentication?.currentUser,
            generateDescription,
            reqBody
          );
          setDescriptions([response.result]);
          setInitialState({
            productName: productName,
            shortDescription: shortDescription
              .split(" ")
              .map((i: string) => i.toLowerCase())
              .join(" "),
            maxLength: Number(maxLength),
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
          await user.updateUserTokens(costOfRequest);
          const reqBody = {
            productName: initialState.productName,
            shortDescription: initialState.shortDescription,
            maxLength: initialState.maxLength,
            previousOutput: descriptions,
          };
          const response = await authRequest(
            authentication?.currentUser,
            generateMoreDescription,
            reqBody
          );
          setDescriptions([...descriptions, response.result]);
          setShowHint(true);
        }
        setLoading(false);
      }
    }
  };
  const handleBanner = (b: boolean) => {
    setShowHint(b);
  };
  return (
    <main className="h-full bg-slate-100 scroll-smooth">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <GeneratorHeader
          loading={loading}
          header={"Product Description Generator"}
        />
        <div className="my-3">
          {showHint && (
            <WarningBanner hideBanner={handleBanner}>
              Hint! If you are getting the same output repeatedly or are getting
              bad results, change your description by making it more detailed or
              coming up with a new one. Also add words you would like to see
              included into seed words!
            </WarningBanner>
          )}
        </div>
        <div className="h-full flex flex-col md:flex-row gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/3 flex flex-col gap-5 bg-white shadow-lg rounded-sm border border-slate-200 p-6 max-h-[475px]"
          >
            <h2 className="text-md font-medium text-center">
              Generator Settings
            </h2>
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
                  Seed Words
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    Include words that are similar to or describes your product.
                    IE: For a portable blender seed words could be (fast,
                    healthy, compact).
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("seed")}
                id="seed"
                className={`form-input w-full ${
                  errors["seed"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="tooltip"
                >
                  Maximum Length ({descriptionLength})
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    Maximum length of description generated, the longer the
                    length the more chance of the AI generating nonsense towards
                    the end
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("maxLength")}
                type="range"
                name="maxLength"
                className="w-full h-2 bg-blue-100 appearance-none cursor-pointer"
                min={1}
                defaultValue={descriptionLength}
                max={500}
                onChange={(e) => setDescriptionLength(Number(e.target.value))}
              />
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
          <DescriptionGenerator
            desc={descriptions}
            loading={loading}
            loadMore={loadMore}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductDescription;
