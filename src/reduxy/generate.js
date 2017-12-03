class IdGenerator {
    constructor() {}

    init() {}

    generate() {}
}

class SequenceGenerator extends IdGenerator {
    id;

    constructor(initial) {
        super();

        this.init(initial);
    }

    init(initial = 0) {
        this.id = initial;
    }

    generate() {
        return this.id++;
    }
}

class TimestampGenerator extends IdGenerator {
    last;

    constructor() {
        super();
    }

    init() {}

    generate() {
        const timestamp = new Date().getTime();
        if (timestamp <= this.last)
            return ++this.last;
        return this.last = timestamp;
    }
}

class WrappedGenerator extends IdGenerator {
    generator;

    constructor(generator) {
        super();

        this.init(generator);
    }

    init(generator = TimestampGenerator) {
        this.generator = generator instanceof IdGenerator
                            ? generator
                            : new generator();
    }

    generate() {
        return this.generator.generate();
    }
}

const generator = new WrappedGenerator(),
    init = initialisation => generator.init(initialisation),
    generate = () => generator.generate();

export { init, SequenceGenerator, TimestampGenerator, generate };