import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

const medals = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
      })
      .then((data) => {
        // Sort by points descending
        const sorted = [...data].sort((a, b) => b.points - a.points);
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border text-warning" role="status" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-warning">
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id || entry.id} className={index === 0 ? 'table-warning fw-bold' : ''}>
                <td>{medals[index] || index + 1}</td>
                <td>{entry.team?.name || entry.team}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {entries.length === 0 && <p className="text-muted">No leaderboard data yet.</p>}
      </div>
    </div>
  );
}

export default Leaderboard;
