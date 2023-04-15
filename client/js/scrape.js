let pictureDiv = document.getElementById("pics-go-here");
let textDiv = document.getElementById("text-goes-here");

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
            newImage.classList.add("expandable-image");
            newImage.setAttribute("class", "fetched-image");

            let photosContainer = document.querySelector('.photos-container');
            photosContainer.appendChild(newImage);

            newImage.addEventListener("click", (event) => {
                event.stopPropagation();
                event.preventDefault();
                event.target.classList.toggle("expanded-image");
            });

        } else if(elem instanceof HTMLParagraphElement) {
            if(elem.innerText.trim() == "") {
                return;
            }

            let newParagraph = document.createElement("p");

            newParagraph.innerText = elem.innerText.trim().replace(/\[\d+\]/, "");
            newParagraph.setAttribute("class", "fetched-text");

            textDiv.appendChild(newParagraph);
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
    let urlToScrape = document.getElementById("url-input").value;
    let pageBody = get(`/scrape?siteurl=${urlToScrape}`);
    console.log(urlToScrape);
    pageBody.then(text => scrape(text, urlToScrape));
    return false;
}

main();