describe('reword.js', function() {
	var messages = {
		'msg1': 'Test message 1',
		'msg2': 'Test message 2',
		'msg-alt': 'Test alt message'
	};

	beforeEach(function() {
		$(document.body).append('<div class="test-element" data-i18n="msg1"/>')
	});

	afterEach(function() {
		$('.test-element').remove();
	});

	describe('reword', function() {
		it('jquery plugin', function() {
			expect(typeof $.fn.reword).toBe('function');
		});

		it('jquery chaining', function() {
			expect($('.test-element').reword(messages).hasClass('test-element')).toBe(true);
		});
	});

	describe('place messages', function() {
		it('Puts data-i18n with text', function() {
			$(document.body).reword(messages);
			expect($('.test-element').text()).toEqual('Test message 1');
		});

		it('alt text', function() {
			$(document.body).append('<img class="test-element" data-alt-i18n="msg-alt" src=""/>');
			$(document.body).reword(messages);
			expect($('img.test-element').attr('alt')).toEqual('Test alt message');
		});

		it('on specific element places text', function() {
			$('.test-element').reword(messages);
			expect($('.test-element').text()).toEqual('Test message 1');
		});
	});

	describe('place message dynamically', function() {
		it('changes as data-i18n changes', function() {
			$(document.body).reword(messages);
			$('.test-element').data('i18n', 'msg2');
			expect($('.test-element').data('i18n')).toEqual('msg2');
			expect($('.test-element').text()).toEqual('Test message 2');
		});

		it('change to other data-attr does nothing', function() {
			$(document.body).reword(messages);
			$('.test-element').data('test', 'msg2');
			expect($('.test-element').text()).toEqual('Test message 1');
		});

		describe(" - MutationObserver - ", function() {
			var originalTimeout;
			beforeEach(function() {
				originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
				jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
			});

			it('appending html places messages', function(done) {
				$(document.body).reword(messages)
					.on('reword', function appendCallback(event, element) {
						if ($(element).attr('id') == 'appendedDiv') {
							expect($('#appendedDiv').text()).toEqual('Test message 2');
							done();
							$(document.body).off('reword', appendCallback);
						}
					}).append('<div id="appendedDiv" class="async-test-element" data-i18n="msg2"/>');
			});

			it('prepending html places messages', function prependCallback(done) {
				$(document.body).reword(messages)
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
	});
});
