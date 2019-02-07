<?php
/**
 * Microtypographer  -  Fixes some microtypography glitches
 *
 * Heavily inspired by https://github.com/jolicode/JoliTypo
 *
 * @author  Guillaume Litaudon
 * @link    https://github.com/yomli/pico-plugins
 * @license MIT-Beerware
 * @version 1.0
 */


class Microtypographer {
	/*
	*	Version
	*/
	const MICROTYPOGRAPHER_VERSION = "1.0";


	public $tagsToSkip = 'pre|code|kbd|script|style|math';
    public $regexSkip = null;


    public $noBreakSpace = "\xC2\xA0"; // &#160;
	public $thinNoBreakSpace = "\xE2\x80\xAF"; // &#8239;
	public $ndash = '–'; // &ndash; or &#x2013;
	public $allSpaces = "\xE2\x80\xAF|\xC2\xAD|\xC2\xA0|\\s"; // All supported spaces, used in regexps. Better than \s
    public $trade = '™'; // &trade;
    public $reg = '®'; // &reg;
    public $copy = '©'; // &copy;
    public $times = '×'; // &times;
    public $minus = '−'; // &minus;
    public $ordinalSuffixes = 'st|nd|rd|th|o|er|ers|re|res|e|es|è|ere|ère|d|nd|nde|de|ds|des|me|eme|ème';
    public $abbrPrefixes = 'M|V|D|P|S|L|C';
    public $abbrSuffixes = 'me|mes|lle|lles|ve|r|rs|gr|t|te|tesse|ne|dt';
    public $validRomans = '((?=(?:I|V|X|[I|V|X|L|C|D|M]{2,}))(?=[I|V|X|L|C|D|M])M*(?:C[MD]|D?C*)(?:X[CL]|L?X*)(?:I[XV]|V?I*))';
    public $fractions = array(
                            '1/2' => '½',
                            '1/3' => '⅓',
                            '1/4' => '¼',
                            '1/5' => '⅕',
                            '1/6' => '⅙',
                            '1/7' => '⅐',
                            '1/8' => '⅛',
                            '1/9' => '⅑',
                            '2/3' => '⅔',
                            '2/5' => '⅖',
                            '3/4' => '¾',
                            '3/5' => '⅗',
                            '3/8' => '⅜',
                            '4/5' => '⅘',
                            '5/6' => '⅚',
                            '5/8' => '⅝',
                            '7/8' => '⅞');
    public $smallCapsClass = 'small-caps';

	public $ndashBetweenNumbers = 0;
	public $noSpaceBeforeComma = 0;
    public $spaceBeforeUnit = 0;
    public $trademarks = 0;
    public $mathSymbols = 0;
    public $smartFractions = 0;
    public $smartOrdinals = 0;
    public $someFrenchFixes = 0;
	public $noWidow = 0;
	public $doNothing = 0;

	public function transform($text)
    {

        $this->regexSkip = '(?s)<(?:'.$this->tagsToSkip.')[^<]*>.*?<\/(?:'.$this->tagsToSkip.')>(*SKIP)(*F)|';

        if(!$this->doNothing) {
            if($this->ndashBetweenNumbers)
                $text = $this->ndashBetweenNumbers($text);
            if($this->noSpaceBeforeComma)
                $text = $this->noSpaceBeforeComma($text);
            if($this->spaceBeforeUnit)
                $text = $this->spaceBeforeUnit($text);
            if($this->trademarks)
                $text = $this->trademarks($text);
            if($this->mathSymbols)
                $text = $this->mathSymbols($text);
            if($this->smartFractions)
                $text = $this->smartFractions($text);
            if($this->smartOrdinals)
                $text = $this->smartOrdinals($text);
            if($this->someFrenchFixes)
                $text = $this->someFrenchFixes($text);
            if($this->noWidow)
                $text = $this->noWidow($text);
        }

        return $text;
    }



