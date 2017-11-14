class P2angle {
	constructor() {
		// 默认认是左上角作用圆心
		this.center = {x: 0, y: 0};
	}
	// 设置圆心
	set(x = 0, y = 0) {
		this.center = {x, y}; 
	}
	// 获取当前点到圆心之间的角度(弧度值)
	get(x1 = 0, y1 = 0) {
		let x0 = this.center.x, 
		y0 = this.center.y, 
		x = x1 - x0, 
		y = y1 - y0, 
		// 90度的弧度值
		deg90 = Math.PI / 2, 
		// 当前孤度
		radian = Math.asin( y / Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2)) ); 
		// 注意web页面的坐标系非笛卡坐标系
		// 1象限
		if(x > 0 && y <= 0) {
			radian = -radian; 
		} 
		// 4 ~ 3象限
		else if(x <= 0 && y < 0 || x < 0 && y >= 0) {
			radian = 2 * deg90 + radian; 
		}
		// 2象限
		else if(x>=0 && y > 0) {
			radian = 4 * deg90 - radian; 
		}
		return radian; 
	}
	// 获取角度值
	getDegree(x =0, y = 0) {
		return this.get(x, y) * 180 / Math.PI; 
	}
}
let p2angle = new P2angle(); 
export default p2angle; 
