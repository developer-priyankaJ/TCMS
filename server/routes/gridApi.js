const express = require('express');
var router = express.Router();
var dbConfig = require('../dbConfig.js');
var constants = require('../constants');
var utility = require('../utility');

router.post('/getAllData', function(req, res) {
    var actions = req.body ;
    let columnNames = constants.Columns[actions.columnType];
    let columns =  columnNames.map(a => "t."+a.field);
    utility.spliceString(columns,'t.party');
    utility.spliceString(columns,'t.id');
    utility.spliceString(columns,'t.transporter');
    utility.spliceString(columns,'t.booking_stn');
    (actions.columnType == "transportentry") && utility.spliceString(columns,'t.bale_desc');
    utility.spliceString(columns,'t.received_date');
    utility.spliceString(columns,'t.sold_date');
    utility.spliceString(columns,'t.bill_date');
    utility.spliceString(columns,'t.bilty_date');

    var subQuery1 = "", subQuery2= "";
    if(actions.columnType == "transportentry"){
      subQuery1 = ",p.name as party, i.name as transporter,c.name as booking_stn, GROUP_CONCAT(bd.bale_desc ORDER BY bd.id SEPARATOR ',\r\n') as bale_desc, GROUP_CONCAT(DATE_FORMAT(bd.received_date,'%d/%m/%Y') ORDER BY bd.id SEPARATOR ',\r\n') as received_date, DATE_FORMAT(bill_date,'%d/%m/%Y') as bill_date,DATE_FORMAT(bilty_date,'%d/%m/%Y') as bilty_date";
      subQuery2 = "LEFT JOIN parties AS p ON (t.party = p.id) LEFT JOIN transporters AS i ON (t.transporter = i.id) LEFT JOIN cities AS c ON (t.booking_stn = c.id) LEFT JOIN baledetails AS bd ON (t.lr_no = bd.lr_no) GROUP BY t.lr_no ORDER BY id DESC";
    }
    if(actions.columnType == "baledetails"){
      subQuery1 = ",DATE_FORMAT(received_date,'%d/%m/%Y') as received_date,DATE_FORMAT(sold_date,'%d/%m/%Y') as sold_date, DATE_FORMAT(bill_date,'%d/%m/%Y') as bill_date ";
      if(actions.invoiceData){
        subQuery1 = subQuery1 + ",te.item_desc,c.name as booking_stn, DATE_FORMAT(bill_date,'%d/%m/%Y') as bill_date,DATE_FORMAT(bilty_date,'%d/%m/%Y') as bilty_date, p.name as party, i.name as transporter";
        subQuery2 = " LEFT JOIN transportentry as te ON (te.lr_no = t.lr_no) LEFT JOIN parties AS p ON (te.party = p.id) LEFT JOIN transporters AS i ON (te.transporter = i.id) LEFT JOIN cities AS c ON (te.booking_stn = c.id)";
      }else{
        subQuery2 = " LEFT JOIN transportentry as te ON (te.lr_no = t.lr_no) ";
      }
    }
    if(actions.columnType == "masterpayment"){
      subQuery1 = ",i.name as transporter, DATE_FORMAT(bill_date,'%d/%m/%Y') as bill_date ";
      subQuery2 = "LEFT JOIN transporters AS i ON (t.transporter = i.id) ";
    }
    if(actions.data && (actions.data.lrNo || actions.data.baleNo || actions.data.baleDesc || actions.data.mode || actions.data.searchTransporter || actions.data.startdate || actions.data.enddate)){
      subQuery2 = subQuery2 + " WHERE 1=1 ";
      if(actions.data.lrNo){
        subQuery2 = subQuery2 + " AND t.lr_no='"+actions.data.lrNo+"'"
      }
      if(actions.data.invoiceNo){
        subQuery2 = subQuery2 + " AND t.invoice_no='"+actions.data.invoiceNo+"'"
      }
      if(actions.data.baleNo){
        subQuery2 = subQuery2 + " AND bale_no='"+actions.data.baleNo+"'";
      }
      if(actions.data.baleDesc){
        subQuery2 = subQuery2 + " AND bale_desc LIKE '%"+actions.data.baleDesc+"%'";
      }
      if(actions.data.mode && actions.data.mode.length > 0){
        let str = "";
        for(let i=0;i<actions.data.mode.length;i++){
          str = str +"'"+ actions.data.mode[i] + "',";
        }
        str = str.slice(0,-1);
        subQuery2 = subQuery2 + " AND t.mode IN ("+str+")"
      }
      if(actions.data.searchTransporter){
        subQuery2 = subQuery2 + " AND t.transporter='"+actions.data.searchTransporter+"'"
      }
      if(actions.data.startdate){
        subQuery2 = subQuery2 + " AND DATE(bill_date) >='"+actions.data.startdate+"'";
      }
      if(actions.data.enddate){
        subQuery2 = subQuery2 + " AND DATE(bill_date) <= '"+actions.data.enddate+"'";
      }
    }

    if(actions.columnType == "baledetails" || actions.columnType == "masterpayment"){
        subQuery2 = subQuery2 + " GROUP BY id  ORDER BY id desc";
    }

    var query = "SELECT distinct t.id,"+columns.join()+subQuery1+" from "+actions.columnType+" AS t "+subQuery2 ;
    console.log("query in gridAPI getAllData>>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in gridAPI getAllData >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        console.log("success in gridAPI getAllData");
        res.status(200).json({
          "success":true,
          "data": {
            "columns": columnNames,
            "rows": rows
          }
        })
      }
    });
});

