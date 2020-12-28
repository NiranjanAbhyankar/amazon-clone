import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://us-central1-clone-a95db.cloudfunctions.net/api' //The API url i.e. cloud function url
});


export default instance;
