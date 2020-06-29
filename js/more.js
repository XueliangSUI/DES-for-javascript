function k64Tok56(k64, PC_1) {
	// console.log(k64, PC_1[1])
	let k56 = [];

	for (let i = 0; i < 56; i++) {
		// console.log('PC_1[i]',PC_1[i],'index',PC_1[i]-1,'k64[PC_1[i]-1]',k64[PC_1[i]-1])
		k56[i] = k64[PC_1[i] - 1]
	}
	// console.log(k64.length)
	return k56
}


function getCDArr(C, D, k56) {
	C[0] = k56.slice(0, 28)
	D[0] = k56.slice(28)
	C[1] = moveLeft(C[0], 1)
	D[1] = moveLeft(D[0], 1)
	C[2] = moveLeft(C[1], 1)
	D[2] = moveLeft(D[1], 1)
	C[3] = moveLeft(C[2], 2)
	D[3] = moveLeft(D[2], 2)
	C[4] = moveLeft(C[3], 2)
	D[4] = moveLeft(D[3], 2)
	C[5] = moveLeft(C[4], 2)
	D[5] = moveLeft(D[4], 2)
	C[6] = moveLeft(C[5], 2)
	D[6] = moveLeft(D[5], 2)
	C[7] = moveLeft(C[6], 2)
	D[7] = moveLeft(D[6], 2)
	C[8] = moveLeft(C[7], 2)
	D[8] = moveLeft(D[7], 2)
	C[9] = moveLeft(C[8], 1)
	D[9] = moveLeft(D[8], 1)
	C[10] = moveLeft(C[9], 2)
	D[10] = moveLeft(D[9], 2)
	C[11] = moveLeft(C[10], 2)
	D[11] = moveLeft(D[10], 2)
	C[12] = moveLeft(C[11], 2)
	D[12] = moveLeft(D[11], 2)
	C[13] = moveLeft(C[12], 2)
	D[13] = moveLeft(D[12], 2)
	C[14] = moveLeft(C[13], 2)
	D[14] = moveLeft(D[13], 2)
	C[15] = moveLeft(C[14], 2)
	D[15] = moveLeft(D[14], 2)
	C[16] = moveLeft(C[15], 1)
	D[16] = moveLeft(D[15], 1)
	console.log(C, D)
}


/**
 * 数组按位左移函数
 * @param {Object} 待处理数组
 * @param {Object} 左移位数
 */
function moveLeft(Arr, bit) {
	let tArr = JSON.parse(JSON.stringify(Arr))
	let t = tArr.slice(0,bit)
	for (let i = bit; i < tArr.length; i++) {
		tArr[i - bit] = tArr[i]
	}
	tArr.splice(tArr.length-bit)
	tArr.push(...t)
	// console.log(t)
	return tArr
}

/**
 * 获取16组子秘钥
 * @param {Object} C
 * @param {Object} D
 * @param {Object} PC_2
 */
function getKChildArr(C,D,PC_2){
	let kChild = [];
	for(let i=1;i<C.length;i++){
		kChild.push([])
		for(let j =0;j<PC_2.length;j++){
			kChild[i-1][j] =C[i].concat(D[i])[PC_2[j]-1] 
		}
		
	}
	console.log(kChild)
	return kChild
}

/**
 * 使明文进行初始化置换
 * @param {Object} M
 * @param {Object} initDisplace
 */
function letMDisplace(M,initDisplace){
	for(let i=0;i<initDisplace.length;i++){
		
	}
}