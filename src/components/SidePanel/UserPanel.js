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
              <img className="message-avatar" src={user.photoURL}/>
              {user.displayName}
          </MDBDropdownToggle>
          <MDBDropdownMenu basic className="user-toggle">
            <MDBDropdownItem disabled>Signed in as <strong>{this.state.user.displayName}</strong></MDBDropdownItem>
            <MDBDropdownItem onClick={this.openModal}>Change Avatar</MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem onClick={this.handleSignout}>Sign Out</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        {/*}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.5}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {croppedImage && (
                      <img
                        style={{ margin: "3.5em auto" }}
                        width={100}
                        height={100}
                        src={croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name="save" /> Change Avatar
                </Button>
              )}
              <Button color="green" inverted onClick={this.handleCropImage}>
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>*/}

          <MDBModal className="form-dark" contentClassName="card card-image" isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>Upload Image</MDBModalHeader>
            <MDBModalBody>
              <input
                onChange={this.addFile}
                label="File types: jpg, png"
                name="file"
                type="file"
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
              <MDBBtn color="success" onClick={this.sendFile}>Send</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

      </div>
    );
  }
}

export default UserPanel;
