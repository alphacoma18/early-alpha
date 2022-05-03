import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthProvide";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const { authed } = useContext(AuthContext);
	if (!authed) {
		return (
			<Navigate
				to='/login'
				replace
				state={{ from: location }}
			/>
		);
	} else {
		return children;
	}
};
export default ProtectedRoute;
