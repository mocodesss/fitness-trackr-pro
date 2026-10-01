import axios from "axios";

const API = import.meta.env.VITE_API;

/** Creates a set */
export async function createSet(token, set) {
  if (!token) {
    throw Error("You must be signed in to create an routine.");
  }

  try {
    const { data } = await axios.post(API + "/sets", set, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    throw new Error(e.response?.data?.message ?? e.message);
  }
}

/** Deleted a set from a routine by id */
export async function deleteSet(token, id) {
  if (!token) {
    throw Error("You must be the user who added this set to remove it");
  }

  try {
    await axios.delete(API + "/sets/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    throw new Error(e.response?.data?.message ?? e.message);
  }
}
