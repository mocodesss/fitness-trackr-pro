import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getRoutines, deleteRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails() {
  const { routineId } = useParams();
  const [routines, setRoutines] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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

  if (!currentRoutine) return <p>Loading...</p>;

  const tryDeleteRoutine = async () => {
    setError(null);
    try {
      await deleteRoutine(token, currentRoutine.id);
    } catch (e) {
      setError(e.message);
      return;
    }
    navigate("/routines");
  };

  return (
    <>
      <h1>Routine Details</h1>
      <h2>{currentRoutine.name}</h2>
      <h5>Created by: {currentRoutine.creatorName}</h5>
      <p>Routine goal: {currentRoutine.goal}</p>
      {token && <button onClick={tryDeleteRoutine}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
