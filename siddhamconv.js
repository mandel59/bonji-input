import { readLines } from "https://deno.land/std/io/mod.ts"
import { ascii2siddham, ascii2symbol, latin2ascii } from "./siddham.js"

const newline = new Uint8Array(['\n'.codePointAt(0)])
const encoder = new TextEncoder()
let firstLine = true
for await (const line of readLines(Deno.stdin)) {
    if (!firstLine) await Deno.stdout.write(newline)
    const outline = ascii2siddham(ascii2symbol(latin2ascii(line)))
    await Deno.stdout.write(encoder.encode(outline))
    firstLine = false
}
