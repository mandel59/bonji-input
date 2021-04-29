# bonji-input

[梵字を入力するやつ](https://mandel59.github.io/bonji-input/)

Input Siddhaṁ script using your ASCII keyboard.

ISO 15919 の ASCII 翻字で入力すると、ダイアクリティカルマークを使った翻字と悉曇文字（梵字）に変換します。

## LICENSE / ライセンス

The MIT License. See [LICENSE](./LICENSE).

## 入力例

|入力|出力（翻字）|出力（梵字）|
|:-:|:-:|:-:|
|`siddha;m`|siddhaṁ|𑖭𑖰𑖟𑖿𑖠𑖽|
|`va~m`|vam̐|𑖪𑖼|
|`huu~m`|hūm̐|𑖮𑖳𑖼|
|`hhuu~m`|hhūm̐|𑖮𑖿𑖮𑖳𑖼|
|`stva;m`|stvaṁ|𑖭𑖿𑖝𑖿𑖪𑖽|
|`hrii.h`|hrīḥ|𑖮𑖿𑖨𑖱𑖾|
|`;srii`|śrī|𑖫𑖿𑖨𑖱|
|`yu`|yu|𑖧𑖲|
|`y_u.h`|yu̲ḥ|𑖧𑗜𑖾|

## 入力方法

- [ISO 15919](https://ja.wikipedia.org/wiki/ISO_15919) のASCII翻字を使って入力します。
- 変体を入力する場合は、アンダースコア(`_`)を直前に加えて入力します。
    - `i` → 𑖂
    - `_i` → 𑗙
    - `__i` → 𑗘
    - `ii` → 𑖃
    - `_ii` → 𑗚
    - `u` → 𑖄
    - `_u` → 𑗛
    - `hu` → 𑖮𑖲
    - `h_u` → 𑖮𑗜
    - `huu` → 𑖮𑖳
    - `h_uu` → 𑖮𑗝
- 母音を区切る場合は間にコロン（`:`）を入力します。
    - `ai` → 𑖋
    - `a:i` → 𑖀𑖂

## ASCII 対応表

|ASCII|翻字|
|:-:|:-:|
|`a`|a|
|`aa`|ā|
|`i`|i|
|`ii`|ī|
|`__i`|i̳|
|`_i`|i̲|
|`_ii`|ī̲|
|`u`|u|
|`uu`|ū|
|`_u`|u̲|
|`_uu`|ū̲|
|`,r`|r̥|
|`,rr`|r̥̄|
|`,l`|l̥|
|`,ll`|l̥̄|
|`e`|e|
|`ai`|ai|
|`o`|o|
|`au`|au|
|`~m`|m̐|
|`;m`|ṁ|
|`.h`|ḥ|
|`k`|k|
|`kh`|kh|
|`g`|g|
|`gh`|gh|
|`;n`|ṅ|
|`c`|c|
|`ch`|ch|
|`j`|j|
|`jh`|jh|
|`~n`|ñ|
|`.t`|ṭ|
|`.th`|ṭh|
|`.d`|ḍ|
|`.dh`|ḍh|
|`.n`|ṇ|
|`t`|t|
|`th`|th|
|`d`|d|
|`dh`|dh|
|`n`|n|
|`p`|p|
|`ph`|ph|
|`b`|b|
|`bh`|bh|
|`m`|m|
|`y`|y|
|`r`|r|
|`l`|l|
|`v`|v|
|`;s`|ś|
|`.s`|ṣ|
|`s`|s|
|`h`|h|
