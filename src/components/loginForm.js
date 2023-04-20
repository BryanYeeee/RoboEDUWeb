import { default as request, login } from '../request.js';

function LoginForm() {
    let [fname, setFname] = React.useState(null);
    let [lname, setLname] = React.useState(null);
    let [pswd, setPswd] = React.useState(null);
    let [state, setState] = React.useState(null);

    async function submit() {
        console.log(state);
        setState("Loading . . .")
        event.preventDefault();
        login(fname, lname, pswd).then(res => {
            console.log(res)
            setFname(res[0].fname)
            setLname(res[0].lname)
            document.location.href = "/teacherListPage";
        }).catch(err => {
            console.log(err)
            setState(err)
        });
        return;
    }

    return (
        <div>
            <div className='flex pt-7 pb-7 absolute bg-blue-600 w-2/5 h-full text-slate-100'>
                <h1 className='absolute text-center text-6xl w-full h-1/2 mt-7 font-bold'>LOGIN</h1>
                <img className='flex justify-center w-auto m-auto rounded-3xl ml-7 mr-7' src={'../assets/logo.png'} />
            </div>
            <div className='flex flex-col px-20 py-10 drop-shadow-2xl overflow-auto absolute bg-slate-100 w-3/5 right-0 h-full'>
                <p className="w-full h-2 border-2 rounded bg-slate-600"></p>
                <form className="flex flex-col h-full" onSubmit={ () => submit()}>
                    <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>First name:</label>
                    <input className='input' id="fname" type="text" onChange={event => setFname(event.target.value)} />

                    <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>Last name:</label>
                    <input className='input' id="lname" type="text" onChange={event => setLname(event.target.value)} />

                    <label className='mt-10 ml-10 block text-lg font-semibold leading-6'>Password:</label>
                    <input className='input' id="pswd" type="password" onChange={event => setPswd(event.target.value)} />

                    <p className='block text-center text-xl mx-auto mt-3 font-semibold text-slate-800 absolute top-0'>{status}</p>
                    <button className='mt-20 ml-10 bg-blue-900 text-slate-100 rounded-md block w-2/3 px-3 h-12 sm:text-sm hover:bg-blue-900 hover:font-bold' type="submit">
                        <span className="text-2xl">Submit</span>
                    </button>
                </form>
                <p className="w-full h-2 border-2 rounded bg-slate-600"></p>
            </div>
        </div>
    );
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