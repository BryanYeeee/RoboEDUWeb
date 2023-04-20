import { default as request } from '../../request.js';
import { default as Table, Cell, Row, Header } from '../Table/Table.js';
import { default as TabBar } from '../Navbar/TabBar.js';
export function List(props) {
  let title = props.title;
  let titleContent = props.titleContent;
  let content = props.content;
  let data = props.data;
  let tabbar = props.children;
  let addEndpoint = props.addEndpoint;
  let showCondition = props.showCondition;
  let [selected, setSelected] = React.useState({
    ID: -1
  });

  let viewSelected = item => {
    if (item.ID != selected.ID) {
      setSelected(item);
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between w-4/5 mt-28 m-auto text-2xl border-b-4 border-slate-600"
  }, title, " ", /*#__PURE__*/React.createElement("a", {
    className: "h-full",
    href: addEndpoint
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-4/5 rounded border-slate-600 text-center hover:shadow-2xl hover:text-slate-200 hover:bg-slate-800 bg-slate-400 duration-500"
  }, "ADD"))), tabbar, /*#__PURE__*/React.createElement("div", {
    className: "flex w-4/5 mb-16 h-auto m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900"
  }, /*#__PURE__*/React.createElement("div", null, data.map((item, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, showCondition(item) && /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col justify-center first:mt-4 mb-4 ml-4 py-2 px-5 h-24 w-72 rounded bg-slate-400 text-slate-200",
      key: index,
      onClick: () => viewSelected(item)
    }, titleContent(item), index));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-around sticky top-4 rounded overflow-x-auto no-scrollbar lg:top-24 my-4 m-4 p-8 bg-slate-400 h-96 2xl:h-132 flex-grow lg:text-base duration-700"
  }, selected.ID != -1 && content(selected))));
}