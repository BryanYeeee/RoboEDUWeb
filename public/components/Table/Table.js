import { default as request, login } from '../../request.js';

class Table extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex pt-7 pb-7 absolute bg-green-100 w-2/5 h-full text-slate-100"
    }, "CAMPBELL SOUP"));
  }

}

const root = ReactDOM.createRoot(document.querySelector('#table'));
console.log(root);
root.render( /*#__PURE__*/React.createElement(Table, null));