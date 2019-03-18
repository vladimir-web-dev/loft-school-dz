function apiCall(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.send();

        xhr.addEventListener('load', () => {

            if(xhr.status != 200) {
                reject(`Error: ${xhr.status}`);
            }

            resolve(xhr.response);
        });
    }); 
}


export default {
    
};