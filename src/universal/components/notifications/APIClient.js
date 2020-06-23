import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL: 'https://at5l6up8rh.execute-api.us-east-1.amazonaws.com',
    headers: {
        'content-type': 'application/json'
    },
});

export default {
    getData: () =>
        instance({
            'method': 'GET',
            'url': '/beta/transactionLambdaFunction/basic-transaction',
            'params': {
                q: 'notification'
            }
        }),
    postData: () =>
        instance({
            'method': 'POST',
            'url': '/beta/transactionLambdaFunction/basic-transaction',
            'data': {
            },
            'headers': {
                'content-type': 'application/json'  // override instance defaults
            }
        })
}