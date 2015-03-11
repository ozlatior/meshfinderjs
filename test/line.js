"use strict";

var assert = require("assert");

var equalish = require("./testutil").equalish;

var Line = require("../lib/line");
var Vector = require("../lib/vector");

describe("Line", function() {

	describe("constructor", function() {

		it("creates null line", function() {
			var line = new Line();
			assert(line.start.x===0);
			assert(line.start.y===0);
			assert(line.end.x===0);
			assert(line.end.y===0);
		});

		it("creates line from origin to one point", function() {
			var v = new Vector(2, 3);
			var line = new Line(v);
			assert(line.start.x===0);
			assert(line.start.y===0);
			assert(line.end.x===2);
			assert(line.end.y===3);
		});

		it("creates line from point to point", function() {
			var p1 = new Vector(2, 3);
			var p2 = new Vector(3, 5);
			var line = new Line(p1, p2);
			assert(line.start.x===2);
			assert(line.start.y===3);
			assert(line.end.x===3);
			assert(line.end.y===5);
		});

		it("creates line from coordinates", function() {
			var line = new Line(2, 3);
			assert(line.start.x===0);
			assert(line.start.y===0);
			assert(line.end.x===2);
			assert(line.end.y===3);
		});

		it("creates line from full coordinates set", function() {
			var line = new Line(2, 3, 3, 5);
			assert(line.start.x===2);
			assert(line.start.y===3);
			assert(line.end.x===3);
			assert(line.end.y===5);
		});

		it("creates line from array coordinates", function() {
			var line = new Line([2, 3]);
			assert(line.start.x===0);
			assert(line.start.y===0);
			assert(line.end.x===2);
			assert(line.end.y===3);
		});

		it("creates line from full array coordinates set", function() {
			var line = new Line([2, 3], [3, 5]);
			assert(line.start.x===2);
			assert(line.start.y===3);
			assert(line.end.x===3);
			assert(line.end.y===5);
		});

		it("throws on bad argument types", function() {
			var hasCaught = false;
			try {
				var line = new Line("3", "4");
			}
			catch (e) {
				hasCaught = true;
			}
			assert(hasCaught);
		});

	});

	describe("transformations", function() {

		it("translates line with translate()", function() {
			var line = new Line(3, 4, 6, 7);
			line.translate(new Vector(1, 2));
			assert(line.start.x===4);
			assert(line.start.y===6);
			assert(line.end.x===7);
			assert(line.end.y===9);
			line.translate(-1, -2);
			assert(line.start.x===3);
			assert(line.start.y===4);
			assert(line.end.x===6);
			assert(line.end.y===7);
		});

	});

	describe("calculations", function() {

		it("gets line segment length with len()", function() {
			var line = new Line(1, 3, 4, 7);
			assert(line.len()===5);
		});

		it("gets line orientation with alpha()", function() {
			var line;
			line = new Line(2, 2, 3, 2);
			assert(line.alpha()===0);
			line = new Line(2, 2, 3, 3);
			assert(line.alpha()===1*Math.PI/4);
			line = new Line(2, 2, 2, 3);
			assert(line.alpha()===2*Math.PI/4);
			line = new Line(2, 2, 1, 3);
			assert(line.alpha()===3*Math.PI/4);
			line = new Line(2, 2, 1, 2);
			assert(line.alpha()===4*Math.PI/4);
			line = new Line(2, 2, 1, 1);
			assert(line.alpha()===-3*Math.PI/4);
			line = new Line(2, 2, 2, 1);
			assert(line.alpha()===-2*Math.PI/4);
			line = new Line(2, 2, 3, 1);
			assert(line.alpha()===-1*Math.PI/4);
		});

		it("gets line y gain with gain()", function() {
			var line = new Line(1, 1, 2, 3);
			assert(line.gain()===2);
		});

		it("gets line y intersection with offset()", function() {
			var line = new Line(1, 1, 3, 2);
			assert(line.offset()===0.5);
		});

		it("gets line normal distance to point with norm()", function() {
			var line = new Line(1, 1, 2, 2);
			var p1 = new Vector(1, 2);
			var p2 = new Vector(2, 1);
			var p3 = new Vector(3, 3);
			assert(equalish(line.norm(p1), Math.sqrt(2)));
			assert(equalish(line.norm(p2), -Math.sqrt(2)));
			assert(equalish(line.norm(p3), 0));
		});

		it("gets line normal modulus to point with mod()", function() {
			var line = new Line(1, 1, 2, 2);
			var p1 = new Vector(1, 2);
			var p2 = new Vector(2, 1);
			var p3 = new Vector(3, 3);
			assert(equalish(line.mod(p1), Math.sqrt(2)));
			assert(equalish(line.mod(p2), Math.sqrt(2)));
			assert(equalish(line.mod(p3), 0));
		});

		it("gets normalized normal intersection point with base()", function() {
			var line = new Line(1, 1, 2, 2);
			var p1 = new Vector(1, 2);
			var p2 = new Vector(2, 1);
			var p3 = new Vector(3, 3);
			assert(equalish(line.base(p1), 0.5));
			assert(equalish(line.base(p2), 0.5));
			assert(equalish(line.base(p3), 2));
		});

	});

});
