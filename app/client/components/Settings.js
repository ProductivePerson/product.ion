import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import NavBar from './NavBar';
import AddUser from './AddUser';
import { Form, FormGroup, FormControl, ControlLabel, Panel, Button, Modal } from 'react-bootstrap';

const Settings = React.createClass({
  testing (event) {
    event.preventDefault();
    console.log("SETTINGS USER ", this.props.organization.user.perm);
    console.log("SETTINGS USER ", this.props.organization.user.id);
    console.log("SETTINGS USER ", this.props.organization.user.name);
    console.log("PASS ", findDOMNode(this.refs.passwordInput).value);
    console.log("NEW PASS ", findDOMNode(this.refs.newPasswordInput).value);
  },
  // check this user's username and current password in server.
  // if good, update with new PW.
  // if bad, return error.
  // but how do i access this user's username/ID?

  handleSubmit (event) {
    event.preventDefault();
    let username = this.props.organization.user.name,
    perm = this.props.organization.user.perm,
    currentPassword = findDOMNode(this.refs.passwordInput).value,
    newPassword = findDOMNode(this.refs.newPasswordInput).value;

    this.props.changePassword(username, perm, currentPassword, newPassword);
  },

  render() {
    return (
      <div className="settings">
        <Panel>
          <NavBar {...this.props}/>
        </Panel>
        <Panel>
          <h2>welcome to your settings, { this.props.organization.user.name }!</h2>
          <div>
            <Button>
               <Link to={`/dashboard/${this.props.organization.orgName.split(" ").join("")}`}>
                 Back
               </Link>
             </Button>
           </div>
           <br></br>
           <div>
             <button>
               <Link to={`/addUser`}>
                 Add a User to Organization
               </Link>
             </button>
           </div>

           <Modal show={this.props.modals.addUser} onHide={this.switchModal} >
             <Modal.Header closeButton>
               <Modal.Title>add a new user</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <AddUser {...this.props} />
             </Modal.Body>
             <Modal.Footer>
               <Button onClick={this.switchModal}>Close</Button>
             </Modal.Footer>
           </Modal>

           <br></br>

             <p className="orgName">{ this.props.organization.orgName }</p>

             <Form onSubmit={this.testing}>
               <div>
                 <ControlLabel >Current Password</ControlLabel>
                 <FormControl type="password" placeholder="••••••••••" ref="passwordInput" autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
               </div>
               <br></br>
               <div>
                 <ControlLabel>New Password</ControlLabel>
                 <FormControl type="password" placeholder="••••••••••" autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
               </div>
               <div>
                 <ControlLabel htmlFor="newPassword">Confirm New Password</ControlLabel>
                 <FormControl type="password" placeholder="••••••••••" ref="newPasswordInput" autoCorrect="off" autoCapitalize="off" spellCheck="false" required />
               </div>
               <div>
                 <Button>
                   Submit Change
                 </Button>
                </div>
             </Form>

         </Panel>
      </div>
    );
  }
});

export default Settings;
