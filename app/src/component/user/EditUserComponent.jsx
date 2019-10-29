import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: "",
        userName: "",
        firstName: "",
        lastName: "",
        birthDate: null,
        email: "",
        address: ""
      },
      submitted: false
    };
    this.loadUser = this.loadUser.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    ApiService.fetchUserById(window.localStorage.getItem("userId")).then(
      res => {
        let user = res.data.result;
        this.setState({
          formData: {
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            email: user.email,
            address: user.address
          }
        });
      }
    );
  }

  handleDateChange(date) {
    this.setState({
      birthDate: date
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  emailRef = React.createRef();

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleBlur = event => {
    this.emailRef.current.validate(event.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      id: this.state.formData.id,
      userName: this.state.formData.userName,
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      birthDate: this.state.formData.birthDate,
      email: this.state.formData.email,
      address: this.state.formData.address
    };
    ApiService.editUser(user).then(res => {
      this.setState({ message: "User added successfully." });
      this.props.history.push("/users");
      console.log("user addded");
    });
  };

  render() {
    const { formData, submitted } = this.state;
    return (
      <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
        <Typography variant="h4" style={style}>
          Edit User
        </Typography>

        <TextValidator
          label="Username"
          fullWidth
          onChange={this.handleChange}
          name="userName"
          value={formData.userName}
        />

        <TextValidator
          label="First Name"
          fullWidth
          onChange={this.handleChange}
          name="firstName"
          value={formData.firstName}
        />

        <TextValidator
          label="Last Name"
          fullWidth
          onChange={this.handleChange}
          name="lastName"
          value={formData.lastName}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Birth Date"
            fullWidth
            margin="normal"
            value={this.state.birthDate}
            onChange={this.handleDateChange}
            format="dd.MM.yyyy"
          />
        </MuiPickersUtilsProvider>

        <TextValidator
          ref={this.emailRef}
          label="Email"
          fullWidth
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          name="email"
          value={formData.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />

        <TextValidator
          label="Address"
          fullWidth
          onChange={this.handleChange}
          name="address"
          value={formData.address}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={submitted}
        >
          {(submitted && "User added") || (!submitted && "Submit")}
        </Button>
      </ValidatorForm>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center"
};

export default EditUserComponent;
