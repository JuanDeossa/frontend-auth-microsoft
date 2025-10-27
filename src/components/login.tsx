import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { handleLoginMs } = useAuth();

  return (
    <div>
      <button onClick={handleLoginMs}>Login con Microsoft</button>
    </div>
  );
};
