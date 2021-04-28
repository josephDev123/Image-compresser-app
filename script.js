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

// function calculaterequiredWidthHeight(Img, max_Height, max_width){
//     let imgwidth =  Img.width;
//     let imgheight = Img.height;

//     if (imgwidth > max_width) {
//         if (imgwidth > imgheight) {
//            imgwidth = max_width;
//            imgheight = Math.round((imgheight * max_Height)/imgwidth); 
//         }
//     }else{
//         if (imgheight > max_Height) {
//                 imgheight = max_Height;
//                 imgwidth = Math.round((imgwidth * max_width)/imgheight);
//         }
//     }

//     return [imgheight, imgwidth];
// }






















// const MAX_WIDTH = 320;
// const MAX_HEIGHT = 180;
// const MIME_TYPE = "image/jpeg";
// const QUALITY = 0.7;

// const input = document.getElementById("file");
// input.onchange = function (ev) {
//   const file = ev.target.files[0]; // get the file
//   const blobURL = URL.createObjectURL(file);
 
//   const img = new Image();
//   img.src = blobURL;
//   img.onerror = function () {
//     URL.revokeObjectURL(this.src);
//     // Handle the failure properly
//     console.log("Cannot load image");
//   };
//   img.onload = function () {
//     URL.revokeObjectURL(this.src);
//     const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
//     const canvas = document.createElement("canvas");
//     canvas.width = newWidth;
//     canvas.height = newHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0, newWidth, newHeight);
//     canvas.toBlob(
//       (blob) => {
//         // Handle the compressed image. es. upload or save in local state
//         displayInfo('Original file', file);
//         displayInfo('Compressed file', blob);
//       },
//       MIME_TYPE,
//       QUALITY
//     );
//     canvas_container.append(canvas);
//   };
// };

// function calculateSize(img, maxWidth, maxHeight) {
//   let width = img.width;
//   let height = img.height;

//   // calculate the width and height, constraining the proportions
//   if (width > height) {
//     if (width > maxWidth) {
//       height = Math.round((height * maxWidth) / width);
//       width = maxWidth;
//     }
//   } else {
//     if (height > maxHeight) {
//       width = Math.round((width * maxHeight) / height);
//       height = maxHeight;
//     }
//   }
//   return [width, height];
// }

// // Utility functions for demo purpose

// function displayInfo(label, file) {
//   const p = document.createElement('p');
//   p.innerText = `${label} - ${readableBytes(file.size)}`;
//   document.getElementById('imgcanvas_container').append(p);
// }

// function readableBytes(bytes) {
//   const i = Math.floor(Math.log(bytes) / Math.log(1024)),
//     sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//   return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
// }