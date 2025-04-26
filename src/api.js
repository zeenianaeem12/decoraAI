// api.js

const BASE_URL = 'https://fruity-baboons-fry.loca.lt/api'; // <-- Change this to your base API URL

async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Request failed: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

export default apiRequest;
