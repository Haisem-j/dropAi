import { BASE_URL } from "../config";

export const testCall = async (idToken: string) => {
  const response = await fetch(`${BASE_URL}api/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + idToken,
    },
  });
  const data = await response.json();
  console.log(data);
};

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
