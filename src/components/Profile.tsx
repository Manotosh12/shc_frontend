import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Please log in</p>;

  return (
    <div className="text-white p-4">
      <h2 className="text-lg font-semibold">Welcome, {user?.name || user?.email}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
