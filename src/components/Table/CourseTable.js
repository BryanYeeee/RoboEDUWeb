import { default as request } from '../../request.js';
import { default as Table } from './Table.js';

function CourseTable() {
    let [data, setData] = React.useState([])
    let [course, setCourse] = React.useState({ID:-1});

    React.useEffect(
        () => {
            request.get("/courses", {}).then(res => {
                console.log(res)
                setData(res);
            }).catch(err => {
                console.log(err)
            });
        },
        []
    );
    let topicbg =
    {
        "Science": "#19e6c7",
        "Maker": "#f0a392",
        "Algorithms": "#e8c125",
        "Robotics": "#e31f09",
        "Technology": "#261614",
    }

    return (
        <div className="text-slate-900">
            <div className='w-4/5 mt-36 m-auto text-2xl border-b-4 border-slate-600 '>
                <center>COURSES</center>
            </div>
            {Table(
                <div>
                    <div>
                        {data.map((item, index) => {
                            return (
                                <div className="flex flex-col justify-center first:mt-4 mb-4 mx-4 py-2 px-5 h-24 w-72 rounded bg-slate-400 text-slate-200" key={index} onClick={() => setCourse(item.ID == course.ID ? {ID:-1} : item)}
                                    style={{ backgroundColor: topicbg[item.Topic]}}>
                                    <p className="flex-shrink-0">{item.Topic} {item.Stage}</p>
                                    <p className="overflow-x-auto no-scrollbar">{item.Name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col justify-around items-center sticky top-4 rounded overflow-x-auto no-scrollbar lg:top-24 my-4 mr-4 p-8 bg-slate-400 h-96 xl:h-140 flex-grow lg:text-2xl transition-700">
                        {
                            course.ID != -1 &&
                            <>
                                <p className="xl:text-3xl border-b-2 border-slate-300">{course.Name}</p>
                                <center>{course.Topic} <b>:</b> Stage {course.Stage}</center>
                                <p>{course.Format == 0 ? "Individualized" : "Term"}</p>
                                <p>Ages: {course["Age Group"]}</p>
                                <p>{course.Description}</p>
                                <p className="self-start">Duration: {course.Duration} mins ● Course Credit Cost: {course["Course Credit Cost"]}{course.Format == 1 && ' ● Sessions: ' + course.length}</p>
                            </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#coursetable'));
root.render(<CourseTable />);