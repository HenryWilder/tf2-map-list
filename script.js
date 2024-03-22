const listContainer = document.getElementById('list-container');
// https://wiki.teamfortress.com/wiki/List_of_maps
const ASSETS_PATH = './assets/';

console.log('Starting');

try {
    // Fetch images
    fetch(ASSETS_PATH)
        .then((resp) => resp.text())
        .then((html) => {
            // Parse the HTML response to extract image file names
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a[href]');

            // Iterate over links and create img elements for each image
            links.forEach((link) => {
                const fileName = link.getAttribute('href');
                console.log(fileName);
                const pattern = /^\/assets\/([^\.]+)\.bmp$/;
                if (fileName.match(pattern)) {
                    const mapName = pattern.exec(fileName)[1];
                    console.log(mapName);

                    const container = document.createElement('div');
                    listContainer.appendChild(container);
                    container.className = 'map-container';

                    const img = document.createElement('img');
                    container.appendChild(img);
                    img.src = fileName;

                    const shroud = document.createElement('div');
                    container.appendChild(shroud);
                    shroud.className = 'shroud';

                    const text = document.createElement('span');
                    container.appendChild(text);
                    text.innerText = mapName;
                }
            });
        });
} catch (err) {
    console.error(err);
}
console.log('Finished');
