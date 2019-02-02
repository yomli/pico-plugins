# PicoParsedownExtraPlugin

Integrates the extension ParsedownExtraPlugin by tovic. See [here](https://github.com/tovic/parsedown-extra-plugin) for a list of features.

## Installation

Just put the plugin in the `plugins` folder.

### Configuration
Advance Attribute Parser is ready to go. You can set any feature by using the `config.yml` file:

~~~
PicoParsedownExtraPlugin:
    footnote_link_text: '[%s]'
    abbreviations:
        'CSS': 'Cascading Style Sheet'
        'HTML': 'Hyper Text Markup Language'
        'JS': 'JavaScript'
    links_external_attr:
        'rel': 'nofollow'
        'target': '_blank'
    code_class: 'language-%s'
~~~

### Not working

I had to disable the parsing of the footnote elements in order to bypass the footnotes-rendered-as-text issue. See [https://github.com/picocms/Pico/issues/476](https://github.com/picocms/Pico/issues/476). If we use ParsedownExtra-Plugin with Parsedown 1.8 and Parsedown Extra 0.8 we don't get the fix.

## License
Licensed under the terms of the MIT-Beerware license.
See the [LICENSE](LICENSE) file for license rights and limitations.