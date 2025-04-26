// api.js

export const BASE_URL = 'https://empty-symbols-learn.loca.lt'; // <-- Change this to your base API URL

async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}/api${endpoint}`;

    const options = {
        method,
        headers: {},
    };

    // Only set Content-Type for JSON data
    if (data instanceof FormData) {
        // Don't set Content-Type header for FormData, let the browser set it with the boundary
        options.body = data;
    } else if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        console.log('Request options:', options); // Debug log
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Request failed: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log('Response data:', jsonData); // Debug log
        return jsonData;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

export default apiRequest;
