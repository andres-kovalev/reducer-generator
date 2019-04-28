const package = require('./../package.json');

const { writeFile } = require('./common');

const allowedKeys = [
    "name",
    "version",
    "description",
    "main",
    "repository",
    "keywords",
    "author",
    "license",
    "bugs",
    "homepage",
    "dependencies"
];

Object.keys(package).forEach(
    key => allowedKeys.includes(key) || delete package[key]
);
package.scripts = {
    test: 'echo "tests passed..."'
};

writeFile('./package.json', JSON.stringify(package));
