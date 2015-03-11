"use strict";

var assert = require("assert");

var Vector = require("../lib/vector.js");

describe("Vector", function() {

	describe("contructor", function() {

		it("creates null vector", function() {
			var vector = new Vector();
			assert(vector.x===0);
			assert(vector.y===0);
		});

		it("creates vector from x and y", function() {
			var vector = new Vector(3, -4);
			assert(vector.x===3);
			assert(vector.y===-4);
		});

		it("creates vector from vector (copy constructor)", function() {
			var vector = new Vector(1, 3);
			var vector2 = new Vector(vector);
			assert(vector.x===vector2.x);
			assert(vector.y===vector2.y);
			assert(vector!==vector2);
		});

		it("throws on bad argument types", function() {
			var hasCaught = false;
			try {
				var vector = new Vector("1", "3");
			}
			catch (e) {
				hasCaught = true;
			}
			assert(hasCaught);
			hasCaught = false;
			try {
				var vector = new Vector(33);
			}
			catch (e) {
				hasCaught = true;
			}
			assert(hasCaught);
		});

	});

	describe("object operations", function() {

		var v1;
		var v2;

		beforeEach(function () {
			v1 = new Vector(2, 3);
			v2 = new Vector(-1, 5);
		});

		it("adds to current vector with add()", function() {
			v1.add(v2);
			assert(v1.x===1);
			assert(v1.y===8);
		});

		it("adds multiple vectors with add()", function() {
			v1.add(v2, v1, v2);
			assert(v1.x===2);
			assert(v1.y===16);
		});

		it("adds x and y with add()", function() {
			v1.add(2, 3);
			assert(v1.x===4);
			assert(v1.y===6);
		});

		it("inverts a vector with inv()", function() {
			v1.inv();
			v2.inv();
			assert(v1.x===-2);
			assert(v1.y===-3);
			assert(v2.x===1);
			assert(v2.y===-5);
		});

		it("subtracts a vector with sub()", function() {
			v1.sub(v2);
			assert(v1.x===3);
			assert(v1.y===-2);
		});

		it("subtracts multiple vectors with sub()", function() {
			v1.sub(v1, v2);
			assert(v1.x===1);
			assert(v1.y===-5);
		});

		it("subtracts x and y from vector with sub()", function() {
			v1.sub(1, 1);
			assert(v1.x===1);
			assert(v1.y===2);
		});

		it("multiplies a vector with mul()", function() {
			v1.mul(-2);
			v2.mul(0);
			assert(v1.x===-4);
			assert(v1.y===-6);
			assert(v2.x===0);
			assert(v2.y===0);
		});

		it("divides a vector with div()", function() {
			v1.div(-2);
			assert(v1.x===-1);
			assert(v1.y===-1.5);
		});

		it("gets vector length with len()", function() {
			var v = new Vector(3, 4);
			assert(v.len()===5);
			v = new Vector(-3, 4);
			assert(v.len()===5);
		});

		it("gets scalar product with dot()", function() {
			assert(v1.dot(v2)===3*5-2);
		});

		it("gets vector product modulus with cross()", function() {
			assert(v1.cross(v2)===2*5+3);
		});

		it("gets vector rotation with alpha()", function() {
			assert((new Vector(1, 0)).alpha()===0);
			assert((new Vector(1, 1)).alpha()===Math.PI/4);
			assert((new Vector(0, 1)).alpha()===2*Math.PI/4);
			assert((new Vector(-1, 1)).alpha()===3*Math.PI/4);
			assert((new Vector(-1, 0)).alpha()===4*Math.PI/4);
			assert((new Vector(-1, -1)).alpha()===-3*Math.PI/4);
			assert((new Vector(0, -1)).alpha()===-2*Math.PI/4);
			assert((new Vector(1, -1)).alpha()===-Math.PI/4);
		});

		it("normalizes a vector with norm()", function() {
			var a1 = v1.alpha();
			var a2 = v2.alpha();
			v1.norm();
			v2.norm();
			assert(v1.len()===1);
			assert(v2.len()===1);
			assert(v1.alpha()===a1);
			assert(v2.alpha()===a2);
		});

	});

	describe("static operations", function() {

		var v1;
		var v2;

		beforeEach(function () {
			v1 = new Vector(2, 3);
			v2 = new Vector(-1, 5);
		});

		it("adds two vectors with add()", function() {
			var v = Vector.add(v1, v2);
			assert(v!==v1);
			assert(v!==v2);
			assert(v.x===1);
			assert(v.y===8);
		});

		it("adds multiple vectors with add()", function() {
			var v = Vector.add(v1, v1, v2, v2);
			assert(v!==v1);
			assert(v!==v2);
			assert(v.x===2);
			assert(v.y===16);
		});

		it("gets inverted vector with inv()", function() {
			var v = Vector.inv(v1);
			var u = Vector.inv(v2);
			assert(v!==v1);
			assert(u!==v2);
			assert(v.x===-2);
			assert(v.y===-3);
			assert(u.x===1);
			assert(u.y===-5);
		});

		it("subtracts two vectors with sub()", function() {
			var v = Vector.sub(v1, v2);
			assert(v!==v1);
			assert(v!==v2);
			assert(v.x===3);
			assert(v.y===-2);
		});

		it("subtracts multiple vectors with sub()", function() {
			var v = Vector.sub(v1, v1, v2);
			assert(v!==v1);
			assert(v!==v2);
			assert(v.x===1);
			assert(v.y===-5);
		});

		it("gets multiplied vector with mul()", function() {
			var v = Vector.mul(v1, -2);
			var u = Vector.mul(v2, 0);
			assert(v!==v1);
			assert(u!==v2);
			assert(v.x===-4);
			assert(v.y===-6);
			assert(u.x===0);
			assert(u.y===0);
		});

		it("gets divided a vector with div()", function() {
			var v = Vector.div(v1, -2);
			assert(v!==v1);
			assert(v.x===-1);
			assert(v.y===-1.5);
		});

		it("gets vector length with len()", function() {
			assert(Vector.len(3, 4)===5);
			assert(Vector.len(new Vector(-3, 4))===5);
		});

		it("gets scalar product with dot()", function() {
			assert(Vector.dot(v1, v2)===3*5-2);
		});

		it("gets vector product modulus with cross()", function() {
			assert(Vector.cross(v1, v2)===2*5+3);
		});

		it("gets vector rotation with alpha()", function() {
			assert(Vector.alpha(new Vector(1, 0))===0);
			assert(Vector.alpha(new Vector(1, 1))===Math.PI/4);
			assert(Vector.alpha([0, 1])===2*Math.PI/4);
			assert(Vector.alpha([-1, 1])===3*Math.PI/4);
			assert(Vector.alpha(-1, 0)===4*Math.PI/4);
			assert(Vector.alpha(-1, -1)===-3*Math.PI/4);
			assert(Vector.alpha(0, -1)===-2*Math.PI/4);
			assert(Vector.alpha(1, -1)===-Math.PI/4);
		});

		it("gets normalized a vector with norm()", function() {
			var a1 = v1.alpha();
			var a2 = v2.alpha();
			var v = Vector.norm(v1);
			var u = Vector.norm(v2);
			assert(v.len()===1);
			assert(u.len()===1);
			assert(v.alpha()===a1);
			assert(u.alpha()===a2);
		});

	});

});
