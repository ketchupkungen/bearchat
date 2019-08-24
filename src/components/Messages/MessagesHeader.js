import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBCol
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
          <MDBNavbarToggler onClick={this.toggleCollapse} />
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
                <MDBNavLink onClick={this.toggle} className="waves-effect waves-light d-flex align-items-center" to="#!">i
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">Dropdown</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
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
      </Router>
        <MDBModal className="form-dark" contentClassName="card card-image" isOpen={this.state.modal} toggle={this.toggle}>
          <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
          <MDBModalHeader toggle={this.toggle}>About {channelName}</MDBModalHeader>
          <MDBModalBody>
            <MetaPanel
              key={currentChannel && currentChannel.name}
              userPosts={userPosts}
              currentChannel={currentChannel}
              isPrivateChannel={isPrivateChannel}
            />
          </MDBModalBody>
          </div>
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


 //<Segment clearing>
        {/* Channel Title */}
        {/*<Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {channelName}
            {!isPrivateChannel && (
              <Icon
                onClick={handleStar}
                name={isChannelStarred ? "star" : "star outline"}
                color={isChannelStarred ? "yellow" : "black"}
              />
            )}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>*/}

        {/* Channel Search Input */}
        {/*<Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>*/}