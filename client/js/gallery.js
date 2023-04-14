function clickedImg(img, fp) {
    console.log(img.src);
    var top = document.getElementById('top');
    top.src = img.src;
    top.hidden = false;


    if (img.naturalWidth < screen.width * 0.3 && img.naturalHeight < screen.height * 0.3) {
        top.width = img.naturalWidth;
        top.height = img.naturalHeight;

    } else {
        top.width = screen.width * 0.3;
        top.height = img.naturalHeight / img.naturalWidth * top.width;
    }

    document.getElementById('close').hidden = false;
}


function doClose() {
    document.getElementById('top').hidden = true;
    document.getElementById('close').hidden = true;
}

function deleteImage(type) {
    var imgSrc = document.getElementById("top").getAttribute("src");
    var filename = imgSrc.split('/').pop();
    window.location.href = type + "/delete/" + filename;
}