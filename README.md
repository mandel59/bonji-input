# bonji-input

[梵字を入力するやつ Siddham (Bonji) Input](https://mandel59.github.io/bonji-input/)

Input Siddhaṁ script using your ASCII keyboard.

ISO 15919 の ASCII 翻字で入力すると、ダイアクリティカルマークを使った翻字と悉曇文字（梵字）に変換します。

## LICENSE / ライセンス

The MIT License. See [LICENSE](./LICENSE).

## Install Noto Sans Siddham font / フォントのインストール

Install Noto Sans Siddham if Siddham letters not rendered properly.

梵字が正常に表示されない場合は Noto Sans Siddham フォントをインストールしてください。

You can download the font from the following links. (The font of [Noto Fonts](https://github.com/googlefonts/noto-fonts) repository. See [LICENSE](https://github.com/googlefonts/noto-fonts/blob/main/LICENSE).)

次のリンクからフォントをダウンロードできます。（[Noto Fonts](https://github.com/googlefonts/noto-fonts)リポジトリにあるファイルです。[ライセンス](https://github.com/googlefonts/noto-fonts/blob/main/LICENSE)に従って利用してください。）

- For Windows: hinted TTF [Download NotoSansSiddham-Regular.ttf](https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansSiddham/NotoSansSiddham-Regular.ttf)
- unhinted OTF [Download NotoSansSiddham-Regular.otf](https://github.com/googlefonts/noto-fonts/raw/main/unhinted/otf/NotoSansSiddham/NotoSansSiddham-Regular.otf)

macOS Big Sur users don't need to install Noto Sans Siddham because the font is included with the OS.

macOS Big Sur の場合は最初から Noto Sans Siddham フォントが付属しているので、フォントのインストール作業は不要です。

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
|`h~m`|hm̐|𑖮𑖼𑖿|

## 入力方法

- [ISO 15919](https://ja.wikipedia.org/wiki/ISO_15919) のASCII翻字を使って入力します。
    - ダイアクリティカルマークを使って IAST, ISO 15919 を直接入力しても変換できます。
- 別体を入力する場合は、アンダースコア(`_`)を直前に加えて入力します。
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
- 文字を区切る場合は間にコロン（`:`）を入力します。
    - `ai` → 𑖋
    - `a:i` → 𑖀𑖂
    - `k.sa` → 𑖎𑖿𑖬
    - `k:.sa` → 𑖎𑖿‌𑖬

## スタイル

`ss01`〜`ss04`オプションを切り替えることで、梵字のスタイルを一部変更できます。

Noto Sans Siddham 2.001 は次のスタイル変更に対応しています。

- `ss01`: `ru`, `ruu` 字中の `u`, `uu` の形が雲形点に変わります。
- `ss02`: 半体の `u`, `uu` の形が鶯点に変わります。
  （`u` は `_u` と入力した場合と同様の形になります。）
- `ss03`: `ai` の形が変わります。
- `ss04`: 種子字の特殊なリガチャが有効になります。

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

## 記号入力法

以下の入力法で記号が使えます。

|入力|記号|名前|
|:-:|:-:|:--|
|`--`|𑗁|SIDDHAM SIGN SIDDHAM|
|`,,`|𑗂|SIDDHAM DANDA|
|`..`|𑗃|SIDDHAM DOUBLE DANDA|
|`*`|𑗄|SIDDHAM SEPARATOR DOT|
|`\|`|𑗅|SIDDHAM SEPARATOR BAR|
|`\|\|`|𑗉|SIDDHAM END OF TEXT MARK|
|`2`|𑗆|SIDDHAM REPETITION MARK-1|
|`@`|𑗇|SIDDHAM REPETITION MARK-2|
|`=`|𑗈|SIDDHAM REPETITION MARK-3|
