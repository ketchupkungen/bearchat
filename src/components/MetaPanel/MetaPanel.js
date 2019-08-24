import React from "react";
import {
  MDBContainer, 
  MDBCollapse, 
  MDBCard, 
  MDBCardBody, 
  MDBCollapseHeader, 
  MDBIcon,
  MDBListGroup, 
  MDBListGroupItem

} from "mdbreact";

class MetaPanel extends React.Component {
  state = {
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0,
    collapseID: "collapse1"
  };

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  formatCount = num => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

  displayTopPosters = posts =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <div style={{background:'none'}} key={i}>
          <img className="message-avatar" src={val.avatar} />
          <a className="message-author">{key}</a>
          <div className="message-time">{this.formatCount(val.count)}</div>
        </div>
      ))
      .slice(0, 2);

  toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    const { activeIndex, privateChannel, channel } = this.state;
    const { userPosts } = this.props;

    if (privateChannel) return null;

    return (
      <div>
          <MDBCard
            style={{ backgroundColor: "rgba(0,0,0,.03)" }}
            className="my-1"
          >
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")}>
              <span className="white-text">Channel Details</span>
              <MDBIcon
                icon={
                  this.state.collapseID === "collapse1"
                    ? "angle-up"
                    : "angle-down"
                }
                className="white-text"
                style={{ float: "right" }}
              />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse1" isOpen={this.state.collapseID}>
              <MDBCardBody className="rgba-grey-light white-text">
                {channel && channel.details}
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")}>
              <span className="white-text">Top Posters</span>
              <MDBIcon
                icon={
                  this.state.collapseID === "collapse2"
                    ? "angle-up"
                    : "angle-down"
                }
                className="white-text"
                style={{ float: "right" }}
              />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse2" isOpen={this.state.collapseID}>
              <MDBCardBody className="rgba-grey-light white-text">
                <MDBListGroup>{userPosts && this.displayTopPosters(userPosts)}</MDBListGroup>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse3")}>
              <span className="white-text">Created By</span>
              <MDBIcon
                icon={
                  this.state.collapseID === "collapse3"
                    ? "angle-up"
                    : "angle-down"
                }
                className="white-text"
                style={{ float: "right" }}
              />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse3" isOpen={this.state.collapseID}>
              <MDBCardBody className="rgba-grey-light white-text">
                  <img className="message-avatar" src={channel && channel.createdBy.avatar} />
                  <a className="message-author">{channel && channel.createdBy.name}</a>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
      </div>
    );
  }
}

export default MetaPanel;
