describe('keyboard navigation', function() {
	// Key codes: https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html

    it('tab & arrow keys from STATIC page', function* () {

        yield openSearchUrl({"q": "apple", "g": "en"});

        console.log("Test started..")
        // TAB should select the Search Input
        yield browser.keys(["TAB","a","TAB","TAB","TAB"]);

        var focused = yield inspectElement(yield browser.elementActive());
        var ele = yield browser.elementActive();
        //ele = ele.value.ELEMENT;
        eleValue = browser.getAttribute(ele,'id');
        var ele2 = browser.getValue('#q');

        yield sleep(1000);
        console.log(ele2)
        console.log(ele)
        console.log('Present Test:');
        browser.elementIdName(elt.value.ELEMENT).then(function(res) {
            console.log("Id value:"+res.value);
        });
        console.log('My test:');
        browser.elementIdAttribute(elt.value.ELEMENT,'id').then(function(res) {
            console.log("Id value:"+res.value);
        });

        assert.equal(focused.tag, "a");

        // Arrow down should select the first result.
        yield browser.keys(["ARROW_DOWN"]);
        assert.equal(focused.tag, "a");
        assert.ok(focused.text.indexOf("Apple") >= 0);

    });

});