import { ascii2latin, ascii2siddham, ascii2symbol, latin2ascii } from "./siddham.js"
function update() {
    const ignoreSpacesAndHyphens = /** @type {HTMLInputElement} */ (document.getElementById("option_ignore")).checked
    const in_text = /** @type {HTMLTextAreaElement} */ (document.getElementById("in_text"))
    const text = latin2ascii(ascii2symbol(in_text.value.toLowerCase()))
    const out_siddham = /** @type {HTMLElement} */ (document.getElementById("out_siddham"))
    out_siddham.innerText = ascii2siddham(text, { ignoreSpacesAndHyphens })
    const out_codepoints = /** @type {HTMLElement} */ (document.getElementById("out_codepoints"))
    out_codepoints.innerText =
        out_siddham.innerText.split('\n')
            .map(s => {
                return Array.from(s)
                    .map(c => `U+${/** @type {number} */ (c.codePointAt(0)).toString(16).toUpperCase().padStart(4, "0")}`)
                    .join(" ")
            })
            .join('\n')
    const option_transliteration = /** @type {HTMLSelectElement} */ (document.getElementById("option_transliteration"))
    const out_latin = /** @type {HTMLElement} */ (document.getElementById("out_latin"))
    out_latin.innerText = ascii2latin(text, {
        transliteration: /** @type {"ISO15919" | "IAST"} */ (option_transliteration.value)
    })
    /** @type {string[]} */
    const fontFeatureSettings = []
    const option_styles = /** @type {HTMLCollectionOf<HTMLInputElement>} */ (document.getElementsByClassName("option_style"))
    for (const cb of option_styles) {
        fontFeatureSettings.push(`"${cb.value}" ${Number(cb.checked)}`)
    }
    out_siddham.style.fontFeatureSettings = fontFeatureSettings.join(", ")
    const option_siddham_font = /** @type {HTMLSelectElement} */ (document.getElementById("option_siddham-font"))
    out_siddham.style.setProperty("--siddham-font", option_siddham_font.value)
}
globalThis.update = update
addEventListener("DOMContentLoaded", () => update())
