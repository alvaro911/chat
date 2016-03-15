$(document).ready(function(){

	var color = {};
	var gun = window.gun = Gun('https://gungame.herokuapp.com/gun').get('tutorial/chatapp');
	$('form').on('submit', function(event){
		event.preventDefault();
		var message = {};
		message.who = $('form').find('.name').val();
		color.me = message.who;
		message.what = $('form').find('.content').val();
		message.when = new Date().getTime();
		gun.path('TS' + message.when).put(message);
		$('form').find('.content').val('');
		
	}); 
	gun.map(function(message, id){
		
		var $li = $($('#' + id).get(0) || $('.model').find('.message').clone(true).attr('id', id));
		var time = new Date(message.when).toLocaleString();
		$li.find('.who').text(message.who);
		$li.find('.what').text(message.what);
		$li.find('.when').text(time);
		if(message.who === color.me){
			$li.addClass('me');
		}
		sort(id, $('ul').children().last()).after($li);
		$('html, body, .body_chat').stop(true).animate({scrollTop : $('.body_chat ul').height()}, 'slow');

	});

	$('.send').click(function(){
		$('.content').empty();
	});

	function sort(when, element){
		when = String(when);
		if((element.attr('id') || '99999999999999999999999') < when){
			return element;
		}
		return sort(when, element.prev());
	}
});