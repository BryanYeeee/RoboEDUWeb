import { default as request } from '../../request.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';
// import { default as Table } from './Table.js';
import { default as TabBar } from '../Navbar/TabBar.js';

function CourseList() {
    let [data, setData] = React.useState([])
    let [lessons, setLessons] = React.useState();
    // let [lessons, setLessons] = React.useState([]);
    let [course, setCourse] = React.useState({ ID: -1 });
    let [curTab, setTab] = React.useState(-1);
    let topics =
    {
        "Science": [0, "#19e6c7"],
        "Maker": [1, "#f0a392"],
        "Algorithms": [2, "#e8c125"],
        "Robotics": [3, "#e31f09"],
        "Technology": [4, "#261614"],
    }
    React.useEffect(
        () => {
            request.get("/courses", {}).then(res => {
                res.sort((a, b) => {
                    return topics[a.Topic][0] > topics[b.Topic][0]?1:-1
                })
                // console.table(res)
                setData(res);
            }).catch(err => {
                console.log(err)
            });
            // request.post("/parents/getorders", {
            //     parentid: 22
            // }).then(res => {

            // }).catch(err => {
            //     console.log(err)
            // });
        },
        []
    );
    React.useEffect(
        () => {
            setLessons([{}])
            if (course.ID != -1 && JSON.parse(course.Lessons).length >0) {
                request.post("/courses/getlessons", { courseid: course.ID }).then(res => {
                    setLessons(res);
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        [course.ID]
    );
    let viewCourse = (item) => {
        if (item.ID != course.ID) {
            setCourse(item)
        }
    }
    return (
        <div>
            <div className='w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600 text-right'>
                COURSES
            </div>
            {TabBar(["Science", "Maker", "Algorithms", "Robotics", "Technology"], curTab, setTab,true)}
            <div className='flex w-4/5 mb-16 h-auto m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900'>
                <div>
                    {data.map((item, index) => {
                        return (
                            (topics[item.Topic][0] == curTab || curTab == -1) &&
                            <div className="flex flex-col justify-center first:mt-4 mb-4 mx-4 py-2 px-5 h-24 w-72 rounded bg-slate-400 text-slate-200" key={index} onClick={() => viewCourse(item)}
                                style={{ backgroundColor: topics[item.Topic][1] }}>
                                <p className="flex-shrink-0">{item.Topic} {item.Stage}</p>
                                <p className="overflow-x-auto no-scrollbar">{item.Name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-around sticky top-4 rounded overflow-x-auto no-scrollbar lg:top-24 my-4 mr-4 p-8 bg-slate-400 h-96 2xl:h-132 flex-grow lg:text-base duration-700">
                    {
                        course.ID != -1 &&
                        <>
                            <div className="flex justify-center flex-col w-full h-1/4">
                                <p className="xl:text-2xl">{course.Name} ({course.Format == 0 ? "Individualized" : "Term"})</p>
                                <p>Duration: {course.Duration} mins ● Course Credit Cost: {course["Course Credit Cost"]}{course.Format == 1 && ' ● Sessions: ' + course.length}</p>
                            </div>
                            <div className="flex flex-col justify-around w-full overflow-y-auto h-1/4">
                                <p>Ages: {course["Age Group"]}</p>
                                <p>{course.Description}</p>
                            </div>
                            <div className="w-full overflow-auto h-1/2">
                                {/* <div className="bg-green-500 h-1/2">123</div> */}
                                <Table key={lessons[0].ID}>
                                    <Header titles={["Code","Description","Hints"]} widths={["1/5","2/5","2/5"]}></Header>
                                    {lessons.map((item, index) => {
                                        return (
                                            <Row key={index}>
                                                <Cell w="1/5" center>{item.Code}</Cell>
                                                <Cell w="2/5">{item.Description}</Cell>
                                                <Cell w="2/5">{item['Teacher Hints']}</Cell>
                                            </Row>
                                        )
                                    })}
                                </Table>
                            </div>
                        </>
                    }
                </div>
            </div>
            {/* <div className='w-1/4 bg-blue-300'>123</div>
            <div className='w-1/5 bg-blue-300'>123</div>
            <div className='w-2/5 bg-blue-300'>123</div> */}
        </div>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#courselist'));
root.render(<CourseList />);