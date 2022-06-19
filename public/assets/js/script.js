/* Template	:	CryptoCoin v1.0.0 */
(function($) {
    "use strict";
    var $win = $(window),
        $body_m = $("body");
    // Touch Class
    if (!("ontouchstart" in document.documentElement)) {
        $body_m.addClass("no-touch");
    }
    // Get Window Width
    function winwidth() {
        return $win.width();
    }
    var wwCurrent = winwidth();
    $win.on("resize", function() {
        wwCurrent = winwidth();
    });
    // Sticky
    var $is_sticky = $(".is-sticky");
    if ($is_sticky.length > 0) {
        var $navm = $("#mainnav").offset();
        $win.scroll(function() {
            var $scroll = $win.scrollTop();
            if ($win.width() > 991) {
                if ($scroll > $navm.top + 4) {
                    if (!$is_sticky.hasClass("has-fixed")) {
                        $is_sticky.addClass("has-fixed");
                    }
                } else {
                    if ($is_sticky.hasClass("has-fixed")) {
                        $is_sticky.removeClass("has-fixed");
                    }
                }
            } else {
                if ($is_sticky.hasClass("has-fixed")) {
                    $is_sticky.removeClass("has-fixed");
                }
            }
        });
    }

    // Active page menu when click
    var CurURL = window.location.href,
        urlSplit = CurURL.split("#");
    var $nav_link = $(".nav li a");
    if ($nav_link.length > 0) {
        $nav_link.each(function() {
            if (CurURL === this.href && urlSplit[1] !== "") {
                $(this)
                    .closest("li")
                    .addClass("active")
                    .parent()
                    .closest("li")
                    .addClass("active");
            }
        });
    }
    // Mobile Menu With Tap @iO
    var $nav = $("#mainnav"),
        $navbar = $(".navbar");
    var $navitem = $nav.find("li"),
        $navlink = $nav.find("a");

    function NavToggle($elem, $state) {
        var elm = $elem,
            sts = $state === true || $state === "open" || $state === 1 ? true : false;
        if (sts === true) {
            elm.slideDown(600);
        } else {
            elm.slideUp(500);
            elm
                .find("li.nav-opened")
                .removeClass("nav-opened")
                .children("ul")
                .slideUp(300);
        }
    }

    function NavMobile() {
        if ($win.width() > 767) {
            $nav.removeClass("nav-mobile");
            $nav
                .find(".has-children")
                .removeClass("nav-opened")
                .removeClass("rollover")
                .children("ul")
                .removeAttr("style");
        } else {
            $nav.addClass("nav-mobile");
        }
    }
    NavMobile();
    $win.on("resize", function() {
        NavMobile();
    });
    $navitem.has("ul").addClass("has-children");
    $navitem.on({
        mouseenter: function() {
            $(this).addClass("rollover");
        },
        mouseleave: function() {
            $(this).removeClass("rollover");
        },
    });
    $navlink.on("click touchstart", function(e) {
        var $self = $(this),
            $selfP = $self.parent(),
            selfHref = $self.attr("href");
        if (e.type === "click" && wwCurrent > 1366) {
            return true;
        }
        if ($selfP.hasClass("has-children")) {
            if ($selfP.hasClass("nav-opened")) {
                $selfP.removeClass("nav-opened");
                if (selfHref === "#") {
                    NavToggle($selfP.children("ul"), "close");
                    return false;
                }
                return true;
            } else {
                $selfP.addClass("nav-opened");
                $selfP.siblings().removeClass("nav-opened");
                NavToggle($selfP.siblings().children("ul"), "close");
                setTimeout(function() {
                    NavToggle($selfP.children("ul"), "open");
                }, 150);
                return false;
            }
        }
        if (selfHref === "#") {
            return false;
        }
    });

    // Nav collapse
    $(".nav-item").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    });

    // Active page menu when click
    var url = window.location.href;
    var $nav_link = $(".nav li a");
    $nav_link.each(function() {
        if (url === this.href) {
            $(this).closest("li").addClass("active");
        }
    });

    //magnificPopup	Video
    var $video_play = $(".video-play");
    if ($video_play.length > 0) {
        $video_play.magnificPopup({
            type: "iframe",
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace(
                        "mfp-figure",
                        "mfp-figure mfp-with-anim"
                    );
                    this.st.mainClass = this.st.el.attr("data-effect");
                },
            },
        });
    }

    //Switch Tab
    var $switch_tab = $(".switch-tab");
    if ($switch_tab.length > 0) {
        $switch_tab.on("click", function() {
            var $self = $(this),
                _target = $self.data("tabnav"),
                _href = $self.attr("href");
            var $tabnav = $("#" + _target),
                $tabnav_a = $tabnav.find("a");
            $tabnav_a.each(function() {
                $(this).parent().removeClass("active");
                if ($(this).attr("href") === _href) {
                    $(this).parent().addClass("active");
                }
            });
        });
    }

    //Carousel
    var $has_carousel = $(".has-carousel");
    if ($has_carousel.length > 0) {
        $has_carousel.each(function() {
            var $self = $(this);
            var c_item = $self.data("items") ? $self.data("items") : 4;
            var c_item_t = c_item >= 3 ? 3 : c_item;
            var c_item_m = c_item_t >= 2 ? 2 : c_item_t;
            var c_delay = $self.data("delay") ? $self.data("delay") : 6000;
            var c_auto = $self.data("auto") ? true : false;
            var c_loop = $self.data("loop") ? true : false;
            var c_dots = $self.data("dots") ? true : false;
            var c_navs = $self.data("navs") ? true : false;
            var c_ctr = $self.data("center") ? true : false;
            var c_mgn = $self.data("margin") ? $self.data("margin") : 30;
            $self.owlCarousel({
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>",
                ],
                items: c_item,
                loop: c_loop,
                nav: c_navs,
                dots: c_dots,
                margin: c_mgn,
                center: c_ctr,
                autoplay: c_auto,
                autoplayTimeout: c_delay,
                autoplaySpeed: 300,
                responsive: {
                    0: { items: 1 },
                    480: { items: c_item_m },
                    768: { items: c_item_t },
                    1170: { items: c_item },
                },
            });
        });
    }

    // Bitcoin Ticker
    var $btc_ticker = $(".btc-ticker");
    if ($btc_ticker.length > 0) {
        $btc_ticker.owlCarousel({
            items: 7,
            loop: true,
            margin: 0,
            center: true,
            stagePadding: 0,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 2,
                    center: false,
                },
                599: {
                    items: 3,
                },
                1024: {
                    items: 5,
                },
                1170: {
                    items: 7,
                },
            },
        });
    }

    // Header Slider
    var $header_slider = $(".header-slider");
    if ($header_slider.length > 0) {
        $header_slider.owlCarousel({
            items: 1,
            margin: 0,
            dots: false,
            loop: true,
            nav: true,
            autoplay: false,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            navText: [
                "<span class='pe pe-7s-angle-left'></span>",
                "<span class='pe pe-7s-angle-right'></span>",
            ],
        });
    }

    //ImageBG
    var $imageBG = $(".imagebg");
    if ($imageBG.length > 0) {
        $imageBG.each(function() {
            var $this = $(this),
                $that = $this.parent(),
                overlay = $this.data("overlay"),
                image = $this.children("img").attr("src");
            var olaytyp =
                typeof overlay !== "undefined" && overlay !== "" ?
                overlay.split("-") :
                false;

            // If image found
            if (typeof image !== "undefined" && image !== "") {
                if (!$that.hasClass("has-bg-image")) {
                    $that.addClass("has-bg-image");
                }
                if (olaytyp !== "" && olaytyp[0] === "dark") {
                    if (!$that.hasClass("light")) {
                        $that.addClass("light");
                    }
                }
                $this
                    .css("background-image", 'url("' + image + '")')
                    .addClass("bg-image-loaded");
            }
        });
    }

    // Parallax
    var $parallax = $(".has-parallax");
    if ($parallax.length > 0) {
        $parallax.each(function() {
            $(this).parallaxie({ speed: 0.3, offset: 0 });
        });
    }

    // Preloader
    var $preload = $("#preloader");
    if ($preload.length > 0) {
        $win.on("load", function() {
            $preload.children().fadeOut(300);
            $preload.delay(150).fadeOut(500);
            $("body").delay(100).css({ overflow: "visible" });
        });
    }
})(jQuery);

