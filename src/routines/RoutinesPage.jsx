import { getRoutines } from "../api/routines";
import { useState, useEffect } from "react";

import RoutinesList from "./RoutinesList";
import RoutinesForm from "./RoutinesForm";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  const syncRoutines = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <RoutinesList routines={routines}></RoutinesList>
      <RoutinesForm syncRoutines={syncRoutines}></RoutinesForm>
    </>
  );
}
