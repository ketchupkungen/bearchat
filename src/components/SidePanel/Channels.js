import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
// prettier-ignore
import { Menu, Icon, Modal, Form, Input, Button, Label } from "semantic-ui-react";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBDropdown, MDBBtn, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBCollapse, MDBCard, MDBCardBody, MDBCollapseHeader } from "mdbreact";


class Channels extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channel: null,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    messagesRef: firebase.database().ref("messages"),
    typingRef: firebase.database().ref("typing"),
    notifications: [],
    modal: false,
    firstLoad: true,
    collapseID: ""
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
      this.addNotificationListener(snap.key);
    });
  };

  addNotificationListener = channelId => {
    this.state.messagesRef.child(channelId).on("value", snap => {
      if (this.state.channel) {
        this.handleNotifications(
          channelId,
          this.state.channel.id,
          this.state.notifications,
          snap
        );
      }
    });
  };

  handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;

    let index = notifications.findIndex(
      notification => notification.id === channelId
    );

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;

        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0
      });
    }

    this.setState({ notifications });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
    this.state.channels.forEach(channel => {
      this.state.messagesRef.child(channel.id).off();
    });
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({ channel: firstChannel });
    }
    this.setState({ firstLoad: false });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.state.typingRef
      .child(this.state.channel.id)
      .child(this.state.user.uid)
      .remove();
    this.clearNotifications();
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
    this.setState({ channel });
  };

  clearNotifications = () => {
    let index = this.state.notifications.findIndex(
      notification => notification.id === this.state.channel.id
    );

    if (index !== -1) {
      let updatedNotifications = [...this.state.notifications];
      updatedNotifications[index].total = this.state.notifications[
        index
      ].lastKnownTotal;
      updatedNotifications[index].count = 0;
      this.setState({ notifications: updatedNotifications });
    }
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  getNotificationCount = channel => {
    let count = 0;

    this.state.notifications.forEach(notification => {
      if (notification.id === channel.id) {
        count = notification.count;
      }
    });

    if (count > 0) return count;
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <MDBBtn
        color="dark"
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
        className="sidebar-dropdown-item"
      >
        {this.getNotificationCount(channel) && (
          <Label color="red">{this.getNotificationCount(channel)}</Label>
        )}
        #{channel.name}
      </MDBBtn>
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { channels, modal, collapseID } = this.state;

    return (
      <React.Fragment>
        <MDBCard className="sidebar-dropdown">
          <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")}>
            Channels {" "} ({channels.length})
            <Icon name="add" onClick={this.openModal} />
            <i className={ collapseID==="collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
          </MDBCollapseHeader>
          <MDBCollapse id="collapse2" isOpen={collapseID}>
            <MDBCardBody className="sidebar-dropdown-menu">
              {this.displayChannels(channels)}
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>

        <MDBModal className="form-dark channel-modal" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Create a channel</MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={this.handleSubmit}>
              <MDBInput
                onChange={this.handleChange}
                label="Name of channel"
                icon="hashtag"
                group
                type="text"
                validate
                error="wrong"
                success="right"

              />
              <MDBInput
                onChange={this.handleChange}
                label="About the channel"
                icon="book"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
            <MDBBtn color="success" onClick={this.handleSubmit}>Send</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel }
)(Channels);