/**
 * JavaScript for register.ejs
 * Where everything i controlls before sending to server.
 */

/**
 *
 * @param {string} emailAddress : Check email address if it is valid or not.
 * @returns : true if valid, false if not.
 */
function isEmailAddressValid(emailAddress) {
    var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(emailAddress);
}

function isPasswordValid(password) {
    var pattern =
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
    return new RegExp(pattern).test(password);
}

/**
 * Create a new tag and return it
 * @param {string} text : the text of the tag
 * @param {string} id  : the id of the tag
 * @returns {tagObject} : the tag created
 */
function createLabel(text, id) {
    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.setAttribute("class", "text-danger");
    label.innerHTML = text;
    return label;
}

/**
 * Check if the next tag is tagName
 * @param {string} tagName
 * @returns {boolean} if the next tag is tagName return true, else return false
 */
function checkNextTag(tagName, index) {
    return index.nextSibling.tagName === tagName;
}

let error = false;
const divResult = document.querySelector("div.form-results");

// Control name field
const signupName = document.querySelector("input[name='signupName']");
signupName.addEventListener("focusout", function(e) {
    if (signupName.value.length < 3) {
        signupName.style.borderColor = "red";
        // create and print label
        const label = createLabel(
            "Name must be at least 3 characters long",
            "signup-name"
        );
        // Check if this label already exists
        if (!checkNextTag("LABEL", signupName)) {
            signupName.parentNode.insertBefore(label, signupName.nextSibling);
        }
        error = true;
    } else {
        signupName.style.borderColor = "green";
        // If next sibling is label, remove it
        if (checkNextTag("LABEL", signupName)) {
            signupName.parentNode.removeChild(signupName.nextSibling);
        }
    }
}); // end name.addEventListener

