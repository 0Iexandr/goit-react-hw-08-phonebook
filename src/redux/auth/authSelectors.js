const authData = {
	selectUserName: (state) => state.auth.user.name,
	selectUserEmail: (state) => state.auth.user.email,
	selectIsLoggedIn: (state) => state.auth.isLoggedIn,
	selectIsRefreshing: (state) => state.auth.isRefreshing,
};

export const {
	selectUserName,
	selectUserEmail,
	selectIsLoggedIn,
	selectIsRefreshing,
} = authData;