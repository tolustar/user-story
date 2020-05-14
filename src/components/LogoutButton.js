import React from "react";

import { useDispatch, useSelector } from "react-redux";
import allActions from "./../store/actions";
import { useHistory } from "react-router-dom";

export default function LogoutButton() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const history = useHistory();

  const logoutUser = () => {
    dispatch(allActions.userActions.logoutUser({}));
    dispatch(allActions.storyActions.createStory([]));
    history.push(`/`);
  };

  return (
    <div className="d-flex justify-content-center">
      {!!currentUser.details.token && (
        <button className="btn btn-primary my-4" onClick={logoutUser}>
          Logout
        </button>
      )}
    </div>
  );
}
