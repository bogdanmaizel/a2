import axios from "axios";


const url = "http://localhost:8080/api/";

async function sendRegisterCustomer(dto) {
	const r = await axios({
		method: "POST",
		url: url + "users/new-customer",
        headers: {
            'Access-Control-Allow-Origin': '*',
			"Content-Type": "application/json",
			'Accept': "application/json",
		},
		data: JSON.stringify(dto)
    });
    return await r.data;
}

async function sendRegisterAdmin(dto) {
    const r = await axios(
        {
            method: 'POST',
            url: url + 'users/new-admin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                'Accept': "application/json",
            },
            data: JSON.stringify(dto),
        }
    );
    return await r.data;
}

async function sendLoginCustomer(dto) {
    const r = await axios(
        {
            method: 'POST',
            url: url + 'users/login-customer',
            headers: {
                "content-type": "application/json",
                'Accept': "application/json",
            },
            data: JSON.stringify(dto)
        }
    );
    return await r.data;
}

async function sendLogin(dto) {
    const r = await axios(
        {
            method: 'POST',
            url: url + 'users/login',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: dto
        }
    );
    return await r.data;
}

async function sendLoginAdmin(dto) {
    const r = await axios(
        {
            method: 'POST',
            url: url + 'users/login-admin',
            headers: {
                "Content-type": "application/json",
                'Accept': "application/json",
            },
            data: JSON.stringify(dto)
        }
    );
    return await r.data;
}

export { sendLoginAdmin, sendLoginCustomer, sendRegisterAdmin, sendRegisterCustomer, sendLogin , url};