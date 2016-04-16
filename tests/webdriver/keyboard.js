describe('keyboard navigation', function() {
	// Key codes: https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html

    it('tab & arrow keys from STATIC page', function* () {

        yield openSearchUrl({"q": "apple", "g": "en"});

        console.log("Test started..")
        // TAB should select the Search Input
        yield browser.keys(["TAB","a","TAB","TAB","TAB"]);

        var focused = yield inspectElement(yield browser.elementActive());
        var ele = yield browser.elementActive();

        

        browser.elementIdName(ele.value.ELEMENT).then(function(res) {
            console.log("Ele Name:"+res.value);
        });

        browser.elementIdAttribute(ele.value.ELEMENT,'id').then(function(res) {
            console.log("Id value:"+res.value);
        });

        browser.getValue('#q').then(function(value) {
            console.log(value); // outputs: "John Doe"
        });

        //yield is used for wait and process for function clousers
        selectedEle =yield printElement(ele);

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