(function($){
	$.fn.reword = function(options) {
		for (key in options) {
			$('*[data-i18n=' + key + ']').each(function(index, element){
				$(element).text(options[$(element).data('i18n')]);
			});
		}
	}
})(window['jQuery']);
