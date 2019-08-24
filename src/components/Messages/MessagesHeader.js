import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import {
  MDBNav,
  MDBNavbar, 
  MDBNavbarBrand, 
  MDBNavbarNav, 
  MDBNavItem, 
  MDBNavLink, 
  MDBNavbarToggler, 
  MDBCollapse, 
  MDBFormInline,
  MDBDropdown, 
  MDBDropdownToggle, 
  MDBDropdownMenu, 
  MDBDropdownItem, 
  MDBBtn, 
  MDBIcon, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter, 
  MDBInput, 
  MDBCol
} from "mdbreact";

import MetaPanel from "../MetaPanel/MetaPanel";

class MessagesHeader extends React.Component {
  state = {
    isOpen: false,
    modal: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
      handleStar,
      isChannelStarred,
      currentUser, 
      currentChannel, 
      userPosts
    } = this.props;

    return (
      <div>
      <Router>
        <MDBNavbar className="lobby-navbar" color="black" dark expand="md">
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavbarBrand>
                  <strong className="white-text">
                    {channelName}
                    {!isPrivateChannel && (
                      <i 
                        onClick={handleStar} 
                        className={isChannelStarred ? "fas fa-star" : "far fa-star"}
                        size="lg"
                        style={{cursor:'pointer'}}
                      />
                    )}
                  </strong>
                </MDBNavbarBrand>
                <MDBNavbarBrand>
                  <small className="white-text">
                    {numUniqueUsers}
                  </small>
                </MDBNavbarBrand>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink onClick={this.toggle} className="waves-effect waves-light d-flex align-items-center" to="#!">
                  <MDBIcon icon="info" />
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input
                      loading={searchLoading}
                      onChange={handleSearchChange} 
                      className="form-control mr-sm-2" 
                      type="text"
                      name="searchTerm"
                      placeholder="Search Messages" 
                      aria-label="Search"
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

        <MDBNav className="mobile-lobby-navbar" color="black">
          <MDBNavItem>
                <h5 className="white-text">
                  {channelName}
                  {!isPrivateChannel && (
                    <i 
                      onClick={handleStar} 
                      className={isChannelStarred ? "fas fa-star" : "far fa-star"}
                      size="lg"
                    />
                  )}
                </h5>
            </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2"></span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem>{numUniqueUsers}</MDBDropdownItem>
                <MDBDropdownItem onClick={this.toggle} className="waves-effect waves-light d-flex align-items-center" to="#!">
                    <p>Information</p>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem>
              <MDBFormInline waves style={{float:'right'}}>
                <div className="md-form my-0">
                  <input
                    loading={searchLoading}
                    onChange={handleSearchChange} 
                    className="form-control mr-sm-2" 
                    type="text"
                    name="searchTerm"
                    placeholder="Search Messages" 
                    aria-label="Search"
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem>
        </MDBNav>
      </Router>

        <MDBModal className="form-dark" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>About {channelName}</MDBModalHeader>
          <MDBModalBody>
            <MetaPanel
              key={currentChannel && currentChannel.name}
              userPosts={userPosts}
              currentChannel={currentChannel}
              isPrivateChannel={isPrivateChannel}
            />
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts
});

export default connect(mapStateToProps)(MessagesHeader);