import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { getRoutines, deleteRoutine } from "../api/routines";
import { getActivities } from "../api/activities";
import { createSet, deleteSet } from "../api/sets";

import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails() {
  const { routineId } = useParams();
  const [routines, setRoutines] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [routineError, setRoutineError] = useState(null);
  const [setsError, setSetsError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getRoutines();
      setRoutines(data);
    };
    fetchRoutines();
  }, [routineId]);

  const currentRoutine = routines.find(
    (routine) => routine.id === Number(routineId),
  );

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchActivities();
  }, []);

  if (!currentRoutine) {
    return <p>Loading...</p>;
  }

  const tryDeleteRoutine = async () => {
    setRoutineError(null);
    try {
      await deleteRoutine(token, currentRoutine.id);
    } catch (e) {
      setRoutineError(e.message);
      return;
    }
    navigate("/routines");
  };

  const sets = currentRoutine.sets;

  const tryCreateSet = async (formData) => {
    setSetsError(null);

    const set = {
      activityId: formData.get("activity-id"),
      routineId: currentRoutine.id,
      count: formData.get("activity-set-count"),
    };

    try {
      await createSet(token, set);
      setRoutines(await getRoutines());
    } catch (e) {
      setSetsError(e.message);
      return;
    }
  };

  const handleDeleteSet = async (setId) => {
    setDeleteError(null);
    try {
      await deleteSet(token, setId);
      setRoutines(await getRoutines());
    } catch (e) {
      setDeleteError(e.message);
      console.error(e);
      return;
    }
  };

  return (
    <>
      <h1>Routine Details</h1>
      <h2>{currentRoutine.name}</h2>
      <h5>Created by: {currentRoutine.creatorName}</h5>
      <p>Routine goal: {currentRoutine.goal}</p>
      {token && <button onClick={tryDeleteRoutine}>Delete</button>}
      {routineError && <p role="alert">{routineError}</p>}
      <br />
      <br />
      <h3>Sets:</h3>
      {sets.length < 1 ? (
        token ? (
          <>
            <p>Oh no! There are not sets! Can you add some?</p>
          </>
        ) : (
          <p>Oh no! There are not sets! Login and add some!</p>
        )
      ) : (
        <ul>
          {sets.map((set) => (
            <li key={set.id} className="set-info">
              <p>Activity name: {set.name}</p>
              <p>Description: {set.description}</p>
              <p>Count: {set.count}</p>
              {token && (
                <button onClick={() => handleDeleteSet(set.id)}>Delete</button>
              )}
              {deleteError && <p>{deleteError}</p>}
            </li>
          ))}
        </ul>
      )}
      {token ? (
        <>
          <h4>Create a set:</h4>
          <form action={tryCreateSet}>
            <label>
              Activity name:
              <select name="activity-id" required>
                <option key="no-selection" value="">
                  -- Select an activity --
                </option>
                {activities.map((activity) => {
                  return (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Count of reps:
              <input name="activity-set-count" required />
            </label>
            <button type="submit">Submit</button>
            {setsError && <p role="alert">{setsError}</p>}
          </form>
        </>
      ) : null}
    </>
  );
}
