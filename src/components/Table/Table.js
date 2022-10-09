import { default as request} from '../../request.js';

export default function Table(content) {
    console.log(content.props);
    let [headers, setHeaders] = React.useState({});

    return (
        <div className='flex w-4/5 my-16 h-auto m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900'>
            {content.props.children}
        </div>
    );
}