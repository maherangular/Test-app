import fetch from 'isomorphic-fetch';

// * snip *
const host ='http://localhost:3000' // on development
// const host=''; // on production 
 export async function addFeedbackPost(data) {
    return fetch(host +'/feedback', {    // POST to the server the data.
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}