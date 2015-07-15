/**
 * Pico Contributors plugin for Pico CMS
 *
 * Based on Admin.js in Parvula CMS
 * by Fabien Sa and
 * pico_admin.js by Kay Stenschke
 * 
 * @author Guillaume Litaudon
 * @link http://www.guillaumelitaudon.fr/
 * @version 1.2.0
 */

var PicoContributors = {

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
		PicoContributors.baseUrl = baseUrl;
		PicoContributors.openPost = openPost;
		PicoContributors.labels = labels;

		PicoContributors.Editor.init();
		PicoContributors.Menu.init("-30%");
		PicoContributors.Assets.init(dataUrl, "2.5em");
	},

	Editor: {

		editor: null,

		init: function() {

			PicoContributors.Editor.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
					lineWrapping: true,
					mode: "markdown",
					viewportMargin: Infinity
			});

			// Ctrl+S to save post
			PicoContributors.Editor.editor.setOption("extraKeys", {
				'Ctrl-S': function(cm) {
					$('.save')[0].click();
				}
			});

			// If we open a post
			if(PicoContributors.openPost)
				PicoContributors.Editor.loadPost(PicoContributors.openPost);

			// Refresh preview
			PicoContributors.Editor.editor.on('keyup', function() {
				PicoContributors.Editor.refreshPreview();
			});

			// Hide menu
			PicoContributors.Editor.editor.on('focus', function() {
				PicoContributors.elm.toggleMenu.removeClass("active").find(".anim").removeClass("rotate");
				PicoContributors.elm.menuEl.animate({ left: "-30%" });
			}); 

			// Hide assets
			PicoContributors.Editor.editor.on('focus', function() {
				PicoContributors.elm.toggleAssets.removeClass("active").find(".anim").removeClass("rotate");
				PicoContributors.elm.assetsEl.animate({ top: "-100%" });
			}); 

			// Toggle preview on/off
			PicoContributors.elm.togglePreview.on('click', function(e) {
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
			PicoContributors.Editor.editor.on('change', function(e){
				$('.save').addClass('modified');
			});

			PicoContributors.Editor.addIntroAttributes();
			PicoContributors.Editor.Controls.init();
		},

		/**
		 * Inserts someText into the editor
		 * @param  String	 someText
		 */
		insert: function(someText) {
			PicoContributors.Editor.editor.replaceSelection(someText, "end");
			PicoContributors.Editor.refreshPreview();
		},

		/**
		 * Refresh the preview
		 */
		refreshPreview: function() {
			var content = PicoContributors.Editor.editor.getValue();
			// We don't want to preview the meta-data
			content = content.replace(/\/\*[\s\S]+?\*\//, "");
			PicoContributors.elm.previewEl.html(marked(content));
		},

		/**
		 * Loads the post in the editor
		 * @param  String fileUrl
		 */
		loadPost: function(fileUrl) {
			if(typeof fileUrl != "undefined"){
				$('#menu .post').removeClass('open');
				$('a[data-url="' + fileUrl + '"]').addClass('open');

				$.post('contribute/open', {file: fileUrl}, function(data) {
					PicoContributors.elm.editorEl.data('currentFile', fileUrl);
					PicoContributors.Editor.editor.setValue(data);
					$('.save').removeClass('modified');
					PicoContributors.Editor.refreshPreview();
				});
			}
		},

		/**
		 * Adds the introJS attributes
		 */
		addIntroAttributes : function(){
			var theEditor = $('.CodeMirror');
			theEditor.attr('data-intro', PicoContributors.labels.introEditor);
			theEditor.attr('data-step', 3);
			theEditor.attr('data-position', 'right');
			theEditor.attr('data-tooltipClass', 'widest');
		},

		Controls: {
			init: function(){

				// Heading
				$('.rte.title').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					PicoContributors.Editor.insert('## ' + text);
				});

				// Bold
				$('.rte.bold').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					PicoContributors.Editor.insert('**' + text + '**');
				});

				// Italic
				$('.rte.italic').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					PicoContributors.Editor.insert('_' + text + '_');
				});

				// Strikethrough
				$('.rte.strike').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					PicoContributors.Editor.insert('~~' + text + '~~');
				});

				// Link
				$('.rte.link').on('click', function(e){
					e.preventDefault();
					var url = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.url);
					var text = prompt(PicoContributors.labels.rte.text, '');
					var title = prompt(PicoContributors.labels.rte.title, '');
					PicoContributors.Editor.insert('[' + text + '](' + url + ' "' + title + '")');
				});

				// Picture
				$('.rte.picture').on('click', function(e){
					e.preventDefault();
					var url = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.url);
					var text = prompt(PicoContributors.labels.rte.text, '');
					var title = prompt(PicoContributors.labels.rte.title, '');
					PicoContributors.Editor.insert('![' + text + '](' + url + ' "' + title + '")');
				});

				// Blockquote
				$('.rte.blockquote').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += '> ' + tmp[i] + '\n';
						}
					}
					PicoContributors.Editor.insert('> ' + text);
				});

				// Code
				$('.rte.code').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = '';
						for(i = 0; i < tmp.length; i++) {
							text += '\t' + tmp[i] + '\n';
						}
						PicoContributors.Editor.insert('```\n' + text + '\n```');
					} else {
						PicoContributors.Editor.insert('`' + text + '`');
					}	
				});

				// Bullets list
				$('.rte.ul').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += '+ ' + tmp[i] + '\n';
						}
					}
					PicoContributors.Editor.insert('+ ' + text);
				});

				// Numbered list
				$('.rte.ol').on('click', function(e){
					e.preventDefault();
					var text = PicoContributors.Editor.Controls.getSelection(PicoContributors.labels.rte.text);
					if(text.lastIndexOf('\n') != -1) {
						var tmp = text.split('\n');
						text = tmp[0] + '\n';
						for(i = 1; i < tmp.length; i++) {
							text += (i+1) + '. ' + tmp[i] + '\n';
						}
					}
					PicoContributors.Editor.insert('1. ' + text);
				});

				// Horizontal rule
				$('.rte.hr').on('click', function(e){
					e.preventDefault();
					PicoContributors.Editor.insert('----------');
				});

				// Table
				$('.rte.table').on('click', function(e){
					e.preventDefault();
					PicoContributors.Editor.insert(PicoContributors.labels.rte.table);
				});

			},

			/**
			 * Get text currently selected or ask for one
			 * @param  String	promptText 	Text of the prompt
			 * @return String	text 		Text asked
			 */
			getSelection: function(promptText){
				var text = PicoContributors.Editor.editor.getSelection();
				return text = (text === '') ? prompt(promptText, '') : text;
			}
		}
	},

	Menu: {

		init: function(widthMenu) {

			// Init the toggleMenu button
			PicoContributors.elm.toggleMenu.on('click', function(e) {
				PicoContributors.elm.menuEl.clearQueue().stop();
				if($(this).hasClass("active")) {
					$(this).removeClass("active").find(".anim").removeClass("rotate");
					PicoContributors.elm.menuEl.animate({ left: widthMenu });
				} else {
					$(this).addClass("active").find(".anim").addClass("rotate");
					PicoContributors.elm.menuEl.animate({ left: 0 });
				}
			});
			PicoContributors.elm.menuEl.css({ left: widthMenu });

			// Init the controls
			PicoContributors.Menu.Controls.init();
			// And the pages
			PicoContributors.Menu.Pages.init();

		},

		Controls: {
			init: function() {

				// New post
				$('.controls .new').on('click', function(e) {
					e.preventDefault();
					var title = prompt(PicoContributors.labels.promptNewPost, '');
					if (title != null && title != '') {
						var request = $.ajax({
							url: 'contribute/new',
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
								PicoContributors.Editor.editor.setValue(data.content);
								$('.save').removeClass('modified');
								PicoContributors.Editor.refreshPreview();
								PicoContributors.elm.editorEl.data('currentFile', data.file);
								console.log(data.file);
								PicoContributors.elm.pages.prepend('<li><a href="#" data-url="' + PicoContributors.baseUrl + '/' + data.file + '" class="post open icon">&nbsp;' + data.title + '</a><a href="' + PicoContributors.baseUrl + '/' + data.file + '" target="_blank" class="view" title="' + PicoContributors.labels.postView + '"><span class="icon fa-eye"></span></a><a href="#" data-url="{{ base_url }}/' + data.file + '" class="delete" title="' + PicoContributors.labels.postDelete + '"><span class="icon fa-trash"></span></a></li>');
								PicoContributors.elm.toggleMenu.click();
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
					PicoContributors.elm.saving.text(PicoContributors.labels.saving + '…').addClass('active');
					$.post('contribute/save', {
						file: PicoContributors.elm.editorEl.data('currentFile'),
						content: PicoContributors.Editor.editor.getValue()
					}, function(data) {
						if(data.error){
							alert(data.error);
						} else {
							PicoContributors.elm.saving.text(PicoContributors.labels.saved);
							setTimeout(function() {
								PicoContributors.elm.saving.removeClass('active');
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
					intro.setOption('nextLabel', PicoContributors.labels.nextLabel);
					intro.setOption('prevLabel', PicoContributors.labels.prevLabel);
					intro.setOption('skipLabel', PicoContributors.labels.skipLabel);
					intro.setOption('doneLabel', PicoContributors.labels.doneLabel);
					intro.start();
					if(!PicoContributors.elm.toggleAssets.hasClass("active")) {
						PicoContributors.elm.toggleAssets.click();
					}
				});
			}
		},

		Pages: {
			init: function() {

				// Open post
				PicoContributors.elm.pages.on('click', '.post', function(e) {
					e.preventDefault();
					var dataUrl = $(this).attr('data-url');
					PicoContributors.Editor.loadPost(dataUrl);
					PicoContributors.elm.toggleMenu.click();
				});

				// View post in website
				PicoContributors.elm.pages.on('click', '.view', function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					var win = window.open(url, '_blank');
					win.focus();
				});
				
				// Delete post
				PicoContributors.elm.pages.on('click', '.delete', function(e) {
					e.preventDefault();

					var li = $(this).parents('li');
					var fileUrl = $(this).attr('data-url');

					var filename = fileUrl.substr(fileUrl.lastIndexOf("/") + 1) + ".md";
					var postName = PicoContributors.Helper.getPostTitleByDataUrl(fileUrl);

					if(!confirm( PicoContributors.labels.confirmDeletePost.replace('<postName>', postName).replace('<filename>', filename) )) return false;

					$('.nav .post').removeClass('open');

					$.post('contribute/remove', {file: fileUrl}, function(data) {
						li.remove();
						PicoContributors.elm.editorEl.data('currentFile', '');
						PicoContributors.Editor.editor.setValue(data);
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
			PicoContributors.Assets.getAssetsList(fileUrl);

			// And init the toggleAssets button
			PicoContributors.elm.toggleAssets.on('click', function(e) {
				PicoContributors.elm.menuEl.clearQueue().stop();
				if($(this).hasClass("active")) {
					$(this).removeClass("active").find(".anim").removeClass("rotate");
					PicoContributors.elm.assetsEl.animate({ top: "-100%" });
				} else {
					$(this).addClass("active").find(".anim").addClass("rotate");
					PicoContributors.elm.assetsEl.animate({ top: topAssets });
				}
			});
			PicoContributors.elm.assetsEl.css({ top: "-100%" });
		},

		/**
		 * Displays the assets list
		 * @param  String 	fileUrl
		 */
		getAssetsList: function(fileUrl) {
			PicoContributors.Assets.fileUrl = fileUrl;

			if(typeof  fileUrl == 'unknown') fileUrl = $(this).attr('data-url');
			$.ajax({
				url    : "contribute/assets",
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
				 src  : document.location.href.split('/contribute')[0] + path + "/thumbs/" + filename,
				 width: 200
			}).add($('<div></div>').attr({
				  id: "imageassetpreviewinfos"
			}).append(
				  width + ' x '
				+ height + ' px / '
				+ size
				+ '<br />' + PicoContributors.labels.title + ': ' + title
				+ '<br />' + PicoContributors.labels.description + ': ' + description)));
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
			$("body").append("<iframe src='contribute/download?file=" + pathFile + "' style='display: none;'></iframe>");
		},

		/**
		 * Deletes the file or the folder
		 * @param  String  	pathFileFull
		 * @param  Boolean 	isFolder    
		 */
		deleteFile: function(pathFileFull, isFolder) {
			var filename = pathFileFull.substr(pathFileFull.lastIndexOf("/") + 1);
			if(confirm( (isFolder ? PicoContributors.labels.confirmDeleteDirectory : PicoContributors.labels.confirmDeleteFile).replace('<fileFolderName>', filename) )
			) {
				$.post((isFolder ? '' : 'contribute/remove'), {
					file: pathFileFull
				}, function(data) {
					// Reload assets manager
					PicoContributors.Assets.getAssetsList( PicoContributors.Assets.fileUrl );
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

			var nameNew = prompt( (isDirectory ? PicoContributors.labels.promptRenameDirectory : PicoContributors.labels.promptRenameFile), filename);
			nameNew += ext;

			if( nameNew ) {
				$.post('contribute/rename', { file: pathFileFull, renameTo: nameNew }, function(data) {
						if(data.error) {
							alert(data.error);
						} else {
							// Reload assets manager
							PicoContributors.Assets.getAssetsList( PicoContributors.Assets.fileUrl );
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
			var description = (descImg !== '') ? descImg : PicoContributors.labels.title;

			PicoContributors.Editor.insert(
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

			var titleNew = prompt( PicoContributors.labels.promptMetaTitle, titleOld);
			if( titleNew ) {
				$.post('contribute/metatitle', { file: pathFileFull, title: titleNew }, function(data) { });
			}

			var descriptionNew  = prompt( PicoContributors.labels.promptMetaDescription, descriptionOld);
			if( descriptionNew ) {
				$.post('contribute/metadescription', { file: pathFileFull, description: descriptionNew }, function(data) { });
			}

			if( titleNew || descriptionNew ) {
				// Reload assets manager
				PicoContributors.Assets.getAssetsList( PicoContributors.Assets.fileUrl );
			}
		},

		/**
		 * Overides the form submits by sending the
		 * file using AJAX.
		 * @param  DOM 		uploadForm 		Called by this.
		 */
		uploadFormSubmit: function(uploadForm){
			PicoContributors.elm.uploading.addClass('active');

			var formdata = (window.FormData) ? new FormData(uploadForm) : null;
			var data = (formdata !== null) ? formdata : uploadForm.serialize();
				
			var request = $.ajax({
				url: 'contribute/upload',
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
						PicoContributors.elm.uploading.removeClass('active');
						PicoContributors.Assets.getAssetsList( PicoContributors.Assets.fileUrl );
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