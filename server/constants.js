

module.exports = {
  "DB": {
    "HOST": "localhost",
    "USER": "root",
    "PSWD": "Admin@123",
    "DB_NAME": "tcms",
    "PORT": "3306"
  },
  "Columns":{
    "transportentry":[
      {"field":"invoice_no", "headerName": "Invoice No", pinned: 'left', width: 120, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}, cellRenderer: "linkCellRenderer"},
      {"field":"bill_date", "headerName": "Bill Date" ,  width: 100, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"party", "headerName": "Party" , cellClass: "cell-wrap-text", autoHeight: true, width: 160, filter: "text" , floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"item_desc", "headerName": "Item Description", cellClass: "cell-wrap-text",autoHeight: true, "width": 150, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"amount", "headerName": "Amount",  width: 90, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"cgst", "headerName": "Cgst", filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}, width: 90},
      {"field":"sgst", "headerName": "Sgst", filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}, width: 90},
      {"field":"igst", "headerName": "Igst", filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}, width: 90},
      {"field":"total", "headerName": "Total", filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}, width: 90},
      {"field":"transporter", "headerName": "Transporter", cellClass: "cell-wrap-text", autoHeight: true, width: 160, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"lr_no", "headerName": "LR No",  width: 90, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"booking_stn", "headerName": "Booking Station",  width: 150, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"eway_no", "headerName": "EWay No",  width: 90, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"bilty_date", "headerName": "Bilty Date",  width: 100, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"bale_qty", "headerName": "Bale Quantity",  width: 120, filter: "number", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"weight", "headerName": "Weight",  width: 90, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"freight", "headerName": "Freight",  width: 90, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"bale_numbers", "headerName": "Bale Numbers", "autoHeight": true,cellClass: "cell-wrap-text",  width: 125, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"bale_desc", "headerName": "Bale Description", "autoHeight": true,cellClass: "cell-wrap-text",  width: 120, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}},
      {"field":"received_date", "headerName": "Received Date",autoHeight: true, cellClass: "cell-wrap-text",  width: 130, filter: "text", floatingFilterComponentParams:{suppressFilterButton:true}}
    //  {"field":"bale_type", "headerName": "Bale Type",  width: 125, floatingFilterComponentParams:{suppressFilterButton:true}},
  ],
  "baledetails":[
    {"field":"id", "hidden": true},
    {"field":"lr_no", "headerName": "LR No"},
    {"field":"bill_date", "headerName": "Bill Date"},
    {"field":"invoice_no", "headerName": "Invoice No", "hideForDashBoard":true, "hidden": true},
    {"field":"bale_no", "headerName": "Bale No" },
    {"field":"bale_desc", "headerName": "Bale Description" },
    {"field":"qty", "headerName": "qty", "hideForDashBoard":true},
    {"field":"freight", "headerName": "Rs.", "hideForDashBoard":true},
    {"field":"received_date", "headerName": "Received Date"},
    {"field":"sold_date", "headerName": "Sold Date"},
    {"field":"payment_date", "headerName": "Payment Date", "hidden": true},
    {"field":"status", "headerName": "Status", "hidden": true},
    {"field":"remarks", "headerName": "Remarks"}
  ],
  "masterpayment":[
    {"field":"id", "hidden": true},
    {"field":"transporter", "headerName": "Transporter"},
    {"field":"bill_date", "headerName": "Bill Date"},
    {"field":"mode", "headerName": "Payment Mode" },
    {"field":"cheque_no", "headerName": "Cheque No" },
    {"field":"amount", "headerName": "Amount"},
    {"field":"tds", "headerName": "tds", "hidden": true},
    {"field":"total", "headerName": "Total"},
    {"field":"remarks", "headerName": "Remarks"}
  ],
  "payment":[
    {"field":"id", "hidden": true, "hiddenForExcel":true},
    {"field":"bill_date", "headerName": "Invoice Date","width":"100px"},
    {"field":"invoice_no", "headerName": "Invoice No","width":"100px"},
    {"field":"booking_stn", "headerName": "Location","width":"90px" },
    {"field":"party", "headerName": "Party","width":"120px" },
    {"field":"transporter", "headerName": "Transporter","width":"130px"},
    {"field":"weight", "headerName": "Weight","width":"50px"},
    {"field":"freight", "headerName": "Freight","width":"50px"},
    {"field":"bale_qty", "headerName": "Bale Qty","width":"60px" },
    {"field":"bale_numbers", "headerName": "Bale No.","width":"90px"},
    {"field":"bilty_date", "headerName": "Bilty date","width":"90px"},
    {"field":"lr_no", "headerName": "LR No","width":"50px"},
    {"field":"received_date", "headerName": "Received Date","width":"270px"},
    {"field":"payment_date", "headerName": "Payment Date","width":"130px"},
  ],

}
}
