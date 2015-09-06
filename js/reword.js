(function($){
	var messages = {};
	var dataFunction = $.fn.data;
	var appendFunciton = $.fn.append;

	var applyText = function(element, key) {
		$(element).text(messages[key]);
	};

	$.fn.append = function(elements) {
		var appendReturn = appendFunciton.call(this, elements);
		appendReturn.find('[data-i18n]').each(function(index, element){
		 	applyText(element, $(element).data('i18n'));
		});
		return appendReturn;
	};

	$.fn.data = function(key, value) {
		if (!value)
			return dataFunction.call($(this), key);
		dataFunction.call($(this), key, value);
		if (key == 'i18n')
			applyText(this, value);
	};

	$.fn.reword = function(options) {
		messages = options;
		$('[data-i18n]').each(function(index, element){
			applyText(element, $(element).data('i18n'));
		});
		$('[data-alt-i18n]').each(function(index, element){
			$(element).attr('alt', messages[$(element).data('alt-i18n')]);
		});
	};
})(window['jQuery']);
