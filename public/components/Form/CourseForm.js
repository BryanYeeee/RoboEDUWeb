import { default as request } from '../../request.js';
import { Form } from './Form.js';

function CourseForm() {
  let [data, setData] = React.useState([]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600 text-right"
  }, "ADD COURSES"), Form([1, 2, 1], {
    name: '111',
    topic: '',
    stage: '',
    format: ''
  }, '/courses/newcourse', '/coursePage'));
}

const root = ReactDOM.createRoot(document.querySelector('#courseform'));
root.render( /*#__PURE__*/React.createElement(CourseForm, null));