import axios from "axios";
import { AppConsts } from "../../app";
import { AdminActionTypes } from "../index";
import { UIActionCreators } from "../../ui";

const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
};

export const getAllUsers = () => {
    return dispatch => {
        axios.get(`${AppConsts.SERVER_ADDRESS}/api/user/GetAll`).then(
            result => {
                let users = result.data != "null" ? JSON.parse(result.data) : [];
                dispatch({
                    type: AdminActionTypes.GET_ALL_USERS,
                    payload: {
                        users
                    }
                });
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
        );
    };
};

export const getPremiumAccess = uuids => {
    return dispatch => {
        dispatch(UIActionCreators.showLoading());
        axios
            .post(
            `${AppConsts.SERVER_ADDRESS}/api/user/ChangeRole`,
            JSON.stringify(uuids),
            headers
            )
            .then(
            result => {
                dispatch({
                    type: AdminActionTypes.GET_PREMIUM_ACCESS,
                    payload: {
                        uuids
                    }
                });
                dispatch(UIActionCreators.hideLoading());
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
            );
    };
};

export const moveToBin = uuids => {
    return dispatch => {
        dispatch(UIActionCreators.showLoading());
        axios
            .post(
            `${AppConsts.SERVER_ADDRESS}/api/user/MoveToBin`,
            JSON.stringify(uuids),
            headers
            )
            .then(
            result => {
                dispatch({
                    type: AdminActionTypes.MOVE_TO_BIN,
                    payload: {
                        uuids
                    }
                });
                dispatch(UIActionCreators.hideLoading());
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
            );
    };
};

export const deleteUserFromBin = uuids => {
    return dispatch => {
        dispatch(UIActionCreators.showLoading());
        axios
            .post(
            `${AppConsts.SERVER_ADDRESS}/api/user/Delete`,
            JSON.stringify(uuids),
            headers
            )
            .then(
            result => {
                dispatch({
                    type: AdminActionTypes.DELETE_USER_FROM_BIN,
                    payload: {
                        uuids
                    }
                });
                dispatch(UIActionCreators.hideLoading());
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
            );
    };
};

export const getAllUserInBin = () => {
    return dispatch => {
        dispatch(UIActionCreators.showLoading());
        axios.get(`${AppConsts.SERVER_ADDRESS}/api/user/GetAllDeleted`).then(
            result => {
                let users = result.data != "null" ? JSON.parse(result.data) : [];
                dispatch({
                    type: AdminActionTypes.GET_ALL_USERS_IN_BIN,
                    payload: {
                        users
                    }
                });
                dispatch(UIActionCreators.hideLoading());
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
        );
    };
};

export const restoreUserFromBin = uuids => {
    return dispatch => {
        dispatch(UIActionCreators.showLoading());
        axios
            .post(
            `${AppConsts.SERVER_ADDRESS}/api/user/RestoreFromBin`,
            JSON.stringify(uuids),
            headers
            )
            .then(
            result => {
                dispatch({
                    type: AdminActionTypes.RESTORE_USER_FROM_BIN,
                    payload: {
                        uuids
                    }
                });
                dispatch(UIActionCreators.hideLoading());
            },
            error => {
                dispatch(
                    UIActionCreators.getErrorFromServer(error.response.data.Message)
                );
            }
            );
    };
};