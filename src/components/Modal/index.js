import React, { Component } from "react";
import "./modal.css";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

class Modal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modalArea p-4">
        <div className="w-full sm:w-2/3 md:w-1/2 h-full p-4 flex-1" id="modal">
          <div class="flex w-full p-4 text-white bg-blue-600">
            <div class="flex-1 uppercase ">{this.props.title} Components</div>
            <div class="flex items-center">
              <button onClick={this.onClose}>
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="bg-white flex-1 p-8 overflow-auto max-h-full">
            {this.props.children}
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
