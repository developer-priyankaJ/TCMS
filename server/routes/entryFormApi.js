const express = require('express');
var router = express.Router();
var fs = require('fs');
const moment = require('moment');
var dbConfig = require('../dbConfig.js');
var utility = require('../utility.js');
var finalJson = {},count = 0, error = "", tryCount = 0;
var ActionTypes = {
   "getParties": function(finalJson){
                     var query = "select id,name from parties ORDER BY name;"
                     var that = this;
                     dbConfig.connectToDB(query, function(err, rows,context){
                       if(err){
                           error = err;
                           console.log("error in entryFormAPI getParties >>", err);
                       }else{
                         if(rows.length > 0){
                            var data = rows.map((entry) => {
                               const party = {
                                 "value" : entry.id,
                                 "label" : utility.toTitleCase(entry.name)
                               };
                               return party;
                             })
                             //console.log("parties >",finalJson)
                             context.updateJson("parties",data);
                             //finalJson = Object.assign({}, finalJson, {"parties":data});
                             //console.log("parties >",finalJson)
                         }else{
                             count = count + 1;
                         }
                       }
                     },that);
                },
  "updateJson": function(key, data){
    finalJson = Object.assign({}, finalJson, {[key]:data});
    count = count + 1;
  },
  "getTransporters": function(finalJson){
                        var query = "select id,name from transporters ORDER BY name;"
                        dbConfig.connectToDB(query, function(err, rows,context){
                          if(err){
                              error = err;
                              console.log("error in entryFormAPI getTransporters >>", err);
                          }else{
                             if(rows && rows.length > 0){
                               var data = rows.map((entry) => {
                                  const trnsp = {
                                    "value" : entry.id,
                                    "label" : utility.toTitleCase(entry.name)
                                  };
                                  return trnsp;
                                })

                             context.updateJson("transporters",data);
                             }else{
                               count = count + 1;
                                //todo: no data scenario
                             }
                           }
                        }, this);
                     },
   "getStates": function(finalJson){
                         var query = "select abbr, name from states ORDER BY name;"
                         dbConfig.connectToDB(query, function(err, rows,context){
                           if(err){
                               error = err;
                               console.log("error in entryFormAPI getStates >>", err);
                           }else{
                              if(rows && rows.length > 0){
                                var data = rows.map((entry) => {
                                   const state = {
                                     "value" : entry.abbr,
                                     "label" : entry.name
                                   };
                                   return state;
                                 })
                              context.updateJson("states",data);
                              }else{
                                count = count + 1;
                                 //todo: no data scenario
                              }
                            }
                         }, this);
                      },
    "getCities": function(finalJson){
                          var query = "select id, name, state from cities ORDER BY name;"
                          dbConfig.connectToDB(query, function(err, rows,context){
                            if(err){
                                error = err;
                                console.log("error in entryFormAPI getCities >>", err);
                            }else{
                               if(rows && rows.length > 0){
                                 var data = rows.map((entry) => {
                                    const cities = {
                                      "value" : entry.id,
                                      "label" : entry.name,
                                      "state" : entry.state
                                    };
                                    return cities;
                                  })
                               context.updateJson("cities",data);
                               }else{
                                 count = count + 1;
                                  //todo: no data scenario
                               }
                             }
                          }, this);
                       },
   "getLrNos": function(finalJson){
                         var query = "select id, lr_no from baledetails GROUP BY lr_no ORDER BY id;"
                         dbConfig.connectToDB(query, function(err, rows,context){
                           if(err){
                               error = err;
                               console.log("error in entryFormAPI getLrNos >>", err);
                           }else{
                              if(rows && rows.length > 0){
                                var data = rows.map((entry) => {
                                   const cities = {
                                     "value" : entry.id,
                                     "label" : entry.lr_no
                                   };
                                   return cities;
                                 })
                              context.updateJson("lr_nos",data);
                              }else{
                                count = count + 1;
                                 //todo: no data scenario
                              }
                            }
                         }, this);
                      },
  "getInvoiceNos": function(finalJson){
                        var query = "select id, lr_no, invoice_no from baledetails GROUP BY invoice_no ORDER BY id;"
                        dbConfig.connectToDB(query, function(err, rows,context){
                          if(err){
                              error = err;
                              console.log("error in entryFormAPI getInvoiceNos >>", err);
                          }else{
                             if(rows && rows.length > 0){
                               var data = rows.map((entry) => {
                                  const nos = {
                                    "value" : entry.invoice_no,
                                    "label" : entry.lr_no
                                  };
                                  return nos;
                                })
                             context.updateJson("invoice_nos",data);
                             }else{
                               count = count + 1;
                                //todo: no data scenario
                             }
                           }
                        }, this);
                     },
  "getBaleNos": function(finalJson){
                        var query = "select id, bale_no from baledetails ORDER BY id;"
                        dbConfig.connectToDB(query, function(err, rows,context){
                          if(err){
                              error = err;
                              console.log("error in entryFormAPI getBaleNos >>", err);
                          }else{
                             if(rows && rows.length > 0){
                               var data = rows.map((entry) => {
                                  const no= {
                                    "value" : entry.id,
                                    "label" : entry.bale_no
                                  };
                                  return no;
                                })
                             context.updateJson("bale_nos",data);
                             }else{
                               count = count + 1;
                                //todo: no data scenario
                             }
                           }
                        }, this);
                     },
 "getReferences": function(finalJson){
                       var query = "select id, name from paymentreference ORDER BY id;"
                       dbConfig.connectToDB(query, function(err, rows,context){
                         if(err){
                             error = err;
                             console.log("error in entryFormAPI getReferences >>", err);
                         }else{
                           if(rows && rows.length > 0){
                             var data = rows.map((entry) => {
                                const no= {
                                  "value" : entry.id,
                                  "label" : entry.name
                                };
                                return no;
                              })
                           context.updateJson("references",data);
                           }else{
                             count = count + 1;
                              //todo: no data scenario
                           }
                         }
                       }, this);
                    }


}


