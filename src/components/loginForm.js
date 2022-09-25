import { default as request, login } from '../request.js';
// import authkey from "../../authkey";
// import "dotenv";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fname: null,
            lname: null,
            pswd: null,
            status: null
        }
        // console.log(login("a","s","d"))
        this.changeField = this.changeField.bind(this);
        this.submit = this.submit.bind(this);
        this.getcourses = this.getcourses.bind(this);
    }
    changeField(event) {
        console.log(event);
        this.setState({ [event.target.id]: event.target.value });
    }
    async submit() {
        console.log(this.state);
        this.setState({ status: "Loading . . ." });
        event.preventDefault();
        login(this.state.fname, this.state.lname, this.state.pswd).then(res => {
            console.log(res)
            this.setState({
                fname: res[0].fname,
                lname: res[0].lname,
                status: res[0]["auth-key"]
            });
            sessionStorage.setItem("test", res[0]["auth-key"]);
        }).catch(err => {
            console.log(err)
            this.setState({
                status: err
            });
        });
        return;
    }
    getcourses() {
        request.get("/courses", {}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
        

    }

    render() {
        return (
            <div>
                <div className='flex pt-7 pb-7 absolute bg-blue-600 w-2/5 h-full text-slate-100'>
                    <h1 className='absolute text-center text-6xl w-full h-1/2 mt-7 font-bold'>LOGIN</h1>
                    <img className='flex justify-center w-full m-auto rounded-3xl ml-7 mr-7' src={'../assets/logo.png'} />
                </div>
                <div className='flex flex-col px-20 py-10 drop-shadow-2xl overflow-auto absolute bg-slate-100 w-3/5 right-0 h-full text-slate-900'>
                    <p className="w-full border-2 bg-slate-900"></p>
                    <form className="flex flex-col h-full" onSubmit={this.submit}>
                        <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>First name:</label>
                        <input className='input' id="fname" type="text" onChange={this.changeField} />

                        <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>Last name:</label>
                        <input className='input' id="lname" type="text" onChange={this.changeField} />

                        <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>Password:</label>
                        <input className='input' id="pswd" type="password" onChange={this.changeField} />

                        <p className='block text-center text-xl mx-auto mt-3 font-semibold text-slate-800 absolute top-0'>{this.state.status}</p>
                        <button className='mt-20 ml-10 bg-blue-900 text-slate-100 rounded-md block w-2/3 px-3 h-12 sm:text-sm hover:bg-blue-900 hover:font-bold' type="submit">
                            <span className="text-2xl">Submit</span>
                        </button>
                    </form>

                        <button className='mt-20 ml-10 bg-blue-900 text-slate-100 rounded-md block w-2/3 px-3 h-12 sm:text-sm hover:bg-blue-900 hover:font-bold' onClick={this.getcourses}>
                            <span className="text-2xl">GETCOURSES</span>
                        </button>
                    {/* <p className="bg-blue-500">{this.state.fname} {this.state.lname}123</p> */}
                    <p className="w-full border-2 bg-slate-900"></p>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#loginform'));
root.render(<LoginForm />);


        // fetch(`http://localhost:8080/logins/loginpswd`, {
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