import React from "react";
import Modal from "react-modal";

const OptionModal = props => {
  return (
    <Modal
      isOpen={props.selectedOption && true}
      contentLabel="Selected Option"
      onRequestClose={props.closeModal}
    >
      <h3>Selected Option</h3>
      {props.selectedOption && <p>{props.selectedOption}</p>}
      <button onClick={props.closeModal}>OK</button>
    </Modal>
  );
};

export default OptionModal;
