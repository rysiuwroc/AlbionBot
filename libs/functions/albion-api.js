const { api } = require("../../configs/albion-api-config.json");
const axios = require("axios")

module.exports = {
    async execute(endpoint,id) {
        if(endpoint.lenght>1){
            const response = await axios.get(`${api}${endpoint[0]}${id}${endpoint[1]}`)
            .catch(function (error) {
                console.error(`${error}`)
                return error.response;
            });
        return response;
        }
        else{
            const response = await axios.get(`${api}${endpoint}${id}`)
            .catch(function (error) {
                console.error(`${error}`)
                return error.response;
            });
        return response;
        }       
    }
}