router.post('/getData', function(req, res) {
    var actions = req.body.action;
    actions.forEach(function(action){
       ActionTypes[action](finalJson);
    });

    var sendResp = setInterval(function(){
      console.log("count >",count);
      console.log("actions.length >",actions.length);
      tryCount++;
      if ((count == actions.length) || (tryCount > 25)){
        if(count == actions.length){
          res.status(200).json({
            "success":true,
            "data": finalJson
          })
        }else if(tryCount > 25){
          res.status(200).json({
            "success":false,
            "error": {
              "msg": "Error while fetching data."
            }
          })
        }

        count = 0;
        clearInterval(sendResp);
      }
      if(error){
        clearInterval(sendResp);
        console.log("error in entryFormAPI getData >>", error);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": error
          }
        })
      }
    },300)
});


router.post('/addParty', function(req, res) {
  var data = req.body.data ;
  var action = req.body.action ;
  var query, str="";
  if(action === "ADD"){
     query = "INSERT INTO parties (name, city, state, phone_no, gstn_no) VALUES ('"+utility.toTitleCase(data.name)+"','"+JSON.stringify(data.city)+"','"+JSON.stringify(data.state)+"','"+data.phone+"','"+data.gstn_no.toUpperCase()+"')";
  }else if(action === "UPDATE"){
      str =  data.name ?str + " name='"+utility.toTitleCase(data.name)+"'" : str +"";
      str = data.city ?str + " ,city='"+JSON.stringify(data.city)+"'" :str + "";
      str =  data.state ?str + " ,state='"+JSON.stringify(data.state)+"'" : str +"";
      str =  data.phone ?str + " ,phone_no='"+data.phone+"'" : str +"";
      str =  data.gstn_no ?str + " ,gstn_no='"+data.gstn_no.toUpperCase() +"'" : str +"";
      query = "UPDATE parties SET "+str+" WHERE id="+req.body.id+";";
  }
 console.log("query in entryFormAPI addParty >>", query);
  dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI addParty >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
});
});


router.post('/getParty', function(req, res) {
    var id = req.body.id ;
    var query = "SELECT * from parties WHERE id="+id;
    console.log("query in entryFormAPI getParty >>", query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI getParty >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows
          }
        })
      }
});
});


