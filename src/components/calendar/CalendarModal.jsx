import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventAddNew,
  eventDeleted,
  eventSetInactive,
  eventUpdated,
} from "../../actions/events";
//import { DeleteEventFab } from "../ui/DeleteEventFab";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};
export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());

  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else setFormValues(initEvent);
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventSetInactive());
    setFormValues(initEvent);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire(
        "Error",
        "La fecha final debe de ser mayor a la fecha inicial.",
        "error"
      );

      return;
    }
    if (title.trim().length === 0) {
      setTitleValid(false);
      return;
    }
    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Fernando",
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };
  const handleDeleteEvent = () => {
    Swal.fire({
      title: "¿Estás segur@ de que quieres eliminar este evento?",
      text: "¡No habrá vuelta atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "El evento ha sido eliminado.", "success");
        dispatch(eventDeleted(activeEvent));
        closeModal();
      }
    });
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

        {activeEvent && (
          <button
            type="button"
            className="btn btn-danger fab-danger"
            onClick={handleDeleteEvent}
          >
            <i className="fas fa-trash"></i>
            <span>Borrar evento</span>
          </button>
        )}
      </form>
    </Modal>
  );
};
