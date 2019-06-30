const identity = value => value;

const generate = (keys, generator) => keys
    .reduce(
        (reduced, key) => {
            // eslint-disable-next-line no-param-reassign
            reduced[key] = generator(key);

            return reduced;
        }, {}
    );

const mapValues = (object, map) => generate(
    Object.keys(object),
    key => map(object[key])
);

module.exports = {
    identity,
    generate,
    mapValues
};