	/**
     * Replace the simple - by a ndash between numbers (dates ranges...)
     * See https://en.wikipedia.org/wiki/Dash#En_dash
     * Adapted from https://github.com/jolicode/JoliTypo/
     *
     * @param string $text
     *
     * @return string $text
     */
	public function ndashBetweenNumbers($text)
    {
        $text = preg_replace('@'.$this->regexSkip.'(?<=[0-9 ]|^)-(?=[0-9 ]|$)@', $this->ndash, $text);
        return $text;
    }

	/**
     * No space before comma ,
     * Adapted from https://github.com/jolicode/JoliTypo/
     *
     * @param string $text
     *
     * @return string $text
     */
    public function noSpaceBeforeComma($text)
    {
    	$text = preg_replace('@'.$this->regexSkip.'([^\d\s]+)['.$this->allSpaces.']*(,)['.$this->allSpaces.']*@mu', '$1$2 ', $text);
    	return $text;
    }

    /**
     * Adds a nobreak space before an unit
     * Adapted from https://github.com/jolicode/JoliTypo/
     *
     * @param string $text
     *
     * @return string $text
     */
    public function spaceBeforeUnit($text)
    {
    	$text = preg_replace('@'.$this->regexSkip.'([\dº])('.$this->allSpaces.')+([º°%Ω฿₵¢₡$₫֏€ƒ₲₴₭£₤₺₦₨₱៛₹$₪৳₸₮₩¥µ]|(\w(\s|\.|,|;|!|\?))|[\dº]{1})@', '$1'.$this->noBreakSpace.'$3', $text);
    	return $text;
    }

    /**
     * Converts (c) (tm) and (r) to ASCII equivalents
     * Adapted from https://github.com/jolicode/JoliTypo/
     *
     * @param string $text
     *
     * @return string $text
     */
    public function trademarks($text)
    {
    	$text = preg_replace('@'.$this->regexSkip.'\(tm\)@i', $this->trade, $text);
        $text = preg_replace('@'.$this->regexSkip.'\(c\)['.$this->allSpaces.']([0-9]+)@i', $this->copy.$this->noBreakSpace.'$1', $text);
        $text = preg_replace('@'.$this->regexSkip.'\(c\)@i', $this->copy, $text);
        $text = preg_replace('@'.$this->regexSkip.'\(r\)@i', $this->reg, $text);
    	return $text;
    }

    /**
     * Replace x and - symbols in a mathematical context
     * Adapted from https://github.com/jolicode/JoliTypo/
     *
     * @param string $text
     *
     * @return string $text
     */
    public function mathSymbols($text)
    {
        $text = preg_replace('@'.$this->regexSkip.'(\d+["\']?)('.$this->allSpaces.')?x('.$this->allSpaces.')?(?=\d)@', '$1$2'.$this->times.'$2', $text);
    	$text = preg_replace('@'.$this->regexSkip.'(\d+["\']?)('.$this->allSpaces.')?-('.$this->allSpaces.')?(?=\d)@', '$1$2'.$this->minus.'$2', $text);
    	return $text;
    }

	/**
     * Replaces the space between the last two words in a string with &nbsp;
     * Adapted from https://github.com/mrockwood/Pico-Typogrify-Plugin/
     *
     * @param string $text
     *
     * @return string $text
     */
    public function noWidow($text)
    {
    	$text = preg_replace('@'.$this->regexSkip.'([^\s])\s+(((<(a|span|i|b|em|strong|acronym|caps|sub|sup|abbr|big|small|code|cite|tt)[^>]*>)*\s*[^\s<>]+)(<\/(a|span|i|b|em|strong|acronym|caps|sub|sup|abbr|big|small|code|cite|tt)>)*[^\s<>]*\s*(<\/(p|h[1-6]|li)>|$))@', '$1'.$this->noBreakSpace.'$2', $text);
        return $text;
    }


    /**
     * Converts fractions like 1/2 into their UTF-8 equivalents ½
     *
     * @param string $text
     *
     * @return string $text
     */
    public function smartFractions($text)
    {
        foreach ($this->fractions as $key => $value) {
            $numerator = explode('/', $key)[0];
            $denominator = explode('/', $key)[1];
            $text = preg_replace('@'.$this->regexSkip.'(?<![\/\d])('.$numerator.')\/('.$denominator.')(?![\/\d])@', $value, $text);
        }
        return $text;
    }


