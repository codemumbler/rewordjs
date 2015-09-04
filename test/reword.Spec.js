describe('reword.js', function() {

	describe('reword', function() {
		it('jquery plugin', function() {
			expect(typeof $.fn.reword).toBe('function');
		});
	});

	describe('reword', function(){
		beforeEach(function(){
			$(document.body).append('<div id="testElement" data-i18n="msg1"/>')
		});

		afterEach(function(){
			$('#testElement').remove();
		});

		it('Puts data-i18n with text', function(){
			$(document.body).reword({
				'msg1': 'Test message 1'
			})
			expect($('#testElement').text()).toEqual('Test message 1');
		});
	});
});
