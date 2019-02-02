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
class Pico_Administrators_Helper_Files {

	/**
	 * @param   string  $file_url
	 * @return  mixed|string
	 */
	public static function getFilePath($basePath, $file_url)
	{
		$pathFile = str_replace(
			array(
				Pico_Administrators_Helper_Server::getProtocol() . '://',

				  $_SERVER[ 'SERVER_NAME' ]
				. ( $_SERVER[ 'SERVER_PORT' ] != '80' ? ":" . $_SERVER[ 'SERVER_PORT' ] : '' )
				. Pico_Administrators_Helper_Server::getUrlBaseSuffix()
			),
			'',
			dirname(strip_tags($file_url))
		);

		if( !empty( $pathFile ) ) {
			$pathFile .= '/';
		}

		return $pathFile;
	}

	/**
	 * @param   String $pathFile
	 * @return  String
	 */
	public static function getFileExtension($pathFile)
	{
		return substr($pathFile, strrpos($pathFile, '.') + 1);
	}

	/**
	 * @param   String  $pathFile
	 * @param   String  $filename
	 */
	public static function download($pathFile, $filename)
	{
		$mimetype = Pico_Administrators_Helper_Files::getFileMimetype($pathFile);
		header('Content-Type: ' . $mimetype);
		header('Content-Disposition: attachment; filename="' . $filename . '"');

		die( file_get_contents($pathFile) );
	}

	/**
	 * Returns the mimetype of a given file
	 * @param  String 	$pathFile 	absolute server path
	 * @return string 	$output 	mimetype
	 */
	public static function getFileMimetype($pathFile)
	{
		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$output = finfo_file($finfo, $pathFile);
		finfo_close($finfo);
		return $output;
	}

}
?>