module.exports = {

	equalish: function(a, b, precision) {
		if (!precision)
			precision = 8;
		var p = Math.pow(10, precision);
		a = Math.round(a*p)/p;
		b = Math.round(b*p)/p;
		return a===b;
	}

};
