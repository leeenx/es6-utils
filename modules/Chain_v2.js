/*
	@author: leeenx
	@链表结构
*/

export default class Chain {
	constructor(datas = []) {
		// 三个指针
		this.HEAD = this.TAIL = this.POINTER = null;
		// 前驱
		this.NEXT = "next"; 
		// 后驱
		this.PREV = "prev"; 
		// 链表长度
		this.length = 0; 
		// 初化数据
		this.push(...datas); 
	}
	// 创建链表节点
	generateNode(data) { 
		// 匿名对象做节点
		return {
			data: data, 
			next: null, 
			prev: null
		}
	}

	// 向尾部插入节点
	push(...datas) {
		// 前后驱
		let {NEXT, PREV} = this; 
		datas.forEach((data) => {
			// 节点
			let node = this.generateNode(data), TAIL = this.TAIL; 
			// 前后驱指定
			if(null !== TAIL) { 
				[TAIL[NEXT], node[PREV]] = [node, TAIL]; 
			}
			// 尾指针指向当前节点
			this.setTail(node); 
			// 链表长度增加1
			++this.length; 
		});
		return true;
	}
	// 向头部插入节点 
	unshift(...datas) {
		// 前后驱
		let {NEXT, PREV} = this; 
		datas.forEach((datas) => { 
			// 节点
			let node = this.generateNode(data), HEAD = this.HEAD; 
			// 前后驱指定
			if(null !== HEAD) {
				[HEAD[PREV], node[NEXT]] = [node, HEAD]; 
			}
			// 头指针指向当前节点
			this.setHead(node); 
			// 链表长度增加1
			++this.length; 
		}); 
		return true;
	}
	// 从尾部删除节点，并返回它的data
	pop() {
		if(this.length === 0) return false; 
		// 前后驱, 头尾指针，普通指针
		let {NEXT, PREV, HEAD, TAIL, POINTER, TAIL: {data}} = this, newTail = TAIL[PREV]; 
		// 只有一个节点或没有节点，清空HEAD&TAIL&POINTER
		if(TAIL === HEAD) {
			this.setHead() & this.setTail() & this.setPointer(); 
		}
		// 尾指针后移一位
		else { 
			// 当前指针指向尾节点，向后移一位
			TAIL === POINTER && this.setPointer(newTail); 
			// 尾指针向后移一位
			this.setTail(newTail); 
			// 删除旧的尾节点与当前尾节点的前驱
			[TAIL, newTail[NEXT]] = [null, null]; 
		}
		// 链表长度减少1
		--this.length; 
		return data; 
	}
	// 从头部删除节点，并返回它的data
	shift() { 
		if(this.length === 0) return false; 
		// 前后驱, 头尾指针，普通指针
		let {NEXT, PREV, HEAD, TAIL, POINTER, HEAD: {data}} = this, newHead = HEAD[NEXT]; 
		// 只有一个节点或没有节点，清空HEAD&TAIL&POINTER
		if(TAIL === HEAD) {
			this.setHead() & this.setTail() & this.setPointer(); 
		}
		// 头指针前移一位
		else {
			// 当前指针指向头节点，向前移一位
			HEAD === POINTER && this.setPointer(newHead); 
			// 头指针向前移一位
			this.setHead(newHead); 
			// 删除旧的头节点与当前头节点的后驱
			[HEAD, newHead[PREV]] = [null, null]; 
		}
		// 链表长度减少1
		--this.length; 
		return data; 
	}
	// 返回指定索引节点的 data, 并把POINTER指向当前位置
	at(index = 0) {
		if(index < 0 || index >= this.length) return false; 
		// 指针回调至头部
		this.setPointer(); 
		// 前后驱, 头指针，普通指针
		let {NEXT, PREV, HEAD, POINTER} = this, cur = POINTER; 
		while(0 < index--) {
			cur = cur[NEXT]
		} 
		// 指针指向cur
		this.setPointer(cur); 
		return cur.data; 
	}
	// 返回当前节点的data，并把POINTER向前移一位
	next() {
		if(this.length === 0) return false; 
		// 前后驱, 普通指针
		let {NEXT, PREV, POINTER, POINTER: {data}} = this, newPointer = POINTER[NEXT]; 
		this.setPointer(newPointer); 
		return data; 
	}
	// 返回当前节点的data，并把POINTER向后移一位
	prev() {
		if(this.length === 0) return false; 
		// 前后驱, 普通指针
		let {NEXT, PREV, POINTER, POINTER: {data}} = this, newPointer = POINTER[PREV]; 
		this.setPointer(newPointer); 
		return data; 
	}
	// 返回当前节点的data
	curr() { 
		return this.POINTER.data; 
	}
	// 返回头节点的data
	first() {
		if(this.length === 0) return false; 
		return this.HEAD.data; 
	}
	// 返回尾节点的data
	last() {
		if(this.length === 0) return false; 
		return this.TAIL.data; 
	}
	// 在指定索引前插入节点
	insertBefore(index, ...datas) { 
		if(this.length === 0 || index >= this.length) return false; 
		this.at(index); 
		// 前后驱，普通指针
		let {NEXT, PREV, POINTER} = this, currNode = POINTER; 
		datas.forEach((data) => {
			let node = this.generateNode(data), prevNode = currNode[PREV]; 
			// 前后驱指定
			[currNode[PREV], node[NEXT], node[PREV]] = [node, currNode, prevNode]; 
			// POINTER非指向HEAD，前驱节点的NEXT指向新节点
			if(prevNode !== null) {
				prevNode[NEXT] = node; 
			}
			// POINTER指向HEAD，头指针更新为当前节点
			else {
				this.HEAD = node; 
			}
			// 链表长度增加1
			++this.length; 
		}); 
		return true; 
	}
	// 在指定索引后插入节点
	insertAfter(index, ...datas) {
		if(this.length === 0 || index >= this.length) return false; 
		this.at(index); 
		// 前后惨，普通指针
		let {NEXT, PREV, POINTER} = this, currNode = POINTER; 
		datas.forEach((data) => {
			let node = this.generateNode(data), nextNode = currNode[NEXT]; 
			// 前后驱指定
			[currNode[NEXT], node[PREV], node[NEXT]] = [node, currNode, nextNode]; 
			// POINTER非指向TAIL，后驱节点的PREV指向新节点
			if(nextNode !== null) {
				nextNode[PREV] = node; 
			}
			// POINTER指向TAIL，尾指针更新为当前节点
			else {
				this.TAIL = node; 
			}
			// 保持datas的插入顺序
			currNode = node; 
			// 链表长度增加1
			++this.length; 
		}); 
		return true; 
	}
	// 删除指定索引的节点，并节点的 data
	remove(index) { 
		if(index >= this.length || this.length === 0) return false; 
		let data = this.at(index), {NEXT, PREV, HEAD, TAIL, POINTER} = this, currNode = POINTER; 
		// 删除头节点 
		if(HEAD === POINTER) {
			this.shift(); 
		}
		// 删除尾节点
		else if(TAIL === POINTER) {
			this.pop(); 
		}
		// 中间节点
		else {
			let prevNode = currNode[PREV], nextNode = currNode[NEXT]; 
			[prevNode[NEXT], currNode, nextNode[PREV]] =[nextNode, null, prevNode]; 
			// 修改指针指向
			this.POINTER = nextNode; 
			// 链表长度减少1
			--this.length; 
		}
		return data;  
	}
	// clone
	clone() {
		let cp = new this.constructor(); 
		for(let data of this) {
			cp.push(data); 
		}
		return cp; 
	}
	// 快速反转
	reverse() { 
		[this.HEAD, this.TAIL, this.NEXT, this.PREV] = [this.TAIL, this.HEAD, this.PREV, this.NEXT]; 
		return true; 
	}
	// 克隆链表的一段切片
	slice(start = 0, end) { 
		let sliceChain = new this.constructor(); 
		if(start >= 0 && end > start) {
			// 限制end
			end = Math.min(end, this.length); 
			this.at(start); 
			while(start++ !== end) {
				sliceChain.push(this.next()); 
			}
		}
		return sliceChain; 
	}
	// 拼接chain链，并返回被删除部分
	splice(start, deleteCount, ...datas) { 
		if(start < 0 || start >= this.length) return false; 
		deleteCount = Math.min(this.length - start, deleteCount); 
		let removedChain = new this.constructor(); 
		// 删除节点
		while(deleteCount--) {
			removedChain.push(this.remove(start)); 
		}
		// 插入节点
		this.insertBefore(start, ...datas); 
		return removedChain; 
	}
	// 合并两条 chain
	concat(chain) {
		if(chain !== undefined && chain.length !== 0) {
			// NEXT/PREV 指向不同步
			if(this.NEXT !== chain.NEXT) {
				// 不同步，需要用 push 完成
				for(let data of chain) {
					this.push(data); 
				}	
			}
			// NEXT, PREV 同步，可以快速合并
			else {
				let {NEXT, PREV, HEAD, TAIL} = this; 
				// 空链表
				if(HEAD === TAIL === null) {
					this.setHead(chain.HEAD) & this.setTail(chain.TAIL) & setPointer(); 
				}
				// 非空链表
				else {
					let [headA, tailA, headB, tailB] = [this.HEAD, this.TAIL, chain.HEAD, chain.TAIL]; 
					// 尾指针指向新链表的尾指针
					this.TAIL = chain.TAIL; 
					// A链的尾结点[NEXT]指向B的头节点，B链的头结点[PREV]指向A的尾结点。完成串合
					[tailA[NEXT], headB[PREV]] = [headB, tailB]; 
					// 长度合并
					this.length += chain.length; 
				}
			}
		}
		return this; 
	}
	// 指定头指针
	setHead(node = null) {
		this.HEAD = node; 
		// 如果尾指针未指定，头尾指针同指向node
		this.TAIL === null && this.setTail(node); 
	}
	// 指定尾指针
	setTail(node = null) {
		this.TAIL = node; 
		// 如果头指针未指定，头尾指针同指向node
		this.HEAD === null && this.setHead(node); 
	}
	// 指定指针
	setPointer(node = this.HEAD) {
		this.POINTER = node; 
	}
	// 创建一个迭代接口
	[Symbol.iterator]() { 
		let that = this; 
		// POINTER 指向 HEAD
		this.setPointer(); 
		return (function* () { 
			while(that.POINTER !== null) {
				yield that.next(); 
			}
			// 指针停在最后一位
			that.POINTER = that.TAIL; 
		}()); 
	}
}
