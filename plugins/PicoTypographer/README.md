# PicoTypographer
This plugin provides typographic enhancements.

## Installation

Just put the plugin in the `plugins` folder. The plugin only enhances the content of the pages and try to skip `<pre>`,`<code>`,`<kbd>`,`<script>`,`<style>` and `<math>` tags (can be set).

### Configuration
This plugin uses two external classes: SmartyPantsTypographer and Microtypographer. You can set any feature by using the `config.yml` file:

~~~
PicoTypographer:
    SmartyPantsTypographer:
        preset: "2"                 # "0" (do nothing), "1", "2" or "3"
    Microtypographer:
		tagsToSkip: "pre|code|kbd|script|style|math"
        ndashBetweenNumbers: true   # true or false
        noSpaceBeforeComma: true    # true or false
        spaceBeforeUnit: true       # true or false
        trademarks: true            # true or false
        mathSymbols: true           # true or false
        smartFractions: true        # true or false
        smartOrdinals: true         # true or false
        someFrenchFixes: true       # true or false
        noWidow: true               # true or false
        doNothing: false            # true or false
        smallCapsClass: 'small-caps'
~~~

Please see [SmartyPantsTypographer's configuration page](https://michelf.ca/projects/php-smartypants/configuration/#smartypants-typo) to get a list of options for SmartyPantsTypographer.

By default, all options of Microtypographer are set to `false`, so you have to enable them.

*tagsToSkip*
HTML tags to skip from Microtypographer.
**Default value: "pre|code|kbd|script|style|math"**

*ndashBetweenNumbers*
Replace the simple - by a ndash between numbers (dates ranges…).

*noSpaceBeforeComma*
No space before comma ,

*spaceBeforeUnit*
Adds a nobreak space before an unit.

*trademarks*
Converts (c) (tm) and (r) to ASCII equivalents.

*mathSymbols*
Replace x and - symbols in a mathematical context.

*smartFractions*
Converts fractions like 1/2 into their UTF-8 equivalents ½.

*smartOrdinals*
Converts ordinals like 1st into 1<sup>st</sup>.

*noWidow*
Replaces the space between the last two words in a string with a nobreak space.

*doNothing*
Overrides all options and don't do anything in Microtypographer.

*someFrenchFixes*
Some French fixes :
- n° → `n<sup>o</sup>`
- Mme → `M<sup>me</sup>` and other abbreviations
- nobreak space before `etc.`
- nobreak space between p. and a page number
- small caps on roman numbers if they are centuries (if preceding the words "siècle" or "siècles")

*smallCapsClass*
CSS hook to style small-caps. Advice: add this helper in CSS `.small-caps { text-transform:lowercase; font-variant:small-caps; }`
**Default value: "small-caps"**


## License
Licensed under the terms of the MIT-Beerware license.
See the [LICENSE](LICENSE) file for license rights and limitations.