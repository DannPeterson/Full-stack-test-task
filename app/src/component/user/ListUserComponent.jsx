import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import IntegrationAutosuggest from "../IntegrationAutosuggest";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userNameSort: 0,
      firstNameSort: 0,
      lastNameSort: 0,
      birthDateSort: 0,
      emailSort: 0,
      addressSort: 0
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reloadUserList = this.reloadUserList.bind(this);
    this.reloadUserListSorted = this.reloadUserListSorted.bind(this);
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
    ApiService.fetchUsers().then(res => {
      this.setState({ users: res.data.result });
    });
  }

  reloadUserListSorted(columnName) {
    var fields = this.state.users;
    switch (columnName) {
      case "userName":
        if (this.state.userNameSort === 0) {
          fields.sort((a, b) => (a.userName > b.userName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            userNameSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.userName < b.userName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            userNameSort: 0
          }));
        }
        break;

      case "firstName":
        if (this.state.firstNameSort === 0) {
          fields.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            firstNameSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.firstName < b.firstName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            firstNameSort: 0
          }));
        }
        break;

      case "lastName":
        if (this.state.lastNameSort === 0) {
          fields.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            lastNameSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.lastName < b.lastName ? 1 : -1));
          this.setState(() => ({
            users: fields,
            lastNameSort: 0
          }));
        }
        break;

      case "birthDate":
        if (this.state.birthDateSort === 0) {
          fields.sort((a, b) => (a.birthDate > b.birthDate ? 1 : -1));
          this.setState(() => ({
            users: fields,
            birthDateSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.birthDate < b.birthDate ? 1 : -1));
          this.setState(() => ({
            users: fields,
            birthDateSort: 0
          }));
        }
        break;

      case "email":
        if (this.state.emailSort === 0) {
          fields.sort((a, b) => (a.email > b.email ? 1 : -1));
          this.setState(() => ({
            users: fields,
            emailSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.email < b.email ? 1 : -1));
          this.setState(() => ({
            users: fields,
            emailSort: 0
          }));
        }
        break;

      case "address":
        if (this.state.addressSort === 0) {
          fields.sort((a, b) => (a.address > b.address ? 1 : -1));
          this.setState(() => ({
            users: fields,
            addressSort: 1
          }));
        } else {
          fields.sort((a, b) => (a.address < b.address ? 1 : -1));
          this.setState(() => ({
            users: fields,
            addressSort: 0
          }));
        }
        break;
    }
  }

  deleteUser(userId) {
    ApiService.deleteUser(userId).then(res => {
      this.setState({
        users: this.state.users.filter(user => user.id !== userId)
      });
    });
  }

  editUser(id) {
    window.localStorage.setItem("userId", id);
    this.props.history.push("/edit-user");
  }

  addUser() {
    window.localStorage.removeItem("userId");
    this.props.history.push("/add-user");
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          User Details
        </Typography>
        <div>
          <IntegrationAutosuggest />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.addUser()}
        >
          Add User
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => this.reloadUserListSorted("userName")}>
                Username
              </TableCell>
              <TableCell onClick={() => this.reloadUserListSorted("firstName")}>
                First Name
              </TableCell>
              <TableCell onClick={() => this.reloadUserListSorted("lastName")}>
                LastName
              </TableCell>
              <TableCell onClick={() => this.reloadUserListSorted("birthDate")}>
                Birth Date
              </TableCell>
              <TableCell onClick={() => this.reloadUserListSorted("email")}>
                Email
              </TableCell>
              <TableCell onClick={() => this.reloadUserListSorted("address")}>
                Address
              </TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>
                  <Moment date={row.birthDate} format="DD.MM.YYYY" />
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell onClick={() => this.editUser(row.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell onClick={() => this.deleteUser(row.id)}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center"
};

export default ListUserComponent;
