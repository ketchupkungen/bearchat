import React from "react";
import { Link } from 'react-router-dom';
//import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Transition from 'react-transition-group/Transition';
import { MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBIcon, MDBBtn, MDBContainer, MDBCollapse, MDBCard, MDBCardBody, MDBCollapseHeader } from "mdbreact";

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isOpen: false
    };
  }

  state = {
    show:true,
    collapseID: ""
  }

  toggleCollapse = collapseID => () =>
	this.setState(prevState => ({
	  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
	}));

  toggleSidebar = () => {
    this.setState({
      show:!this.state.show ? true:false
    })
  }

  render() {
    const { currentUser } = this.props;
    const { collapseID } = this.state;

    return (
      <div>
  

        <MDBBtn color="dark" onClick={this.toggleSidebar} className="toggle-mobile-navbar">
          <i className="fa fa-bars"></i>
        </MDBBtn>
        1
        <div className="mobile-sidebar">
          <Transition
            in={this.state.show}
            timeout={0}
          >
            { state =>

              <div className="sidebar-box">
                <nav className={`sidebar sidebar-${state}`}>
                  <UserPanel currentUser={currentUser} />
					    		<MDBContainer className="md-accordion mt-5 sidebar-dropdown">
					          <Starred currentUser={currentUser} />
					          <Channels currentUser={currentUser} />
					          <DirectMessages currentUser={currentUser} />
					        </MDBContainer>
                </nav>
                <div
                  className={`screenHide screenHide-${state}`}
                  onClick={this.toggleSidebar}
                >

                </div>
              </div>
            }
          </Transition>
        </div>
        <div className="desk-sidebar" /*style={{width:'250px', background:'blue',zIndex:'43',position:'fixed', height:'100%'}}*/>
      		<UserPanel currentUser={currentUser} />
      		<MDBContainer className="md-accordion mt-5 sidebar-dropdown">
	          <Starred currentUser={currentUser} />
	          <Channels currentUser={currentUser} />
	          <DirectMessages currentUser={currentUser} />
	        </MDBContainer>
        </div>
      </div>
    );
  }
}



export default SidePanel;