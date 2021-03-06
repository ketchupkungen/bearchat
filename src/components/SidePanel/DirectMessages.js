import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { 
  MDBIcon,
  MDBBtn,
  MDBCard, 
  MDBCardBody, 
  MDBCollapse, 
  MDBCollapseHeader 
} from "mdbreact";

class DirectMessages extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
    collapseID: ""
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.usersRef.off();
    this.state.presenceRef.off();
    this.state.connectedRef.off();
  };

  addListeners = currentUserUid => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on("value", snap => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });

    this.state.presenceRef.on("child_added", snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key);
      }
    });

    this.state.presenceRef.on("child_removed", snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key, false);
      }
    });
  };

  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers });
  };

  isUserOnline = user => user.status === "online";

  changeChannel = user => {
    const channelId = this.getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name
    };
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
    this.setActiveChannel(user.uid);
  };

  getChannelId = userId => {
    const currentUserId = this.state.user.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  setActiveChannel = userId => {
    this.setState({ activeChannel: userId });
  };

  toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    const { users, activeChannel, collapseID } = this.state;

    return (
      <MDBCard className="sidebar-dropdown">
        <MDBCollapseHeader className="sidebar-category">
          Private message {" "} ({users.length})
          <MDBBtn
            onClick={this.toggleCollapse("collapse3")}
            className="dropdown-arrow"
            color="dark"
          >
            <i className={ collapseID==="collapse3" ? "fa fa-angle-down rotate-icon fa-2x" : "fa fa-angle-down fa-2x" } />
          </MDBBtn>
        </MDBCollapseHeader>
        <MDBCollapse id="collapse3" isOpen={collapseID}>
          <MDBCardBody className="sidebar-dropdown-menu">
            {users.map(user => (
          <MDBBtn 
            color="dark"
            key={user.uid}
            active={user.uid === activeChannel}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
            className="sidebar-dropdown-item"
          >
            <MDBIcon 
              icon="power-off"
              className={this.isUserOnline(user) ? "user-online" : "user-offline"}
             />
            {user.name}
          </MDBBtn>
          ))}
          </MDBCardBody>
        </MDBCollapse>
      </MDBCard>
    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel }
)(DirectMessages);