router.post('/fetchEditEntry', function(req, res) {
    var id = req.body.id ;
    var query = "SELECT te.invoice_no, DATE_FORMAT(te.bill_date,'%d/%m/%Y') as bill_date, party, item_desc, amount, cgst, sgst,igst, total, transporter, te.lr_no, booking_stn, eway_no,DATE_FORMAT(bilty_date,'%d/%m/%Y') as bilty_date, bale_qty, te.weight, te.freight,bale_numbers, bale_type, group_concat(bd.bale_desc ORDER BY bd.id SEPARATOR ',') as bale_desc, group_concat(bd.bale_no ORDER BY bd.id SEPARATOR ',') as bale_no,group_concat(bd.qty ORDER BY bd.id SEPARATOR ',') as qty, group_concat(bd.freight ORDER BY bd.id SEPARATOR ',') as bale_freight, group_concat(bd.id ORDER BY bd.id SEPARATOR ',') as bale_id from transportentry te LEFT JOIN baledetails bd ON te.lr_no = bd.lr_no WHERE te.lr_no='"+id+"' GROUP BY te.lr_no";
    console.log("query in entryFormAPI fetchEditEntry >>", query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI fetchEditEntry >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        console.log("editData >",rows)
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows[0]
          }
        })
      }
});
});
router.post('/getTransporter', function(req, res) {
    var id = req.body.id ;
    var query = "SELECT * from transporters WHERE id="+id;
    console.log("query in entryformapi getTransporter >>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI getTransporter >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows
          }
        })
      }
});
});

router.post('/getMasterPaymentEntry', function(req, res) {
    var id = req.body.id ;
    var query = "SELECT id, remarks, mode,total,tds,amount,cheque_no, transporter, DATE_FORMAT(bill_date,'%d/%m/%Y') as bill_date from masterpayment WHERE id="+id;
    console.log("query in entryformapi getMasterPaymentEntry >>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI getMasterPaymentEntry >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true,
            "data": rows
          }
        })
      }
});
});
router.post('/addTransporter', function(req, res) {
    var data = req.body.data ;
    var action = req.body.action ;
    var query, str = "";
    if(action === "ADD"){
       query = "INSERT INTO transporters (name, city, state, phone_no, gstn_no) VALUES ('"+utility.toTitleCase(data.name)+"','"+JSON.stringify(data.city)+"','"+JSON.stringify(data.state)+"','"+data.phone+"','"+data.gstn_no.toUpperCase() +"')";
    }else if(action === "UPDATE"){
         str =  data.name ?str + " name='"+utility.toTitleCase(data.name)+"'" : str +"";
         str = data.city ?str + " ,city='"+JSON.stringify(data.city)+"'" :str + "";
         str =  data.state ?str + " ,state='"+JSON.stringify(data.state)+"'" : str +"";
         str =  data.phone ?str + " ,phone_no='"+data.phone+"'" : str +"";
         str =  data.gstn_no ?str + " ,gstn_no='"+data.gstn_no.toUpperCase() +"'" : str +"";
       query = "UPDATE transporters SET"+str+" WHERE id="+req.body.id+";";

    }
    console.log("query in entryformapi addTransporter >>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI addTransporter >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
});
});

function submitBales(info, lrno, invoice_no, res, action){
    var data = [];
    var query = "";
    if(action == "edit"){
      const ids = [...new Set(info.map(item => item.id))];
      for(let i=0;i<ids.length;i++){
        let obj = info.filter(function(item){
          return item.id == ids[i];
        })
        let str="";
        for(let j=0;j<obj.length;j++){
          str =  str + obj[j].key+"='"+obj[j].value+"', ";
        }
        str = str.slice(0,-2);
        query = "UPDATE baledetails SET "+str+" WHERE id='"+ids[i]+"';";
        console.log("query in entryFormAPI submitBales >>>",query)
        dbConfig.connectToDB(query, function(err, rows){
          if(err){
            console.log("error in entryFormAPI submitBales >>", err);
            res.status(200).json({
              "success":false,
              "error": {
                "msg": err
              }
            })
          }else{
            if(i==(ids.length-1)){
              res.status(200).json({
                "success":true,
                "data": {
                  "success":true
                }
              })
            }
          }
        })
      }

    }else{
      for(var i=0; i<info.baleno.length; i++ ){
        var arr = [];
        arr.push(lrno);
        arr.push(info.baleno[i]);
        arr.push(invoice_no);
        arr.push(info.desc[i]);
        arr.push(info.qty[i]);
        arr.push(info.freight[i]);

        data[i] = arr;
      }
      query = "INSERT INTO baledetails (lr_no, bale_no,invoice_no, bale_desc, qty, freight) VALUES ?";
      console.log("query in entryFormAPI submitBales>>",query)
      dbConfig.connectToDB(query, function(err, rows){
        if(err){
          console.log("error in entryFormAPI submitBales >>", err);
          res.status(200).json({
            "success":false,
            "error": {
              "msg": err
            }
          })
        }else{
          res.status(200).json({
            "success":true,
            "data": {
              "success":true
            }
          })
        }
      },'',data);
    }

}

