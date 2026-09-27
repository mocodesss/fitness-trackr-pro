import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fecthActivity = async () => {
      const data = await getActivity(activityId);
      setActivity(data);
    };
    fecthActivity();
  }, [activityId]);

  if (!activity) return <p>Loading...</p>;

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <article className="activity-detail">
      <h1>Activity: {activity.name}</h1>
      <p>Description: {activity.description}</p>
      <h4>Created by: {activity.creatorName}</h4>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}
