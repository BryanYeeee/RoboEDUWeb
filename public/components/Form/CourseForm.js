import { default as request } from '../../request.js';
import { Form } from './Form.js';
import { default as TabBar } from '../Navbar/TabBar.js';

function CourseForm() {
  // let [data, setData] = React.useState([])
  let [format, setFormat] = React.useState(0); //0: Individualized, 1: Term

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600 text-right"
  }, "ADD COURSES"), TabBar(["Individual", "Term"], format, setFormat, false), format == 0 && Form([1, 2, 2, 1, 1, 1, 1, 1], {
    name: '',
    topic: '',
    stage: '',
    coursecreditcost: '',
    duration: '',
    agegroup: new Array(2),
    prerequisties: '',
    description: '',
    abilities: '',
    milestones: '',
    format: format
  }, {
    topic: ['dropdown', ['Science', 'Maker', 'Algorithms', 'Robotics', 'Technology']],
    stage: ['number'],
    coursecreditcost: ['number'],
    duration: ['number'],
    agegroup: ['range', ['number', 'number']]
  }, '/courses/newcourse', '/coursePage'), format == 1 && Form([1, 2, 2, 1, 1, 1, 1], {
    name: '',
    topic: '',
    stage: '',
    coursecreditcost: '',
    duration: '',
    agegroup: '',
    prerequisties: '',
    description: '',
    length: '',
    format: format
  }, {
    topic: ['dropdown', ['Science', 'Maker', 'Algorithms', 'Robotics', 'Technology']],
    stage: ['number'],
    coursecreditcost: ['number'],
    duration: ['number'],
    agegroup: ['range', ['number', 'number']],
    length: ['number']
  }, '/courses/newcourse', '/coursePage'));
}

const root = ReactDOM.createRoot(document.querySelector('#courseform'));
root.render( /*#__PURE__*/React.createElement(CourseForm, null));