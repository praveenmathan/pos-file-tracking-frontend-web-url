import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL: 'https://8q62ry66a1-vpce-09265cb90abe6dac0.execute-api.us-west-2.amazonaws.com',
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
                q: 'homepage'
            }
        }),
    postData: () =>
        instance({
            'method': 'POST',
            'url': '/prod/filetracking',
            'data': {
                "Email": "ppiper@example.com"
            },
            'headers': {
                'content-type': 'application/json'  // override instance defaults
            }
        })
}

//https://at5l6up8rh.execute-api.us-east-1.amazonaws.com/beta/transactionLambdaFunction/basic-transaction
//https://8q62ry66a1-vpce-09265cb90abe6dac0.execute-api.us-west-2.amazonaws.com/prod/filetracking 