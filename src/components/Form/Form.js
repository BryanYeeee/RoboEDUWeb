import { default as request } from '../../request.js';

export function Form(format, formdata, options, endPoint, returnPage) {
    // console.log(format, formdata)

    function setData(inputTitle, inputData,index) {
        if(index !== undefined) {
            formdata[inputTitle][index] = inputData
        } else {
            formdata[inputTitle] = inputData;
        }
    }

    function submit() {
        console.log(formdata, endPoint)
        document.location = returnPage
        // request.post(endPoint, formdata).then(res => {
        //     console.log('very cool')
        //     //goes back
        // }).catch(err => {
        //     console.log(err)
        // });
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
    console.log(options)

    return (
        <div className='flex w-full border-2 border-slate-400' style={{'min-height': "5rem"}}>
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
                                    {options[key][1].map((key, i) =>
                                        <option key={i} value={key}>{key}</option>
                                    )}
                                </select>) ||
                                (options[key][0] == 'range' &&
                                <div className='flex flex-grow w-full gap-4'>
                                    <input className="flex-1" type={options[key][1][0]} defaultValue={content[key][0]} onChange={e => props.handleCallback(key, e.target.value,0)} />
                                    <p>TO</p>
                                    <input className="flex-1" type={options[key][1][1]}  defaultValue={content[key][1]} onChange={e => props.handleCallback(key, e.target.value,1)} />
                                </div>)
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
