import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSliceReducer } from "./authSlice";

const persistConfig = {
	key: "token",
	version: 1,
	storage,
	whitelist: ["token"],
};

export const persistedAuthSliceReducer = persistReducer(
	persistConfig,
	authSliceReducer
);