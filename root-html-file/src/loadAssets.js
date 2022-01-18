/**
 * Metodo de peticion base
 *
 * @param {*} route
 * @return {*} 
 */
function getData(route) {
   return fetch(route, {
         // method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
      .then(response => {
         /*console.log('getData then response: ',response);*/
         return response.json();
      })
      //.then(data => {console.log('getData then data: ',data); return data; })            
      .catch(error => console.log("Ha ocurrido un error (" + error + ")"));
}

var index = 0;
var data = [];
var urls = [
   "./src/assets/resources/copies.json",
   "./src/assets/resources/context.urls.json",
   "./src/assets/resources/application_parameters.json",
   "./src/assets/resources/business_rules.json"
];


/**
 * Obtiene la data de configs segun el array entregado
 *
 * @return {*} 
 */
function getConfigs() {

   var url = urls[index];

   if (index == urls.length) {
      return data;
   } else {
      return getData(url)
         .then(dataConfig => {
            data.push(dataConfig);
            index++;
            return getConfigs();
         });
   }

}


var urlConstant = [
   "./src/assets/utils/constants.json"
];

var urlsConfigs;

/**
 * Obtiene la data de configs segun el array obtenido apartir de un .json dado
 *
 * @return {*} 
 */
function getConfigsConstants() {

   //Se obtiene las urls del .json
   if (urlsConfigs == null || urlsConfigs == undefined) {
      return getData(urlConstant[0])
         .then(dataConfig => {
            urlsConfigs = dataConfig.CONSTANTS;
            return getConfigs();
         });
   }


   var url = urlsConfigs[index];

   if (index == urlsConfigs.length) {
      return data;
   } else {
      return getData(url)
         .then(dataConfig => {
            data.push(dataConfig);
            index++;
            return getConfigs();
         });
   }

}