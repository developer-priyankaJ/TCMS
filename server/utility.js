
module.exports = {
    toTitleCase : function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    spliceString : function(arr, value){
      var index = arr.indexOf(value);
      if(index!== -1){
          arr.splice(index, 1);
      }
    }
}
