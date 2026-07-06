import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  let user = null;

  if (role === "organizer") {

    user = JSON.parse(
      localStorage.getItem("organizerUser")
    );

  } else {

    user = JSON.parse(
      localStorage.getItem("attendeeUser")
    );

  }

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  if (user.role !== role) {

    return <Navigate to="/login" replace />;

  }

  return children;

}

export default ProtectedRoute;