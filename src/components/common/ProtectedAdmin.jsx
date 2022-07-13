import musicianService from "../../services/musicianService";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const currentMusician = musicianService.getMusician();
  if (currentMusician && currentMusician.access_level === 1) {
    return children;
  }
  return <Navigate to="/signup" />;
}

export default ProtectedAdmin;
