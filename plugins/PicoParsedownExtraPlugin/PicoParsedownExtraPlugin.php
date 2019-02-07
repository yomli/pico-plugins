<?php
/**
 * PicoParsedownExtraPlugin - ParsedownExtra extended
 *
 * Loads ParsedownExtraPlugin
 * https://github.com/tovic/parsedown-extra-plugin
 *
 * @author  Guillaume Litaudon
 * @link    https://github.com/yomli/pico-plugins
 * @license MIT-Beerware
 * @version 1.1.6
 */
class PicoParsedownExtraPlugin extends AbstractPicoPlugin
{
    /**
     * API version used by this plugin
     *
     * @var int
     */
    const API_VERSION = 2;

    protected $enabled = null;
    protected $pluginConfig = null;

    /**
     * Triggered after Pico has read its configuration
     *
     * @see Pico::getConfig()
     * @see Pico::getBaseUrl()
     * @see Pico::getBaseThemeUrl()
     * @see Pico::isUrlRewritingEnabled()
     *
     * @param array &$config array of config variables
     *
     * @return void
     */
    public function onConfigLoaded(array &$config)
    {
        if (isset($config['PicoParsedownExtraPlugin'])) {
            $this->pluginConfig = $config['PicoParsedownExtraPlugin'];
        }
    }


    /**
     * Loads ParsedownExtraPlugin and use it as
     * the default markdown parser
     *
     * @see Pico::getParsedown()
     *
     * @param Parsedown &$parsedown Parsedown instance
     *
     * @return void
     */
    public function onParsedownRegistered(Parsedown &$parsedown)
    {

        $pluginPath = dirname(__FILE__);


        if (is_file($pluginPath . '/ParsedownExtraPlugin/ParsedownExtraPlugin.php')) {
            require_once $pluginPath . '/ParsedownExtraPlugin/ParsedownExtraPlugin.php';
        } else {
            die("plugins/PicoParsedownExtraPlugin/ParsedownExtraPlugin/ParsedownExtraPlugin.php not found.");
        }

        $parsedown = new ParsedownExtraPlugin();

        // Configuration
        if (isset($this->pluginConfig['element_suffix'])) {
            $parsedown->element_suffix = $this->pluginConfig['element_suffix'];
        }
        if (isset($this->pluginConfig['abbreviations'])) {
            $parsedown->abbreviations = $this->pluginConfig['abbreviations'];
        }
        if (isset($this->pluginConfig['links'])) {
            $parsedown->links = $this->pluginConfig['links'];
        }
        if (isset($this->pluginConfig['links_attr'])) {
            $parsedown->links_attr = $this->pluginConfig['links_attr'];
        }
        if (isset($this->pluginConfig['links_external_attr'])) {
            $parsedown->links_external_attr = $this->pluginConfig['links_external_attr'];
        }
        if (isset($this->pluginConfig['images_attr'])) {
            $parsedown->images_attr = $this->pluginConfig['images_attr'];
        }
        if (isset($this->pluginConfig['images_external_attr'])) {
            $parsedown->images_external_attr = $this->pluginConfig['images_external_attr'];
        }
        if (isset($this->pluginConfig['code_class'])) {
            $parsedown->code_class = $this->pluginConfig['code_class'];
        }
        if (isset($this->pluginConfig['code_text'])) {
            $parsedown->code_text = $this->pluginConfig['code_text'];
        }
        if (isset($this->pluginConfig['code_block_text'])) {
            $parsedown->code_block_text = $this->pluginConfig['code_block_text'];
        }
        if (isset($this->pluginConfig['code_block_attr_on_parent'])) {
            $parsedown->code_block_attr_on_parent = $this->pluginConfig['code_block_attr_on_parent'];
        }
        if (isset($this->pluginConfig['table_class'])) {
            $parsedown->table_class = $this->pluginConfig['table_class'];
        }
        if (isset($this->pluginConfig['table_align_class'])) {
            $parsedown->table_align_class = $this->pluginConfig['table_align_class'];
        }
        if (isset($this->pluginConfig['footnote_link_id'])) {
            $parsedown->footnote_link_id = $this->pluginConfig['footnote_link_id'];
        }
        if (isset($this->pluginConfig['footnote_back_link_id'])) {
            $parsedown->footnote_back_link_id = $this->pluginConfig['footnote_back_link_id'];
        }
        if (isset($this->pluginConfig['footnote_class'])) {
            $parsedown->footnote_class = $this->pluginConfig['footnote_class'];
        }
        if (isset($this->pluginConfig['footnote_link_class'])) {
            $parsedown->footnote_link_class = $this->pluginConfig['footnote_link_class'];
        }
        if (isset($this->pluginConfig['footnote_back_link_class'])) {
            $parsedown->footnote_back_link_class = $this->pluginConfig['footnote_back_link_class'];
        }
        if (isset($this->pluginConfig['footnote_link_text'])) {
            $parsedown->footnote_link_text = $this->pluginConfig['footnote_link_text'];
        }
        if (isset($this->pluginConfig['footnote_back_link_text'])) {
            $parsedown->footnote_back_link_text = $this->pluginConfig['footnote_back_link_text'];
        }

    }
}
