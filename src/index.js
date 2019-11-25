const axios = require('axios');
const { JSDOM } = require('jsdom');

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
            const dom = new JSDOM(response.data);
            const headers = {
                missing: [],
                present: [],
            };

            Array.from(dom.window.document.getElementById('main').querySelectorAll('.reportSection .reportBody table.reportTable tr.tableRow td.tableCell li.headerItem')).forEach(node => {
                if (node.classList.contains('pill-green')) {
                    headers.present.push(node.textContent.toLowerCase());
                } else {
                    headers.missing.push(node.textContent.toLowerCase());
                }
            });

            resolve({
                link: response.config.url,
                url: url,
                domain: domain,
                grade: grade,
                headers: headers,
            });
        }).catch(error => reject(error));
    });
};

module.exports = securityheaders;
