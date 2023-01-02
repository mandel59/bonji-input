const devanagariTsv = await (await fetch(new URL("data/devanagari.tsv", import.meta.url))).text()

/**
 * @param {string} tsv
 * @return {Record<string, string>[]}
 */
function tsvToObj(tsv) {
    const lines = tsv.split(/\n/g).filter(line => line !== "")
    const [header, ...body] = lines.map(line => line.split(/\t/g))
    return body.map(record => Object.fromEntries(record.map((v, i) => [header[i], v])))
}

/**
 * @template T
 * @template {keyof T} K
 * @param {T[]} data 
 * @param {K} key 
 * @returns {Map<K,T>}
 */
function createIndex(data, key) {
    const m = new Map()
    for (const record of data) {
        m.set(record[key], record)
    }
    return m
}

/**
 * 
 * @param {string[]} tokens 
 */
function createTokenizerRegExp(tokens) {
    function escapeRegExp(/** @type {string} */ s) {
        return s.replace(/([\\\[\]()|.+*?^$])/g, "\\$1")
    }
    return new RegExp(Array.from(tokens)
        .filter(x => x !== "")
        .sort((x, y) => y.length - x.length)
        .map(escapeRegExp)
        .join("|") + "|[\\s\\S]", "uy")
}

/**
 * @param {RegExp} Tokenize 
 * @returns {(s: string) => Generator<string>}
 */
function createTokenizer(Tokenize) {
    return function* tokenize(s) {
        const r = new RegExp(Tokenize)
        while (true) {
            const m = r.exec(s)
            if (!m) break
            yield m[0]
        }
    }
}

/**
 * @type {{type: "virama" | "iv" | "dvs" | "s" | "c", iso15919: string, devanagari: string}[]}
 */
const devanagariData = tsvToObj(devanagariTsv)
const devanagariIndex = createIndex(devanagariData, "devanagari")
const devanagariTokenizerRegExp = createTokenizerRegExp(devanagariIndex.keys())
const tokenizeDevanagari = createTokenizer(devanagariTokenizerRegExp)

/**
 * Convert Devanagari to ISO 15919 7-bit transliteration
 * @param {string} text 
 */
export function devanagari2ascii(text) {
    return Array.from(convert()).join("")
    function* convert() {
        /** @type {"none" | "consonant" | "vowel" | "virama"} */
        let state = "none"
        for (const token of tokenizeDevanagari(text)) {
            const r = devanagariIndex.get(token)
            if (r == null) {
                if (state === "consonant") {
                    yield "a"
                }
                yield token
                state = "none"
            } else if (r.type === "c") {
                if (state === "consonant") {
                    yield "a"
                }
                yield r.iso15919
                state = "consonant"
            } else if (r.type === "virama") {
                state = "virama"
            } else if (r.type === "dvs") {
                yield r.iso15919
                state = "vowel"
            } else if (r.type === "iv") {
                yield r.iso15919
                state = "vowel"
            } else if (r.type === "s") {
                if (state === "consonant") {
                    yield "a"
                }
                yield r.iso15919
                state = "none"
            }
        }
        if (state === "consonant") {
            yield "a"
        }
    }
}
