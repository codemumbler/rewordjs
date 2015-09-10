var messages = {
	'english': {
		'en': 'English',
		'fr': 'Anglais',
		'it': 'Inglese',
		'de': 'Englisch',
		'zh': '英语'
	},
	'french': {
		'en': 'French',
		'fr': 'français',
		'it': 'francese',
		'de': 'Französisch',
		'zh': '法国'
	},
	'italian': {
		'en': 'Italian',
		'fr': 'italien',
		'it': 'italiano',
		'de': 'Italienisch',
		'zh': '意大利'
	},
	'chinese': {
		'en': 'Chinese',
		'fr': 'chinois',
		'it': 'cinese',
		'de': 'Chinesisch',
		'zh': '中国'
	},
	'german': {
		'en': 'German',
		'fr': 'allemand',
		'it': 'tedesco',
		'de': 'Deutsche',
		'zh': '德国'
	}
};
$( document ).ready(function() {
	$('#main-content').reword({
		'messages': messages
	});

	$('.lang-toggle').on('click', function(){
		$('#main-content').reword({
			'language': $(this).attr('lang'),
			'messages': messages
		})
	});
});
