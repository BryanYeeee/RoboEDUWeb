import { List } from './List.js'
import { default as request } from '../../request.js';
import { default as TabBar } from '../Navbar/TabBar.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';

function TeacherList() {
    let [data, setData] = React.useState([]);
    let [curTab, setTab] = React.useState(0);
    let [courses, setCourses] = React.useState({});

    let titleContent = (item) => {
        return (
            <>
                <p className="flex-shrink-0">{item['first name']} {item['last name']}</p>
                <p className="overflow-x-auto no-scrollbar">{item['phone number']}</p>
            </>
        )
    }

    let content = (selected) => {
        return (
            <>
                <div className="flex justify-center items-start flex-col w-full h-1/4 py-2">
                    <p className="xl:text-2xl">{selected['first name']} {selected['last name']}</p>
                    <p> ● Phone #: {selected['phone number']}</p>
                    <p> ● Address: {selected.address}</p>
                    <p> ● Email: {selected.email}</p>
                </div>
                <div className="flex flex-col justify-start w-full h-1/4 py-2">
                    <p>About Me:</p>
                    <p>{selected['about me']}</p>
                </div>
                <div className="w-full overflow-auto h-1/2">
                    <Table>
                        <Header titles={["Name", "Topic", "Stage"]} widths={["2/5", "2/5", "1/5"]}></Header>
                        {JSON.parse(selected.coursesteaching).map((item, index) => {
                            item = courses[item.ID]
                            return (
                                <Row key={index}>
                                    <Cell w="2/5" center>{item.Name}</Cell>
                                    <Cell w="2/5">{item.Topic}</Cell>
                                    <Cell w="1/5">{item.Stage}</Cell>
                                </Row>
                            )
                        })}
                    </Table>
                </div>
            </>
        )
    }

    React.useEffect(
        () => {
            request.post('/teachers', {}).then(res => {
                setData(res)
            }).catch(err => {
                console.log(err)
            });
            request.get('/courses', {}).then(res => {
                let newcourses = {}
                for(let i = 0; i < res.length; i++) {
                    newcourses[res[i].ID] = res[i];
                }
                setCourses(newcourses)
            }).catch(err => {
                console.log(err)
            });
        },
        []
    );
    return (
        <>

            <List title='TEACHERS' data={data} titleContent={titleContent} content={content} addEndpoint={'/addTeacherPage'}>{TabBar(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], curTab, setTab, false)}</List>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#teacherlist'));
root.render(<TeacherList />);