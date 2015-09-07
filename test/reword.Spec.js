describe('reword.js', function() {
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
	});

	describe('place messages', function() {
		it('Puts data-i18n with text', function() {
			$(document.body).reword({
				'msg1': 'Test message 1'
			});
			expect($('.test-element').text()).toEqual('Test message 1');
		});

		it('alt text', function() {
			$(document.body).append('<img class="test-element" data-alt-i18n="msg2" src=""/>');
			$(document.body).reword({
				'msg1': 'Test message 1',
				'msg2': 'Test alt message'
			});
			expect($('img.test-element').attr('alt')).toEqual('Test alt message');
		});

		it('on specific element places text', function() {
			$('.test-element').reword({
				'msg1': 'Test message 1'
			});
			expect($('.test-element').text()).toEqual('Test message 1');
		});
	});

	describe('place message dynamically', function() {
		it('changes as data-i18n changes', function() {
			$(document.body).reword({
				'msg1': 'Test message 1',
				'msg2': 'Test message 2'
			});
			$('.test-element').data('i18n', 'msg2');
			expect($('.test-element').data('i18n')).toEqual('msg2');
			expect($('.test-element').text()).toEqual('Test message 2');
		});

		it('change to other data-attr does nothing', function() {
			$(document.body).reword({
				'msg1': 'Test message 1',
				'msg2': 'Test message 2'
			});
			$('.test-element').data('test', 'msg2');
			expect($('.test-element').text()).toEqual('Test message 1');
		});

		describe(" - MutationObserver - ", function() {
			var originalTimeout;
			beforeEach(function() {
				originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
				jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
			});

			it('appending html places messages', function(done){
				$(document.body).reword({
					'msg1': 'Test message 1',
					'msg2': 'Test message 2'
				}).on('reword', function(event, element){
					if ($(element).attr('id') == 'appendedDiv') {
						expect($('#appendedDiv').text()).toEqual('Test message 2');
						done();
						$(document.body).off('reword');
					}
				}).append('<div id="appendedDiv" class="async-test-element" data-i18n="msg2"/>');
			});

			afterEach(function() {
				jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
				$('.async-test-element').remove();
			});
		});
	});
});
