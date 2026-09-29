import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { createRoutine } from "../api/routines";

export default function RoutinesForm({ syncRoutines }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const handleCreateRoutine = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await createRoutine(token, { name, goal });
      syncRoutines();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form action={handleCreateRoutine}>
      <label>
        Routine name:
        <input name="name"></input>
      </label>
      <label>
        What is the goal?
        <input name="goal"></input>
      </label>
      <button type="submit">Add routine</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
