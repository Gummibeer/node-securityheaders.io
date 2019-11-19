const axios = require('axios');

/**
 * @param {string} url
 * @param {boolean} [followRedirects=true]
 * @param {boolean} [hide=false]
 *
 * @return string
 */
const buildApiUrl = function (url, followRedirects, hide) {
    followRedirects = followRedirects === undefined ? true : followRedirects;
    hide = hide === undefined ? false : hide;

    const apiUrl = new URL('https://securityheaders.io');
    const query = new URLSearchParams();
    query.append('q', url);

    if (hide) {
        query.append('hide', 'on');
    }

    if (followRedirects) {
        query.append('followRedirects', 'on');
    }

    apiUrl.search = query.toString();

    return apiUrl.toString();
};

/**
 * @param {string} url
 * @param {boolean} [followRedirects=true]
 * @param {boolean} [hide=false]
 */
const securityheaders = function (url, followRedirects, hide) {
    return new Promise(function (resolve, reject) {
        axios.get(buildApiUrl(url, followRedirects, hide)).then(response => {
            const grade = response.headers['x-grade'];
            const domain = (new URL((new URL(response.config.url)).searchParams.get('q'))).hostname;

            resolve({
                link: response.config.url,
                url: url,
                domain: domain,
                grade: grade,
            });
        }).catch(error => reject(error));
    });
};

module.exports = securityheaders;