router.post('/getCustomColumns', function(req, res) {
    var params = req.body ;
    var query = "SELECT id, name, display_name, status, 'false' as modified FROM customcolumns WHERE tablename = '"+params.table+"'";
    console.log("query getCustomColumns in gridAPI>>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in gridAPI getCustomColumns >>", err);
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
            "data": rows
          }
        })
      }
    });
});

router.post('/getPaymentData', function(req, res) {
    var params = req.body ;
    let columnNames = constants.Columns["payment"];
    let subQuery2 = " WHERE 1=1 ", values = params.data.values;

    if(params && params.data && values.length > 0){
      for(let i=0; i<= values.length; i++){
          console.log("values",values[i])
        if(values[i] && values[i].value){
            if(values[i].key=="startdate" || values[i].key=="enddate"){
              if (values[i].key=="startdate"){
                subQuery2 = subQuery2 + " AND DATE(payment_date)>='"+values[i].value+"'"
              }
              if (values[i].key=="enddate"){
                subQuery2 = subQuery2 + " AND DATE(payment_date)<='"+values[i].value+"'"
              }
            }else if(values[i].key=="t.lr_no"){
              let str = "";
              let arr = values[i].value.split(',');
              for(let i=0;i<arr.length;i++){
                str = str +"'"+ arr[i] + "',";
              }
              str = str.slice(0,-1);
              subQuery2 = subQuery2 + " AND "+values[i].key+" IN("+str+")"
            }else if(values[i].key=="bd.status"){
              if(values[i].value == "paid"){
                  subQuery2 = subQuery2 + " AND payment_date IS NOT NULL";
              }else{
                  subQuery2 = subQuery2 + " AND payment_date IS NULL";
              }
            }else if(values[i].key=="removedLrs"){
              let str = "";
              let arr = values[i].value.split(',');
              for(let i=0;i<arr.length;i++){
                str = str +"'"+ arr[i] + "',";
              }
              str = str.slice(0,-1);
              subQuery2 = subQuery2 + " AND t.lr_no NOT IN("+str+")"
            }else{
              subQuery2 = subQuery2 + " AND "+values[i].key+"='"+values[i].value+"'"
            }
        }
      }
    }
    var query = "SELECT group_concat(bd.id ORDER BY bd.id) as id, t.lr_no, t.invoice_no,c.name as booking_stn, DATE_FORMAT(t.bill_date,'%d/%m/%Y') as bill_date, "+
                "p.name as party,tr.name as transporter, t.weight, t.freight, t.item_desc,group_concat(bd.bale_no ORDER BY bd.id SEPARATOR ',') as bale_numbers,t.bale_qty as bale_qty,DATE_FORMAT(t.bilty_date,'%d/%m/%Y') as bilty_date, "+
                "group_concat(DISTINCT CONCAT(bd.bale_no,' - ',DATE_FORMAT(bd.received_date,'%d/%m/%Y')) ORDER BY bd.id SEPARATOR ', ') as received_date,DATE_FORMAT(bd.payment_date,'%d/%m/%Y') as payment_date, bd.status FROM transportentry as t LEFT JOIN baledetails as bd ON (bd.invoice_no = t.invoice_no) LEFT JOIN parties AS p ON (t.party = p.id)"+
                " LEFT JOIN transporters AS tr ON (t.transporter = tr.id) LEFT JOIN cities AS c ON (t.booking_stn = c.id) "+subQuery2+" GROUP BY lr_no ORDER BY t.id desc";
    console.log("query getPaymentData in gridAPI>>",query);
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in gridAPI getPaymentData >>", err);
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
            "columns": columnNames,
            "rows": rows
          }
        })
      }
    });
});



