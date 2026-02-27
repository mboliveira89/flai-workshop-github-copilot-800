import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border text-success" role="status" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💪 Workout Suggestions</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">{workout.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description || 'No description provided.'}</p>
                {workout.exercises && (
                  <div>
                    <strong>Exercises:</strong>
                    <ul className="mt-1 mb-0">
                      {workout.exercises.split(',').map((ex, i) => (
                        <li key={i}>{ex.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {workouts.length === 0 && <p className="text-muted">No workouts found.</p>}
      </div>
    </div>
  );
}

export default Workouts;
