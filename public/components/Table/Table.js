import { default as request } from '../../request.js'; // export default function Table(content) {
//     console.log(content);
//     // let [headers, setHeaders] = React.useState({});
//     return (
//         <div className='flex w-4/5 mb-16 h-auto m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900'>
//             {/* <div className={content.props.className}>{content.props.children}</div> */}
//             {content}
//         </div>
//     );
// }

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log(props); // let [headers, setHeaders] = React.useState({});

    this.state = {
      content: props.children
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col w-full mx-auto border-2 border-slate-400 rounded text-slate-900"
    }, this.state.content);
  }

}
export class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.children
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex w-full border-2 border-slate-400"
    }, this.state.content);
  }

}
export class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.children,
      width: 'w-' + props.w,
      center: props.center ? ' justify-center' : '',
      type: props.header ? 'bg-slate-500 ' : 'bg-slate-300 '
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.state.type + 'flex box-border items-center overflow-auto h-10 no-scrollbar px-4  text-slate-900 ' + this.state.width + this.state.center
    }, /*#__PURE__*/React.createElement("div", null, this.state.content));
  }

}
export class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      widths: props.widths,
      titles: props.titles
    };
    console.log(this.state.titles);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "sticky top-0 flex w-full"
    }, this.state.titles.map((item, index) => {
      return /*#__PURE__*/React.createElement(Cell, {
        key: index,
        w: this.state.widths[index],
        center: true,
        header: true
      }, item);
    }));
  }

}