router.post('/setCustomColumns', function(req, res) {
    var params = req.body ;
    var query;
    params.data.forEach(function(item, index){
        query = "UPDATE customcolumns SET STATUS = '"+ item.status +"' WHERE tablename = '"+params.table+"' and id = "+item.id;
        console.log("query setCustomColumns in gridapi>>",query)
        dbConfig.connectToDB(query, function(err, rows){
          if(index === params.data.length - 1){
            res.status(200).json({
              "success":true,
              "data": {}
            })
          }
        });
    });
});


router.post('/submitBaleDates', function(req, res) {
    var params = req.body ;
    var col = "received_date",val, subQuery = "";
    var query;

    params.data.forEach(function(item, index){
        if(item.type){
            col = item.type;
        }
        val = item.value ? item.value : null;
        if(col == "payment_date"){
          if(item.source && item.source=="copy"){
            let str = "";
            let arr = item.lr_no.split(',');
            for(let i=0;i<arr.length;i++){
              str = str +"'"+ arr[i] + "',";
            }
            str = str.slice(0,-1);
          //  subQuery2 = subQuery2 + " AND "+values[i].key+" IN("+str+")"
            subQuery = "lr_no IN("+str+")";
          }else{
            subQuery = "lr_no='"+item.lr_no+"'";
          }
        }else if(item.source && item.source=="multiAdd"){
          subQuery = "bale_no='"+item.id + "' AND lr_no='"+item.lr_no+"'";
        }else{
          subQuery = "id="+item.id;
        }
        if( val && (item.type=="received_date" || item.type=="sold_date" || item.type=="payment_date")){
          query = "UPDATE baledetails SET "+col+" = STR_TO_DATE('"+val+"','%d/%m/%Y') WHERE "+subQuery;
        }else if(val==null || val==undefined){
          query = "UPDATE baledetails SET "+col+" = "+val+" WHERE "+subQuery;
        }else{
          query = "UPDATE baledetails SET "+col+" = '"+val+"' WHERE "+subQuery;
        }
        console.log("query submitBaleDates in GridApi >>>",query)
        dbConfig.connectToDB(query, function(err, rows){
          if(err){
            console.log("error in gridAPI getPaymentData >>", err);
          }
          if(index === params.data.length - 1){
            res.status(200).json({
              "success":true,
              "data": {}
            })
          }
        });
    });
});
function deleteBales(id, res){
  var query = "DELETE FROM baledetails WHERE invoice_no = '"+ id+"'";
    console.log("query deleteBales in gridApi>>>>",query);
  dbConfig.connectToDB(query, function(err, rows){
    if(err){
      console.log("error in gridAPI deleteBales >>", err);
      res.status(200).json({
        "success":false,
        "error": {
          "msg": err
        }
      })
    }else{
      res.status(200).json({
        "success":true,
        "data":{
          "success":true
        }
      })
    }
  });
}

router.post('/deleteGridData', function(req, res) {
    var actions = req.body ;
    let table = actions.table, key = actions.key, id = actions.id;
    var query = "DELETE FROM "+table+" WHERE "+ actions.key + " = '"+ actions.value+"'";
    console.log("query deleteGridData in gridApi >>",query)
    dbConfig.connectToDB(query, function(err, rows){
      if(err){
        console.log("error in gridAPI deleteGridData >>", err);
        res.status(200).json({
          "success":false,
          "error": {
            "msg": err
          }
        })
      }else{
        console.log("success deleteGridData")
        if(table == "transportentry"){
          deleteBales(actions.value, res);
        }else{
          res.status(200).json({
            "success":true,
            "data":{
              "success":true
            }
          })
        }
      }
    });
});

module.exports = router;
