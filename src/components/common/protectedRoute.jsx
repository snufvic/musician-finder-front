import musicianService from "../../services/musicianService";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentMusician = musicianService.getMusician();
  if (!currentMusician) {
    return <Navigate to="/signup" />;
  }
  return children;
}

export default ProtectedRoute;
