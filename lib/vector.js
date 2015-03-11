"use strict";

var Vector = function(x, y) {
	if (x===undefined) {
		this.x = 0;
		this.y = 0;
	}
	else if (typeof(x)==="number" && typeof(y)==="number") {
		this.x = x;
		this.y = y;
	}
	else if (x instanceof Object &&
		typeof(x.x)==="number" && typeof(x.y)==="number")
	{
		this.x = x.x;
		this.y = x.y;
	}
	else if (x instanceof Array &&
		typeof(x[0])==="number" && typeof(x[1])==="number")
	{
		this.x = x[0];
		this.y = x[1];
	}
	else
		throw new TypeError("Bad constructor arguments, expected numbers or object");
};

Vector.prototype.add = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	var x = this.x;
	var y = this.y;

	if (typeof(args[0])==="number" && typeof(args[1])==="number") {
		x += args[0];
		y += args[1];
	}
	for (var i=0; i<args.length; i++) {
		if (typeof(args[i].x)==="number" && typeof(args[i].y)==="number") {
			x += args[i].x;
			y += args[i].y;
		}
		if (args[i] instanceof Array) {
			if (typeof(args[i][0])==="number" && typeof(args[i][1])==="number") {
				x += args[i][0];
				y += args[i][1];
			}
		}
	}

	this.x = x;
	this.y = y;
	return this;
};

Vector.prototype.inv = function() {
	this.x *= -1;
	this.y *= -1;
	return this;
};

Vector.prototype.sub = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	var x = this.x;
	var y = this.y;

	if (typeof(args[0])==="number" && typeof(args[1])==="number") {
		x -= args[0];
		y -= args[1];
	}
	for (var i=0; i<args.length; i++) {
		if (typeof(args[i].x)==="number" && typeof(args[i].y)==="number") {
			x -= args[i].x;
			y -= args[i].y;
		}
		if (args[i] instanceof Array) {
			if (typeof(args[i][0])==="number" && typeof(args[i][1])==="number") {
				x -= args[i][0];
				y -= args[i][1];
			}
		}
	}

	this.x = x;
	this.y = y;
	return this;
};

Vector.prototype.mul = function(a) {
	this.x *= a;
	this.y *= a;
	return this;
};

Vector.prototype.div = function(a) {
	this.x /= a;
	this.y /= a;
	return this;
};

Vector.prototype.len = function() {
	return Math.sqrt(this.x*this.x+this.y*this.y);
};

Vector.prototype.dot = function(v) {
	return this.x*v.x+this.y*v.y;
};

Vector.prototype.cross = function(v) {
	return this.x*v.y-this.y*v.x;
};

Vector.prototype.alpha = function() {
	var ret = Math.atan(this.y/this.x);
	if (this.x<0 && this.y>=0)
		ret += Math.PI;
	if (this.x<0 && this.y<0)
		ret -= Math.PI;
	return ret;
};

Vector.prototype.norm = function() {
	var l = this.len();
	this.x /= l;
	this.y /= l;
	return this;
};

Vector.add = function() {
	var v = new Vector(arguments[0]);
	var args = Array.prototype.slice.call(arguments, 1);
	return v.add.apply(v, args);
};

Vector.sub = function() {
	var v = new Vector(arguments[0]);
	var args = Array.prototype.slice.call(arguments, 1);
	return v.sub.apply(v, args);
};

Vector.inv = function(v) {
	var ret = new Vector(v);
	return ret.inv();
};

Vector.mul = function(v, a) {
	var ret = new Vector(v);
	return ret.mul(a);
};

Vector.div = function(v, a) {
	var ret = new Vector(v);
	return ret.div(a);
};

Vector.len = function(a, b) {
	if (a instanceof Vector)
		return a.len();
	if (typeof(a)==="number" && typeof(b)==="number")
		return (new Vector(a, b)).len();
	return (new Vector(a)).len();
};

Vector.dot = function(a, b) {
	return a.dot(b);
};

Vector.cross = function(a, b) {
	return a.cross(b);
};

Vector.alpha = function(a, b) {
	if (a instanceof Vector)
		return a.alpha();
	if (typeof(a)==="number" && typeof(b)==="number")
		return (new Vector(a, b)).alpha();
	return (new Vector(a)).alpha();
};

Vector.norm = function(a, b) {
	if (typeof(a)==="number" && typeof(b)==="number")
		return (new Vector(a, b)).norm();
	return (new Vector(a)).norm();
};

module.exports = Vector;
