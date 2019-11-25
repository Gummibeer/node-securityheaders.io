const should = require('should');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

const securityheaders = require('./../src/index');

should.Assertion.add('SecurityheadersResponse', function (url, followRedirects, hide) {
    this.obj.should.be.an.Object().and.have.keys('link', 'url', 'domain', 'grade', 'headers');

    this.obj.link.should.be.a.String();
    const link = new URL(this.obj.link);
    link.hostname.should.be.equal('securityheaders.io');
    link.searchParams.has('q').should.be.true();
    link.searchParams.get('q').should.be.equal(url);

    if (followRedirects) {
        link.searchParams.has('followRedirects').should.be.true();
        link.searchParams.get('followRedirects').should.be.equal('on');
    } else {
        link.searchParams.has('followRedirects').should.be.false();
    }

    if (hide) {
        link.searchParams.has('hide').should.be.true();
        link.searchParams.get('hide').should.be.equal('on');
    } else {
        link.searchParams.has('hide').should.be.false();
    }

    this.obj.url.should.be.a.String().and.be.equal(url);

    this.obj.domain.should.be.a.String().and.be.equal((new URL(url)).hostname);

    this.obj.grade.should.be.a.String().and.equalOneOf('A+', 'A', 'B', 'C', 'D', 'E', 'F', 'R');

    this.obj.headers.should.be.an.Object().and.have.keys('missing', 'present');
    this.obj.headers.missing.should.be.an.Array();
    this.obj.headers.present.should.be.an.Array();
});

describe('node-securityheaders.io', function() {
    this.timeout(1000 * 5);
    this.slow(1000 * 2);

    it('default', done => {
        securityheaders('https://google.com').then(result => {
            result.should.be.a.SecurityheadersResponse('https://google.com', true, false);

            done();
        }).catch(done);
    });

    it('followRedirects=on hide=off', done => {
        securityheaders('https://google.com', true, false).then(result => {
            result.should.be.a.SecurityheadersResponse('https://google.com', true, false);

            done();
        }).catch(done);
    });

    it('followRedirects=off hide=on', done => {
        securityheaders('https://google.com', false, true).then(result => {
            result.should.be.a.SecurityheadersResponse('https://google.com', false, true);

            done();
        }).catch(done);
    });

    it('followRedirects=on hide=on', done => {
        securityheaders('https://google.com', true, true).then(result => {
            result.should.be.a.SecurityheadersResponse('https://google.com', true, true);

            done();
        }).catch(done);
    });

    it('followRedirects=off hide=off', done => {
        securityheaders('https://google.com', false, false).then(result => {
            result.should.be.a.SecurityheadersResponse('https://google.com', false, false);

            done();
        }).catch(done);
    });
});
