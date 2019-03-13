/**
 *  2019/3/12  lize
 */
/* eslint-disable */
require('script-loader!file-saver');
require('script-loader!@/vendors/Blob');
require('script-loader!xlsx-style/dist/xlsx.core.min');
require('script-loader!xlsx-style/dist/xlsx.full.min');

// import XLSX from 'xlsx'
// import XLSX1 from 'XLSX'

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;
      
      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });
      
      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };
      
      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);
      
      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  // var ws = [];
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });
      
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else
      // cell.t = 's';
        ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];
  
  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";
  
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);
  
  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;
  
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}
//获取时间
export function export_get_title_time() {
  var date = new Date();
  var seperator1 = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour =  date.getHours(); //获取当前小时数(0-23)
  var min = date.getMinutes(); //获取当前分钟数(0-59)
  var second = date.getSeconds(); //获取当前秒数(0-59)
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hour >= 1 && hour <= 9) {
    hour = "0" + hour;
  }
  if (min >= 0 && min <= 9) {
    min = "0" + min;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate+hour+seperator1+min+seperator1+second;
  return currentdate;
};
//解析数据
export function format_json(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    if(v[j]){
      if (j === 'timestamp') {
        return parseTime(v[j])
      } else {
        return v[j]
      }
    }else{
      return ""
    }
  }))
};
export function export_json_to_excel(header,data,filename,merges) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);
  var ws_name = "SheetJS";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);
  //====设置xlsx单元格样式
  for(var i=0;i<header.length;i++){
    var str = String.fromCharCode((65+i));//A B C D....
    //设备表头样式
    var head = str + "1";
    ws[head].s =  { font: { sz: 12, bold: true, color: { rgb: "000000" } },alignment:{vertical:"center",horizontal:"center"}, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } } }
    //设置内容样式
    for (let j = 2; j < data.length; j++) {
      var body =  str + j;
      ws[body].s =  { font: { sz: 12},alignment:{vertical:"center",horizontal:"center"} }
    }
  }
  if(merges){
    //合并单元格
    ws["!merges"] = merges
  }
  let autoWidth = true
  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }
  
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), filename + ".xlsx");
}
