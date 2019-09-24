import React, { Component } from "react";
import "./modal.css";
import PropTypes from "prop-types";

class Modal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modalArea">
        <div className="modal" id="modal">
          <h2>{this.props.title} Variables</h2>
          <div className="content">{this.props.children}</div>
          <div className="actions">
            <button className="btn btn-danger" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
