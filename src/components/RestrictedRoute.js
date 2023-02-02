import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectIsLoggedIn } from "redux/auth/authSelectors";

export default function RestrictedRoute({ component, redirectTo = "/" }) {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}