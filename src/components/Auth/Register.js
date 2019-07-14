import React from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  render() {
    return (
    	<Grid textAlign="center" verticalAlign="middle">
    		<Grid.Column style={{ maxwidth: 450}}>
    			<Header as="h2" icon color="orange">
    					Register for Bearchat
    			</Header>
    			<Form size="large">
    				<Segment stacked>
    					<Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" />

    					<Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />

    					<Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />

    					<Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} type="password" />

    					<Button color="orange" fluid size="large">Register</Button>
    				</Segment>
    			</Form>
    			<Message>Already a user? <Link to="/Login">Login</Link></Message>
    		</Grid.Column>
    	</Grid>
    );
  }
}

export default Register;
