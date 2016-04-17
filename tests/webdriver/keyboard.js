describe('keyboard navigation', function() {
	// Key codes: https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html

    it('tab & arrow keys from STATIC page', function* () {

        yield openSearchUrl({"q": "apple", "g": "en"});

        // TAB should select the Search Input
        yield browser.keys(["TAB"]);

        var focused = yield inspectElement(yield browser.elementActive());
        var ele = yield browser.elementActive();

        //yield is used for wait and process for function clousers
        selectedEle =yield printElement(ele);

        yield browser.keys("TAB");
        yield printElement(ele);

        assert.equal(focused.tag, "a");

        // Arrow down should select the first result.
        yield browser.keys(["ARROW_DOWN"]);
        assert.equal(focused.tag, "a");
        assert.ok(focused.text.indexOf("Apple") >= 0);

    });

    printElement = function(ele) {
        var selectedEle = {};
        return browser.elementIdName(ele.value.ELEMENT).then(function(res) {
            selectedEle.name = res.value;
            return browser.elementIdAttribute(ele.value.ELEMENT,'id');
        }).then(function(res) {
            selectedEle.id = res.value;
            var textId = '#'+selectedEle.id;
            return browser.getValue(textId);
        }).then(function(res) {
            selectedEle.value = res;
            console.log(selectedEle.name+" id:'"+selectedEle.id+"' value:'"+selectedEle.value+"'");
            return selectedEle;
        });
    };

});