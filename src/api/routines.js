import axios from "axios";

const API = import.meta.env.VITE_API;

/** Fetches an array of Routines from the API. */
export async function getRoutines() {
  try {
    const response = await axios.get(API + "/routines");
    const result = response.data;
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Creates a single Routine */
export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create an routine.");
  }

  try {
    const { data } = await axios.post(
      API + "/routines",
      {
        name: routine.name,
        goal: routine.goal,
      },
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      },
    );

    return data;
  } catch (e) {
    throw new Error(e.response?.data?.message ?? e.message);
  }
}

/** Deleted Routine vy id */
export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  try {
    await axios.delete(API + "/routines/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    throw new Error(e.response?.data?.message ?? e.message);
  }
}
