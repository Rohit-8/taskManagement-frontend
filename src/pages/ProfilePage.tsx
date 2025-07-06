import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../components/UserService';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      getUserByEmail(email)
        .then(setUser)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      setError('No user email found in local storage.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <div className="task-details">
      <h3>👤 Profile</h3>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.country}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default ProfilePage;
