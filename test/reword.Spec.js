describe('reword.js', function() {

	describe('reword', function() {
		it('jquery plugin', function() {
			expect(typeof $.fn.reword).toBe('function');
		});
	});

	describe('reword', function(){
		beforeEach(function(){
			$(document.body).append('<div class="test-element" data-i18n="msg1"/>')
		});

		afterEach(function(){
			$('.test-element').remove();
		});

		it('Puts data-i18n with text', function(){
			$(document.body).reword({
				'msg1': 'Test message 1'
			})
			expect($('.test-element').text()).toEqual('Test message 1');
		});

		it('alt text', function(){
			$(document.body).append('<img class="test-element" data-alt-i18n="msg2" src=""/>');
			$(document.body).reword({
				'msg1': 'Test message 1',
				'msg2': 'Test alt message'
			});
			expect($('img.test-element').attr('alt')).toEqual('Test alt message');
		});
	});
});
