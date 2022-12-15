import csrfFetch from "./csrf";

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";

export const getUsers = ({ users }) => (users ? Object.values(users) : []);
