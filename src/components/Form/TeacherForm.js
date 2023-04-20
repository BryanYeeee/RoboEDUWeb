import { default as request } from '../../request.js';
import { Form } from './Form.js';
function TeacherForm() {
    let [locations, setLocations] = React.useState([{ name: 'abc' }, { name: 'ada' }, { name: 'sefes' }, { name: 'edsfe' }, { name: 'asdas' }, { name: 'asdfsfd' }]);
    let [courses, setCourses] = React.useState([{ name: 'abc' }, { name: 'ada' }, { name: 'sefes' }, { name: 'edsfe' }, { name: 'asdas' }, { name: 'asdfsfd' }]);

    // React.useEffect(
    //     () => {
    //         request.get("/courses", {}).then(res => {
    //             // console.table(res)
    //             setCourses(res);
    //         }).catch(err => {
    //             console.log(err)
    //         });
    //     },
    //     []
    // );

    let formOptions = {
        location: ['selector', locations, 'name', false],
        phonenum: ['number'],
        coursesteaching: ['selector', courses, 'name', true]
    }

    return (
        <>
            <div className='flex justify-between w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600'>
                ADD TEACHER <a className='h-full' href={'/teacherListPage'}><div className='w-20 h-4/5 rounded border-slate-600 text-center hover:shadow-2xl hover:text-slate-200 hover:bg-slate-800 bg-slate-400 duration-500'>BACK</div></a>
            </div>
            {Form([1, 2, 1, 2, 1, 1], { location: '', firstname: '', lastname: '', pswd: '', phonenum: '', email: '', address: '', coursesteaching: [] },
                formOptions, '/teachers/newuser', '/teacherListPage')}
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#teacherform'));
root.render(<TeacherForm />);