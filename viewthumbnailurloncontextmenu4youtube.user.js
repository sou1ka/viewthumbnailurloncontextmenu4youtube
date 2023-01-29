// ==UserScript==
// @name        view thumbnail on context menu for TyouTube
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.1
// @author      sou1ka
// @description 2023/1/29 12:21
// @updateURL   https://github.com/sou1ka/viewthumbnailurloncontextmenu4youtube/raw/main/viewthumbnailurloncontextmenu4youtube.user.js
// @downloadURL https://github.com/sou1ka/viewthumbnailurloncontextmenu4youtube/raw/main/viewthumbnailurloncontextmenu4youtube.user.js
// ==/UserScript==

var emtext = 'View Thumbnail(Max)';
var estext = 'View Thumbnail(SD)';

if(navigator.language == 'ja') {
	emtext = 'サムネイル表示(高)';
	estext = 'サムネイル表示(標準)';
}

var em = document.createElement('div');
em.setAttribute('class', 'ytp-menuitem');
em.innerHTML = '<div class="ytp-menuitem-icon"><img width="20" style="margin-left:2px; filter: invert(100%);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAz0lEQVR4Ae3TIQjCYBCGYcMf17Eng9HeYR3jOusY1zHaWc+LBoPRYFgwGo2GPxgM51sGMhzCbTfGuA+efG+5xVznCyhQQwZSIYVqOcRIrgmqDYOumiAx5kHqIGl4kAd5kI4HPRCnEvTCBumYQRE53pCWDM2KsYKyjoMHtFdZB5VoFnCE4ISA9hLcrIJqJPjeEhcs0bUV4tBBEWv8WsC/pUMHZei7om9QhBg5a4JKw6CtJijBDvcBQ57YI2iCjOdB+kWIGcXKCQQpvknPN799AEmydQIh3ZMSAAAAAElFTkSuQmCC"></div><div class="ytp-menuitem-label">'+emtext+'</div><div class="ytp-menuitem-content"></div></div>';
em.onclick = function() {
	var pm = location.search.replace('?', '').split('&'), vid;
	for(var i = 0, len = pm.length; i < len; i++) {
		if(pm[i].search('v=') !== -1) { vid = pm[i].split('=')[1]; }
	}
	var a = document.createElement('a');
	a.href = 'http://img.youtube.com/vi/'+vid+'/maxresdefault.jpg';
	a.download = vid+'.jpg';
	a.target = '_blank';
	document.body.appendChild(a);
	a.click();
	a.remove();
}

var es = document.createElement('div');
es.setAttribute('class', 'ytp-menuitem');
es.innerHTML = '<div class="ytp-menuitem-icon"><img width="20" style="margin-left:2px; filter: invert(100%);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAz0lEQVR4Ae3TIQjCYBCGYcMf17Eng9HeYR3jOusY1zHaWc+LBoPRYFgwGo2GPxgM51sGMhzCbTfGuA+efG+5xVznCyhQQwZSIYVqOcRIrgmqDYOumiAx5kHqIGl4kAd5kI4HPRCnEvTCBumYQRE53pCWDM2KsYKyjoMHtFdZB5VoFnCE4ISA9hLcrIJqJPjeEhcs0bUV4tBBEWv8WsC/pUMHZei7om9QhBg5a4JKw6CtJijBDvcBQ57YI2iCjOdB+kWIGcXKCQQpvknPN799AEmydQIh3ZMSAAAAAElFTkSuQmCC"></div><div class="ytp-menuitem-label">'+estext+'</div><div class="ytp-menuitem-content"></div></div>';
es.onclick = function() {
	var pm = location.search.replace('?', '').split('&'), vid;
	for(var i = 0, len = pm.length; i < len; i++) {
		if(pm[i].search('v=') !== -1) { vid = pm[i].split('=')[1]; }
	}
	var a = document.createElement('a');
	a.href = 'http://img.youtube.com/vi/'+vid+'/sddefault.jpg';
	a.download = vid+'.jpg';
	a.target = '_blank';
	document.body.appendChild(a);
	a.click();
	a.remove();
}

var ob = new MutationObserver(function(mu) {
	if(mu[0].addedNodes[0].className=='ytp-popup ytp-contextmenu'){
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu')[0].appendChild(em);
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu')[0].appendChild(es);
		var baseHeight = Number(String(document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].style.height).match(/([0-9]+)/)[0]);
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].style.height=(baseHeight+80)+'px';
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel')[0].style.height=(baseHeight+80)+'px';
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu')[0].style.height=(baseHeight+80)+'px';
		ob.disconnect();
	}
});
ob.observe(document.body, { childList: true });

