import axios from "axios";

const path = "http://localhost:8080/api/";

async function addRestaurant(dto) {
    const r = await axios(
        {
            method: 'POST',
            url: path + 'restaurants',
            data: JSON.stringify(dto),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    
    return await r.data;
}

async function addFood(food) {
    const r = await axios(
        {
            method: 'post',
            url: path + 'foods',
            data: JSON.stringify(food),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return await r.data;
}

export { addRestaurant, addFood, path };