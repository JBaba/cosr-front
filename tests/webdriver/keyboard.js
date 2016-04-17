describe('keyboard navigation', function() {
	// Key codes: https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html

    it('tab & arrow keys from STATIC page', function* () {

        //yield openSearchUrl({"q": "apple", "g": "en"});
        yield openSearchUrl({});

        // TAB should select the Search Input
        yield browser.keys(["TAB"]);

        var focused = yield inspectElement(yield browser.elementActive());
        var ele = yield browser.elementActive();

        //yield is used for wait and process for function clousers
        selectedEle =yield printElement(ele);

        // TAB is add text 'TAB' into input field
        yield browser.keys("TAB");
        yield printElement(ele);

        // Back Space does not work
        yield browser.keys("BS");
        yield printElement(ele);

        // select other element and try to perform TAB event
        browser.click('input[id="s"]')
        .pause(2000)
        .keys(['TAB']);

        focused = yield inspectElement(yield browser.elementActive());
        ele = yield browser.elementActive();

        // TAB event does not work
        yield printElement(ele);

        yield browser.keys(["TAB"]);
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

    openGoogleSearchUrl = function(opts) {
            var url = "http://www.google.com/#";
            var qs = [];
            for (key in opts) {
                qs.push(key + "=" + encodeURIComponent(opts[key]));
            }
            qs.sort();
            if (qs.length > 0) {
                url += qs.join("&");
            }
            console.log("Opening " + url);
            return browser.url(url);
    };

});