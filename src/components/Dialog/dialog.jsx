import React from "react";
import PropTypes from "prop-types";
import { Modal, TransitionablePortal } from "semantic-ui-react";

export default function Dialog(props) {
  const {
    open,
    size,
    header,
    content,
    actions,
    onClose,
    duration,
    animation
  } = props;
  return (
    <TransitionablePortal open={open} transition={{ duration, animation }}>
      <Modal open size={size} onClose={onClose}>
        {header}
        <Modal.Content>{content}</Modal.Content>
        <Modal.Actions>{actions}</Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
}

Dialog.propTypes = {
  size: PropTypes.string,
  duration: PropTypes.number,
  animation: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Dialog.defaultProps = {
  size: "fullscreen",
  duration: 500,
  animation: "scale"
};
