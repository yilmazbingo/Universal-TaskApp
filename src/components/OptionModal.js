import React from "react";
import Modal from "react-modal";

const OptionModal = props => {
  return (
    <Modal
      isOpen={props.selectedOption && true}
      contentLabel="Selected Option"
      onRequestClose={props.closeModal}
      closeTimeoutMS={300}
      className="modal"
    >
      <h3 className="modal__title">Selected Option</h3>
      {props.selectedOption && (
        <p className="modal__body">{props.selectedOption}</p>
      )}
      <button className="button" onClick={props.closeModal}>
        OK
      </button>
    </Modal>
  );
};

export default OptionModal;
