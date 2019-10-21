import { Apis, Keys } from '../../constants';
import * as Utils from '../../utils';

function fetchData(){
  let that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.entryFormData,
      "body": JSON.stringify({
          "action": ["getLrNos","getBaleNos"]
      }),
      "callBack": (data) => {
          that.props.updateData(data);
      }
    });
}

function fetchBalesData(event, type){
  let that = this, data;
  if(type){
    var obj = this.state[type];
    obj["label"] = event && event.label;
    obj["value"] = event && event.value;
    this.setState((prevState, props) => {
      return {obj}
    });
    data = {
      [type]: event && event.label,
      [Keys[type]]: that.state[Keys[type]] && that.state[Keys[type]]["label"]
    }
  }
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
          "columnType": "baledetails",
          "data": data
      }),
      "callBack": (data) => {
          that.props.updateData({"balesGrid":data});
      }
    });
}

export default {
    fetchData,
    fetchBalesData
}
