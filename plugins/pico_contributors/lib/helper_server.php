<?php

/**
 * Pico Contributors plugin for Pico CMS
 *
 * Based on Pico Admin plugin
 * by Kay Stenschke
 * 
 * @author Guillaume Litaudon
 * @link http://www.guillaumelitaudon.fr/
 * @version 1.2.0
 */

/**
 * Class Pico_Contributors_Helper_Strings
 *
 * Helper for server (URL, paths, etc.)
 */
class Pico_Contributors_Helper_Server {

	/**
	 * @return  String  http or https
	 */
	public static function getProtocol() {
		return 'http' . ( array_key_exists('HTTPS', $_SERVER) && $_SERVER[ 'HTTPS' ] == 'on' ? 's' : '' );
	}

	/**
	 * @param   bool    $removeContribute    remove '/contribute#' and '/contribute' ?
	 * @return  string
	 */
	public static function getCurrentUrl($removeContribute = false)
	{
		$url = self::getProtocol() . '://'
			. $_SERVER[ 'SERVER_NAME' ]
			. ( $_SERVER[ 'SERVER_PORT' ] != '80' ? ':' . $_SERVER[ 'SERVER_PORT' ] : '' )
			. $_SERVER[ 'REQUEST_URI' ];

		return $removeContribute ? str_replace(array('/contribute#', '/contribute'), '', $url) : $url;
	}

	/**
	 * @return  String  additional directories in path of base-URL (eg. 'p123')
	 */
	public static function getUrlBaseSuffix()
	{
		return substr($_SERVER[ 'REQUEST_URI' ], 0, strpos($_SERVER[ 'REQUEST_URI' ], '/contribute/'));
	}

	/**
	 * @return  string
	 */
	public static function getUrlRoot($basePath) {
		return
			self::getProtocol()
			. '://' . $_SERVER[ 'SERVER_NAME' ]
			. ( $_SERVER[ 'SERVER_PORT' ] != '80' ? ":" . $_SERVER[ 'SERVER_PORT' ] : '' )
			. '/'
			.  (Pico_Contributors_Helper_Strings::endsWith($basePath, '/')
				? substr($basePath, 0, strlen($basePath) - 1)
				: $basePath
			);
	}

	/**
	 * Get file size limit for an upload
	 * @return int 		max size limit
	 */
	public static function getMaxFileUpload() {
    	$max_upload = Pico_Contributors_Helper_Strings::returnBytes(ini_get('upload_max_filesize'));
    	$max_post = Pico_Contributors_Helper_Strings::returnBytes(ini_get('post_max_size'));
    	$memory_limit = Pico_Contributors_Helper_Strings::returnBytes(ini_get('memory_limit'));
    	return min($max_upload, $max_post, $memory_limit);
	}

}
?>