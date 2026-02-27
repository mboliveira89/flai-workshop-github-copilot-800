import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

const activityIcons = {
  running: '🏃',
  walking: '🚶',
  cycling: '🚴',
  swimming: '🏊',
  strength: '💪',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/activities/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getIcon = (type) => activityIcons[type?.toLowerCase()] || '🏅';

  if (loading) return <div className="text-center mt-4"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Type</th>
              <th>User</th>
              <th>Duration (min)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{getIcon(activity.activity_type)} {activity.activity_type}</td>
                <td>{activity.user?.username || activity.user}</td>
                <td>{activity.duration}</td>
                <td>{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {activities.length === 0 && <p className="text-muted">No activities found.</p>}
      </div>
    </div>
  );
}

export default Activities;
