import { getUserById, loginUser } from "../../services/authService";
import { login, errorOccurred, userLoaded } from "./authSlice";
import jwt_decode from "jwt-decode";

export const authentication = loginInfo => async (dispatch) => {
    try {
        const { data, status } = await loginUser(loginInfo);
        if (status === 200 && data?.user?.status === true) {
            localStorage.setItem("accessToken", data?.accessToken);
            return dispatch(login({ user: data?.user, accessToken: data?.accessToken }));
        } else {
            dispatch(errorOccurred("The username or password is incorrect"));

        }

    } catch (err) {
        dispatch(errorOccurred("The username or password is incorrect"));
    }
}

export const getLogedInUser = () => async (dispatch) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(userLoaded());
            return null;

        } else {
            try {
                const { data, status } = await getUserById(decodedToken.sub);
                if (status === 200) {
                    return dispatch(login({
                        user: data,
                        accessToken: token
                    }));
                }
            } catch (err) {
                dispatch(errorOccurred("There was an error receiving information"));
            }
        }
    }
    dispatch(userLoaded());
}