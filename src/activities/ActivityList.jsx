import { useNavigate } from "react-router";

export default function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  const navigate = useNavigate();

  return (
    <li>
      <a
        onClick={() => {
          navigate(`/activities/${activity.id}`);
        }}
      >
        {activity.name}
      </a>
    </li>
  );
}
