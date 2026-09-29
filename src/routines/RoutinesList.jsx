import { useNavigate } from "react-router";

export default function RoutinesList({ routines }) {
  const navigate = useNavigate();

  return (
    <ul>
      {routines.map((routine) => (
        <li
          key={routine.id}
          onClick={() => {
            navigate(`/routines/${routine.id}`);
          }}
        >
          {routine.name}
        </li>
      ))}
    </ul>
  );
}
