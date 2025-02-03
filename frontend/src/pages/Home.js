import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import "./Home.css";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState(""); // State for search filter

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // Filter workouts based on search term
  const filteredWorkouts = workouts
    ? workouts.filter((workout) =>
        workout.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="home">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="workouts">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;