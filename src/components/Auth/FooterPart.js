import React, {Component} from 'react';
import { Footer, MDBIcon} from 'mdbreact';
//import logo from '../assets/images/logo.svg'

class FooterPart extends Component {
	render(){
		return(
			<Footer color="elegant-color-dark" className="font-small footer">
				<div className="footer-copyright text-center">
					<ul className="list-unstyled list-inline">
						<li className="list-inline-item">
							&copy; {(new Date().getFullYear())} Copyright:
							<a href="http://www.ketchupkungen.se"> ketchupkungen.se
								{/*<img className="footer-img" src={logo} alt="logo"/>*/}
							</a>
						</li>
						<li className="list-inline-item">
							<a
								href="https://ketchupkungen.se/"
								className="btn-floating btn-sm btn-tw  footer-link"
							>
								<MDBIcon fab icon="facebook-f" />
							</a>
						</li>
						<li className="list-inline-item">
							<a
								href="https://ketchupkungen.se/"
								className="btn-floating btn-sm btn-li footer-link"
							>
								<MDBIcon fab icon="instagram" />
							</a>
						</li>
					</ul>
				</div>
			</Footer>
		);
	}
}

export default FooterPart;