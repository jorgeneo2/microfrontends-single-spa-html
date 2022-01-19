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
var dataAssetsConfig = [];
var urls = [
   "./src/assets/resources/copies.json",
   "./src/assets/resources/context.urls.json",
   "./src/assets/resources/application_parameters.json",
   "./src/assets/resources/business_rules.json"
];


/**
 * Obtiene la data de configs de forma sincrona segun el array entregado
 *
 * @return {*} 
 */
function getConfigsSync() {

   var url = urls[index];

   if (index == urls.length) {
      return dataAssetsConfig;
   } else {
      return getData(url)
         .then(dataConfig => {
            dataAssetsConfig.push(dataConfig);
            index++;
            return getConfigsSync();
         });
   }

}

/**
 * Obtiene la data de configs de forma asincrona segun el array entregado
 *
 * @return {*} 
 */
 function getConfigsAsync() {

   let myPromise = new Promise((resolve, reject) => {

      const arrayPromises = [];

      urls.forEach(function (value, index, urls) {
         arrayPromises.push(getData(value));
      });

      Promise.allSettled(arrayPromises)
         .then(responses => {
            responses.forEach(response => {               
               dataAssetsConfig.push(response.value);
               resolve(dataAssetsConfig);
            })
         });

   });

   return myPromise;

}

var urlConstant = "./src/assets/utils/constants.json";

var urlsConfigs;

/**
 * Obtiene la data de configs de forma sincrona segun el array obtenido apartir de un .json dado
 *
 * @return {*} 
 */
function getConfigsConstantsSync() {

   //Se obtiene las urls del .json
   if (urlsConfigs == null || urlsConfigs == undefined) {
      return getData(urlConstant)
         .then(dataConfig => {
            urlsConfigs = dataConfig.CONSTANTS;
            return getConfigsConstantsSync();
         });
   }


   var url = urlsConfigs[index];

   if (index == urlsConfigs.length) {
      return dataAssetsConfig;
   } else {
      return getData(url)
         .then(dataConfig => {
            dataAssetsConfig.push(dataConfig);
            index++;
            return getConfigsConstantsSync();
         });
   }

}

/**
 * Obtiene la data de configs de forma asincrona segun el array obtenido apartir de un .json dado
 *
 * @return {*} 
 */
 function getConfigsConstantsAsync() {

   let myPromise = new Promise((resolve, reject) => {

      //Se obtiene las urls del .json
      getData(urlConstant)
         .then(dataConfig => {
            urlsConfigs = dataConfig.CONSTANTS;
            const arrayPromises = [];

            urlsConfigs.forEach(function (value, index, urlsConfigs) {
               arrayPromises.push(getData(value));
            });

            Promise.allSettled(arrayPromises)
               .then(responses => {
                  responses.forEach(response => {

                     dataAssetsConfig.push(response.value);
                     resolve(dataAssetsConfig);
                  })
               });

         });

   });

   return myPromise;

}