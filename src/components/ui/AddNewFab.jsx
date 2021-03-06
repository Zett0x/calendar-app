import React from "react";
import { useDispatch } from "react-redux";
import { eventSetInactive } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(eventSetInactive());
    dispatch(uiOpenModal());
  };
  return (
    <button className="btn btn-primary fab" onClick={handleButtonClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
