"use strict";

var Vector = require("./vector");

var Line = function() {
	var args = Array.prototype.slice.call(arguments, 0);

	if (args.length===0) {
		this.start = new Vector();
		this.end = new Vector();
	}
	else if (args.length===1) {
		if (args[0] instanceof Vector) {
			this.start = new Vector();
			this.end = args[0];
		}
		else if (args[0] instanceof Array) {
			this.start = new Vector();
			this.end = new Vector(args[0][0], args[0][1]);
		}
		else
			throw new TypeError("Bad argument type (1 argument)");
	}
	else if (args.length===2) {
		if ((args[0] instanceof Vector) && (args[1] instanceof Vector)) {
			this.start = args[0];
			this.end = args[1];
		}
		else if ((args[0] instanceof Array) && (args[1] instanceof Array)) {
			this.start = new Vector(args[0][0], args[0][1]);
			this.end = new Vector(args[1][0], args[1][1]);
		}
		else if (typeof(args[0])==="number" && typeof(args[1])==="number") {
			this.start = new Vector();
			this.end = new Vector(args[0], args[1]);
		}
		else
			throw new TypeError("Bad argument type (2 arguments)");
	}
	else if (args.length===4) {
		this.start = new Vector(args[0], args[1]);
		this.end = new Vector(args[2], args[3]);
	}
	else
		throw new TypeError("Bad arguments count, expected 0, 1, 2 or 4");
};

Line.prototype.translate = function(x, y) {
	var v;
	if (x instanceof Vector)
		v = x;
	if (typeof(x)==="number" && typeof(y)==="number")
		v = new Vector(x, y);
	this.start.add(v);
	this.end.add(v);
};

Line.prototype.len = function() {
	return Vector.sub(this.end, this.start).len();
};

Line.prototype.alpha = function() {
	return Vector.sub(this.end, this.start).alpha();
};

Line.prototype.gain = function() {
	if (this.end.x===this.start.x) {
		if (this.end.y>this.start.y)
			return Infinity;
		else if (this.end.y<this.start.y)
			return -Infinity;
		else
			return NaN;
	}
	return (this.end.y-this.start.y)/(this.end.x-this.start.x);
};

Line.prototype.offset = function() {
	return this.start.y-this.start.x*this.gain();
};

Line.prototype.norm = function(p) {
	var v1 = Vector.sub(this.end, this.start);
	var v2 = Vector.sub(p, this.start);
	return 2*v1.cross(v2)/(this.len());
};

Line.prototype.mod = function(p) {
	var norm = this.norm(p);
	if (norm<0)
		return -norm;
	return norm;
};

Line.prototype.base = function(p) {
	var v1 = Vector.sub(this.end, this.start);
	var v2 = Vector.sub(p, this.start);
	return (v1.dot(v2)/(this.len()*this.len()));
};

module.exports = Line;
