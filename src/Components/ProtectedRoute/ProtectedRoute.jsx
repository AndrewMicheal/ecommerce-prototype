import { useContext } from "react";
import { Navigate } from "react-router";
import { userContext } from './../../Context/user.context';

export default function ProtectedRoute({children}) {
  const {token} = useContext(userContext);
  if(token) {
    return children
  }
  return <Navigate to = "/auth/login"/>
}
