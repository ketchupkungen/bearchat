import React from "react";
import { connect } from "react-redux";



const Profile = ({ currentUser, currentChannel, isPrivateChannel, userPosts }) => (
  <div className="profile-page">
      {/*<SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
    
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />*/}

  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(Profile);