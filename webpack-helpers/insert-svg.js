const fs = require('fs');
const path = require('path');

(async () => {
    let replaceString = await getSvgSprite(path.resolve("./dist/sprite.svg"));

    await new Promise((resolve, reject) => {

        const filePath = path.resolve("./dist/index.html");
        const searchRegex = /<!--PUT_HERE_SVG_SPRITE-->/g;

        replace(filePath, searchRegex, replaceString)
            .then(resolve, reject);
    });
})();



// helpers
function getSvgSprite(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);

            resolve(data);
        });
    });
}

function replace(filePath, searchRegex, replaceString) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);

            const result = data.replace(searchRegex, replaceString);

            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) reject(err);

                resolve();
            });
        });
    });
}
