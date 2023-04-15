document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.top h1');
    const subtitle = document.querySelector('.center-text h2');
    const paragraph = document.querySelector('.center-text p');
    
    const titleText = 'WebScrp';
    const subtitleText = 'Welcome to WebScrp';
    const paragraphText = 'We specialize in web scraping services. Please enter the URL of the website you want us to scrape below:';
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    let paragraphIndex = 0;
    
    function typeTitle() {
        title.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        
        if (titleIndex < titleText.length) {
            setTimeout(typeTitle, 50);
        }
    }
    
    function typeSubtitle() {
        subtitle.textContent += subtitleText.charAt(subtitleIndex);
        subtitleIndex++;
        
        if (subtitleIndex < subtitleText.length) {
            setTimeout(typeSubtitle, 50);
        }
    }
    
    function typeParagraph() {
        paragraph.textContent += paragraphText.charAt(paragraphIndex);
        paragraphIndex++;
      
        if (paragraphIndex < paragraphText.length) {
            setTimeout(typeParagraph, 50);
        }
    }
    
    typeTitle();
    setTimeout(typeSubtitle, 1500);
    setTimeout(typeParagraph, 3000);
});