router.post('/getPaymentRef', function(req, res) {
  let query = "SELECT id, name, transporter, lr_no, status, DATE_FORMAT(start_date,'%d/%m/%Y') as start_date, DATE_FORMAT(end_date,'%d/%m/%Y') as end_date,removedLrs FROM paymentreference WHERE id = '"+req.body.data+"'";
  console.log(" query getPaymentRef in entryFormAPI >>",query);
  dbConfig.connectToDB(query, function(err, rows){
    if(err){
      console.log("error in entryFormAPI getPaymentRef >>", err);
      res.status(200).json({
        "success":false,
        "error": {
          "msg": err
        }
      })
    }else{
      res.status(200).json({
        "success":true,
        "data": {
          "success":true,
          "data": rows[0]
        }
      })
    }
  })
});
router.post('/savePaymentRef', function(req, res) {
    var data = req.body.data ;
    let query = "";
    let startDate = data.start_date ? "STR_TO_DATE('"+data.start_date+"','%d/%m/%Y')" : null;
    let endDate = data.end_date ? "STR_TO_DATE('"+data.end_date+"','%d/%m/%Y')" : null;
    if(data.action && data.action == "update"){
      query = "UPDATE paymentreference SET date=STR_TO_DATE('"+data.date+"','%d/%m/%Y'), transporter='"+data.transporter+"',lr_no='"+data.lr_no+"', status='"+data.status+"',start_date="+ startDate+",end_date="+endDate+",removedLrs='"+data.removedLrs+"' WHERE id='"+data.name+"';";
    }else{
       query = "INSERT INTO paymentreference (name,date, transporter, lr_no, status, start_date, end_date,removedLrs) VALUES ('"+data.name+"',STR_TO_DATE('"+data.date+"','%d/%m/%Y'), '"+data.transporter+"', '"+data.lr_no+"', '"+data.status+"',"+ startDate+","+ endDate+",'"+data.removedLrs+"');"
    }
    console.log(" query savePaymentRef in entryFormAPI >>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI savePaymentRef >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
    })
});

