let pictureDiv = document.getElementById("pics-go-here");

/**
 * 
 * @param {HTMLElement} dom
 * @param {(dom: HTMLElement) => {}} func
 */
function traverseDOM(dom, func) {
    func(dom);

    for(let child of dom.childNodes) {
        traverseDOM(child, func);
    }
}

/**
 * 
 * @param {String} domText 
 * @param {String} url
 */
function scrape(domText, url) {
    let temp = document.createElement("template");
    let matches = url.match(/^([a-z]{1,5}\:\/\/)(.*\..*\..*?\/)/);

    temp.innerHTML = domText;

    traverseDOM(temp.content, (elem) => {
        if(elem instanceof HTMLImageElement) {
            let absolutePath = elem.src.replace(window.location.origin, matches[0]);
            let newImage = document.createElement("img");

            newImage.src = absolutePath;

            console.log(absolutePath);
            console.log(newImage);

            pictureDiv.appendChild(newImage);
        }
    });
}

async function get(route) {
    let resp = await fetch(route, {
        method: "GET",
        mode: "no-cors"
    });

    return resp.text()
}

function main() {
    let urlToScrape = "https://en.wikipedia.org/wiki/Ural_Mountains";
    let pageBody = get(`/scrape?siteurl=${urlToScrape}`);
    
    pageBody.then(text => scrape(text, urlToScrape));
}

main();