(function($){
	var messages = {};
	var dataFunction = $.fn.data;

	var applyText = function(element, key) {
		$(element).text(messages[key]);
	};

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		for (var mIndex=0; mIndex < mutations.length; mIndex++) {
			if (mutations[mIndex].addedNodes.length != 0) {
				for (var i=0; i < mutations[mIndex].addedNodes.length; i++) {
					if ($(mutations[mIndex].addedNodes[i]).data('i18n')) {
						$(mutations[mIndex].addedNodes[i]).text(messages[$(mutations[mIndex].addedNodes[i]).data('i18n')]);
					}
				}
			}
		}
	});

	observer.observe(document, {
	  subtree: true,
		characterData: true,
	  attributes: true,
		attributeFilter: ["data-i18n"],
		characterDataOldValue: true,
		attributeOldValue: true,
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
	};
})(window['jQuery']);