// control email field
const signupEmail = document.querySelector("input[name='signupEmail']");

signupEmail.addEventListener("focusout", function(e) {
    if (isEmailAddressValid(signupEmail.value)) {
        signupEmail.style.borderColor = "green";
        if (checkNextTag("LABEL", signupEmail)) {
            signupEmail.parentNode.removeChild(signupEmail.nextSibling);
        }
    } else {
        signupEmail.style.borderColor = "red";
        const label = createLabel(
            "The email address is not valid.",
            "signup-email"
        );
        if (!checkNextTag("LABEL", signupEmail)) {
            signupEmail.parentNode.insertBefore(label, signupEmail.nextSibling);
        }
        error = true;
    }
}); // end email.addEventListener

// control telephone number field
const signupTelephone = document.querySelector("input[name='signupTelno']");
signupTelephone.addEventListener("focusout", function(e) {
    var pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (signupTelephone.value.match(pattern)) {
        signupTelephone.style.borderColor = "green";
        if (checkNextTag("LABEL", signupTelephone)) {
            signupTelephone.parentNode.removeChild(signupTelephone.nextSibling);
        }
    } else {
        signupTelephone.style.borderColor = "red";
        const label = createLabel(
            "The telephone number is not valid.",
            "signup-telno"
        );
        if (!checkNextTag("LABEL", signupTelephone)) {
            signupTelephone.parentNode.insertBefore(
                label,
                signupTelephone.nextSibling
            );
        }
        error = true;
    }
});

// control password field
const signupPassword = document.querySelector("input[name='signupPasskey']");
signupPassword.addEventListener("focusout", function(e) {
    if (isPasswordValid(signupPassword.value)) {
        signupPassword.style.borderColor = "green";
        if (checkNextTag("LABEL", signupPassword)) {
            signupPassword.parentNode.removeChild(signupPassword.nextSibling);
        }
    } else {
        signupPassword.style.borderColor = "red";
        const label = createLabel("The password is not valid.", "signup-passkey");
        if (!checkNextTag("LABEL", signupPassword)) {
            signupPassword.parentNode.insertBefore(label, signupPassword.nextSibling);
        }
        error = true;
    }
}); // end password.addEventListener

// control confirm password field
const signupConfirmPassword = document.querySelector(
    "input[name='signupPasskeyConfirm']"
);
signupConfirmPassword.addEventListener("focusout", function(e) {
    if (signupConfirmPassword.value === signupPassword.value) {
        signupConfirmPassword.style.borderColor = "green";
        if (checkNextTag("LABEL", signupConfirmPassword)) {
            signupConfirmPassword.parentNode.removeChild(
                signupConfirmPassword.nextSibling
            );
        }
    } else {
        signupConfirmPassword.style.borderColor = "red";
        const label = createLabel(
            "The passwords do not match.",
            "signup-passkey-confirm"
        );
        if (!checkNextTag("LABEL", signupConfirmPassword)) {
            signupConfirmPassword.parentNode.insertBefore(
                label,
                signupConfirmPassword.nextSibling
            );
        }
        error = true;
    }
}); // end confirm password.addEventListener

