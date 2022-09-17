class LoginForm extends React.Component {

    render() {
        return (
            <div>
                <h1>OKOK</h1>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
        );
    }
}


const domContainer = document.querySelector('#loginform');
const root = ReactDOM.createRoot(domContainer);
root.render(<LoginForm />);