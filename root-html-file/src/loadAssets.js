// const constantsData= require('./utils/constants.json'); 
// import constantsData from "./src/utils/constants.json" assert { type: "json" };
// console.log(constantsData);

// function getConfigMapBase(route) {
//    return require(route); 
// }

// function getConfigMapEndpoint() {
//    return getConfigMapBase(constantsData.CONSTANTS.CONFIGMAP_ENDPOINT_URLS);
// }

// function getConfigMapBusinessRules(route) {
//    return getConfigMapBase(constantsData.CONSTANTS.CONFIGMAP_BUSINESS_RULES);
// }

// function getConfigMapCopies(route) {
//    return getConfigMapBase(constantsData.CONSTANTS.CONFIGMAP_COPIES);
// }
// function getConfigMapParameters(route) {
//    return getConfigMapBase(constantsData.CONSTANTS.CONFIGMAP_PARAMETERS);
// }

// var jsonData = getConfigMapEndpoint();
// console.log(jsonData);

// jsonData = getConfigMapBusinessRules();
// console.log(jsonData);

// jsonData = getConfigMapCopies();
// console.log(jsonData);

// jsonData = getConfigMapParameters();
// console.log(jsonData);


// module.exports = {
//    getConfigMapEndpoint,
//    getConfigMapBusinessRules,
//    getConfigMapCopies,
//    getConfigMapParameters
// }

// OTRO ************************
//  function getConfigMapBase(route) {
//    return require(route); 
// }

// function getConfigMapEndpoint() {
//    return getConfigMapBase('./assets/resources/context.urls.json');
// }
// var jsonData = getConfigMapEndpoint();
// console.log(jsonData);

// OTRO ************************

function getData(route) {
   return fetch(route, {
                  // method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                  }
               })
               .then(response => {/*console.log('getData then response: ',response);*/ return response.json();})
               //.then(data => {console.log('getData then data: ',data); return data; })            
               .catch(error => console.log("Ha ocurrido un error (" + error + ")"))
               ; 
}

function getConstants() {
  
   var data = [];

    return getData('./src/assets/utils/constants.json')
            .then(dataConstants => {
               console.log('getConstants XXX: ',dataConstants);
               return getConfigMapCopies(dataConstants.CONSTANTS.CONFIGMAP_COPIES)
                     .then(dataCopies => {
                        console.log('getConfigMapCopies XXX: ',dataCopies);
                        data.push(dataCopies);
                        return getConfigMapEndpoint(dataConstants.CONSTANTS.CONFIGMAP_ENDPOINT_URLS)
                              .then(dataEndPoint => {
                                 console.log('getConfigMapEndpoint XXX: ',dataEndPoint);
                                 data.push(dataEndPoint);
                                 return getConfigMapParameters(dataConstants.CONSTANTS.CONFIGMAP_PARAMETERS)
                                       .then(dataParameters => {
                                          console.log('getConfigMapParameters XXX: ',dataParameters);
                                          data.push(dataParameters);
                                          return getConfigMapBusinessRules(dataConstants.CONSTANTS.CONFIGMAP_BUSINESS_RULES)
                                                .then(dataBusinessRules => {
                                                   console.log('getConfigMapBusinessRules XXX: ',dataBusinessRules);
                                                   data.push(dataBusinessRules);
                                                   return data;
                                                });
                                       }); 
                              });   
                           });
            })
}

function getConfigMapCopies(route) {
   return getData(route);
}

function getConfigMapEndpoint(route) {
   return getData(route);
}

function getConfigMapParameters(route) {
   return getData(route);
}

function getConfigMapBusinessRules(route) {
   return getData(route);
}

