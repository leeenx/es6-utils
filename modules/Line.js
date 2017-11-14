/*
  @ author: leeenx
  @ 直线类
*/

class Line {
	constructor(coordA, coordB) { 
		/*
			@ 一般公式: ax + by + c = 0
			@ 斜率公式： y = kx + d; 
		*/
		let a, b, c, k, radian, degree; 
		let {x: x0, y: y0} = coordA; 
		// coordB 不是坐标而是角度 ---- 斜率公式
		if(typeof(coordB) === "number") {
			// 坐标系转换
			let radian = coordB + Math.PI * 3 / 2; 
			k = Math.tan(radian); 
			a = -k; 
			b = 1; 
			c = -(y0 - k * x0); 
		}
		// 两个都是坐标 ---- 一般公式
		else { 
			let {x: x1, y: y1} = coordB; 
			a = y1 - y0, b = x0 - x1, c = x1 * y0 + x0 * y1;
		}
		this.a = a; 
		this.b = b; 
		this.c = c; 
		this.k = -a / b; 
		this.radian = radian; 
		this.degree = radian * 180 / Math.PI; 
	}
	// 目标点到线段的距离
	distanceFromCoord(x, y) { 
		let {a, b, c} = this; 
		return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b); 
	}
	// 求两线交点
	cross(line) {
		let {a: a0, b: b0, c: c0} = this; 
		let {a: a1, b: b1, c: c1} = line; 
		let x = (c1 / b1 - c0 / b0) / (a0 / b0 - a1 / b1); 
		let y = (c1 / a1 - c0 / a0) / (b0 / a0 - b1 / a1); 
		return {x, y} 
	}
	// 获取坐标 x
	getX(y) { 
		const {a, b, c} = this; 
		return -(b * y + c) / a; 
	}
	// 获取坐标 y
	getY(x) { 
		const {a, b, c} = this; 
		return -(a * x + c) / b; 
	}
}