    /**
     * Converts ordinals
     * Adapted from https://github.com/mundschenk-at/php-typography/ 
     *
     * @param string $text
     *
     * @return string $text
     */
    public function smartOrdinals($text)
    {
        // Arabic numerals
        $text = preg_replace('@'.$this->regexSkip.'\b(\d+)('.$this->ordinalSuffixes.')(?=\s|\.|,|;|!|\?)@', '$1<sup>$2</sup>', $text);

        // Roman numerals
        $text = preg_replace('@'.$this->regexSkip.'\b'.$this->validRomans.'('.$this->ordinalSuffixes.')(?=\s|\.|,|;|!|\?)@', '$1<sup>$2</sup>', $text);
        
        return $text;
    }

    
    /**
     * Some French fixes
     *
     * @param string $text
     *
     * @return string $text
     */
    public function someFrenchFixes($text)
    {
        // n° -> n<sup>o</sup>
        $text = preg_replace('@'.$this->regexSkip.'\b(?:n°)(?:\s*)(\d+)@', 'n<sup>o</sup>'.$this->thinNoBreakSpace.'$1', $text);

        // Mme -> M<sup>me</sup> and others
        $text = preg_replace('@'.$this->regexSkip.'\b('.$this->abbrPrefixes.')('.$this->abbrSuffixes.')(?:\s*)\b@', '$1<sup>$2</sup>'.$this->noBreakSpace, $text);

        // etc.
        $text = preg_replace('@'.$this->regexSkip.'(\s)(etc.)@', $this->noBreakSpace.'etc.', $text);

        // p. 10
        $text = preg_replace('@'.$this->regexSkip.'\b(p.|pp.)(\s*)(\d+)@', '$1'.$this->noBreakSpace.'$3', $text);

        // XXe siècle -> <span class="small-caps">XX</span><sup>e</sup>&nbsp;siècle
        // Ier siècle -> <span class="small-caps">I</span><sup>er</sup>&nbsp;siècle
        // Aux Ier, XIIe et XIIIe siècles -> Aux <span class="small-caps">I</span><sup>er</sup>, <span class="small-caps">XII</span><sup>e</sup> et XIIIe siècle
        // Advice : add this helper in CSS .small-caps { text-transform:lowercase; font-variant:small-caps; }
        $text = preg_replace('@'.$this->regexSkip.'\b'.$this->validRomans.'(e|<sup>e<\/sup>)(?:\s*)(siècle|siècles)\b@', '<span class="'.$this->smallCapsClass.'">$1</span><sup>e</sup>&nbsp;$3', $text);
        $text = preg_replace('@'.$this->regexSkip.'\b(I{1})(er|<sup>er<\/sup>)(?:\s*)(siècle)\b@', '<span class="'.$this->smallCapsClass.'">$1</span><sup>er</sup>&nbsp;$3', $text);

        // Not fully working regex for some advanced siècles
        /*$text = preg_replace('@\b'.$this->validRomans.'(e|<sup>e<\/sup>)(?:\set|,|\set\sle)(?:\s)(?:<span class="small-caps">)*'.$this->validRomans.'(?:<\/span>)*(?:e|<sup>e<\/sup>)(?:(?=\ssiècles|\ssiècle)|(?:\set|,|\set\sle))\b@', '<span class="small-caps">$1</span><sup>e</sup>', $text);
        $text = preg_replace('@\b(I{1})(er|<sup>er</sup>)(?:\set|,|\set\sle)(?:\s)(?:<span class="small-caps">*)'.$this->validRomans.'(?:<\/span>*)(?:e|<sup>e</sup>)(?:(?=\ssiècles|\ssiècle)|(?:\set|,|\set\sle))\b@', '<span class="small-caps">$1</span><sup>er</sup>', $text);*/

        return $text;
    }

    
}
