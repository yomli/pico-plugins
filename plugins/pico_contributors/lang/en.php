<?php
/**
 * lang.en.php   English (default) translations for Pico Contributors Plugin
 *
 * To add a label:
 * 1. add it here
 * 2. define it in the inline javaScript inside contribute.html
 *
 * @note    Labels are parsed in the order as listed, therefor ensure having labels which add something to another,
 *          otherwise identical, label to be listed before that other label.
 *          Ex: 'label.something.more' must be listed before 'label.something' for both labels to be correctly translated.
 * @note    There's no fallback handling for missing labels, if a translation file is found for a language, it is used
 *          for translating ALL labels, without caring about its completeness.
 */
$translations = array(
	'global'             		=> 'en',
	'assets.delete'             => 'Delete',
	'assets.download'           => 'Download',
	'assets.meta'               => 'Edit title and description',
	'assets.mkdir'              => 'Create new directory',
	'assets.rename'             => 'Rename',
	'assets.root'               => 'Go back to root directory',
	'assets.manager'			=> 'Assets',
	'current-file.rename'       => 'Click to rename the file',
	'description'               => 'Description',
	'directory.create.prompt'   => 'Create directory:',
	'directory.delete.confirm'  => 'Are you sure you want to delete the directory: "<fileFolderName>" and all contained files?',
	'directory.rename.prompt'   => 'Rename directory to:',
	'done'                      => 'Done',
	'error.check.perms'			=> 'Error (check file permissions) - create directory failed at: ',
	'error.config.missing'		=> 'Fatal error: contributors_config.php missing.',
	'error.dir.failed'			=> 'Error: Failed creating directory: ',
	'error.filesize.limit'		=> 'Exceeded filesize limit.',
	'error.invalid.content'		=> 'Error: Invalid content',
	'error.invalid.file'		=> 'Error: Invalid file: ',
	'error.invalid.filename'	=> 'Error: Invalid filename',
	'error.invalid.format'		=> 'Invalid file format.',
	'error.invalid.params'		=> 'Invalid parameters.',
	'error.invalid.password'	=> 'Invalid password.',
	'error.move.failed'			=> 'Failed to move uploaded file.',
	'error.no.file'				=> 'No file sent.',
	'error.no.password'			=> 'No password set.',
	'error.post.exists'			=> 'Error: A post already exists with this title',
	'error.file.ext'			=> 'Error - Changing file extension is not allowed.',
	'error.unknown'				=> 'Unknown error.',
	'file.delete.confirm'       => 'Are you sure you want to delete the file: "<fileFolderName>"?',
	'file.rename.prompt'        => 'Rename file to:',
	'guided-tour'               => 'Displays a guided tour of the user interface of this contributor backend',
	'intro.assets'              => 'From here, image files can be uploaded and organized:<br />previewed, renamed, deleted.<br />Inserting an image into the currently loaded post is done by clicking on an image\'s filename.',
	'intro.controls'            => 'These options create, load and save posts (pages), here in the editor and in the actual website.<br />The section also includes options for this info and to log-out from the administration backend.<br /><br />Hint: all buttons in this interface display an information bubble when the mouse pointer stays above them without motion.',
	'intro.editor'              => 'Over here, posts are edited. Using the above buttons, styles can be applied to the text and elements like images, tables, hyperlinks, etc. can be inserted into the text.<br />Posts begin with a comment which contains meta-attributes, like the post title, date, author and a sorting number ("Placing"). When any of these is changed the tree should be reloaded (by pressing CTRL+R or the refresh button in the top-left control options).<br /><br />The post format is Markdown, wich is a very common markup language. You can learn how to use it by <a href="https://daringfireball.net/projects/markdown/syntax" title="Markdown syntax" target="_blank">reading its syntax</a>.',
	'intro.navigation'          => 'From this tree a post can be loaded (by clicking the title) for editing. Posts can also be previewed in the website or be deleted (using the options which are displayed when the mouse pointer hovers a post item). The tree also shows the sorting and hierarchy of pages in the navigation.',
	'login.password'            => 'Password',
	'login.title'               => 'Contributors Login',
	'login.username'            => 'Username',
	'login.welcome'             => 'Welcome. Feel free to contribute!',
	'logout'                    => 'Logout from the backend',
	'login'						=> 'Login',
	'menu'						=> 'Menu',
	'meta.description.prompt'   => 'Description:',
	'meta.title.prompt'         => 'Title:',
	'next'                      => 'Next',
	'pages'						=> 'Pages',
	'post.delete.confirm'       => 'Are you sure you want to delete the post: "<postName>" (filename: "<filename>")?',
	'post.delete'               => 'Delete this post',
	'post.new.prompt'           => 'Enter a post title.\\nYou can create sub folders by entering a path before the title.',
	'post.new'                  => 'Create new post',
	'post.refresh-tree'         => 'Refresh the posts tree',
	'post.rename'               => 'Rename the file of this post',
	'post.save'                 => 'Save current post',
	'post.view.current'         => 'View current post in the actual website',
	'post.view'                 => 'View this post in the actual website',
	'preview.inline'            => 'Preview in the aFdministration backend',
	'prev'                      => 'Back',
	'return.home'				=> 'Return to website',
	'rte.bold'                  => 'Bold',
	'rte.heading'               => 'Headline',
	'rte.italic'                => 'Italic',
	'rte.link'                  => 'Hyperlink',
	'rte.list.bullets'          => 'List with bullet points',
	'rte.list.numbered'         => 'Numbered list',
	'rte.picture'               => 'Picture',
	'rte.quotation'             => 'Quotation',
	'rte.strikethrough'         => 'Strikethrough',
	'rte.table-insert'			=> '| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |\n',
	'rte.url'					=> 'Enter url:',
	'rte.text'					=> 'Enter some text:',
	'rte.table'                 => 'Table',
	'rte.code'                 	=> 'Code',
	'rte.line'                 	=> 'Horizontal rule',
	'rte.title'					=> 'Enter a title:',
	'saved'                     => 'Saved',
	'save'						=> 'Save',
	'saving'                    => 'Saving',
	'skip'                      => 'Skip',
	'title'                     => 'Title',
	'uploading'					=> 'Uploading',
	'upload'					=> 'Upload',
	'toggle.preview'			=> 'Toggle preview',
	'warning.meta.data'			=> 'Meta-data, please do not delete this part. It will not be displayed.',
	'warning.post.none-loaded'  => 'No post loaded',
);

?>