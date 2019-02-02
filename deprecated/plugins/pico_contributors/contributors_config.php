<?php

global $pico_contributors_passwords;
global $pico_contributors_devMode;

/**
 * If true, merge CSS files and JS files
 * on every request
 */
$pico_contributors_devMode = false; 

/* 
 * Here you can manage your several contributors.
 * 
 * This should be a sha256 hash of their passwords.
 * Use a tool like http://www.sha1-online.com to generate them.
 * 
 * On GNU/Linux: $ echo -n password | sha256sum
 * On OS X (BSD): $ echo -n password | shasum -a 256
 * 
 * If your contributors don't trust you, they can send you the hash
 * instead of their password.
 */
$pico_contributors_passwords['username'] 		= '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
$pico_contributors_passwords['username2'] 		= '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4';

?>