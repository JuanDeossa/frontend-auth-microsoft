import { useNavigate, useParams } from "react-router";

export const useNav = () => {
  const navigate = useNavigate();
  const params = useParams();

  return {
    navigate,
    params,
  };
};
