'use strict';

const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.95;

let imageEl = document.getElementById('file');
let  canvas = document.getElementById('img_convas');
let canvas_container = document.getElementById('imgcanvas_container');
let orig_fileSize_dom = document.getElementById('orig_fileSize');
let comp_fileSize_dom = document.getElementById('comp_fileSize');

imageEl.onchange = (e)=>{
    // image
    const imgSrc = e.target.files[0];
  
    //convert image object to string
    const BlobUrl = URL.createObjectURL(imgSrc);
    const img = new Image();
    img.src = BlobUrl;
// console.log(img);
  img.onerror = function(){
        URL.revokeObjectURL(this.src);
        alert('fails to load');
    }
    
    img.onload = function(){
        URL.revokeObjectURL(this.src);

        // const[ width, height] = calculaterequiredWidthHeight(img, MAX_HEIGHT, MAX_WIDTH);
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        // const canvas = document.createElement('canvas');

        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
       
        canvas.toBlob((blob)=>{
          let url = URL.createObjectURL(blob);
          let DownloadLink = document.createElement('a');
          DownloadLink.innerHTML = 'Click here to download the compressed file';
          DownloadLink.style.color='white';
          DownloadLink.setAttribute('download', 'new compressed file');
          DownloadLink.href = url;
          canvas_container.insertAdjacentElement("beforeend", DownloadLink);
          orig_fileSize_dom.innerHTML =`Original file size was ${imgSrc.size}`;
          comp_fileSize_dom.innerHTML =`Compressed file size is  ${blob.size}`;

        }, 

        MIME_TYPE, QUALITY);
        
        canvas_container.append(canvas);

    } 
}

function calculateSize(Img, maxWidth, maxHeight) {
    let width = Img.width;
    let height = Img.height;
  
    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }





















