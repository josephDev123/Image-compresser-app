'use strict';

const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE =  'image/jpeg';
const QUALITY = 0.7;

let imageEl = document.getElementById('file');
let  canvas = document.getElementById('img_convas');
let  canvas_container = document.getElementById('imgcanvas_container');

imageEl.onchange = (e)=>{
    // image
    const imgSrc = e.target.files[0];
    // console.log(imgSrc);
    //convert image object to string
    const BlobUrl = URL.createObjectURL(imgSrc);
    const img = new Image();
    img.src = BlobUrl;
// console.log(img);
    imageEl.onerror = function(){
        URL.revokeObjectURL(this.src);
        alert('fails to load');
    }
    
    imageEl.onload = function(){
        URL.revokeObjectURL(this.src);

        const[height, width] = calculaterequiredWidthHeight(img, MAX_HEIGHT, MAX_WIDTH);

        canvas.width =width;
        canvas.height = height;
        canvas.getContext('2d');
        canvas.drawImage(img, 0, 0, width, height);
       
        ctx.toBlob((blob)=>{
            
        }, 

        MIME_TYPE, QUALITY)

    }
  
    
   
}

function calculaterequiredWidthHeight(img, max_Height, max_width){
    let imgwidth =  img.width;
    let imgheight = img.height;

    if (imgwidth > max_width) {
        if (imgwidth > imgheight) {
           imgwidth = max_width;
           imgheight = imgheight * max_Height/imgwidth; 
        }
    }else{
        if (imgheight > max_Height) {
                imgheight = max_Height;
                imgwidth = imgwidth * max_width/imgheight;
        }
    }

    return [imgheight, imgwidth];
}


