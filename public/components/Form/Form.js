import { default as request } from '../../request.js';
export function Form(format, formdata, endPoint, returnPage) {
  // console.log(format, formdata)
  function setData(inputTitle, inputData) {
    formdata[inputTitle] = inputData;
  }

  function submit() {
    console.log(formdata, endPoint);
    document.location = returnPage; // request.post(endPoint, formdata).then(res => {
    //     console.log('very cool')
    //     //goes back
    // }).catch(err => {
    //     console.log(err)
    // });
  }

  let content = [{}];
  let j = 0;
  let row = 0;

  for (let i in formdata) {
    content[row][i] = formdata[i];
    j++;

    if (j == format[row]) {
      if (row < format.length - 1) content.push({}); //If next row is the last row, it wont add extra

      if (row == format.length - 1) break; //Cut off extra fields

      row++;
      j = 0;
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "w-4/5 mb-16 h-full m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900"
  }, content.map((val, i) => /*#__PURE__*/React.createElement(Row, {
    content: val,
    handleCallback: setData,
    key: i
  })), /*#__PURE__*/React.createElement(Row, {
    submit: true,
    handleCallback: submit
  }));
}
export function Row(props) {
  let content = props.content;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex h-20 w-full border-2 border-slate-400"
  }, !props.submit ? Object.keys(content).map((key, i) => /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col p-2 h-full flex-grow",
    key: i
  }, /*#__PURE__*/React.createElement("p", null, key.toUpperCase()), /*#__PURE__*/React.createElement("input", {
    defaultValue: content[key],
    onChange: e => props.handleCallback(key, e.target.value)
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center px-14 bg-blue-900 text-slate-100 rounded-md text-sm sm:text-2xl hover:bg-blue-900 hover:font-bold",
    onClick: () => props.handleCallback()
  }, "SUBMIT")));
}