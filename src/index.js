const axios = require('axios');

/**
 * @param {string} domain
 * @param {boolean} [followRedirects=true]
 * @param {boolean} [hide=false]
 *
 * @return string
 */
const buildUrl = function (domain, followRedirects, hide) {
    followRedirects = followRedirects === undefined ? true : followRedirects;
    hide = hide === undefined ? false : hide;

    const url = new URL('https://securityheaders.io');
    const query = new URLSearchParams();
    query.append('q', domain);

    if (hide) {
        query.append('hide', 'on');
    }

    if (followRedirects) {
        query.append('followRedirects', 'on');
    }

    url.search = query.toString();

    return url.toString();
};

/**
 * @param {string} domain
 * @param {boolean} [followRedirects=true]
 * @param {boolean} [hide=false]
 */
const securityheaders = function (domain, followRedirects, hide) {
    return new Promise(function (resolve, reject) {
        axios.get(buildUrl(domain, followRedirects, hide)).then(response => {
            const grade = response.headers['x-grade'];
            const domain = (new URL((new URL(response.config.url)).searchParams.get('q'))).hostname;

            resolve({
                link: response.config.url,
                domain: domain,
                grade: grade,
            });
        }).catch(error => reject(error));
    });
};

module.exports = securityheaders;