// control terms and conditions checkbox
const signupTerms = document.querySelector("input[name='signupTerm']");
signupTerms.addEventListener("focusout", function(e) {
    if (signupTerms.checked) {
        signupTerms.style.borderColor = "green";
        if (checkNextTag("LABEL", signupTerms)) {
            signupTerms.parentNode.removeChild(signupTerms.nextSibling);
        }
    } else {
        signupTerms.style.borderColor = "red";
        const label = createLabel(
            "You must agree to the terms and conditions.",
            "signup-term"
        );
        if (!checkNextTag("LABEL", signupTerms)) {
            signupTerms.parentNode.insertBefore(label, signupTerms.nextSibling);
        }
        error = true;
    }
}); // end terms.addEventListener

// preventDefault for submit button if error is true
const signupSubmit = document.querySelector("input[name='signupSubmit']");
signupSubmit.addEventListener("click", function(e) {
    // check if all fields are valid before submitting form data to server
    if (
        signupName.value.length >= 3 &&
        signupEmail.value.length >= 3 &&
        signupTelephone.value.length >= 3 &&
        signupPassword.value.length >= 3 &&
        signupConfirmPassword.value === signupPassword.value &&
        signupTerms.checked
    ) {
        if (checkNextTag("LABEL", signupSubmit)) {
            signupSubmit.parentNode.removeChild(signupSubmit.nextSibling);
        }
        signupForm.submit();
    } else {
        e.preventDefault();
        const label = createLabel(
            "Please fill out all fields correctly.",
            "signup-submit"
        );
        if (!checkNextTag("LABEL", signupSubmit)) {
            signupSubmit.parentNode.insertBefore(label, signupSubmit.nextSibling);
        }
    }
}); // end submit.addEventListener

/**
 * Change password type to text type, when user click the text.
 */
function showPassword() {
    var x = document.getElementById("signup-passkey");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("signupShowPassword").innerHTML = "Hide";
    } else {
        x.type = "password";
        document.getElementById("signupShowPassword").innerHTML = "Show";
    }
}
/**
 * End of registration form.
 */

/**
 * Login form.
 */
let loginError = false;
const loginEmail = document.querySelector("input[name='loginEmail']");
loginEmail.addEventListener("click", function(e) {
    alert("Please enter your email address.");
});
loginEmail.addEventListener("focusout", function(e) {
    alert(loginEmail.value);
    if (loginEmail.value.length >= 3) {
        loginEmail.style.borderColor = "green";
        if (checkNextTag("LABEL", loginEmail)) {
            loginEmail.parentNode.removeChild(loginEmail.nextSibling);
        }
    } else {
        loginEmail.style.borderColor = "red";
        const label = createLabel("The email is not valid.", "login-email");
        if (!checkNextTag("LABEL", loginEmail)) {
            loginEmail.parentNode.insertBefore(label, loginEmail.nextSibling);
        }
        loginError = true;
    }
}); // end loginEmail.addEventListener

const loginPasskey = document.querySelector("input[name='loginPasskey']");
loginPasskey.addEventListener("focusout", function(e) {
    if (loginPasskey.value.length >= 3) {
        if (isPasswordValid(loginPasskey.value)) {
            loginPasskey.style.borderColor = "green";
            if (checkNextTag("LABEL", loginPasskey)) {
                loginPasskey.parentNode.removeChild(loginPasskey.nextSibling);
            }
        } else {
            loginPasskey.style.borderColor = "red";
            const label = createLabel("The password is not valid.", "login-passkey");
            if (!checkNextTag("LABEL", loginPasskey)) {
                loginPasskey.parentNode.insertBefore(label, loginPasskey.nextSibling);
            }
            loginError = true;
        }
    }
}); // end loginPasskey.addEventListener

const loginSubmit = document.querySelector("input[id='loginSubmit']");
loginSubmit.addEventListener("click", function(e) {
    if (!loginError) {
        if (loginEmail.value >= 3 && loginPasskey.value >= 3) {
            const rememberMe = document.querySelector("input[name='rememberMe']");
            loginForm.submt();
        }
    } else {
        e.preventDefault();
        const label = createLabel(
            "Please fill out all fields correctly.",
            "login-submit"
        );
        if (!checkNextTag("LABEL", loginSubmit)) {
            loginSubmit.parentNode.insertBefore(label, loginSubmit.nextSibling);
        }
    }
}); // end loginSubmit.addEventListener