router.post('/submitEntry', function(req, res) {
    var data = req.body ;
    var query = "",query2 = "";
    if(data && data.action=="edit"){
      let str = "";
      let fields = Object.keys(data);
      for(let i=0;i<fields.length;i++){
        if(fields[i]!=="action" && fields[i]!=="baledetails" && fields[i]!=="id"){
          str =  str + fields[i]+"='"+data[fields[i]]+"', ";
          if(fields[i]=="lr_no"){
              query2 = "UPDATE baledetails SET lr_no = '"+data[fields[i]]+"' WHERE invoice_no='"+data.id+"';";
          }
        }
      }
      if(str){
          str = str.slice(0,-2);
          query = "UPDATE transportentry SET "+str+" WHERE invoice_no='"+data.id+"';";
          console.log("success in entryFormAPI submitEntry update>>",query);
          dbConfig.connectToDB(query, function(err, rows){
            if(err){
              console.log("error in entryFormAPI submitEntry >>", err);
              res.status(200).json({
                "success":false,
                "error": {
                  "msg": err
                }
              })
            }else{
              if(query2){
                dbConfig.connectToDB(query2, function(error, rows){
                  if(error){
                      console.log("error in entryFormAPI submitEntry baledetails lrno >>>",error)
                  }else{
                    console.log("succes in entryFormAPI submitEntry baledetails lrno ")
                  }
                });
              }
              if(data.baledetails){
                submitBales(req.body.baledetails, data.lr_no, data.invoice_no, res, "edit");
              }else{
                res.status(200).json({
                  "success":true,
                  "data": {
                    "success": true
                  }
                })
              }
            }
          })
      }else if(data.baledetails){
        submitBales(req.body.baledetails, data.lr_no, data.invoice_no, res, "edit");
      }
    }else{
       query = "INSERT INTO transportentry (invoice_no, bill_date, party, item_desc, amount, cgst, sgst,igst, total, transporter, lr_no, booking_stn, eway_no, bilty_date,bale_qty, weight, freight,bale_numbers,bale_type) VALUES ('"+data.invoice_no+"', STR_TO_DATE('"+data.date+"','%d/%m/%Y'), '"+data.party+"','"+data.item_desc+"',"+data.amount+","+data.cgst+","+data.sgst+","+data.igst+","+data.total+",'"+data.transporter+"','"+data.lr_no+"','"+data.booking_stn+"','"+data.eway_no+"',STR_TO_DATE('"+data.bilty_date+"','%d/%m/%Y'),'"+data.qty+"','"+data.weight+"','"+data.freight+"','"+req.body.baledetails.baleno.join(',')+"','"+data.baleType+"');"
       console.log("query in entryFormAPI submitEntry insert >>",query)
       dbConfig.connectToDB(query, function(err, rows){
         if(err){
           console.log("error in entryFormAPI submitEntry >>", err);
           let msg = err.code;
           if(err.code === "ER_DUP_ENTRY"){
             msg = "Duplicate Entry";
           }
           res.status(200).json({
             "success":false,
             "error": {
               "msg": msg
             }
           })
         }else{
             submitBales(req.body.baledetails, data.lr_no, data.invoice_no, res);
         }
       })
    }
});

router.post('/backupData', function(req, res) {
    var exec = require('child_process').exec;
    var datetime = moment(new Date()).format("DD-MM-YYYY");
    console.log(datetime);
    var fileName = "D:\\github\\cms\\backup\\data-"+datetime+".sql";
    var str = 'mysqldump -uroot -pAdmin@123 tcms transportentry baledetails masterpayment > ' + fileName
    var child = exec(str, (error)=> {
      if(!error){
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }else{
        console.log("error in entryFormAPI backupData >>", error);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": error
          }
        })
      }
    });
});

router.post('/submitMasterPayment', function(req, res) {
    var data = req.body ;
    var isUpdateAction = data.update;
    var query,str="";
    if(isUpdateAction || isUpdateAction=="true"){
        str =  data.transporter ?str + " transporter='"+data.transporter+"'" : str +"";
        str = data.billDate ?str + " ,bill_date='"+JSON.stringify(data.billDate)+"'" :str + "";
        str =  data.mode ?str + " ,mode='"+JSON.stringify(data.mode)+"'" : str +"";
        str =  data.chequeNo ?str + " ,cheque_no='"+data.chequeNo+"'" : str +"";
        str =  data.amount ?str + " ,amount='"+data.amount+"'" : str +"";
        str =  data.tds ?str + " ,tds='"+data.tds+"'" : str +"";
        str =  data.total ?str + " ,total='"+data.total+"'" : str +"";
        str =  data.remarks ?str + " ,remarks='"+data.remarks+"'" : str +"";
        if (str.substr(0,2) === ' ,') {
          str = str.substring(2);
        }
      query = "UPDATE masterPayment SET "+str+" WHERE id="+data.id+";";
    }else{
      query = "INSERT INTO masterPayment (transporter, bill_date, mode, cheque_no, amount, tds, total,remarks) VALUES ('"+data.transporter+"', STR_TO_DATE('"+data.billDate+"','%d/%m/%Y'), '"+data.mode+"','"+data.chequeNo+"',"+data.amount+","+data.tds+","+data.total+",'"+data.remarks+"');"
    }
    console.log("query submitMasterPayment >>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in entryFormAPI submitMasterPayment >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        console.log("success in entryFormAPI submitMasterPayment");
        res.status(200).json({
          "success":true,
          "data": {
            "success":true
          }
        })
      }
    })
});

module.exports = router;
