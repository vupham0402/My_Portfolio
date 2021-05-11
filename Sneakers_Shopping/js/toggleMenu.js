$(document).ready(function(){
	$('.menu-toggle').click(function(){
		$('nav').toggleClass('active');
		$('#inventoryList').css("z-index","1");
	})
})