import { default as request } from '../../request.js';
import { default as Table } from './Table.js';

function CourseTable() {
  let [data, setData] = React.useState([]);
  let [course, setCourse] = React.useState({
    ID: -1
  });
  React.useEffect(() => {
    request.get("/courses", {}).then(res => {
      console.log(res);
      setData(res);
    }).catch(err => {
      console.log(err);
    });
  }, []);
  let topicbg = {
    "Science": "#19e6c7",
    "Maker": "#f0a392",
    "Algorithms": "#e8c125",
    "Robotics": "#e31f09",
    "Technology": "#261614"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "text-slate-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4/5 mt-36 m-auto text-2xl border-b-4 border-slate-600 "
  }, /*#__PURE__*/React.createElement("center", null, "COURSES")), Table( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, data.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-center first:mt-4 mb-4 mx-4 py-2 px-5 h-24 w-72 rounded bg-slate-400 text-slate-200",
      key: index,
      onClick: () => setCourse(item.ID == course.ID ? {
        ID: -1
      } : item),
      style: {
        backgroundColor: topicbg[item.Topic]
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "flex-shrink-0"
    }, item.Topic, " ", item.Stage), /*#__PURE__*/React.createElement("p", {
      className: "overflow-x-auto no-scrollbar"
    }, item.Name));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-around items-center sticky top-4 rounded overflow-x-auto no-scrollbar lg:top-24 my-4 mr-4 p-8 bg-slate-400 h-96 xl:h-140 flex-grow lg:text-2xl transition-700"
  }, course.ID != -1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "xl:text-3xl border-b-2 border-slate-300"
  }, course.Name), /*#__PURE__*/React.createElement("center", null, course.Topic, " ", /*#__PURE__*/React.createElement("b", null, ":"), " Stage ", course.Stage), /*#__PURE__*/React.createElement("p", null, course.Format == 0 ? "Individualized" : "Term"), /*#__PURE__*/React.createElement("p", null, "Ages: ", course["Age Group"]), /*#__PURE__*/React.createElement("p", null, course.Description), /*#__PURE__*/React.createElement("p", {
    className: "self-start"
  }, "Duration: ", course.Duration, " mins \u25CF Course Credit Cost: ", course["Course Credit Cost"], course.Format == 1 && ' ● Sessions: ' + course.length))))));
}

const root = ReactDOM.createRoot(document.querySelector('#coursetable'));
root.render( /*#__PURE__*/React.createElement(CourseTable, null));