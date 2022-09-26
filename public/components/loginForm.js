import { default as request, login } from '../request.js';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: null,
      lname: null,
      pswd: null,
      status: null
    };
    this.changeField = this.changeField.bind(this);
    this.submit = this.submit.bind(this); // this.getcourses = this.getcourses.bind(this);
  }

  changeField(event) {
    console.log(event);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async submit() {
    console.log(this.state);
    this.setState({
      status: "Loading . . ."
    });
    event.preventDefault();
    login(this.state.fname, this.state.lname, this.state.pswd).then(res => {
      console.log(res);
      this.setState({
        fname: res[0].fname,
        lname: res[0].lname
      });
      document.location.href = "/teacherListPage";
    }).catch(err => {
      console.log(err);
      this.setState({
        status: err
      });
    });
    return;
  } // getcourses() {
  //     request.get("/courses", {}).then(res => {
  //         console.log(res)
  //     }).catch(err => {
  //         console.log(err)
  //     });
  // }


  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex pt-7 pb-7 absolute bg-blue-600 w-2/5 h-full text-slate-100"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "absolute text-center text-6xl w-full h-1/2 mt-7 font-bold"
    }, "LOGIN"), /*#__PURE__*/React.createElement("img", {
      className: "flex justify-center w-full m-auto rounded-3xl ml-7 mr-7",
      src: '../assets/logo.png'
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col px-20 py-10 drop-shadow-2xl overflow-auto absolute bg-slate-100 w-3/5 right-0 h-full"
    }, /*#__PURE__*/React.createElement("p", {
      className: "w-full h-2 border-2 rounded bg-slate-600"
    }), /*#__PURE__*/React.createElement("form", {
      className: "flex flex-col h-full",
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("label", {
      className: "mt-10 ml-10 block text-lg font-semibold leading-6"
    }, "First name:"), /*#__PURE__*/React.createElement("input", {
      className: "input",
      id: "fname",
      type: "text",
      onChange: this.changeField
    }), /*#__PURE__*/React.createElement("label", {
      className: "mt-10 ml-10 block text-lg font-semibold leading-6"
    }, "Last name:"), /*#__PURE__*/React.createElement("input", {
      className: "input",
      id: "lname",
      type: "text",
      onChange: this.changeField
    }), /*#__PURE__*/React.createElement("label", {
      className: "mt-10 ml-10 block text-lg font-semibold leading-6"
    }, "Password:"), /*#__PURE__*/React.createElement("input", {
      className: "input",
      id: "pswd",
      type: "password",
      onChange: this.changeField
    }), /*#__PURE__*/React.createElement("p", {
      className: "block text-center text-xl mx-auto mt-3 font-semibold text-slate-800 absolute top-0"
    }, this.state.status), /*#__PURE__*/React.createElement("button", {
      className: "mt-20 ml-10 bg-blue-900 text-slate-100 rounded-md block w-2/3 px-3 h-12 sm:text-sm hover:bg-blue-900 hover:font-bold",
      type: "submit"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-2xl"
    }, "Submit"))), /*#__PURE__*/React.createElement("p", {
      className: "w-full h-2 border-2 rounded bg-slate-600"
    })));
  }

}

const root = ReactDOM.createRoot(document.querySelector('#loginform'));
root.render( /*#__PURE__*/React.createElement(LoginForm, null)); // fetch(`http://localhost:8080/logins/loginpswd`, {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         firstname: "admin",
//         lastname: "csaa",
//         password: "123",
//         expiry: -1
//     })
// })
//     .then(res => {
//         // if(res.status == 400) {
//         //     console.log(res.json())
//         //     throw new Error(JSON.stringify(res.json()));
//         // }
//         return res.json();
//     }
//     ).then(res => {
//         // if (res.)
//         console.log("login", res);
//     }).catch(err => {
//         console.log("ASD")
//         console.log(err)
//         this.setState({ status: "Error" })
//     });