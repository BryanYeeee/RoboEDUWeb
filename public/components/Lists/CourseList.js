import { List } from './List.js';
import { default as request } from '../../request.js';
import { default as TabBar } from '../Navbar/TabBar.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';

function CourseList() {
  let [data, setData] = React.useState([]);
  let [curTab, setTab] = React.useState(0);
  let [lessons, setLessons] = React.useState({});
  React.useEffect(() => {
    request.get('/courses', {}).then(res => {
      setData(res);
    }).catch(err => {
      console.log(err);
    });
    request.get('/lessons', {}).then(res => {
      let newlessons = {};

      for (let i = 0; i < res.length; i++) {
        newlessons[res[i].ID] = res[i];
      }

      setLessons(newlessons);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  let titleContent = item => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "flex-shrink-0"
    }, item.Topic, " ", item.Stage), /*#__PURE__*/React.createElement("p", {
      className: "overflow-x-auto no-scrollbar"
    }, item.Name));
  };

  let content = selected => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center flex-col w-full h-1/4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "xl:text-2xl"
    }, selected.Name, " (", selected.Format == 0 ? "Individualized" : "Term", ")"), /*#__PURE__*/React.createElement("p", null, "Duration: ", selected.Duration, " mins \u25CF Course Credit Cost: ", selected["Course Credit Cost"], selected.Format == 1 && ' ● Sessions: ' + selected.length)), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-around w-full overflow-y-auto h-1/4"
    }, /*#__PURE__*/React.createElement("p", null, "Ages: ", selected["Age Group"]), /*#__PURE__*/React.createElement("p", null, selected.Description)), /*#__PURE__*/React.createElement("div", {
      className: "w-full overflow-auto h-1/2"
    }));
  };

  let tabIndexes = {
    "Science": 1,
    "Maker": 2,
    "Algorithms": 3,
    "Robotics": 4,
    "Technology": 5
  };

  let showCondition = item => {
    return curTab == 0 || tabIndexes[item.Topic] == curTab;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(List, {
    title: "COURSES",
    data: data,
    titleContent: titleContent,
    content: content,
    showCondition: showCondition,
    addEndpoint: '/addCoursePage'
  }, TabBar(['All', 'Science', 'Maker', 'Alogithms', 'Robotics', 'Technology'], curTab, setTab, false)));
}

const root = ReactDOM.createRoot(document.querySelector('#courselist'));
root.render( /*#__PURE__*/React.createElement(CourseList, null));