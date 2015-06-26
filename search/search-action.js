//Dependencies.
let assign = require('object-assign');
let keys = require('lodash/object/keys');
let {clone, isEqual} = require('lodash/lang');

const ALL = 'ALL';
module.exports = function(config){
  /**
   * Builded search action.
   * @param  {object} options - The options used to build the service, it should have the following structure:
   * ```javascript
   * {
   * 	criteria:{
   * 		query: 'The query typed by the user'
   * 		scope: 'The selected scope'
   * 	},
   * 	pageInfos: { //All this informations will be use to transform the data given the query, this will be passed into the URL.
   * 		page: 'The wanted page',
   * 		skip: 'Number of results to skip',
   * 		sortBy: 'The information on wich the data is sorted', // This is **OPTIONAL**
   * 		sortAsc: 'Is the sort ascending or descending, boolean'
   * 	},
   * 	group: 'On which FACET should we group' // This is **OPTIONAL**
   * 	selectedFacets: 'An object with the selected facets', // This is **OPTIONAL**
   * 	previousData: 'An object chich contains the previous data' // This is **OPTIONAL**.
   * 							It will be used only when the action is triggered by a pagination action such as a scroll or a pagination.
   * 	service:{
   * 		scope: "function which launch the scope search"
   * 		unScope: "function whoch launch the unscoped search"
   * 	}
   * }
   * ```
   * @return {[type]}         [description]
   */
  return function searchAction(options){
    options = options || {};
    let {scope, query} = options.criteria; //Cannot be read from the store ?
    if(scope === ALL){
      //Call the search action.
      options.service.scope(options);
    }else{
      //The component which call the serice should be know if it has all the data.
      if(options.previousData){ //Maybe rename pagination or something like that.
        options.service.unScope(options).then((response)=>{
            // Read the previous data from options.previous;
            return response;
        });
        //Read the totalCount

      }
      //The search is unscoped.


    }
  };
};
