/**
 * Toggles the mobile navigation menu open and closed.
 * @param {HTMLButtonElement} toggle - The hamburger button element.
 * @param {HTMLElement} nav - The navigation container element.
 * @returns {void}
 */
function toggleNav(toggle, nav) {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    nav.classList.toggle('is-open', !isOpen);
}

/**
 * Closes the mobile navigation when a link is activated.
 * @param {HTMLButtonElement} toggle - The hamburger button element.
 * @param {HTMLElement} nav - The navigation container element.
 * @returns {void}
 */
function closeNav(toggle, nav) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
}

/**
 * Closes the "More" dropdown menu.
 * @param {HTMLElement} moreNav - The more navigation container element.
 * @returns {void}
 */
function closeNavMore(moreNav) {
    var toggle = moreNav.querySelector('.nav-more__toggle');

    moreNav.classList.remove('is-open');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Toggles the "More" dropdown menu open and closed.
 * @param {HTMLElement} moreNav - The more navigation container element.
 * @returns {void}
 */
function toggleNavMore(moreNav) {
    var toggle = moreNav.querySelector('.nav-more__toggle');
    var isOpen = moreNav.classList.contains('is-open');

    moreNav.classList.toggle('is-open', !isOpen);
    if (toggle) {
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }
}

/**
 * Initialises the "More" dropdown navigation behaviour.
 * @returns {void}
 */
function initNavMore() {
    var moreNav = document.querySelector('.site-nav__more');

    if (!moreNav) {
        return;
    }

    var toggle = moreNav.querySelector('.nav-more__toggle');
    var menu = moreNav.querySelector('.nav-more__menu');

    if (!toggle || !menu) {
        return;
    }

    toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleNavMore(moreNav);
    });

    menu.querySelectorAll('.nav-more__link').forEach(function (link) {
        link.addEventListener('click', function () {
            closeNavMore(moreNav);
        });
    });

    document.addEventListener('click', function (event) {
        if (!moreNav.contains(event.target)) {
            closeNavMore(moreNav);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeNavMore(moreNav);
        }
    });
}

/**
 * Initialises site navigation behaviour for all pages.
 * @returns {void}
 */
function initNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener('click', function () {
        toggleNav(toggle, nav);
    });

    nav.querySelectorAll('.site-nav__link, .nav-more__link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                closeNav(toggle, nav);
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            closeNav(toggle, nav);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initNavMore();
});
