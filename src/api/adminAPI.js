import axios from "axios";

const path = "http://localhost:8080/api/";

async function addRestaurant(dto, authorization) {
    const r = await axios(
        {
            method: 'POST',
            url: path + 'restaurants',
            data: JSON.stringify(dto),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + authorization,
                'Content-Type': 'application/json'
            }
        }
    );
    
    return await r.data;
}

async function addFood(food, authorization) {
    const r = await axios(
        {
            method: 'post',
            url: path + 'foods',
            data: JSON.stringify(food),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + authorization,
                'Content-Type': 'application/json'
            }
        });
    return await r.data;
}

export { addRestaurant, addFood, path };