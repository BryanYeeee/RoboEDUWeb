import { default as request } from '../../request.js';
import { Form } from './Form.js';
import { default as TabBar } from '../Navbar/TabBar.js';

function CourseForm() {
    let [format, setFormat] = React.useState(0) //0: Individualized, 1: Term
    let [lessons, setLessons] = React.useState([{ name: 'abc' }, { name: 'ada' }, { name: 'sefes' }, { name: 'edsfe' }, { name: 'asdas' }, { name: 'asdfsfd' }]);

    // React.useEffect(
    //     () => {
    //         request.get("/lessons", {}).then(res => {
    //             // console.table(res)
    //             setLessons(res);
    //         }).catch(err => {
    //             console.log(err)
    //         });
    //     },
    //     []
    // );

    let formOptions = {
        topic: ['dropdown', ['Science', 'Maker', 'Algorithms', 'Robotics', 'Technology']],
        stage: ['number'],
        coursecreditcost: ['number'],
        duration: ['number'],
        agegroup: ['range', ['number', 'number']],
        prerequisties: ['selector', lessons, 'name', true]
    }

    return (
        <>
            <div className='flex justify-between w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600'>
                ADD COURSES <a className='h-full' href={'/courseListPage'}><div className='w-20 h-4/5 rounded border-slate-600 text-center hover:shadow-2xl hover:text-slate-200 hover:bg-slate-800 bg-slate-400 duration-500'>BACK</div></a>
            </div>
            {TabBar(["Individual", "Term"], format, setFormat, false)}
            {
                format == 0 && Form([1, 2, 2, 1, 1, 1, 1, 1], { name: '', topic: '', stage: '', coursecreditcost: '', duration: '', agegroup: new Array(2), prerequisties: [], description: '', abilities: '', milestones: '', format: format },
                    formOptions, '/courses/newcourse', '/courseListPage')
            }
            {
                format == 1 && Form([1, 2, 2, 1, 1, 1, 1], { name: '', topic: '', stage: '', coursecreditcost: '', duration: '', agegroup: '', prerequisties: [], description: '', length: '', format: format },
                    Object.assign(formOptions, { length: ['number'] }), '/courses/newcourse', '/courseListPage')
            }
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#courseform'));
root.render(<CourseForm />);