export function login(fname, lname, pswd) {
    console.log(fname, lname, pswd);
    return new Promise((resolve, reject) => {
        request.post("/logins/loginpswd", {
            firstname: fname,
            lastname: lname,
            password: pswd,
            expiry: -1
        }).then(res => {
            sessionStorage.setItem("authkey", res[0]["auth-key"]);
            sessionStorage.setItem("fname", res[0]["fname"]);
            sessionStorage.setItem("lname", res[0]["lname"]);
            sessionStorage.setItem("location", res[0]["location"]);
            sessionStorage.setItem("userid", res[0]["user id"]);
            sessionStorage.setItem("usertype", res[0]["user type"]);
            let usertypes = {
                0: "Admin",
                1: "Manager",
                2: "Teacher",
                3: "Parent"

            }
            sessionStorage.setItem("usertypetitle", usertypes[res[0]["user type"]]);
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    })
}

export default function request(api, method, data) {
    console.log(sessionStorage);
    let fetchinput = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (method == 'post') {
        data.authkey = ""// USE　sessionStorage.getItem("authkey") ON PUBLISH
        fetchinput.body = JSON.stringify(data);
    } 

    console.log(data)
    return new Promise((resolve, reject) => {
        fetch(`https://students.csaafuture.cn${api}`, fetchinput).then(res => {
        //     fetch(`http://localhost:160${api}`, fetchinput).then(res => {
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