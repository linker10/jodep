var bannerFrequency = 10000, currentPanel, maxPanels, bannerTime=0, _MS_PER_DAY = 1000 * 60 * 60 * 24, currentBotPanel, maxBotPanels, botTime=0, botFrequency = 8000;

function startItUp(s){
	bannerTime = Date.now() + bannerFrequency;
	botTime = Date.now() + botFrequency;
	
	var matches = document.querySelectorAll(".loadFade");
	for (var p = 0, length = matches.length; p < length; p++) {
		//temp  = matches[p].getAttribute('id');
		matches[p].classList.remove("loadFade");
		matches[p].classList.add("fadeItIn");
		//cssClassChange('fadeItIn', temp);
	}
	
	eventStart = true;
	animate();
}
window.requestAnimFrame = (function(){//from Paul Irish
	return  window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(callback, element){
		window.setTimeout(callback, 1000 / 60);
	};
})();
function animate() {
	frameTime = Date.now();
	if(eventStart){
		if(maxPanels > 1){
			if(bannerTime > 0 && bannerTime < frameTime){
				nextPanel();
			}
		}
		if(maxBotPanels > 1){
			if(botTime > 0 && botTime < frameTime){
				nextBotPanel();
			}
		}
	}

    requestAnimFrame( animate );
}
function animateIt(theID, animName){
	targ = document.getElementById(theID);
	if(animName == 'resized100 homeBkg hidden'){
		temp  = targ.getAttribute('pageCon');
		size = getDimensions(temp,targ.width,targ.height);
		targ.width = size[0];
		targ.height = size[1];
	}else if(animName == 'panel anim'){
		//do nothing
	}else{
		targ.style.display='block';
	}
	targ.setAttribute("className",animName);//for IE
	targ.setAttribute("class",animName);
}
function nextPanel(){
	cssClassChange('panel anim left','panel'+ currentPanel);
	currentPanel++;
	if(currentPanel > maxPanels) currentPanel=1;
	cssClassChange('panel right','panel'+ currentPanel);
	setTimeout("animateIt('" + "panel" + currentPanel + "', 'panel anim')", 1);
	bannerTime = Date.now() + bannerFrequency;
}
function nextBotPanel(){
	cssClassChange('panel anim left','botPanel'+ currentBotPanel);
	currentBotPanel++;
	if(currentBotPanel > maxBotPanels) currentBotPanel=1;
	cssClassChange('panel right','botPanel'+ currentBotPanel);
	setTimeout("animateIt('" + "botPanel" + currentBotPanel + "', 'panel anim')", 1);
	botTime = Date.now() + botFrequency;
}
function prevBotPanel(){
	cssClassChange('panel anim right','botPanel'+ currentBotPanel);
	currentBotPanel--;
	if(currentBotPanel < 1) currentBotPanel=maxBotPanels;
	cssClassChange('panel left','botPanel'+ currentBotPanel);
	setTimeout("animateIt('" + "botPanel" + currentBotPanel + "', 'panel anim')", 1);
	botTime = Date.now() + botFrequency;
}
function showVideo(lang){
	cssClassChange('hidden','homeSlide');
	theDiv = document.getElementById('vidCon');
	cssClassChange('shown','vidCon');
	theDiv.innerHTML = '<video autoplay="true" style="object-fit: cover;width:100%;min-height: 100%;"><source src="vid/final' + lang + '.mp4" type="video/mp4"  /></video>';	
}
function toggleIt(theID, theClass){
	document.getElementById(theID).classList.toggle(theClass);
}
function toggleDiv(theID, theClass){
	document.getElementById(theID).classList.toggle(theClass);
}

function dropSearch(){
	if(document.getElementById('job-cat').selectedIndex > 0 && document.getElementById('job-location').selectedIndex > 0){
		toggleIt('searchBox','hidden');
		document.searchForm.submit();
	}
}

function cssClassChange(cl,theid) {
	var e = document.getElementById(theid);
    e.setAttribute("className",cl);//for IE       
    e.setAttribute("class",cl);
}
function confirmSubmit(){
	var agree=confirm("Are you sure you want to delete this?");
	if (agree){
		return true ;
	}else{
		return false ;
	}
}