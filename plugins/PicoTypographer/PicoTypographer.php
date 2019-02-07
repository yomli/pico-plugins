<?php
/**
 * PicoTypographer - Typography enhancements
 *
 * Loads ParsedownExtraPlugin
 * https://github.com/tovic/parsedown-extra-plugin
 *
 * @author  Guillaume Litaudon
 * @link    https://github.com/yomli/pico-plugins
 * @license MIT-Beerware
 * @version 1.1.6
 */

class PicoTypographer extends AbstractPicoPlugin
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
        if (isset($config['PicoTypographer'])) {
            $this->pluginConfig = $config['PicoTypographer'];
        }
    }

    /**
     * Triggered after Pico has parsed the contents of the file to serve
     *
     * @see    Pico::getFileContent()
     * @param  string &$content parsed contents
     * @return void
     */
    public function onContentParsed(&$content)
    {
        require_once 'SmartyPantsTypographer/SmartyPantsTypographer.inc.php';
        require_once 'Microtypographer/Microtypographer.php';

        $output = $content;

        // SmartyPantsTypographer
        $smartyConfig = $this->pluginConfig['SmartyPantsTypographer'];
        if (isset($smartyConfig['preset'])) {
            $typographer = new SmartyPantsTypographer($smartyConfig['preset']);
        } else {
            $typographer = new SmartyPantsTypographer("2");
        }

        if (isset($smartyConfig['tags_to_skip'])) {
            $typographer->tags_to_skip=$smartyConfig['tags_to_skip'];
        }
        if (isset($smartyConfig['do_nothing'])) {
            $typographer->do_nothing=$smartyConfig['do_nothing'];
        }
        if (isset($smartyConfig['do_quotes'])) {
            $typographer->do_quotes=$smartyConfig['do_quotes'];
        }
        if (isset($smartyConfig['do_backticks'])) {
            $typographer->do_backticks=$smartyConfig['do_backticks'];
        }
        if (isset($smartyConfig['do_dashes'])) {
            $typographer->do_dashes=$smartyConfig['do_dashes'];
        }
        if (isset($smartyConfig['do_ellipses'])) {
            $typographer->do_ellipses=$smartyConfig['do_ellipses'];
        }
        if (isset($smartyConfig['do_stupefy'])) {
            $typographer->do_stupefy=$smartyConfig['do_stupefy'];
        }
        if (isset($smartyConfig['convert_quot'])) {
            $typographer->convert_quot=$smartyConfig['convert_quot'];
        }
        if (isset($smartyConfig['smart_doublequote_open'])) {
            $typographer->smart_doublequote_open=$smartyConfig['smart_doublequote_open'];
        }
        if (isset($smartyConfig['smart_doublequote_close'])) {
            $typographer->smart_doublequote_close=$smartyConfig['smart_doublequote_close'];
        }
        if (isset($smartyConfig['smart_singlequote_open'])) {
            $typographer->smart_singlequote_open=$smartyConfig['smart_singlequote_open'];
        }
        if (isset($smartyConfig['smart_singlequote_close'])) {
            $typographer->smart_singlequote_close=$smartyConfig['smart_singlequote_close'];
        }
        if (isset($smartyConfig['backtick_doublequote_open'])) {
            $typographer->backtick_doublequote_open=$smartyConfig['backtick_doublequote_open'];
        }
        if (isset($smartyConfig['backtick_doublequote_close'])) {
            $typographer->backtick_doublequote_close=$smartyConfig['backtick_doublequote_close'];
        }
        if (isset($smartyConfig['backtick_singlequote_open'])) {
            $typographer->backtick_singlequote_open=$smartyConfig['backtick_singlequote_open'];
        }
        if (isset($smartyConfig['backtick_singlequote_close'])) {
            $typographer->backtick_singlequote_close=$smartyConfig['backtick_singlequote_close'];
        }
        if (isset($smartyConfig['em_dash'])) {
            $typographer->em_dash=$smartyConfig['em_dash'];
        }
        if (isset($smartyConfig['en_dash'])) {
            $typographer->en_dash=$smartyConfig['en_dash'];
        }
        if (isset($smartyConfig['ellipsis'])) {
            $typographer->ellipsis=$smartyConfig['ellipsis'];
        }
        if (isset($smartyConfig['do_comma_quotes'])) {
            $typographer->do_comma_quotes=$smartyConfig['do_comma_quotes'];
        }
        if (isset($smartyConfig['do_guillemets'])) {
            $typographer->do_guillemets=$smartyConfig['do_guillemets'];
        }
        if (isset($smartyConfig['do_geresh_gershayim'])) {
            $typographer->do_geresh_gershayim=$smartyConfig['do_geresh_gershayim'];
        }
        if (isset($smartyConfig['do_space_colon'])) {
            $typographer->do_space_colon=$smartyConfig['do_space_colon'];
        }
        if (isset($smartyConfig['do_space_semicolon'])) {
            $typographer->do_space_semicolon=$smartyConfig['do_space_semicolon'];
        }
        if (isset($smartyConfig['do_space_marks'])) {
            $typographer->do_space_marks=$smartyConfig['do_space_marks'];
        }
        if (isset($smartyConfig['do_space_emdash'])) {
            $typographer->do_space_emdash=$smartyConfig['do_space_emdash'];
        }
        if (isset($smartyConfig['do_space_endash'])) {
            $typographer->do_space_endash=$smartyConfig['do_space_endash'];
        }
        if (isset($smartyConfig['do_space_frenchquote'])) {
            $typographer->do_space_frenchquote=$smartyConfig['do_space_frenchquote'];
        }
        if (isset($smartyConfig['do_space_thousand'])) {
            $typographer->do_space_thousand=$smartyConfig['do_space_thousand'];
        }
        if (isset($smartyConfig['do_space_unit'])) {
            $typographer->do_space_unit=$smartyConfig['do_space_unit'];
        }
        if (isset($smartyConfig['doublequote_low'])) {
            $typographer->doublequote_low=$smartyConfig['doublequote_low'];
        }
        if (isset($smartyConfig['guillemet_leftpointing'])) {
            $typographer->guillemet_leftpointing=$smartyConfig['guillemet_leftpointing'];
        }
        if (isset($smartyConfig['guillemet_rightpointing'])) {
            $typographer->guillemet_rightpointing=$smartyConfig['guillemet_rightpointing'];
        }
        if (isset($smartyConfig['geresh'])) {
            $typographer->geresh=$smartyConfig['geresh'];
        }
        if (isset($smartyConfig['gershayim'])) {
            $typographer->gershayim=$smartyConfig['gershayim'];
        }
        if (isset($smartyConfig['space_emdash'])) {
            $typographer->space_emdash=$smartyConfig['space_emdash'];
        }
        if (isset($smartyConfig['space_endash'])) {
            $typographer->space_endash=$smartyConfig['space_endash'];
        }
        if (isset($smartyConfig['space_colon'])) {
            $typographer->space_colon=$smartyConfig['space_colon'];
        }
        if (isset($smartyConfig['space_semicolon'])) {
            $typographer->space_semicolon=$smartyConfig['space_semicolon'];
        }
        if (isset($smartyConfig['space_marks'])) {
            $typographer->space_marks=$smartyConfig['space_marks'];
        }
        if (isset($smartyConfig['space_frenchquote'])) {
            $typographer->space_frenchquote=$smartyConfig['space_frenchquote'];
        }
        if (isset($smartyConfig['space_thousand'])) {
            $typographer->space_thousand=$smartyConfig['space_thousand'];
        }
        if (isset($smartyConfig['space_unit'])) {
            $typographer->space_unit=$smartyConfig['space_unit'];
        }
        if (isset($smartyConfig['space'])) {
            $typographer->space=$smartyConfig['space'];
        }

        $output = $typographer->transform($output);


        // Microtypographer
        $typographer = new Microtypographer();

        $microConfig = $this->pluginConfig['Microtypographer'];
        if (isset($microConfig['tagsToSkip'])) {
            $typographer->tagsToSkip = $microConfig['tagsToSkip'];
        }
        if (isset($microConfig['ndashBetweenNumbers'])) {
            $typographer->ndashBetweenNumbers = $microConfig['ndashBetweenNumbers'];
        }
        if (isset($microConfig['noSpaceBeforeComma'])) {
            $typographer->noSpaceBeforeComma = $microConfig['noSpaceBeforeComma'];
        }
        if (isset($microConfig['spaceBeforeUnit'])) {
            $typographer->spaceBeforeUnit = $microConfig['spaceBeforeUnit'];
        }
        if (isset($microConfig['trademarks'])) {
            $typographer->trademarks = $microConfig['trademarks'];
        }
        if (isset($microConfig['mathSymbols'])) {
            $typographer->mathSymbols = $microConfig['mathSymbols'];
        }
        if (isset($microConfig['smartFractions'])) {
            $typographer->smartFractions = $microConfig['smartFractions'];
        }
        if (isset($microConfig['smartOrdinals'])) {
            $typographer->smartOrdinals = $microConfig['smartOrdinals'];
        }
        if (isset($microConfig['someFrenchFixes'])) {
            $typographer->someFrenchFixes = $microConfig['someFrenchFixes'];
        }
        if (isset($microConfig['noWidow'])) {
            $typographer->noWidow = $microConfig['noWidow'];
        }
        if (isset($microConfig['doNothing'])) {
            $typographer->doNothing = $microConfig['doNothing'];
        }
        if (isset($microConfig['smallCapsClass'])) {
            $typographer->smallCapsClass = $microConfig['smallCapsClass'];
        }


        $output = $typographer->transform($output);

        $content = $output;
    }

}


