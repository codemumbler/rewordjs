(function($){
	var messages = {};
	var dataFunction = $.fn.data;

	var applyText = function(element, key) {
		if (key) {
			$(element).text(messages[key]);
			$(document.body).trigger('reword', element, key, messages[key]);
		}
	};

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		for (var mIndex=0; mIndex < mutations.length; mIndex++) {
			var mutation = mutations[mIndex];
			$(mutation.addedNodes).each(function(index, addedNode){
				applyText(addedNode, $(addedNode).data('i18n'));
			});
		}
	});

	observer.observe(document, {
		subtree: true,
		childList: true
	});

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
		return $(this);
	};
})(window['jQuery']);
