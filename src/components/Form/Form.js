import { default as request } from '../../request.js';

export function Form(format, formdata, options, endPoint, returnPage) {
    // console.log(format, formdata)
    /* Form Options:
    No option/default: text input
    'number': number only input
    'range', [input type 1, input type 2]: 2 side by side inputs
    'dropdown', Array: dropdown selection from the provided array
    'selector', Array, field, boolean: search and select from array, boolean = true for multi-select array, false for 1 selection
    For radio selection use TabBar component
    */


    function setData(inputTitle, inputData, index) {
        console.log(inputData, index)
        if (index == -1) {
            if (formdata[inputTitle].includes(inputData)) {
                formdata[inputTitle].splice(formdata[inputTitle].indexOf(inputData), 1);
            } else {
                formdata[inputTitle].push(inputData)
            }
        } else if (index !== undefined) {
            formdata[inputTitle][index] = inputData
        } else {
            formdata[inputTitle] = inputData;
        }
        console.log(formdata[inputTitle])
    }

    function submit() {
        console.log(formdata, endPoint)
        request.post(endPoint, formdata).then(res => {
            console.log('very cool')
            document.location = returnPage
            
        }).catch(err => {
            console.log(err)
        });
    }

    let content = [{}]
    let j = 0;
    let row = 0
    for (let i in formdata) {
        content[row][i] = formdata[i]
        j++;
        if (j == format[row]) {
            if (row < format.length - 1) content.push({}) //If next row is the last row, it wont add extra
            if (row == format.length - 1) break; //Cut off extra fields
            row++;
            j = 0;
        }
    }

    return (
        <div className='w-4/5 mb-16 h-full m-auto border-2 border-slate-400 rounded bg-slate-300 text-slate-900'>
            {content.map((val, i) =>
                <Row content={val} options={options} handleCallback={setData} key={i} />
            )}
            <Row submit handleCallback={submit} />
        </div>
    )
}

export function Row(props) {
    let content = props.content
    let options = props.options
    let [filter, setFilter] = React.useState('');
    let [render, rerender] = React.useState(false)
    console.log(options, content)

    function selectorCallback(key, selection) {
        props.handleCallback(key, selection, !options[key][3] ? undefined : -1);
        if (!options[key][3]) {
            content[key] = selection
        }
        rerender(!render);
    }

    return (
        <div className='flex items-center w-full border-2 border-slate-400' style={{ minHeight: "5rem" }}>
            {
                !props.submit ?
                    Object.keys(content).map((key, i) =>
                        <div className='flex flex-col p-2 h-full flex-grow' key={i}>
                            <p>{key.toUpperCase()}</p>
                            {options[key] == null ? <input defaultValue={content[key]} onChange={e => props.handleCallback(key, e.target.value)} />
                                :
                                (options[key][0] == 'number' && <input type="number" defaultValue={content[key]} onChange={e => props.handleCallback(key, e.target.value)} />) ||
                                (options[key][0] == 'dropdown' &&
                                    <select defaultValue={content[key]} onChange={e => props.handleCallback(key, e.target.value)}>
                                        {options[key][1].map((val, i) =>
                                            <option key={i} value={val}>{val}</option>
                                        )}
                                    </select>) ||
                                (options[key][0] == 'range' &&
                                    <div className='flex flex-grow w-full gap-4'>
                                        <input className="flex-1" type={options[key][1][0]} defaultValue={content[key][0]} onChange={e => props.handleCallback(key, e.target.value, 0)} />
                                        <p>TO</p>
                                        <input className="flex-1" type={options[key][1][1]} defaultValue={content[key][1]} onChange={e => props.handleCallback(key, e.target.value, 1)} />
                                    </div>) ||
                                (options[key][0] == 'selector' &&
                                    <>
                                        <input className="p-2" value={!options[key][3] ? content[key][options[key][2]] : formatJsonArray(content[key], options[key][2])} readOnly />
                                        <input className="w-auto p-2 mt-8 mx-8" placeholder={'Search List'} onChange={e => setFilter(e.target.value)} />
                                        <div className='flex p-2 mx-8 mb-8 flex-wrap overflow-y-auto items-start justify-around w-auto border-2 border-slate-400 gap-y-2' style={{ minHeight: "15rem", maxHeight: "15rem" }}>
                                            {options[key][1].filter(x => x[options[key][2]].includes(filter)).map((option, i) =>
                                                <div className={'flex items-center justify-center w-2/5 py-1 border-2 border-slate-400 rounded-full ' + ((!options[key][3] ?content[key]==option :content[key].includes(option)) ? 'bg-slate-400' : 'bg-slate-200')} key={i} onClick={e => selectorCallback(key, option)}>{option[options[key][2]]}</div>
                                            )
                                            }
                                        </div>
                                    </>

                                )
                            }
                        </div>
                    )
                    :
                    <div className='flex items-center justify-center h-full flex-grow'>
                        <div className='flex items-center justify-center px-14 bg-blue-900 text-slate-100 rounded-md text-sm sm:text-2xl hover:bg-blue-900 hover:font-bold' onClick={() => props.handleCallback()}>SUBMIT</div>
                    </div>
            }
        </div>
    )
}

function formatJsonArray(array, field) {
    console.log(array, field)
    if (array.length == 0) return "[]"
    let formatted = "[ " + array[0][field];
    for (let i = 1; i < array.length; i++) {
        formatted += " , " + array[i][field]
    }
    return formatted + " ]"
}
