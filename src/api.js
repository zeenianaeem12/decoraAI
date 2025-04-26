// api.js

export const BASE_URL = 'https://whole-kings-doubt.loca.lt'; // <-- Change this to your base API URL

async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${BASE_URL}/api${endpoint}`;

    const options = {
        method,
        headers: {},
    };

    // Handle FormData differently from JSON data
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

// Specific function for uploading room images
export async function uploadRoomImage(file) {
    const formData = new FormData();
    formData.append('original_image', file);
    
    return await apiRequest('/room-images/', 'POST', formData);
}

export default apiRequest;
