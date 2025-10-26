import { useAuth } from "../hooks/useAuth";

export const Dashboard = () => {
  const { handleLogoutMs, user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>

      <pre style={{ textAlign: "left", fontSize: "20px" }}>
        {JSON.stringify(
          {
            ...user,
          },
          null,
          2
        )}
      </pre>

      <br />
      <br />
      <br />

      <button onClick={handleLogoutMs}>Logout de Microsoft</button>
    </div>
  );
};
