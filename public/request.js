export function login(fname, lname, pswd) {
    console.log(fname,lname,pswd);
    request.get("/courses", {}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
    // return new Promise((resolve, reject) => {
    //     fetch(`http://localhost:3333/login`, {
    //         method: "post",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             firstname: fname,
    //             lastname: lname,
    //             password: pswd,
    //             expiry: - 1
    //         })

    //     }).then(res => {
    //         console.log(res)
    //         status = res.status;
    //         return res.json();
    //     }
    //     ).then(res => {
    //         if (status >= 400 && status <= 600) {
    //             console.log("Login Error: " + res); reject(res[0].error);
    //         } else {
    //             console.log("Login", res); resolve(res);
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //         reject("Login Error: " + err);
    //     });

    // })
}

export default function request(api, method, data) {
    console.log(sessionStorage.getItem("authkey"))
    let fetchinput = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (method == 'post') fetchinput.body = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080${api}`, fetchinput).then(res => {
            console.log(res)
            status = res.status;
            return res.json();
        }
        ).then(res => {
            if (status >= 400 && status <= 600) {
                console.log(api + " Error: " + res); reject(res[0].error);
            } else {
                console.log(api, res); resolve(res);
            }
        }).catch(err => {
            console.log(err)
            reject(api + " Error: " + err);
        });

    })
}
['get', 'post', 'delete'].forEach((method) => {
    request[method] = (api, data) => request(api, method, data)
});