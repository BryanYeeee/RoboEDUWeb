import { List } from './List.js'
import { default as request } from '../../request.js';
import { default as TabBar } from '../Navbar/TabBar.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';

function CourseList() {
    let [data, setData] = React.useState([]);
    let [curTab, setTab] = React.useState(0);
    let [lessons, setLessons] = React.useState({});

    React.useEffect(
        () => {
            request.get('/courses', {}).then(res => {
                setData(res)
            }).catch(err => {
                console.log(err)
            });
            request.get('/lessons', {}).then(res => {
                let newlessons = {}
                for (let i = 0; i < res.length; i++) {
                    newlessons[res[i].ID] = res[i];
                }
                setLessons(newlessons)
            }).catch(err => {
                console.log(err)
            });
        },
        []
    );

    let titleContent = (item) => {
        return (
            <>
                <p className="flex-shrink-0">{item.Topic} {item.Stage}</p>
                <p className="overflow-x-auto no-scrollbar">{item.Name}</p>
            </>
        )
    }

    let content = (selected) => {
        return (
            <><div className="flex justify-center flex-col w-full h-1/4">
                <p className="xl:text-2xl">{selected.Name} ({selected.Format == 0 ? "Individualized" : "Term"})</p>
                <p>Duration: {selected.Duration} mins ● Course Credit Cost: {selected["Course Credit Cost"]}{selected.Format == 1 && ' ● Sessions: ' + selected.length}</p>
            </div>
                <div className="flex flex-col justify-around w-full overflow-y-auto h-1/4">
                    <p>Ages: {selected["Age Group"]}</p>
                    <p>{selected.Description}</p>
                </div>
                <div className="w-full overflow-auto h-1/2">
                    {/* <Table key={lessons[0].ID}>
                        <Header titles={["Code", "Description", "Hints"]} widths={["1/5", "2/5", "2/5"]}></Header>
                        {lessons.map((item, index) => {
                            return (
                                <Row key={index}>
                                    <Cell w="1/5" center>{item.Code}</Cell>
                                    <Cell w="2/5">{item.Description}</Cell>
                                    <Cell w="2/5">{item['Teacher Hints']}</Cell>
                                </Row>
                            )
                        })}
                    </Table> */}
                </div>
            </>
        )
    }   

    let tabIndexes = 
    {
        "Science": 1,
        "Maker": 2,
        "Algorithms": 3,
        "Robotics": 4,
        "Technology": 5
    }

    let showCondition = (item) => {
        return (curTab == 0 || tabIndexes[item.Topic] == curTab)
    }
    return (
        <>

            <List title='COURSES' data={data} titleContent={titleContent} content={content} showCondition={showCondition} addEndpoint={'/addCoursePage'}>{TabBar(['All', 'Science', 'Maker', 'Alogithms', 'Robotics', 'Technology'], curTab, setTab, false)}</List>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#courselist'));
root.render(<CourseList />);