/**
 *  2019/6/12  lize
 */

/*

opt Object

   type:pdf || img  下载pdf或者图片
   
   el:"" 需要下载的区域的id
   
   title:'' 下载文件的名称

*/

import html2Canvas from 'html2canvas'

import JsPDF from 'jspdf'

export default class exportImg {
  
  static saveFile(data, filename){
  
    let  save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  
    save_link.href = data;
  
    save_link.download = filename;
  
    let  event = document.createEvent('MouseEvents');
  
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  
    save_link.dispatchEvent(event);
  
  };
  
  CreatedImg(opt,CallBack){
  
    let title = opt.title || 'pdf';
    
    html2Canvas(document.querySelector(opt.el), {allowTaint: true})
      
      .then((canvas) =>{
      
        try{
  
          let pageData = canvas.toDataURL('image/jpeg', 1.0);
  
          CallBack ? CallBack(pageData) : '';
          
          if(opt.type == 'pdf'){
            
            let contentWidth = canvas.width;
  
            let contentHeight = canvas.height;
  
            let pageHeight = contentWidth / 592.28 * 841.89;
  
            let leftHeight = contentHeight;
  
            let position = 0;
  
            let imgWidth = 595.28;
  
            let imgHeight = 592.28 / contentWidth * contentHeight;
            
            let PDF = new JsPDF('', 'pt', 'a4');
  
            if (leftHeight < pageHeight) {
    
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    
            } else {
    
              while (leftHeight > 0) {
      
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      
                leftHeight -= pageHeight;
      
                position -= 841.89;
      
                if (leftHeight > 0) {
        
                  PDF.addPage();
        
                }
      
              }
    
            }
  
            PDF.save(`${title}.pdf`)
            
          }else{
  
            exportImg.saveFile(pageData,`${title}.png` );
            
          }
          
        }
        
        catch(er){
          
          console.log(er);
          
        }
        
      })
    
      .catch((er) =>{
      
        console.log(er);
      
      })
  
  }
  
}
