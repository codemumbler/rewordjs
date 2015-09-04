(function($){
	$.fn.reword = function(options) {
		for (key in options) {
			$(this).find('*[data-i18n=' + key + ']').each(function(index, element){
				$(element).text(options[key]);
			});
			$(this).find('*[data-alt-i18n=' + key + ']').each(function(index, element){
				$(element).attr('alt', options[key]);
			});
		}
	}
})(window['jQuery']);
