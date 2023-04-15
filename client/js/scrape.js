let photosContainer = document.querySelector('.photos-container');
let textDiv = document.getElementById("text-goes-here");

/**
 * 
 * @param {HTMLElement} domElement 
 */
function removeChildren(domElement) {
    while(domElement.firstChild) {
        domElement.removeChild(domElement.firstChild);
    }
}

/**
 * 
 * @param {HTMLElement} dom
 * @param {(dom: HTMLElement) => {}} func
 */
function traverseDOM(dom, func) {
    if(!dom) {
        return;
    }

    func(dom);

    for(let child of dom.childNodes) {
        traverseDOM(child, func);
    }
}

/**
 * 
 * @param {URL} url 
 */
function normalizeURL(url) {
    if(!url.hostname.match(/^(([^.]*)?\.([^.]*)?){2,}$/)) {
        url.hostname = "www." + url.hostname;
    }

    return url;
}

/**
 * 
 * @param {String} domText 
 * @param {URL} url
 */
function scrape(domText, url) {
    let temp = document.createElement("template");
    
    temp.innerHTML = domText;

    traverseDOM(temp.content, (elem) => {
        if(elem instanceof HTMLImageElement) {
            let absolutePath = elem.src.replace(window.location.origin, url.origin);
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
    let urlToScrape = new URL(document.getElementById("url-input").value);

    normalizeURL(urlToScrape);

    let pageBody = get(`/scrape?siteurl=${urlToScrape.toString()}`);

    removeChildren(photosContainer);
    removeChildren(textDiv);

    console.log(urlToScrape);
    pageBody.then(text => scrape(text, urlToScrape));

    return false;
}

main();

function filterText() {
    event.preventDefault();
  
    let filterWord = document.getElementById("filter-input").value;
    let allParagraphs = document.querySelectorAll(".fetched-text");
  
    for (let paragraph of allParagraphs) {
        if (paragraph.innerText.toLowerCase().includes(filterWord.toLowerCase())) {
            paragraph.style.display = "block";
        } else {
            paragraph.style.display = "none";
        }
    }
}

filterText();
