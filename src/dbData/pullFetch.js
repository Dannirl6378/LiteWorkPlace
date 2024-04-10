var axios = require('axios');
var data = JSON.stringify({
    "collection": "Test-users",
    "database": "Users",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-hwnsp/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '9gQaC7y6HtGipuBMHlQOsLJdG25uTmbpEp3ET6h8Vx1UbRUPGwO5gA8wdmrrVpZ5',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
