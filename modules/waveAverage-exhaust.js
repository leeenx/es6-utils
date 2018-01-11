// 波动均分 - 穷举法
function exhaustWave(n = 5, crest = 4, trough = 4) { 
	// 根节点
	let root = {
		parent: null, 
		count: null, 
		subtotal: 0
	}; 
	// 叶子（数组）
	let leaves = [root]; 
	// 层数 
	let level = 0; 
	// 检查当前组合是否合法
	let isOK = subtotal => {
		// 非最后一层
		if(level < n - 1) {
			if(-subtotal <= (n - level) * crest || subtotal <= (n - level) * trough) return true; 
		}
		// 最后一层总数必须等于0
		else if(subtotal === 0) return true; 
		// 默认为 false
		else return false; 
	}
	// 生成组合树 
	while(level < n) { 
		// 存储最新叶子
		let newLeaves = []; 
		// 遍历当前叶子
		leaves.forEach(node => {
			for(let count = -trough; count <= crest; ++count) {
				let subtotal = node.subtotal + count; 
				isOK(subtotal) && newLeaves.push(
					{
						parent: node, 
						count: count, 
						subtotal: subtotal
					}
				); 
			}
		}); 
		leaves = newLeaves; 
		++level; 
	}
	// 随机取一片叶子
	let leaf = leaves[Math.random() * leaves.length >> 0]; 
	let group = [leaf.count]; 
	for(let i = 0; i < 4; ++i) { 
		leaf = leaf.parent; 
		group.push(leaf.count); 
	}
	// 返回组合 
	return group; 
}
