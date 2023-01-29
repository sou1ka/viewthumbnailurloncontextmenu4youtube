// ==UserScript==
// @name        view thumbnail on context menu for TyouTube
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.0
// @author      sou1ka
// @description 2020/7/9 19:44:46
// ==/UserScript==


var e = document.createElement('div');
e.setAttribute('class', 'ytp-menuitem');
e.innerHTML = '<div class="ytp-menuitem-icon"><img width="20" style="margin-left:2px; filter: invert(100%);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAz0lEQVR4Ae3TIQjCYBCGYcMf17Eng9HeYR3jOusY1zHaWc+LBoPRYFgwGo2GPxgM51sGMhzCbTfGuA+efG+5xVznCyhQQwZSIYVqOcRIrgmqDYOumiAx5kHqIGl4kAd5kI4HPRCnEvTCBumYQRE53pCWDM2KsYKyjoMHtFdZB5VoFnCE4ISA9hLcrIJqJPjeEhcs0bUV4tBBEWv8WsC/pUMHZei7om9QhBg5a4JKw6CtJijBDvcBQ57YI2iCjOdB+kWIGcXKCQQpvknPN799AEmydQIh3ZMSAAAAAElFTkSuQmCC"></div><div class="ytp-menuitem-label">サムネイル表示</div><div class="ytp-menuitem-content"></div></div>';
e.onclick = function() {
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

//	var xhr = new XMLHttpRequest();
//	xhr.open('GET', 'http://img.youtube.com/vi/'+vid+'/maxresdefault.jpg', true);
//	xhr.responseType = "blob";
//	xhr.onload = function(res) {
//		const url = URL.createObjectURL(res.data);
//		const a = document.createElement("a");
//		document.body.appendChild(a);
//		a.download = vid+'.jpg';
//		a.href = url;
//		a.click();
//		a.remove();
//		URL.revokeObjectURL(url);
//	};
//	xhr.send();

//	var img = document.createElement('img');
//	img.src='http://img.youtube.com/vi/'+vid+'/maxresdefault.jpg';
//	document.body.appendChild(img);
//	console.log(img);
//	console.log(URL.createObjectURL(img.src));
}

var ob = new MutationObserver(function(mu) {
	if(mu[0].addedNodes[0].className=='ytp-popup ytp-contextmenu'){
	console.log(document.getElementsByClassName('ytp-popup ytp-contextmenu'));
	console.log(document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu'))
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu')[0].appendChild(e);
		var baseHeight = Number(String(document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].style.height).match(/([0-9]+)/)[0]);
    document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].style.height=(baseHeight+40)+'px';
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel')[0].style.height=(baseHeight+40)+'px';
		document.getElementsByClassName('ytp-popup ytp-contextmenu')[0].getElementsByClassName('ytp-panel-menu')[0].style.height=(baseHeight+40)+'px';
		ob.disconnect();
	}
});
ob.observe(document.body, { childList: true });

