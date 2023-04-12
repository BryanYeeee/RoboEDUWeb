import { default as request } from '../../request.js';
import { Form } from './Form.js';
import { default as TabBar } from '../Navbar/TabBar.js';

function CourseForm() {
    // let [data, setData] = React.useState([])
    let [format, setFormat] = React.useState(0) //0: Individualized, 1: Term
    let [lessons, setLessons] = React.useState(['abc','def','ghi','jahk','lmn','opcq','rsdt','uvw','xyz']);

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
        prerequisties: ['selector', lessons, true]
    }

    return (
        <>
            <div className='flex flex-col w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600 text-right'>
                ADD COURSES
            </div>
            {TabBar(["Individual", "Term"], format, setFormat, false)}
            {
                format == 0 && Form([1, 2, 2, 1, 1, 1, 1, 1], { name: '', topic: '', stage: '', coursecreditcost: '', duration: '', agegroup: new Array(2), prerequisties: [1,2,3], description: '', abilities: '', milestones: '', format: format },
                    Object.assign(formOptions, {}), '/courses/newcourse', '/coursePage')
            }
            {
                format == 1 && Form([1, 2, 2, 1, 1, 1, 1], { name: '', topic: '', stage: '', coursecreditcost: '', duration: '', agegroup: '', prerequisties: [], description: '', length: '', format: format },
                    Object.assign(formOptions, { length: ['number'] }), '/courses/newcourse', '/coursePage')
            }
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#courseform'));
root.render(<CourseForm />);