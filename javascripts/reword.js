(function($) {
	var defaultLanguage = 'en';
	var language;
	var messages = {};
	var dataFunction = $.fn.data;

	var applyMessages = function() {
		$('[data-i18n]').each(function(index, element) {
			applyText(element, $(element).data('i18n'));
		});
		$('[data-alt-i18n]').each(function(index, element) {
			$(element).attr('alt', getMessage(element, $(element).data('alt-i18n')));
		});
		$('[data-title-i18n]').each(function(index, element) {
			$(element).attr('title', getMessage(element, $(element).data('title-i18n')));
		});
	};

	var applyText = function(element, key) {
		var message = getMessage(element, key);
		$(element).text(message);
		$(document.body).trigger('reword', element, key, message);
	};

	var getMessage = function(element, key) {
		if (!key) return;
		var lang = getLanguage(element);
		var message = messages[key];
		if (typeof message === 'object') {
			if (message[lang])
				message = message[lang];
			else
				message = message[defaultLanguage];
		}
		return message;
	};

	var getLanguage = function(element) {
		if (language)
			return language;
		return $(element).closest('[lang]').attr('lang');
	};

	(function() {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		var observer = new MutationObserver(function(mutations, observer) {
			for (var mIndex = 0; mIndex < mutations.length; mIndex++) {
				var mutation = mutations[mIndex];
				$(mutation.addedNodes).each(function(index, addedNode) {
					applyText(addedNode, $(addedNode).data('i18n'));
				});
			}
		}).observe(document, {
			subtree: true,
			childList: true
		});
	})();

	$.fn.data = function(key, value) {
		if (!value)
			return dataFunction.call($(this), key);
		dataFunction.call($(this), key, value);
		if (key.match('.*i18n')) {
			$(this).attr('data-' + key, value);
			applyMessages();
		}
		return $(this);
	};

	$.fn.reword = function(options) {
		if (options) {
			if (options.language) {
				defaultLanguage = options.language;
				language = options.language;
			} else {
				defaultLanguage = document.documentElement.lang;
			}
			if (options.messages) {
				messages = options.messages;
				applyMessages();
			}
			if (options.url) {
				$.ajax({
					'url': options.url,
					'data': 'json'
				}).done(function(loadedMessages){
					messages = loadedMessages;
					applyMessages();
				});
			}
		}
		return $(this);
	};
})(window['jQuery']);
