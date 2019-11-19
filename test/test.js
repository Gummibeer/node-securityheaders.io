const expect = require('chai').expect;
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

const securityheaders = require('./../src/index');

describe('securityheaders', () => {
    describe('default', () => {
        it('should resolve an object', done => {
            securityheaders('https://google.com').then(result => {
                expect(result).to.be.an('object');

                done();
            }).catch(error => done(error));
        });

        it('should return a valid grade', done => {
            securityheaders('https://google.com').then(result => {
                expect(result).to.have.property('grade');
                expect(result.grade).to.be.a('string');
                expect(['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'R']).to.include(result.grade);

                done();
            }).catch(error => done(error));
        });

        it('should return the tested domain', done => {
            securityheaders('https://google.com').then(result => {
                expect(result).to.have.property('domain');
                expect(result.domain).to.be.a('string');
                expect(result.domain).to.equal('google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the tested url', done => {
            securityheaders('https://google.com').then(result => {
                expect(result).to.have.property('url');
                expect(result.url).to.be.a('string');
                expect(result.url).to.equal('https://google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the link to HTML test page', done => {
            securityheaders('https://google.com').then(result => {
                expect(result).to.have.property('link');
                expect(result.link).to.be.a('string');

                const link = new URL(result.link);
                expect(link.hostname).to.equal('securityheaders.io');
                expect(link.searchParams.has('q')).to.equal(true);
                expect(link.searchParams.get('q')).to.equal('https://google.com');
                expect(link.searchParams.has('followRedirects')).to.equal(true);
                expect(link.searchParams.get('followRedirects')).to.equal('on');
                expect(link.searchParams.has('hide')).to.equal(false);

                done();
            }).catch(error => done(error));
        });
    });

    describe('hide=on followRedirects=on', () => {
        it('should resolve an object', done => {
            securityheaders('https://google.com', true, true).then(result => {
                expect(result).to.be.an('object');

                done();
            }).catch(error => done(error));
        });

        it('should return a valid grade', done => {
            securityheaders('https://google.com', true, true).then(result => {
                expect(result).to.have.property('grade');
                expect(result.grade).to.be.a('string');
                expect(['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'R']).to.include(result.grade);

                done();
            }).catch(error => done(error));
        });

        it('should return the tested domain', done => {
            securityheaders('https://google.com', true, true).then(result => {
                expect(result).to.have.property('domain');
                expect(result.domain).to.be.a('string');
                expect(result.domain).to.equal('google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the tested url', done => {
            securityheaders('https://google.com', true, true).then(result => {
                expect(result).to.have.property('url');
                expect(result.url).to.be.a('string');
                expect(result.url).to.equal('https://google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the link to HTML test page', done => {
            securityheaders('https://google.com', true, true).then(result => {
                expect(result).to.have.property('link');
                expect(result.link).to.be.a('string');

                const link = new URL(result.link);
                expect(link.hostname).to.equal('securityheaders.io');
                expect(link.searchParams.has('q')).to.equal(true);
                expect(link.searchParams.get('q')).to.equal('https://google.com');
                expect(link.searchParams.has('followRedirects')).to.equal(true);
                expect(link.searchParams.get('followRedirects')).to.equal('on');
                expect(link.searchParams.has('hide')).to.equal(true);
                expect(link.searchParams.get('hide')).to.equal('on');

                done();
            }).catch(error => done(error));
        });
    });

    describe('hide=off followRedirects=off', () => {
        it('should resolve an object', done => {
            securityheaders('https://google.com', false, false).then(result => {
                expect(result).to.be.an('object');

                done();
            }).catch(error => done(error));
        });

        it('should return a valid grade', done => {
            securityheaders('https://google.com', false, false).then(result => {
                expect(result).to.have.property('grade');
                expect(result.grade).to.be.a('string');
                expect(['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'R']).to.include(result.grade);

                done();
            }).catch(error => done(error));
        });

        it('should return the tested domain', done => {
            securityheaders('https://google.com', false, false).then(result => {
                expect(result).to.have.property('domain');
                expect(result.domain).to.be.a('string');
                expect(result.domain).to.equal('google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the tested url', done => {
            securityheaders('https://google.com', false, false).then(result => {
                expect(result).to.have.property('url');
                expect(result.url).to.be.a('string');
                expect(result.url).to.equal('https://google.com');

                done();
            }).catch(error => done(error));
        });

        it('should return the link to HTML test page', done => {
            securityheaders('https://google.com', false, false).then(result => {
                expect(result).to.have.property('link');
                expect(result.link).to.be.a('string');

                const link = new URL(result.link);
                expect(link.hostname).to.equal('securityheaders.io');
                expect(link.searchParams.has('q')).to.equal(true);
                expect(link.searchParams.get('q')).to.equal('https://google.com');
                expect(link.searchParams.has('followRedirects')).to.equal(false);
                expect(link.searchParams.has('hide')).to.equal(false);

                done();
            }).catch(error => done(error));
        });
    });
});
