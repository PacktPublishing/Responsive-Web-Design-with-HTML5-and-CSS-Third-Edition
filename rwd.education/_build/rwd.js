// First of all, remove the no-js class:
document.documentElement.classList.remove("no-js");
/*
 *
 * Reviews carousel
 * Need:
 * nextBtn
 * prevBtn
 * container
 * [items]
 *
 */
var easyCarousel = /** @class */ (function () {
    function easyCarousel(nextBtn, prevBtn, container, items, duration) {
        var _this = this;
        this.autoMoveContainer = function () {
            _this.currentIdx = Math.floor(Math.random() * (_this.maxIdx + 1));
            _this.moveContainer(_this.currentIdx);
        };
        this.processClick = function (e) {
            // You are interacting with it, so stop random movement
            window.clearInterval(_this.random);
            _this.polarity = e.target === _this.nextBtn ? "+" : "-";
            if (_this.polarity === "+") {
                _this.currentIdx =
                    _this.currentIdx++ >= _this.maxIdx
                        ? _this.maxIdx
                        : _this.currentIdx++;
            }
            else {
                _this.currentIdx = _this.currentIdx-- <= 0 ? 0 : _this.currentIdx--;
            }
            _this.moveContainer(_this.currentIdx);
        };
        this.moveContainer = function (num) {
            var containerWidth = _this.container.getBoundingClientRect().width;
            // Set the prev button
            num > 0
                ? _this.prevBtn.removeAttribute("disabled")
                : _this.prevBtn.setAttribute("disabled", "");
            // Set the next button
            num < _this.maxIdx
                ? _this.nextBtn.removeAttribute("disabled")
                : _this.nextBtn.setAttribute("disabled", "");
            // Set the transform distance
            _this.container.style.setProperty("--Dist", "-" + containerWidth * num + "px");
        };
        this.nextBtn = nextBtn;
        this.prevBtn = prevBtn;
        this.container = container;
        this.items = items;
        this.maxIdx = items.length - 1;
        this.currentIdx = 0;
        this.polarity;
        this.duration = duration;
        this.nextBtn.addEventListener("click", this.processClick);
        this.prevBtn.addEventListener("click", this.processClick);
        this.random = window.setInterval(this.autoMoveContainer, this.duration);
        window.addEventListener("resize", function (e) {
            _this.moveContainer(_this.currentIdx);
        });
    }
    return easyCarousel;
}());
var quoteNext = document.getElementById("quoteNext");
var quotePrev = document.getElementById("quotePrev");
var quoteContainer = document.querySelector(".rwd-Reviews_Container");
var quoteItems = quoteContainer.querySelectorAll(".rwd-Review");
new easyCarousel(quoteNext, quotePrev, quoteContainer, quoteItems, 10000);
var imgNext = document.getElementById("imgNext");
var imgPrev = document.getElementById("imgPrev");
var imgContainer = document.querySelector(".rwd-New_Media");
var imgItems = imgContainer.querySelectorAll(".rwd-New_Img");
new easyCarousel(imgNext, imgPrev, imgContainer, imgItems, 8000);
/*
 * Code source drop down
 */
var codeDropBtn = document.querySelector("button.rwd-Nav_Link");
var downloadPanel = document.getElementById("downloadPanel");
var downloadPanelClickMask = document.getElementById("downloadPanelClickMask");
codeDropBtn.addEventListener("click", function () {
    downloadPanel.setAttribute("aria-hidden", downloadPanel.getAttribute("aria-hidden") === "true" ? "false" : "true");
    downloadPanelClickMask.setAttribute("data-active", downloadPanelClickMask.getAttribute("data-active") === "true"
        ? "false"
        : "true");
});
downloadPanelClickMask.addEventListener("click", function () {
    downloadPanel.setAttribute("aria-hidden", "true");
    downloadPanelClickMask.setAttribute("data-active", "false");
});
