import { List } from './List.js';
import { default as request } from '../../request.js';
import { default as TabBar } from '../Navbar/TabBar.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';

function TeacherList() {
  let [data, setData] = React.useState([]);
  let [curTab, setTab] = React.useState(0);
  let [courses, setCourses] = React.useState({});

  let titleContent = item => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "flex-shrink-0"
    }, item['first name'], " ", item['last name']), /*#__PURE__*/React.createElement("p", {
      className: "overflow-x-auto no-scrollbar"
    }, item['phone number']));
  };

  let content = selected => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center items-start flex-col w-full h-1/4 py-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "xl:text-2xl"
    }, selected['first name'], " ", selected['last name']), /*#__PURE__*/React.createElement("p", null, " \u25CF Phone #: ", selected['phone number']), /*#__PURE__*/React.createElement("p", null, " \u25CF Address: ", selected.address), /*#__PURE__*/React.createElement("p", null, " \u25CF Email: ", selected.email)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-start w-full h-1/4 py-2"
    }, /*#__PURE__*/React.createElement("p", null, "About Me:"), /*#__PURE__*/React.createElement("p", null, selected['about me'])), /*#__PURE__*/React.createElement("div", {
      className: "w-full overflow-auto h-1/2"
    }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(Header, {
      titles: ["Name", "Topic", "Stage"],
      widths: ["2/5", "2/5", "1/5"]
    }), JSON.parse(selected.coursesteaching).map((item, index) => {
      item = courses[item.ID];
      return /*#__PURE__*/React.createElement(Row, {
        key: index
      }, /*#__PURE__*/React.createElement(Cell, {
        w: "2/5",
        center: true
      }, item.Name), /*#__PURE__*/React.createElement(Cell, {
        w: "2/5"
      }, item.Topic), /*#__PURE__*/React.createElement(Cell, {
        w: "1/5"
      }, item.Stage));
    }))));
  };

  React.useEffect(() => {
    request.post('/teachers', {}).then(res => {
      setData(res);
    }).catch(err => {
      console.log(err);
    });
    request.get('/courses', {}).then(res => {
      let newcourses = {};

      for (let i = 0; i < res.length; i++) {
        newcourses[res[i].ID] = res[i];
      }

      setCourses(newcourses);
    }).catch(err => {
      console.log(err);
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(List, {
    title: "TEACHERS",
    data: data,
    titleContent: titleContent,
    content: content,
    addEndpoint: '/addTeacherPage'
  }, TabBar(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], curTab, setTab, false)));
}

const root = ReactDOM.createRoot(document.querySelector('#teacherlist'));
root.render( /*#__PURE__*/React.createElement(TeacherList, null));