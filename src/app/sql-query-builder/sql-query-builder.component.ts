import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sql-query-builder',
  templateUrl: './sql-query-builder.component.html',
  styleUrls: ['./sql-query-builder.component.scss']
})
export class SqlQueryBuilderComponent implements OnInit {

  public file:File;
  public arrayBuffer:any;
  public fileList:any;
  public queryString: string = "";
  public tableName: string = "";
  public worksheet: XLSX.WorkSheet;
  public rowNames: string = "";

  constructor() { }

  ngOnInit() {
  }

  addfile(event)     
  {    
    this.fileList = [];    
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      this.worksheet = workbook.Sheets[first_sheet_name];  
      this.fileList = XLSX.utils.sheet_to_json(this.worksheet,{raw:true})
      this.buildQuery();
    }    
  } 
  
  buildQuery() {
    this.rowNames = Object.keys(this.fileList[0]).join(", ");
   
    this.fileList.forEach((row, i) => {
      let queryValues = "";
      let values = Object.values(this.fileList[i]);
      values.forEach((element, i2) => {
        if(typeof element == "string"){
          queryValues += "'" + element + "'";
        } else {
          queryValues += element;
        }
        if(i2 != values.length-1){
          queryValues += ', ';
        } 
      });

      this.queryString += 'INSERT INTO ' + this.tableName + ' (' + this.rowNames +') VALUES ( ' + queryValues +')\n';
    });
  }

  reloadQuery(){
    this.queryString = "";
    this.buildQuery();
  }
}
