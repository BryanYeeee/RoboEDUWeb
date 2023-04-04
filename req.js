let request = async function(api, method, params) {
    let fetchinput = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (method === "post") {
      params.authkey = "f99b3e0accc55b4e8df73e83e430590257dc03a4f6ac859608773d0952a04acee359c7dfeced23be88fac3a7f160e836";
      fetchinput.body = JSON.stringify(params);
    }
    console.log(fetchinput)
    const data = await fetch(`http://localhost:80/orders/getorders`, fetchinput)
      .then((res) => {
        console.log(res)
        return res.json();
      })
      .then((res) => {
        return res;
      });
    return data;
}
const getOrders = async () => {
    const orders = await request("/orders/getorders", "post", {orderid: 1}).then((res) => {
      return res;
    });
    console.log("ORDERS", orders);
  };
getOrders()