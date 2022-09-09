import React from "react";
import { AuthContext } from "../../context/AuthContext";

const ProductDescription = () => {
  const authentication = React.useContext(AuthContext);

  return (
    <div>
      <h1>Product Description</h1>
      <button
        onClick={() => {
          console.log(authentication?.currentUser);

          authentication?.currentUser
            ?.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              // Send token to your backend via HTTPS
              // ...
              console.log(idToken);
            })
            .catch(function (error) {
              // Handle error
            });
        }}
      >
        Click Here
      </button>
    </div>
  );
};

export default ProductDescription;
