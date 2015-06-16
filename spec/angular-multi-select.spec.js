describe('Testing directive in single mode', function() {
	var scope, element, html, timeout;

	beforeEach(function (){
		//load the module
		module('angular-multi-select');

		//set our view html.
		html = '<div angular-multi-select ' +
			'hidden-property="hidden" ' +
			'input-model="items" ' +
			'output-model="x" ' +
			'group-property="sub" ' +
			'tick-property="check" ' +
			'item-label="{{ name }}" ' +
			'helper-elements="all none reset filter"' +
			'selection-mode="single" ' +
			'min-search-length="3" ' +
			'search-property="name" ' +
		'></div>';

		inject(function($compile, $rootScope, $timeout) {
			//create a scope (you could just use $rootScope, I suppose)
			scope = $rootScope;
			timeout = $timeout;

			//get the jqLite or jQuery element
			element = angular.element(html);

			//compile the element into a function to process the view.
			$compile(element)($rootScope);

			element.scope().items = single_test_data;
			element.scope().$digest();

			$(document.body).append(element);
		});
	});

	afterEach(function() {
		element.remove();
		elementn = null;
	});

	it('Should be able to create the directive.', function() {
		expect(element).not.toBeEmpty();
	});

	it('Should create the items layer & container', function() {
		expect(element).toContainElement('div.ams_layer');
		expect(element).toContainElement('div.ams_items_container');
	});

	it('Should contain 3 main categories', function() {
		expect($('div.ams_layer > div')).toHaveLength(2);
		expect($('div.ams_items_container > ul > li')).toHaveLength(3);
		expect($('div.ams_items_container > ul > li > div > div')).toContainText("Modern browsers");
	});

	it("Should handle 'hidden' items correctly", function() {
		expect($('.ams_item')).toHaveLength(13);
	});

	it("Only 1 element (and all it's parents) should be checked", function() {
		expect($('.ams_selected')).toHaveLength(3);
	});

	it("Should deselect all when clicked parent group", function() {
		$(".ams_item > div:contains('Closed Source')").click();
		expect($('.ams_selected')).toHaveLength(0);
	});

	it("When a group is clicked, should not mark itself as checked if it contains more than 1 element (even hidden elements block selection!)", function() {
		$(".ams_item > div:contains('Closed Source')").click();
		expect($('.ams_selected')).toHaveLength(0);

		$(".ams_item > div:contains('Closed Source')").click();
		expect($('.ams_selected')).toHaveLength(0);

		$(".ams_item > div:contains('Open Source')").click();
		expect($('.ams_selected')).toHaveLength(0);
	});

	it("Should filter correctly when searching", function() {
		$('input.inputFilter').val("chro");
		$('input.inputFilter').trigger("input");
		expect($('.ams_item')).toHaveLength(5);
	});

	it("Should be visible when the button is clicked", function() {
		$('button.ams_btn').click();
		expect('div.ams_layer').toBeVisible();
	});

	it("Should focus the input when opened", function() {
		$('button.ams_btn').click();
		timeout.flush();
		expect($('input.inputFilter')).toBeFocused();
	});

	it("Should focus elements when using arrows", function() {
		var event = document.createEvent("Events");
		event.initEvent("keydown", true, true);
		event.which = 40;

		$('button.ams_btn').click();
		scope.$broadcast('angular-multi-select-keydown', { event: event } );
		scope.$broadcast('angular-multi-select-keydown', { event: event } );

		expect($('.ams_focused')).toHaveLength(1);
	});

	it("Should react to 'select all' by unselecting everything (because we're in single mode)", function() {
		$('.ams_selectall').click();
		expect($('.ams_selected')).toHaveLength(0);
	});

	it("Should react to 'select none'", function() {
		$('.ams_selectnone').click();
		expect($('.ams_selected')).toHaveLength(0);
	});

	it("Should react to 'reset'", function() {
		$(".ams_item > div:contains('Internet Explorer')").click();
		expect($('.ams_selected')).toHaveLength(2);
		$('.ams_reset').click();
		expect($('.ams_selected')).toHaveLength(3);
	});

	it("Should react to 'clear'", function() {
		$('input.inputFilter').val("chro");
		$('input.inputFilter').trigger("input");
		expect($('.ams_item')).toHaveLength(5);

		$('.ams_clear').click();
		expect($('.ams_item')).toHaveLength(13);
	});
});

describe('Testing directive in multi mode', function() {
	var scope, element, html, timeout;

	beforeEach(function (){
		//load the module
		module('angular-multi-select');

		//set our view html.
		html = '<div angular-multi-select ' +
			'hidden-property="hidden" ' +
			'input-model="items" ' +
			'output-model="x" ' +
			'group-property="sub" ' +
			'tick-property="check" ' +
			'item-label="{{ name }}" ' +
			'helper-elements="all none reset filter"' +
			'selection-mode="multi" ' +
			'min-search-length="3" ' +
			'search-property="name" ' +
		'></div>';

		inject(function($compile, $rootScope, $timeout) {
			//create a scope (you could just use $rootScope, I suppose)
			scope = $rootScope;
			timeout = $timeout;

			//get the jqLite or jQuery element
			element = angular.element(html);

			//compile the element into a function to process the view.
			$compile(element)($rootScope);

			element.scope().items = multi_test_data;
			element.scope().$digest();

			$(document.body).append(element);
		});
	});

	afterEach(function() {
		element.remove();
		elementn = null;
	});

	it('Should be able to create the directive.', function() {
		expect(element).not.toBeEmpty();
	});

	it("4 elements (and all their parents) should be checked", function() {
		expect($('.ams_selected')).toHaveLength(8);
	});

	it("Should deselect all when clicked parent group", function() {
		$(".ams_item > div:contains('Open Source')").click();
		expect($('.ams_selected', ".ams_item > div:contains('Open Source')" )).toHaveLength(0);
	});

	it("Should select all when a group with no checked children is clicked", function() {
		$(".ams_item > div:contains('Modern browsers')").click().click();
		expect($('.ams_selected', "li:contains('Modern browsers')" )).toHaveLength(7);
	});

	it("Should deselect all when a group is clicked, if all elements are selected", function() {
		$(".ams_item > div:contains('Modern browsers')").click();
		expect($('.ams_selected', "li:contains('Modern browsers')" )).toHaveLength(0);
	});

	it("Should react to 'select all' by selecting everything", function() {
		$('.ams_selectall').click();
		expect($('.ams_selected')).toHaveLength(13);
	});

	it("Should react to 'select none' by unselecting everything", function() {
		$('.ams_selectnone').click();
		expect($('.selected')).toHaveLength(0);
	});
});