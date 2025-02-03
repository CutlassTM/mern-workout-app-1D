import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/Home.css"; // Import the new CSS file

function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  // Filter workouts by title
  const filteredWorkouts = workouts
    ? workouts.filter((workout) =>
        workout.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="home">
      <h2>My Workouts</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search workouts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Workout Cards */}
      <div className="workouts">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p className="no-results">No workouts found.</p>
        )}
      </div>

      <WorkoutForm />
    </div>
  );
}

export default Home;
