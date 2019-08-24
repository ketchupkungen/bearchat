import React from "react";
import firebase from "../../firebase";
import AvatarEditor from "react-avatar-editor";
// prettier-ignore
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from "semantic-ui-react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: null,
    uploadedCroppedImage: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("users"),
    metadata: {
    contentType: "image/jpeg"
    }
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;

    storageRef
      .child(`avatars/users/${userRef.uid}`)
      .put(blob, metadata)
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadURL => {
          this.setState({ uploadedCroppedImage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedCroppedImage
      })
      .then(() => {
        console.log("PhotoURL updated");
        this.closeModal();
      })
      .catch(err => {
        console.error(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log("User avatar updated");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { user, modal, previewImage, croppedImage } = this.state;

    return (
      <div>
        <div>
          <h2>BearChat</h2>
        </div>
        <MDBDropdown>
          <MDBDropdownToggle className="user-toggle" caret color="dark">
              <img className="sidebar-avatar" src={user.photoURL}/>
              {user.displayName}
          </MDBDropdownToggle>
          <MDBDropdownMenu basic className="user-toggle">
            <MDBDropdownItem disabled>Signed in as <strong>{this.state.user.displayName}</strong></MDBDropdownItem>
            <MDBDropdownItem onClick={this.openModal}>Change Avatar</MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem onClick={this.handleSignout}>Sign Out</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>

          <MDBModal className="form-dark avatar-modal" contentClassName="card card-image" isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>Upload and crop avatar</MDBModalHeader>
            <MDBModalBody>
            <div>
              <input
                onChange={this.handleChange}
                type="file"
                label="New Avatar"
                style={{ paddingBottom: "20px"}}
              />
            </div>
            <div>
              {previewImage && (
                <AvatarEditor
                  ref={node => (this.avatarEditor = node)}
                  image={previewImage}
                  width={100}
                  height={100}
                  border={50}
                  borderRadius={50}
                  scale={2}
                  style={{ display:'block', marginLeft: "auto", marginRight: "auto", borderRadius:'5px' }}
                />
              )}
              </div>
              <div>
              {croppedImage && (
                <img
                  style={{ display:'block', marginLeft: "auto", marginRight: "auto", borderRadius:'50px' }}
                  width={100}
                  height={100}
                  src={croppedImage}
                />
              )}
            </div>
            </MDBModalBody>
            <div className="avatar-modal-footer1">
              <MDBBtn outline color="danger" onClick={this.toggle}>Cancel</MDBBtn>
              <MDBBtn outline onClick={this.handleCropImage}>Preview</MDBBtn>
            </div>
            {croppedImage && (
              <div className="avatar-modal-footer2">
                <MDBBtn
                  color="success"
                  onClick={this.uploadCroppedImage}
                >
                  <i className="save" />Change avatar
                </MDBBtn>
              </div>
            )}

            <MDBModalFooter className="avatar-modal-footer">
              <MDBBtn outline color="danger" onClick={this.toggle}>Cancel</MDBBtn>
              <MDBBtn outline onClick={this.handleCropImage}>Preview</MDBBtn>
              {croppedImage && (
                <MDBBtn
                  outline
                  color="success"
                  onClick={this.uploadCroppedImage}
                >
                  <i className="save" />Change Avatar
                </MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModal>
      </div>
    );
  }
}

export default UserPanel;
