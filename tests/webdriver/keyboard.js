describe('keyboard navigation', function() {
	// Key codes: https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html

    it('tab & arrow keys from STATIC page', function* () {

        yield openSearchUrl({"q": "apple", "g": "en"});
        //yield openSearchUrl({});

        // TAB should select the Search Input
        yield browser.keys(["TAB"]);

        var focused = yield inspectElement(yield browser.elementActive());
        var ele = yield browser.elementActive();

        //yield is used for wait and process for function clousers
        yield printElement(ele);

        // TAB adds text 'TAB' into input field
        yield browser.keys("TAB");
        yield printElement(ele);

        // Should clear input element inorder to perform TAB keyevent
        yield browser.clearElement('#q')

        // Some first element should appear
        var hits = yield browser.elements("#hits .r");
        assert.equal(hits.value.length, 25);
        console.log("Number of Search results:"+hits.value.length)

        // Now after this TAB event SELECT element will gain focus
        yield browser.keys(["Tab"]);
        inspectValues = yield inspectElementName(yield browser.elementActive());
        assert.equal(inspectValues.tagName, "select");

        // Now after this TAB event Search Button element will gain focus
        yield browser.keys(["Tab"]);
        inspectValues = yield inspectElementName(yield browser.elementActive());
        assert.equal(inspectValues.tagName, "input");

        // First result will be selected
        yield browser.keys(["Tab"]);
        inspectValues = yield inspectElementName(yield browser.elementActive());
        assert.equal(inspectValues.tagName, "a");

        // Arrow down should select the next result.
        yield browser.keys(["\ue015","\ue015","\ue015","\ue013","\ue015"]);
        inspectValues = yield inspectElementName(yield browser.elementActive());
        assert.equal(inspectValues.tagName, "a");

        yield browser.clearElement(".a");
        // Arrow down should select the next result.
        yield browser.keys(["\ue013","\ue015"]);
        inspectValues = yield inspectElementName(yield browser.elementActive());
        assert.equal(inspectValues.tagName, "a");

    });

    inspectElementName = function(ele){
        inspectValues = {};
        return browser.elementIdName(ele.value.ELEMENT).then(function(res) {
            inspectValues.tagName = res.value;
            return browser.elementIdAttribute(ele.value.ELEMENT,'tabindex');
        }).then(function(res) {
            inspectValues.tabindex = res.value;
            console.log("selected tag name:<"+inspectValues.tagName+"> and tabindex:"+inspectValues.tabindex);
            return inspectValues;
        });
    };

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