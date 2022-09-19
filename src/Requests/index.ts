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
