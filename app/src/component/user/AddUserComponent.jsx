import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class AddUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formData: {
        userName: "",
        firstName: "",
        lastName: "",
        birthDate: null,
        email: "",
        address: ""
      },
      submitted: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      birthDate: date
    });
  }

  componentDidMount() {
    ApiService.fetchUsers().then(res => {
      this.setState({ users: res.data.result });
    });
    ValidatorForm.addValidationRule("isFullNameUnique", () => {
      var answer = true;
      this.state.users.forEach(user => {
        if (
          user.firstName.localeCompare(this.state.formData.firstName) === 0 &&
          user.lastName.localeCompare(this.state.formData.lastName) === 0
        ) {
          answer = false;
        }
      });
      return answer;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isFullNameUnique");
  }

  emailRef = React.createRef();
  firstNameRef = React.createRef();
  lastNameRef = React.createRef();

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleEmailBlur = event => {
    this.emailRef.current.validate(event.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      userName: this.state.formData.userName,
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      birthDate: this.state.formData.birthDate,
      email: this.state.formData.email,
      address: this.state.formData.address
    };
    ApiService.addUser(user).then(res => {
      this.setState({ message: "User added successfully." });
      this.props.history.push("/users");
    });
  };

  render() {
    const { formData, submitted } = this.state;
    return (
      <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
        <Typography variant="h4" style={style}>
          Add User
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
          validators={["isFullNameUnique"]}
          errorMessages={["User with this full name already exists!"]}
        />

        <TextValidator
          label="Last Name"
          fullWidth
          onChange={this.handleChange}
          name="lastName"
          value={formData.lastName}
          validators={["isFullNameUnique"]}
          errorMessages={["User with this full name already exists!"]}
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
          onBlur={this.handleEmailBlur}
          onChange={this.handleChange}
          name="email"
          value={formData.email}
          validators={["required", "isEmail"]}
          errorMessages={["This field is required!", "Email is not valid!"]}
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

export default AddUserComponent;
