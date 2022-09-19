import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Tooltip from "../../components/Tooltip";

import WarningBanner from "../../components/WarningBanner";
import { AuthContext } from "../../context/AuthContext";
import { generateBenefits, generateMoreBenefits } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";
import BenefitsGenerator from "./BenefitsGenerator";
interface FVals {
  productName: string;
  shortDescription: string;
  seed?: string;
}
const ProductBenefits = () => {
  const [showHint, setShowHint] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [benefits, setBenefits] = React.useState<string[]>([]);
  const [initialState, setInitialState] = React.useState<FVals | null>(null);

  const authentication = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues | FVals> = async ({
    productName,
    shortDescription,
    seed,
  }) => {
    const reqBody: FVals = {
      productName: productName,
      shortDescription: shortDescription
        .split(" ")
        .map((i: string) => i.toLowerCase())
        .join(" "),
    };
    if (seed) {
      reqBody["seed"] = seed;
    }
    if (authentication) {
      setLoading(true);
      const response: { result: string } = await authRequest(
        authentication,
        generateBenefits,
        reqBody
      );

      // Format incoming data -> [0] = useless string, [1,n] = has - in front. Remove
      const formattedOutput: string[] = [];
      response.result.split("\n").forEach((item, i) => {
        if (item) {
          formattedOutput.push(item.substring(1).trim());
        }
      });
      console.log("Output -", response);

      setBenefits([...formattedOutput]);
      setInitialState({
        productName: productName,
        shortDescription: shortDescription
          .split(" ")
          .map((i: string) => i.toLowerCase())
          .join(" "),
      });
      setLoading(false);
    }
  };
  const loadMore = async () => {
    if (authentication && initialState) {
      setLoading(true);
      const reqBody = {
        productName: initialState.productName,
        shortDescription: initialState.shortDescription,
        previousOutput: benefits,
      };
      const response: { result: string } = await authRequest(
        authentication,
        generateMoreBenefits,
        reqBody
      );
      // Format incoming data -> [0] = useless string, [1,n] = has - in front. Remove
      const formattedOutput: string[] = [];
      response.result
        .replace(/(\r\n|\n|\r)/gm, "")
        .split("-")
        .forEach((item, i) => {
          if (item) {
            formattedOutput.push(item.trim());
          }
        });
      console.log("Output Load More -", response);

      setBenefits([...benefits, ...formattedOutput]);
      setLoading(false);
      setShowHint(true);
    }
  };
  const handleBanner = (b: boolean) => {
    setShowHint(b);
  };
  return (
    <main className="h-full bg-slate-100">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-3">
          Product Benefits Generator
        </h1>
        <div className="mb-3 ">
          {showHint && (
            <WarningBanner hideBanner={handleBanner}>
              Hint! If you are getting the same output repeatedly or are getting
              bad results, change your description by making it more detailed or
              coming up with a new one. Also add words you would like to see
              included into seed words!
            </WarningBanner>
          )}
        </div>
        <div className="h-full flex gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/3 flex flex-col gap-5 bg-white shadow-lg rounded-sm border border-slate-200 p-6 max-h-[475px]"
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
                  Words To Include
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
          <BenefitsGenerator
            benefits={benefits}
            loading={loading}
            loadMore={loadMore}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductBenefits;
