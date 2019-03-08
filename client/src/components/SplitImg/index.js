
// class SplitImg {
//     splitImg( opt ){
//         let imgW = opt.width,
//             imgH = opt.height,
//             points = opt.data,
//             lastclientY = 0,
//             returnData = [];
//         try{
//             points.forEach( function( point,idx ){
//                 let canvas = document.createElement( "canvas" );
//                 canvas.width = imgW;
//                 let img = document.createElement( "img" );
//                 img.src = opt.base64;

//                 let ctx = canvas.getContext( "2d" );
//                 let splitY = parseInt(point.y - lastclientY,10);

//                 canvas.height = splitY;
//                 canvas.style = `width:${imgW}px;height:${splitY}px`;

//                 ctx.drawImage( img, 0 , lastclientY, imgW, splitY,0,0,  imgW, splitY );

//                 let dataBase64 = canvas.toDataURL("image/png");
//                 //let showImg = document.createElement( "img" );
//                 returnData.push( dataBase64 );
//                 //showImg.src = dataBase64;
//                 //document.body.appendChild( showImg );
//                 lastclientY = point.y;

//             } );
//         }catch(e){
//             throw new Error( e );
//         }
//         return returnData;
//     }
// }
//export default SplitImg;

module.exports = {
    splitImg:function splitImg( opt ){
        let imgW = opt.width,
            imgH = opt.height,
            points = opt.data,
            lastclientY = 0,
            returnData = [];
            // 坑：canvas，切割图片，切割点有可能，没有和像素点没有刚好对其，导致切割的图片，转成base64后，在像素边缘的点，有误差，
            // 解决方案，吧canvas 放大，后缩小
            // 缩放 比例
            const scaleRate = 1;
            
            return new Promise( function(resolve,reject){
            let img = document.createElement( "img" );
            img.style = `position:absolute`;            
            img.src = opt.base64;
                img.onload = ()=>{
                    points.forEach( function( point,idx ){
                        let canvas = document.createElement( "canvas" );
                        canvas.width = imgW * scaleRate;
                        //img.style.width = imgW;
                        //img.style.height = imgH * 10;
                        let ctx = canvas.getContext( "2d" );
                        let splitY = parseInt(point.y - lastclientY,10);

                        console.log(lastclientY,splitY);

                        canvas.height = splitY * scaleRate;
                        canvas.style = `width:${imgW * scaleRate}px;height:${splitY *scaleRate}px`;

                        ctx.drawImage( img, 0, lastclientY, imgW, splitY,0,0,  imgW*scaleRate, splitY*scaleRate );

                       // document.body.appendChild(canvas);
                        //canvas.style.transform = `scale(0.1)`;
                        //canvas.width = imgW ;
                        //canvas.height = splitY;
                        //canvas.style = `width:${imgW}px;height:${splitY}px`;
                        //ctx.scale(0.1,0.1);

                        //test 0 
                        let sCanvas = document.createElement( "canvas" );
                        //
                        //test 
                        const sizeM = 0.92;
                        let dataBase64 = canvas.toDataURL(["image/png",sizeM]);

                        
                        // 这里能获取 图片被放大十倍 的图片，我在再次通过img 和 canvas  吧图片缩小十倍                       
                        
                        //let showImg = document.createElement( "img" );
                        //returnData.push( dataBase64 );

                        returnData.push( {
                            base64:dataBase64,
                            width:img.width,
                            height:splitY
                        } );
                        //showImg.src = dataBase64;
                        //document.body.appendChild( showImg );
                        lastclientY = Number(point.y);

                    } );
                    resolve( returnData );
                };
            } );
        
        //return returnData;
    }
};