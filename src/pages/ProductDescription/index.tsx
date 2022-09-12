import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { testCall } from "../../Requests";
import { authRequest } from "../../utils/authenticationRequest";

const ProductDescription = () => {
  const authentication = React.useContext(AuthContext);

  return (
    <div>
      <h1>Product Description</h1>
      <button
        onClick={() => {
          if (authentication) {
            authRequest(authentication, testCall);
          }
        }}
      >
        Click Here
      </button>
    </div>
  );
};

export default ProductDescription;
