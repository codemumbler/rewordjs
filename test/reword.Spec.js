describe('reword.js', function() {
	var messages = {
		'msg1': 'Test message 1',
		'msg2': 'Test message 2',
		'msg-alt': 'Test alt message'
	};
	var options = {
		'messages': messages
	};

	describe('static content', function(){
		beforeEach(function() {
			$(document.body).append('<div class="test-element" data-i18n="msg1"/>');
		});

		afterEach(function() {
			$('.test-element').remove();
		});

		describe('reword', function() {
			it('jquery plugin', function() {
				expect(typeof $.fn.reword).toBe('function');
			});

			it('jquery chaining', function() {
				expect($('.test-element').reword(options).hasClass('test-element')).toBe(true);
			});
		});

		describe('place messages', function() {
			it('Puts data-i18n with text', function() {
				$(document.body).reword(options);
				expect($('.test-element').text()).toEqual('Test message 1');
			});

			it('alt text', function() {
				$(document.body).append('<img class="test-element" data-alt-i18n="msg-alt" src=""/>');
				$(document.body).reword(options);
				expect($('img.test-element').attr('alt')).toEqual('Test alt message');
			});

			it('on specific element places text', function() {
				$('.test-element').reword(options);
				expect($('.test-element').text()).toEqual('Test message 1');
			});

			it('Two languages message', function() {
				var frOptions = $.extend(options);
				frOptions.messages = {
					'msg1': {
						'en': 'Test message 1',
						'fr': 'Essai message 1'
					}
				};
				$('.test-element').attr('lang', 'fr').reword(frOptions);
				expect($('.test-element').text()).toEqual('Essai message 1');
			});
		});

		describe('place message dynamically', function() {
			it('changes as data-i18n changes', function() {
				$(document.body).reword(options);
				$('.test-element').data('i18n', 'msg2');
				expect($('.test-element').data('i18n')).toEqual('msg2');
				expect($('.test-element').text()).toEqual('Test message 2');
			});

			it('change to other data-attr does nothing', function() {
				$(document.body).reword(options);
				$('.test-element').data('test', 'msg2');
				expect($('.test-element').text()).toEqual('Test message 1');
			});
		});
	});

	describe("MutationObserver - ", function() {
		var originalTimeout;
		beforeEach(function() {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
		});

		it('appending html places messages', function(done) {
			$(document.body).reword(options)
				.on('reword', function appendCallback(event, element) {
					if ($(element).attr('id') == 'appendedDiv') {
						expect($('#appendedDiv').text()).toEqual('Test message 2');
						done();
						$(document.body).off('reword', appendCallback);
					}
				}).append('<div id="appendedDiv" class="async-test-element" data-i18n="msg2"/>');
		});

		it('prepending html places messages', function prependCallback(done) {
			$(document.body).reword(options)
				.on('reword', function(event, element) {
					if ($(element).attr('id') == 'prependedDiv') {
						expect($('#prependedDiv').text()).toEqual('Test message 2');
						done();
						$(document.body).off('reword', prependCallback);
					}
				}).prepend('<div id="prependedDiv" class="async-test-element" data-i18n="msg2"/>');
		});

		afterEach(function() {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
			$('.async-test-element').remove();
		});
	});

	describe("AJAX JSON messages - ", function() {
		var originalTimeout, originalAjax;
		beforeEach(function() {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
			$(document.body).append('<div class="async-test-element" data-i18n="msg1"/>');
			originalAjax = $.fn.ajax;
			$.ajax = function() {
				defer = $.Deferred();
				defer.promise({});
				defer.resolve({
					"msg1": "Test ajax message 1",
					"msg2": "Test ajax message 2",
					"msg-alt": "Test ajax alt message"
				});
				return defer;
			};
		});

		it('load messages via AJAX', function prependCallback(done) {
			$(document.body).reword({
				'url': 'messages.json'
			}).on('reword', function(event, element) {
				expect($('.async-test-element').text()).toEqual('Test ajax message 1');
				done();
			});
		});

		afterEach(function() {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
			$('.async-test-element').remove();
			$.ajax = originalAjax;
		});
	});
});
