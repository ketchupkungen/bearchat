import React from "react";
import mime from "mime-types";
import {
  MDBBtn, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter
} from 'mdbreact';

class FileModal extends React.Component {
  state = {
    file: null,
    authorized: [
    "image/jpeg", 
    "image/png", 
    "image/gif", 
    "image/webp"],
    modal: false
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  isAuthorized = filename =>
    this.state.authorized.includes(mime.lookup(filename));

  clearFile = () => this.setState({ file: null });

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { modal, closeModal } = this.props;

    return (
      <span>
        <MDBBtn
          color="black"
          onClick={this.toggle}
          icon="cloud upload"
          className="message-button"
        >
          Upload
        </MDBBtn>
        <MDBModal className="form-dark" contentClassName="card card-image" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Upload Image or gif</MDBModalHeader>
          <MDBModalBody>
            <input
              onChange={this.addFile}
              label="File types: jpg, png, gif"
              name="file"
              type="file"
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn outline color="danger" onClick={this.toggle}>Cancel</MDBBtn>
            <MDBBtn outline color="success" onClick={this.sendFile}>Send</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </span>
    );
  }
}

export default FileModal;
