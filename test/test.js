
var Mode = require('../');
var assert = require('assert');

describe('stat-mode', function () {

  it('should export the `Mode` constructor', function () {
    assert.equal('function', typeof Mode);
    assert.equal('Mode', Mode.name);
  });

  describe('Mode', function () {

    it('should return a `Mode` instance with `new`', function () {
      var m = new Mode({});
      assert(m instanceof Mode);
    });

    it('should return a `Mode` instance without `new`', function () {
      var m = Mode({});
      assert(m instanceof Mode);
    });

    it('should throw an Error if no `stat` object is passed in', function () {
      try {
        new Mode();
        assert(false, 'unreachable');
      } catch (e) {
        assert.equal('must pass in a "stat" object', e.message);
      }
    });

    [
      {
        mode: 33188 /* 0100644 */,
        octal: '0644',
        string: '-rw-r--r--',
        type: 'file'
      },
      {
        mode: 16877 /* 040755 */,
        octal: '0755',
        string: 'drwxr-xr-x',
        type: 'directory'
      },
      {
        mode: 16832 /* 040700 */,
        octal: '0700',
        string: 'drwx------',
        type: 'directory'
      },
      {
        mode: 41325 /* 0120555 */,
        octal: '0555',
        string: 'lr-xr-xr-x',
        type: 'symbolicLink'
      },
      {
        mode: 8592 /* 020620 */,
        octal: '0620',
        string: 'crw--w----',
        type: 'characterDevice'
      },
      {
        mode: 24960 /* 060600 */,
        octal: '0600',
        string: 'brw-------',
        type: 'blockDevice'
      }
    ].forEach(function (test) {
      var m = new Mode(test);
      var isFn = 'is' + test.type[0].toUpperCase() + test.type.substring(1);
      describe('input: 0' + test.mode.toString(8), function () {
        describe('#toString()', function () {
          it('should equal "' + test.string + '"', function () {
            assert.equal(m.toString(), test.string);
          });
        });
        describe('#toOctal()', function () {
          it('should equal "' + test.octal + '"', function () {
            assert.equal(m.toOctal(), test.octal);
          });
        });
        describe('#' + isFn + '()', function () {
          it('should be `true`', function () {
            assert.ok(m[isFn]());
          });
        });
      });
    });

  });

});
