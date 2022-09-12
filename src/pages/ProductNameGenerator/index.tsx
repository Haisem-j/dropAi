import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Tooltip from "../../components/Tooltip";
import { AuthContext } from "../../context/AuthContext";
import { generateMoreNames, generateNames } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";
import NamesGenerated from "./NamesGenerated";

const ProductNameGenerator = () => {
  const authentication = React.useContext(AuthContext);
  const [names, setNames] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [previousState, setPreviousState] = React.useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (authentication) {
      setPreviousState({ ...data });
      setLoading(true);
      const response = await authRequest(authentication, generateNames, data);
      const name = response.result.replace(/(\r\n|\n|\r)/gm, "").split(",");
      setLoading(false);
      setNames([...name]);
    }
  };
  const loadMore = async () => {
    if (authentication) {
      setLoading(true);
      const data = {
        pNames: names.join(","),
        previousState,
      };
      const response = await authRequest(
        authentication,
        generateMoreNames,
        data
      );
      const name = response.result.replace(/(\r\n|\n|\r)/gm, "").split(",");
      setNames([...names, ...name]);

      setLoading(false);
    }
  };
  return (
    <main className="h-full bg-slate-100 overflow-hidden">
      <div className="h-[90%] px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-3">
          Product Name Generator
        </h1>
        <div className="h-full flex gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/3 flex flex-col gap-5 bg-white shadow-lg rounded-sm border border-slate-200 p-6"
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
                  Product Description (Up to 60 words)
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    This will help the AI generate unique names. Remember the
                    more detail you give the better the name!
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("description", { required: true })}
                id="description"
                className={`form-input w-full ${
                  errors["description"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
              {errors["description"] && (
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
                  Seed Words (Separate each word with a comma)
                  <span className="text-rose-500 ml-1">*</span>
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
                {...register("seed", { required: true })}
                id="seed"
                className={`form-input w-full ${
                  errors["seed"] ? "border-rose-300" : ""
                }`}
                type="text"
              />
              {errors["seed"] && (
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
                  Similar Product Names
                </label>
                <Tooltip
                  className="ml-2"
                  bg="dark"
                  size="md"
                  position={"right"}
                >
                  <div className="text-sm text-slate-200">
                    Include other product names with styles you would like to
                    emulate (Separate each word with a comma)
                  </div>
                </Tooltip>
              </div>
              <input
                {...register("productNames")}
                id="productNames"
                className="form-input w-full"
                type="text"
              />
            </div>
            <button
              className="items-baseline btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
              type="submit"
              value="Generate"
              disabled={loading}
            >
              {!loading && "Generate"}
              {loading && (
                <>
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </>
              )}
            </button>
          </form>
          <NamesGenerated names={names} loading={loading} loadMore={loadMore} />
        </div>
      </div>
    </main>
  );
};

export default ProductNameGenerator;
