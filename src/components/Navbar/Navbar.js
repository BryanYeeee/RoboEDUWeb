import { NavItems } from "./Navitems.js";

class Navbar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="fixed top-0 left-0 w-full lg:flex justify-between xl:px-24 px-10 py-2 bg-slate-700 duration-700">
                <div className="flex justify-between items-center w-full lg:w-1/3 text-slate-200 duration-700">
                    <a className="w-2/5 h-auto" href="/">
                        <img className='rounded-3xl' src={'../../assets/logo.png'} />
                    </a>
                    <div className='w-7/12 p-1 mr-1 rounded border-2 border-blue-600'>
                        <p>{sessionStorage.getItem("usertypetitle")} :</p>
                        <p className='ml-2 text-xl duration-500'>{sessionStorage.getItem("fname")+' '+sessionStorage.getItem("lname")}</p>
                    </div>
                </div>
                <ul className="lg:flex justify-around mt-5 items-center lg:mt-0 lg:w-2/3 text-slate-100 duration-500">
                    {NavItems.map((item, index) => {
                        return (
                            <li key={index} className="flex items-center my-2 px-2 py-2 xl:px-8 lg:py-0 text-xl rounded hover:bg-opacity-80 hover:shadow-2xl hover:text-slate-900 hover:bg-slate-400 duration-500 h-full">
                                <a href={item.url}> {item.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#navbar'));
root.render(<Navbar />);