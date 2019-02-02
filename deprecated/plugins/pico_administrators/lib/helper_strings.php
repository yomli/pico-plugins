<?php

/**
 * Pico Administrators plugin for Pico CMS
 *
 * Based on Pico Admin plugin
 * by Kay Stenschke
 * 
 * @author Guillaume Litaudon
 * @link http://www.guillaumelitaudon.fr/
 * @version 1.2.0
 */

/**
 * Class Pico_Administrators_Helper_Strings
 *
 * Helper for strings (format, convert, validate, etc.)
 */
class Pico_Administrators_Helper_Strings {

	/**
	 * @param   string          $text
	 * @return  mixed|string
	 */
	public static function slugify($text)
	{
		// replace non letter or digits by -
		$text = preg_replace('~[^\\pL\d]+~u', '-', $text);

		// trim
		$text = trim($text, '-');

		// transliterate
		$text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

		// lowercase
		$text = strtolower($text);

		// remove unwanted characters
		$text = preg_replace('~[^-\w]+~', '', $text);

		return empty($text) ? 'n-a' : $text;
	}

	/**
	 * Detect client locale and translate (if resp. language is available, otherwise fallback to english)
	 *
	 * @param   String  $html
	 * @return  String
	 */
	public static function translate($html)
	{
		$locale = Locale::acceptFromHttp($_SERVER[ 'HTTP_ACCEPT_LANGUAGE' ]);
		$localeKey = substr($locale, 0, 2);

		$translationFile = dirname(__FILE__) .'/../lang/' . $localeKey . '.php';
		if( ! file_exists($translationFile)) {
			$translationFile = dirname(__FILE__) .'/../lang/en.php';
		}
		include($translationFile); // defines $translations as associative array of translation keys and labels
		/** @var $translations array */
		foreach($translations as $key => $label) {
			$html = str_replace('lang.' . $key, $label, $html);
		}

		return $html;
	}

	/**
	 * @param   string      $haystack
	 * @param   string      $needle
	 * @return  boolean     Given string ends w/ given needle?
	 */
	public static function endsWith($haystack, $needle)
	{
		return $needle === '' || substr($haystack, -strlen($needle)) === $needle;
	}

	/**
	 * @param   int     $bytes
	 * @param   int     $precision
	 * @return  string
	 */
	public static function formatBytes($bytes, $precision = 2)
	{
		$units = array('B', 'KB', 'MB', 'GB', 'TB');
		$bytes = max($bytes, 0);
		$pow = floor(( $bytes ? log($bytes) : 0 ) / log(1024));
		$pow = min($pow, count($units) - 1);

		$bytes /= pow(1024, $pow);

		return round($bytes, $precision) . ' ' . $units[ $pow ];
	}


	/**
	 * Return a number of bytes from values of php ini file
	 * eg. 5m -> 5242880
	 * @param  string $iniNumber value of php ini file
	 * @return int            number of bytes
	 */
	public static function returnBytes($iniNumber)
	{
		if(is_numeric($iniNumber)){
			return $iniNumber;
		}
		
		$iniNumber = trim($iniNumber);
		$lastChar = $iniNumber[strlen($iniNumber)-1];
		switch(strtoupper($lastChar)) 
		{
			case 'P': // Wow, you're a web hosting giant!
				$iniNumber *= 1024;
			case 'T': // Do you really need this?
				$iniNumber *= 1024;
			case 'G':
				$iniNumber *= 1024;
			case 'M':
				$iniNumber *= 1024;
			case 'K':
				$iniNumber *= 1024;
				break;
		}
		return $iniNumber;
	}


}
?>