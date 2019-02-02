/**
 * Pico Administrators plugin for Pico CMS
 *
 * Based on Admin.js in Parvula CMS
 * by Fabien Sa and
 * pico_admin.js by Kay Stenschke
 * 
 * @author Guillaume Litaudon
 * @link http://www.guillaumelitaudon.fr/
 * @version 1.2.0
 */

var PicoAdministrators = {

	baseUrl: null,
	openPost: null,
	labels: null,

	elm : {
			previewEl	 	: $('#preview .inner'),
			menuEl 			: $('#menu'),
			headerEl 		: $('header'),
			toggleMenu		: $('.toggleMenu'),
			toggleAssets 	: $('.toggleAssets'),
			editorEl	 	: $('#editor'),
			saving			: $('#saving'),
			uploading		: $('#uploading'),
			pages 			: $('#menu .pages'),
			togglePreview 	: $('.togglePreview'),
			assetsEl		: $('#assetsmanager')
	},


	init: function(baseUrl, dataUrl, openPost, labels) {
		PicoAdministrators.baseUrl = baseUrl;
		PicoAdministrators.openPost = openPost;
		PicoAdministrators.labels = labels;

		PicoAdministrators.Editor.init();
		PicoAdministrators.Menu.init("-30%");
		PicoAdministrators.Assets.init(dataUrl, "2.5em");
	},

	Editor: {

		editor: null,

		init: function() {

			PicoAdministrators.Editor.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
					lineWrapping: true,
					mode: "markdown",
					viewportMargin: Infinity
			});

			// Ctrl+S to save post
			PicoAdministrators.Editor.editor.setOption("extraKeys", {
				'Ctrl-S': function(cm) {
					$('.save')[0].click();
				}
			});

			// If we open a post
			if(PicoAdministrators.openPost)
				PicoAdministrators.Editor.loadPost(PicoAdministrators.openPost);

			// Refresh preview
			PicoAdministrators.Editor.editor.on('keyup', function() {
				PicoAdministrators.Editor.refreshPreview();
			});

			// Hide menu
			PicoAdministrators.Editor.editor.on('focus', function() {
				PicoAdministrators.elm.toggleMenu.removeClass("active").find(".anim").removeClass("rotate");
				PicoAdministrators.elm.menuEl.animate({ left: "-30%" });
			}); 

			// Hide assets
			PicoAdministrators.Editor.editor.on('focus', function() {
				PicoAdministrators.elm.toggleAssets.removeClass("active").find(".anim").removeClass("rotate");
				PicoAdministrators.elm.assetsEl.animate({ top: "-100%" });
			}); 

			// Toggle preview on/off
			PicoAdministrators.elm.togglePreview.on('click', function(e) {
				if($(this).hasClass("fa-toggle-off")) {
					$(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
					$('#preview').css({ "width": "100%", "max-width": "100%"});
					$('.CodeMirror').css({ width: 0});
				} else if($(this).hasClass("fa-toggle-on")){
					$(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
					$('#preview').css({ width: 0});
					$('.CodeMirror').css({ width: "100%"});
				}
			});

			// On change wich is not save, we set a notification
			PicoAdministrators.Editor.editor.on('change', function(e){
				$('.save').addClass('modified');
			});

			PicoAdministrators.Editor.addIntroAttributes();
			PicoAdministrators.Editor.Controls.init();
		},

		/**
		 * Inserts someText into the editor
		 * @param  String	 someText
		 */
		insert: function(someText) {
			PicoAdministrators.Editor.editor.replaceSelection(someText, "end");
			PicoAdministrators.Editor.refreshPreview();
		},

		/**
		 * Refresh the preview
		 */
		refreshPreview: function() {
			var content = PicoAdministrators.Editor.editor.getValue();
			// We don't want to preview the meta-data
			content = content.replace(/\/\*[\s\S]+?\*\//, "");
			PicoAdministrators.elm.previewEl.html(marked(content));
		},

		/**
		 * Loads the post in the editor
		 * @param  String fileUrl
		 */
		loadPost: function(fileUrl) {
			if(typeof fileUrl != "undefined"){
				$('#menu .post').removeClass('open');
				$('a[data-url="' + fileUrl + '"]').addClass('open');

				$.post('administrate/open', {file: fileUrl}, function(data) {
					PicoAdministrators.elm.editorEl.data('currentFile', fileUrl);
					PicoAdministrators.Editor.editor.setValue(data);
					$('.save').removeClass('modified');
					PicoAdministrators.Editor.refreshPreview();
				});
			}
		},

		/**
		 * Adds the introJS attributes
		 */
		addIntroAttributes : function(){
			var theEditor = $('.CodeMirror');
			theEditor.attr('data-intro', PicoAdministrators.labels.introEditor);
			theEditor.attr('data-step', 3);
			theEditor.attr('data-position', 'right');
			theEditor.attr('data-tooltipClass', 'widest');
		},

		Controls: {
			init: function(){

				// Heading
				$('.rte.title').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					PicoAdministrators.Editor.insert('## ' + text);
				});

				// Bold
				$('.rte.bold').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					PicoAdministrators.Editor.insert('**' + text + '**');
				});

				// Italic
				$('.rte.italic').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					PicoAdministrators.Editor.insert('_' + text + '_');
				});

				// Strikethrough
				$('.rte.strike').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					PicoAdministrators.Editor.insert('~~' + text + '~~');
				});

				// Link
				$('.rte.link').on('click', function(e){
					e.preventDefault();
					var url = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.url);
					var text = prompt(PicoAdministrators.labels.rte.text, '');
					var title = prompt(PicoAdministrators.labels.rte.title, '');
					PicoAdministrators.Editor.insert('[' + text + '](' + url + ' "' + title + '")');
				});

				// Picture
				$('.rte.picture').on('click', function(e){
					e.preventDefault();
					var url = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.url);
					var text = prompt(PicoAdministrators.labels.rte.text, '');
					var title = prompt(PicoAdministrators.labels.rte.title, '');
					PicoAdministrators.Editor.insert('![' + text + '](' + url + ' "' + title + '")');
				});

				// Blockquote
				$('.rte.blockquote').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += '> ' + tmp[i] + '\n';
						}
					}
					PicoAdministrators.Editor.insert('> ' + text);
				});

				// Code
				$('.rte.code').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = '';
						for(i = 0; i < tmp.length; i++) {
							text += '\t' + tmp[i] + '\n';
						}
						PicoAdministrators.Editor.insert('```\n' + text + '\n```');
					} else {
						PicoAdministrators.Editor.insert('`' + text + '`');
					}	
				});

				// Bullets list
				$('.rte.ul').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += '+ ' + tmp[i] + '\n';
						}
					}
					PicoAdministrators.Editor.insert('+ ' + text);
				});

				// Numbered list
				$('.rte.ol').on('click', function(e){
					e.preventDefault();
					var text = PicoAdministrators.Editor.Controls.getSelection(PicoAdministrators.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += (i+1) + '. ' + tmp[i] + '\n';
						}
					}
					PicoAdministrators.Editor.insert('1. ' + text);
				});

				// Horizontal rule
				$('.rte.hr').on('click', function(e){
					e.preventDefault();
					PicoAdministrators.Editor.insert('----------');
				});

				// Table
				$('.rte.table').on('click', function(e){
					e.preventDefault();
					PicoAdministrators.Editor.insert(PicoAdministrators.labels.rte.table);
				});

			},

			/**
			 * Get text currently selected or ask for one
			 * @param  String	promptText 	Text of the prompt
			 * @return String	text 		Text asked
			 */
			getSelection: function(promptText){
				var text = PicoAdministrators.Editor.editor.getSelection();
				return text = (text === '') ? prompt(promptText, '') : text;
			}
		}
	},

	Menu: {

		init: function(widthMenu) {

			// Init the toggleMenu button
			PicoAdministrators.elm.toggleMenu.on('click', function(e) {
				PicoAdministrators.elm.menuEl.clearQueue().stop();
				if($(this).hasClass("active")) {
					$(this).removeClass("active").find(".anim").removeClass("rotate");
					PicoAdministrators.elm.menuEl.animate({ left: widthMenu });
				} else {
					$(this).addClass("active").find(".anim").addClass("rotate");
					PicoAdministrators.elm.menuEl.animate({ left: 0 });
				}
			});
			PicoAdministrators.elm.menuEl.css({ left: widthMenu });

			// Init the controls
			PicoAdministrators.Menu.Controls.init();
			// And the pages
			PicoAdministrators.Menu.Pages.init();

		},

		Controls: {
			init: function() {

				// New post
				$('.controls .new').on('click', function(e) {
					e.preventDefault();
					var title = prompt(PicoAdministrators.labels.promptNewPost, '');
					if (title != null && title != '') {
						var request = $.ajax({
							url: 'administrate/new',
							type: 'post',
							dataType: 'json',
							data: {
								'title' : title
							}
						});
						request.done(function(data){
							if(data.error){
								alert(data.error);
							}
							else {
								$('#menu .post').removeClass('open');
								PicoAdministrators.Editor.editor.setValue(data.content);
								$('.save').removeClass('modified');
								PicoAdministrators.Editor.refreshPreview();
								PicoAdministrators.elm.editorEl.data('currentFile', data.file);
								console.log(data.file);
								PicoAdministrators.elm.pages.prepend('<li><a href="#" data-url="' + PicoAdministrators.baseUrl + '/' + data.file + '" class="post open icon">&nbsp;' + data.title + '</a><a href="' + PicoAdministrators.baseUrl + '/' + data.file + '" target="_blank" class="view" title="' + PicoAdministrators.labels.postView + '"><span class="icon fa-eye"></span></a><a href="#" data-url="{{ base_url }}/' + data.file + '" class="delete" title="' + PicoAdministrators.labels.postDelete + '"><span class="icon fa-trash"></span></a></li>');
								PicoAdministrators.elm.toggleMenu.click();
							}
						});
					}
				});
				
				// Refresh
				$('.controls .refresh').on('click', function(e) {
					e.preventDefault();
					window.location.href = document.location.pathname;
				});

				// Save
				$('.save').on('click', function(e) {
					e.preventDefault();
					PicoAdministrators.elm.saving.text(PicoAdministrators.labels.saving + '…').addClass('active');
					$.post('administrate/save', {
						file: PicoAdministrators.elm.editorEl.data('currentFile'),
						content: PicoAdministrators.Editor.editor.getValue()
					}, function(data) {
						if(data.error){
							alert(data.error);
						} else {
							PicoAdministrators.elm.saving.text(PicoAdministrators.labels.saved);
							setTimeout(function() {
								PicoAdministrators.elm.saving.removeClass('active');
								$('.save').removeClass('modified');
							}, 1000);
						}			
					}, 'json');
				});
				
	
				// View currently opened post in website
				$('.controls .show').on('click', function(e) {
					e.preventDefault();
					// LOL. I like how Kay Stenschke handled that
					$('a.post.open').parent().find('.view').click();
				});

				// Help
				$('.controls .help').on('click', function(e) {
					e.preventDefault();
					var intro = introJs();
					intro.setOption('nextLabel', PicoAdministrators.labels.nextLabel);
					intro.setOption('prevLabel', PicoAdministrators.labels.prevLabel);
					intro.setOption('skipLabel', PicoAdministrators.labels.skipLabel);
					intro.setOption('doneLabel', PicoAdministrators.labels.doneLabel);
					intro.start();
					if(!PicoAdministrators.elm.toggleAssets.hasClass("active")) {
						PicoAdministrators.elm.toggleAssets.click();
					}
				});
			}
		},

		Pages: {
			init: function() {

				// Open post
				PicoAdministrators.elm.pages.on('click', '.post', function(e) {
					e.preventDefault();
					var dataUrl = $(this).attr('data-url');
					PicoAdministrators.Editor.loadPost(dataUrl);
					PicoAdministrators.elm.toggleMenu.click();
				});

				// View post in website
				PicoAdministrators.elm.pages.on('click', '.view', function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					var win = window.open(url, '_blank');
					win.focus();
				});
				
				// Delete post
				PicoAdministrators.elm.pages.on('click', '.delete', function(e) {
					e.preventDefault();

					var li = $(this).parents('li');
					var fileUrl = $(this).attr('data-url');

					var filename = fileUrl.substr(fileUrl.lastIndexOf("/") + 1) + ".md";
					var postName = PicoAdministrators.Helper.getPostTitleByDataUrl(fileUrl);

					if(!confirm( PicoAdministrators.labels.confirmDeletePost.replace('<postName>', postName).replace('<filename>', filename) )) return false;

					$('.nav .post').removeClass('open');

					$.post('administrate/remove', {file: fileUrl}, function(data) {
						li.remove();
						PicoAdministrators.elm.editorEl.data('currentFile', '');
						PicoAdministrators.Editor.editor.setValue(data);
						$('.save').removeClass('modified');
					});

				});		

			}
		}

	},

	Assets: {
		fileUrl: null,

		init: function(fileUrl, topAssets) {
			// Displays the assets list
			PicoAdministrators.Assets.getAssetsList(fileUrl);

			// And init the toggleAssets button
			PicoAdministrators.elm.toggleAssets.on('click', function(e) {
				PicoAdministrators.elm.menuEl.clearQueue().stop();
				if($(this).hasClass("active")) {
					$(this).removeClass("active").find(".anim").removeClass("rotate");
					PicoAdministrators.elm.assetsEl.animate({ top: "-100%" });
				} else {
					$(this).addClass("active").find(".anim").addClass("rotate");
					PicoAdministrators.elm.assetsEl.animate({ top: topAssets });
				}
			});
			PicoAdministrators.elm.assetsEl.css({ top: "-100%" });
		},

		/**
		 * Displays the assets list
		 * @param  String 	fileUrl
		 */
		getAssetsList: function(fileUrl) {
			PicoAdministrators.Assets.fileUrl = fileUrl;

			if(typeof  fileUrl == 'unknown') fileUrl = $(this).attr('data-url');
			$.ajax({
				url    : "administrate/assets",
				type   : "POST",
				data   : {file: fileUrl},
				cache  : false,
				success: function(result) {
					$("#assets").html(result);
				}
			});
		},

		/**
		 * Displays the thumbnail
		 * @param  String	 pathImage   
		 * @param  String	 size        
		 * @param  String	 width       
		 * @param  String	 height      
		 * @param  String	 title       
		 * @param  String	 description 
		 */
		showThumb: function(pathImage, size, width, height, title, description) {
			var offsetFilename = pathImage.lastIndexOf("/");
			var path = pathImage.substr(0, offsetFilename);
			var filename = pathImage.substr(offsetFilename + 1);

			$('#assetimagepreview').addClass('active');
			$('#assetimagepreview').append($('<img />').attr({
				 id   : "imgassetpreview",
				 src  : document.location.href.split('/administrate')[0] + path + "/thumbs/" + filename,
				 width: 200
			}).add($('<div></div>').attr({
				  id: "imageassetpreviewinfos"
			}).append(
				  width + ' x '
				+ height + ' px / '
				+ size
				+ '<br />' + PicoAdministrators.labels.title + ': ' + title
				+ '<br />' + PicoAdministrators.labels.description + ': ' + description)));
		},

		/**
		 * Hides the thumbnails
		 */
		hideThumb: function() {
			$('#imgassetpreview').remove();
			$('#imageassetpreviewinfos').remove();
			$('#assetimagepreview').removeClass('active');
		},

		/**
		 * Makes the browser download the file
		 * @param  String	pathFile
		 */
		download: function(pathFile) {
			$("body").append("<iframe src='administrate/download?file=" + pathFile + "' style='display: none;'></iframe>");
		},

		/**
		 * Deletes the file or the folder
		 * @param  String  	pathFileFull
		 * @param  Boolean 	isFolder    
		 */
		deleteFile: function(pathFileFull, isFolder) {
			var filename = pathFileFull.substr(pathFileFull.lastIndexOf("/") + 1);
			if(confirm( (isFolder ? PicoAdministrators.labels.confirmDeleteDirectory : PicoAdministrators.labels.confirmDeleteFile).replace('<fileFolderName>', filename) )
			) {
				$.post((isFolder ? '' : 'administrate/remove'), {
					file: pathFileFull
				}, function(data) {
					// Reload assets manager
					PicoAdministrators.Assets.getAssetsList( PicoAdministrators.Assets.fileUrl );
				});
			}
		},

		/**
		 * Renames the directory or the file
		 * @param  String	 pathFileFull 
		 * @param  Boolean	 isDirectory  
		 */
		rename: function(pathFileFull, isDirectory) {
			var filename = pathFileFull.substr(pathFileFull.lastIndexOf("/") + 1);
			// We trim the extension. PHP won't let it pass anyway
			var ext = "." + filename.split(".").pop();
			filename = filename.replace(/\.[^/.]+$/, "");

			var nameNew = prompt( (isDirectory ? PicoAdministrators.labels.promptRenameDirectory : PicoAdministrators.labels.promptRenameFile), filename);
			nameNew += ext;

			if( nameNew ) {
				$.post('administrate/rename', { file: pathFileFull, renameTo: nameNew }, function(data) {
						if(data.error) {
							alert(data.error);
						} else {
							// Reload assets manager
							PicoAdministrators.Assets.getAssetsList( PicoAdministrators.Assets.fileUrl );
						}				
				}, 'json');
			}
		},

		/**
		 * Insert the image into the post
		 * @param  String	 urlFile  
		 * @param  String	 titleImg 
		 * @param  String	 descImg  
		 */
		insertIntoPost: function(urlFile, titleImg, descImg) {
			var filename = urlFile.substr(urlFile.lastIndexOf("/") + 1);
			var filenameWithoutExtension = filename.substr(0, filename.lastIndexOf("."));

			var title = (titleImg !== '') ? titleImg : filenameWithoutExtension;
			var description = (descImg !== '') ? descImg : PicoAdministrators.labels.title;

			PicoAdministrators.Editor.insert(
				'\n\n'
			  + '![' + title // Alt attribute
			  + '](' + urlFile + ' "' + description + '")'
			);
		},

		/**
		 * Edit meta attributes (title and description) of image
		 *
		 * @param   String    pathFileFull
		 * @param   String    titleOld
		 * @param   String    descriptionOld
		 */
		editMeta: function(pathFileFull, titleOld, descriptionOld) {
			var filename = pathFileFull.substr(pathFileFull.lastIndexOf("/") + 1);

			var titleNew = prompt( PicoAdministrators.labels.promptMetaTitle, titleOld);
			if( titleNew ) {
				$.post('administrate/metatitle', { file: pathFileFull, title: titleNew }, function(data) { });
			}

			var descriptionNew  = prompt( PicoAdministrators.labels.promptMetaDescription, descriptionOld);
			if( descriptionNew ) {
				$.post('administrate/metadescription', { file: pathFileFull, description: descriptionNew }, function(data) { });
			}

			if( titleNew || descriptionNew ) {
				// Reload assets manager
				PicoAdministrators.Assets.getAssetsList( PicoAdministrators.Assets.fileUrl );
			}
		},

		/**
		 * Overides the form submits by sending the
		 * file using AJAX.
		 * @param  DOM 		uploadForm 		Called by this.
		 */
		uploadFormSubmit: function(uploadForm){
			PicoAdministrators.elm.uploading.addClass('active');

			var formdata = (window.FormData) ? new FormData(uploadForm) : null;
			var data = (formdata !== null) ? formdata : uploadForm.serialize();
				
			var request = $.ajax({
				url: 'administrate/upload',
				type: 'POST',
				data: data,
				processData: false,
				contentType: false,
				dataType: 'json'
			});

			request.done(function(data){
				if(data.error){
					alert(data.error);
				} else {
					setTimeout(function() {
						PicoAdministrators.elm.uploading.removeClass('active');
						PicoAdministrators.Assets.getAssetsList( PicoAdministrators.Assets.fileUrl );
					}, 1000);		
				}		
			});
		}

	},

	Helper: {
		/**
		 * Get the title of a post by its URL, using
		 * the data-url attribute.
		 * @param  String	 fileUrl
		 * @return String	 title
		 */
		getPostTitleByDataUrl: function(fileUrl) {
			var title = $('a[data-url="' + fileUrl + '"]').text();
			return title.indexOf("/") == -1 ? title : title.split("/")[1];
		}
	}
};