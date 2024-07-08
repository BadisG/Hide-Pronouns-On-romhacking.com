// ==UserScript==
// @name         Hide Pronouns on romhacking.com
// @namespace    http://tampermonkey.net/
// @version      2024-07-06
// @description  Hide the pronouns of the users from romhacking.com
// @author       You
// @match        https://romhacking.com/*
// @grant        GM_log
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    function getDeepShadowRoot(selectors, callback) {
        function traverse(root, selectorIndex) {
            if (selectorIndex >= selectors.length) {
                callback(root);
                return;
            }

            let selector = selectors[selectorIndex];
            let elements;
            if (selector.includes('+')) {
                elements = root.querySelectorAll(selector.replace('+', ''));
            } else {
                elements = [root.querySelector(selector)];
            }
            elements.forEach(element => {
                if (element) {
                    if (element.shadowRoot) {
                        traverse(element.shadowRoot, selectorIndex + 1);
                    } else {
                        traverse(element, selectorIndex + 1);
                    }
                }
            });
        }

        traverse(document, 0);
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function hidePronounsOnListPage(root) {
        const elements = root.querySelectorAll('sl-card rhdc-username');
        elements.forEach(username => {
            if (username && username.shadowRoot) {
                const pronouns = username.shadowRoot.querySelectorAll('.pronouns');
                pronouns.forEach(hideElement);
                console.log('List Page - Hidden pronouns for:', username);
            }
        });
    }

    function hidePronounsOnDetailPage(root) {
        const hackInfo = root.querySelector('rhdc-hack-info');
        if (hackInfo && hackInfo.shadowRoot) {
            const authors = hackInfo.shadowRoot.querySelector('.authors');
            if (authors) {
                const usernames = authors.querySelectorAll('rhdc-username');
                usernames.forEach(username => {
                    if (username && username.shadowRoot) {
                        const pronouns = username.shadowRoot.querySelector('.pronouns');
                        if (pronouns) {
                            hideElement(pronouns);
                            console.log('Detail Page - Hidden pronouns for:', username);
                        }
                    }
                });
            }
        }
    }

    function hidePronounsOnComments(root) {
        const commentCards = root.querySelectorAll('rhdc-comment');
        commentCards.forEach(card => {
            if (card && card.shadowRoot) {
                const username = card.shadowRoot.querySelector('rhdc-username');
                if (username && username.shadowRoot) {
                    const pronouns = username.shadowRoot.querySelector('.pronouns');
                    if (pronouns) {
                        hideElement(pronouns);
                    }
                }
            }
        });
    }

    function hidePronounsOnMainPage(root) {
    const newsPosts = root.querySelectorAll('rhdc-news-post');
    newsPosts.forEach(post => {
        if (post && post.shadowRoot) {
            const username = post.shadowRoot.querySelector('rhdc-username');
            if (username && username.shadowRoot) {
                const pronouns = username.shadowRoot.querySelector('.pronouns');
                if (pronouns) {
                    hideElement(pronouns);
                    console.log('Main Page - Hidden pronouns for:', username);
                }
            }
        }
    });
}

    function hidePronounsOnCompetitions(root) {
    const competitionCards = root.querySelectorAll('rhdc-competition-series-card');
    competitionCards.forEach(card => {
        if (card && card.shadowRoot) {
            const usernames = card.shadowRoot.querySelectorAll('rhdc-username');
            usernames.forEach(username => {
                if (username && username.shadowRoot) {
                    const pronouns = username.shadowRoot.querySelector('.pronouns');
                    if (pronouns) {
                        hideElement(pronouns);
                        console.log('Competitions Page - Hidden pronouns for:', username);
                    }
                }
            });
        }
    });
}

    function hidePronounsOnLeaderboard(root) {
    const usernames = root.querySelectorAll('rhdc-username');
    usernames.forEach(username => {
        if (username && username.shadowRoot) {
            const pronouns = username.shadowRoot.querySelector('.pronouns');
            if (pronouns) {
                hideElement(pronouns);
                console.log('Leaderboard Page - Hidden pronouns for:', username);
            }
        }
    });
}

    function hidePronounsOnSearchPage(root) {
    const hackCards = root.querySelectorAll('rhdc-hack-card');
    hackCards.forEach(card => {
        if (card && card.shadowRoot) {
            const usernames = card.shadowRoot.querySelectorAll('rhdc-username');
            usernames.forEach(username => {
                if (username && username.shadowRoot) {
                    const pronouns = username.shadowRoot.querySelector('.pronouns');
                    if (pronouns) {
                        hideElement(pronouns);
                    }
                }
            });
        }
    });
}

    function hidePronounsOnSearchUsers(root) {
    const userSearchCards = root.querySelectorAll('rhdc-user-search-card');
    userSearchCards.forEach(card => {
        if (card && card.shadowRoot) {
            const username = card.shadowRoot.querySelector('rhdc-username');
            if (username && username.shadowRoot) {
                const pronouns = username.shadowRoot.querySelector('.pronouns');
                if (pronouns) {
                    hideElement(pronouns);
                }
            }
        }
    });
}

    function hidePronounsOnUserPage(root) {
    const userHeader = root.querySelector('rhdc-user-header');
    if (userHeader && userHeader.shadowRoot) {
        const username = userHeader.shadowRoot.querySelector('rhdc-username');
        if (username && username.shadowRoot) {
            const pronouns = username.shadowRoot.querySelector('.pronouns');
            if (pronouns) {
                hideElement(pronouns);
                console.log('User Page Header - Hidden pronouns');
            }
        }
    }

    const userHacks = root.querySelector('rhdc-user-hacks');
    if (userHacks && userHacks.shadowRoot) {
        const hackCards = userHacks.shadowRoot.querySelectorAll('rhdc-hack-card');
        hackCards.forEach(card => {
            if (card && card.shadowRoot) {
                const usernames = card.shadowRoot.querySelectorAll('rhdc-username');
                usernames.forEach(username => {
                    if (username && username.shadowRoot) {
                        const pronouns = username.shadowRoot.querySelector('.pronouns');
                        if (pronouns) {
                            hideElement(pronouns);
                            console.log('User Page Hack Card - Hidden pronouns');
                        }
                    }
                });
            }
        });
    }
}

    function hidePronouns() {
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-hacks-list-page', 'rhdc-hack-card+'], hidePronounsOnListPage);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-hack-page'], hidePronounsOnDetailPage);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-hack-page', 'rhdc-hack-comments'], hidePronounsOnComments);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-home-page', 'rhdc-news'], hidePronounsOnMainPage);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-competitions-homepage'], hidePronounsOnCompetitions);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-leaderboard-page', 'rhdc-leaderboard'], hidePronounsOnLeaderboard);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-search-page', 'rhdc-hack-search'], hidePronounsOnSearchPage);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-search-page', 'rhdc-user-search'], hidePronounsOnSearchUsers);
        getDeepShadowRoot(['rhdc-page', 'rhdc-router', 'rhdc-user-page'], hidePronounsOnUserPage);
    }

    unsafeWindow.setInterval(hidePronouns, 100);
})();
