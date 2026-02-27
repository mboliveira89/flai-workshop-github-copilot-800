import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{team.description || 'No description provided.'}</p>
                <p className="mb-0">
                  <strong>Members:</strong>{' '}
                  {team.members && team.members.length > 0
                    ? team.members.map((m) => m.username || m).join(', ')
                    : 'No members yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
        {teams.length === 0 && <p className="text-muted">No teams found.</p>}
      </div>
    </div>
  );
}

export default Teams;
