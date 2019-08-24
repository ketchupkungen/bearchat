import React from "react";
import { connect } from "react-redux";
import { MDBRow, MDBCol } from "mdbreact";

import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";


const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts }) => (
  <div className="lobby-background">
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
    
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(App);