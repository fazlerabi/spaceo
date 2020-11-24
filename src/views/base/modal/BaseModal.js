import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-responsive-modal";

function BaseModal(props) {
  const { onClose, open, children } = props;

  return (
    <Modal open={open} onClose={onClose} center>
      {children}
    </Modal>
  );
}

BaseModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

BaseModal.defaultProps = {
  open: false,
  onClose: () => {},
  children: {},
};

export default BaseModal;
