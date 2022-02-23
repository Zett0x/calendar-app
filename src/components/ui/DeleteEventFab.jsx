import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/events";

export const DeleteEventFab = ({ activeEvent }) => {
  const dispatch = useDispatch();
  const handleDeleteEvent = () => {
    dispatch(eventDeleted(activeEvent));
  };
  return (
    <button
      type="submit"
      className="btn btn-danger fab-danger"
      onClick={handleDeleteEvent}
    >
      <i className="fas fa-trash"></i>
      <span>Borrar evento</span>
    </button>
  );
};
