export default function TabBar(content, curTab, setTab, unselectable) {
  // console.log(content);
  let headers = content; // console.log(headers)

  return /*#__PURE__*/React.createElement("div", {
    className: "flex justify-around mt-4 mx-auto w-4/5 h-8 bg-slate-300"
  }, headers.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      onClick: () => setTab(curTab == index && unselectable ? -1 : index),
      className: `flex justify-center items-center box-border flex-grow outline w-28' + 
                    ${curTab == index ? 'bg-slate-500' : 'bg-slate-400'}`
    }, item);
  }));
}