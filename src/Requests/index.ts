import { BASE_URL } from "../config";

export const generateNames = async (
  idToken: string,
  d: { description: string; seed: string; productNames: string }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-names`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const generateMoreNames = async (
  idToken: string,
  data: {
    pNames: string;
    previousState: { description: string; seed: string; productNames: string };
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-more-names`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(data),
    });
    const d = await response.json();
    if (!response.ok) {
      throw new Error(d.message);
    }
    return d;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateDescription = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    maxLength: number;
    seed?: string;
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-prod-description`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const generateMoreDescription = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    maxLength: number;
    seed?: string;
    previousOutput: string[];
  }
) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/generate-more-prod-description`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(d),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateBenefits = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    seed?: string;
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-prod-benefits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateMoreBenefits = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    seed?: string;
    previousOutput: string[];
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-more-prod-benefits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateAd = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    targetAudience: string;
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-ad`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const generateMoreAds = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    targetAudience: string;
    previousOutput: string[];
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-more-ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateTaglines = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-taglines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const generateMoreTaglines = async (
  idToken: string,
  d: {
    productName: string;
    shortDescription: string;
    previousOutput: string[];
  }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/generate-more-taglines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkoutPayment = async (
  idToken: string,
  d: { paymentID: string }
) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(d),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const createUser = async (idToken: string, d: { uid: string }) => {
  try {
    const response = await fetch(`${BASE_URL}api/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const getUser = async (idToken: string, d: { uid: string }) => {
  try {
    const response = await fetch(`${BASE_URL}api/user/get-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const updateTokens = async (
  idToken: string,
  d: { uid: string; tokensUser: number }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/user/update-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getBillingInfo = async (
  idToken: string,
  d: { paymentId: number }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/payments/get-billing-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const cancelSubscription = async (
  idToken: string,
  d: { customerId: number; uid: string }
) => {
  try {
    const response = await fetch(`${BASE_URL}api/payments/cancel-sub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(d),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    // Returns {data: {periodEnd: number}}
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
