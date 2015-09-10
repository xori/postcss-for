var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts) {
    expect(postcss([require('postcss-simple-vars'), plugin(opts)]).process(input).css).to.eql(output);
};

describe('postcss-for', function () {

    it('it iterates from and to', function () {
        test('@for @i from 1 to 2 { .b-@i { width: @ipx; } }',
             '.b-1 {\n    width: 1px\n}\n.b-2 {\n    width: 2px\n}');
    });

    it('it iterates from bigger to smaller', function () {
        test('@for @i from 3 to 1 { .b-@i { width: @ipx; } }',
             '.b-3 {\n    width: 3px\n}\n.b-2 {\n    width: 2px\n}\n.b-1 {\n    width: 1px\n}');
    });

    it('it iterates from and to by two', function () {
        test('@for @i from 1 to 4 by 2 { .b-@i { width: @ipx; } }',
             '.b-1 {\n    width: 1px\n}\n.b-3 {\n    width: 3px\n}');
    });

    it('it supports nested loops', function () {
        test('@for @i from 1 to 2 { @for @j from 1 to 2 {.b-@i-@j {} } }',
             '.b-1-1 {}\n.b-1-2 {}\n.b-2-1 {}\n.b-2-2 {}');
    });

    it('it throws an error on wrong syntax', function () {
        expect(function () {
            test('@for @i since 1 until 3 { .b-@i { width: @ipx; } }');
        }).to.throw('<css input>:1:1: Wrong loop syntax');
    });

    it('it throws an error on wrong range parameters', function () {
        expect(function () {
            test('@for @i from a to c { .b-@i { width: @ipx; } }');
        }).to.throw('<css input>:1:1: Range parameter should be a number');
    });

    it('it work if range parameter is a variable', function () {
        test('$columns: 3; @for @i from 1 to $columns { .b-@i { width: @ipx; } }',
        '.b-1 {\n    width: 1px\n}\n.b-2 {\n    width: 2px\n}\n.b-3 {\n    width: 3px\n}');
    });

});
