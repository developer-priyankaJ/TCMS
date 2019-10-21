import React from "react";
import ReactExport from "react-data-export";
import saveAs from "file-saver";
import XLSX from "xlsx";
import RaisedButton from 'material-ui/RaisedButton';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportToExcel extends React.Component {
    render() {
        const {columns, data} = this.props;
        let headers = [];
        if(columns){
          for(var i=0; i< columns.length; i++){
            if(columns[i].hiddenForExcel){
              continue;
            }
            headers.push(<ExcelColumn key={i} label={columns[i].headerName} value={columns[i].field}/>);
          }
        }
        return (
            <ExcelFile element={<RaisedButton  type="submit" label="Export to Excel" primary />}>
                <ExcelSheet data={data} name="Employees">
                    {headers}
                </ExcelSheet>
            </ExcelFile>
        );
    }
}
