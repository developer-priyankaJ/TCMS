import moment from 'moment';

export function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function formatDate(date){
  var newDate;
  if (date) {
      newDate = moment(date, 'DD/MM/YYYY');
      if (!newDate.isValid()) {
        var d = new Date(date);
        if (isNaN(d.getTime())) {
          d = new Date();
        }
        newDate = moment(d);
      }
      newDate = moment(newDate).format("DD/MM/YYYY");
    }
    return newDate;
}
