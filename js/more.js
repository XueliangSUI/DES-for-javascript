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
	// console.log(C, D)
}


/**
 * 数组按位左移函数
 * @param {Object} 待处理数组
 * @param {Object} 左移位数
 */
function moveLeft(Arr, bit) {
	let tArr = JSON.parse(JSON.stringify(Arr))
	let t = tArr.slice(0, bit)
	for (let i = bit; i < tArr.length; i++) {
		tArr[i - bit] = tArr[i]
	}
	tArr.splice(tArr.length - bit)
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
function getKChildArr(C, D, PC_2) {
	let kChild = [];
	for (let i = 0; i < C.length; i++) {
		kChild.push([])
		for (let j = 0; j < PC_2.length; j++) {
			kChild[i][j] = C[i].concat(D[i])[PC_2[j] - 1]
		}

	}
	// console.log(kChild)
	return kChild
}

/**
 * 使明文进行初始化置换
 * @param {Object} M
 * @param {Object} initDisplace
 */
function letMDisplace(M, initDisplace) {
	let IP = []
	for (let i = 0; i < initDisplace.length; i++) {
		IP[i] = M[initDisplace[i] - 1]
	}
	// console.log(IP)
	return IP
}


function getFinal({
	L,
	R,
	IP,
	kChild48,
	E,
	ER,
	ERXORK,
	ERXORK_8x6,
	ERXORK_8x4,
	S1,
	S2,
	S3,
	S4,
	S5,
	S6,
	S7,
	S8,
	P,
	finalDisplaceArr
}) {
	L.push([])
	R.push([])
	L[0] = IP.slice(0, 32)
	R[0] = IP.slice(32)

	// console.log(kChild48[1])
	for (let i = 1; i < 17; i++) {
		L[i] = R[i - 1]

		ER[i - 1] = getERn(R[i - 1], E)
		ERXORK[i - 1] = XOR(ER[i - 1], kChild48[i])
		ERXORK_8x6[i - 1] = letERXORK_8x6(ERXORK[i - 1])
		ERXORK_8x4[i - 1] = getERXORK_8x4(ERXORK_8x6[i - 1], S1, S2, S3, S4, S5, S6, S7, S8, P)
		// console.log('P置换', getPDisplace(ERXORK_8x4[i - 1], P))
		console.log('P置换', binary2Hex(getPDisplace(ERXORK_8x4[i - 1], P)))
		R[i] = XOR(L[i - 1], getPDisplace(ERXORK_8x4[i-1], P))
		console.log("第", i, "轮，\nER[", i - 1, "]为", ER[i - 1], "\nERXORK_8x6[", i - 1, "]为", ERXORK_8x6[i - 1], `\nL[${i}]为`,
			L[i], `\nR${i}为`, R[i], `\nR${i}为`,binary2Hex(R[i]))
	}
	return getFinalDisplace(L[16], R[16], finalDisplaceArr)
	// console.log('L:', L, 'R:', R)
}


/**
 * 对a和b进行异或处理
 * @param {Object} a
 * @param {Object} b
 */
function XOR(a, b) {
	let result = []
	// let ERn = getERn()
	for (let i = 0; i < a.length; i++) {
		result[i] = a[i] ^ b[i]
	}
	// console.log(result)
	return result
}

/**
 * 获取ERn，也就是将R进行E处理
 * @param {Object} Rn
 * @param {Object} E
 */
function getERn(Rn, E) {
	// console.log('Rn', Rn)
	let ERn = []
	for (let i = 0; i < 48; i++) {
		ERn[i] = Rn[E[i] - 1]
	}
	// console.log('ERn', ERn)
	return ERn
}

/**
 * 将ERXORK的结果分成8*6组
 * @param {Object} ERXORK
 */
function letERXORK_8x6(ERXORK) {
	let ERXORK_8x6 = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	]
	for (let i = 0; i < 48; i++) {
		// console.log(i%6)
		ERXORK_8x6[Math.floor(i / 6)][i % 6] = ERXORK[i]
	}
	// console.log('ERXORK_8x6', ERXORK_8x6)
	return ERXORK_8x6
}
/**
 * 将ERXORK_8x6经过S盒置换生成ERXORK8x4
 * @param {Object} ERXORK_8x6
 * @param {Object} S1
 * @param {Object} S2
 * @param {Object} S3
 * @param {Object} S4
 * @param {Object} S5
 * @param {Object} S6
 * @param {Object} S7
 * @param {Object} S8
 * @param {Object} P
 */
function getERXORK_8x4(ERXORK_8x6n, S1, S2, S3, S4, S5, S6, S7, S8, P) {
	let ERXORK_8x4 = []
	let Srow = 0;
	let Scol = 0;
	let S = [S1, S2, S3, S4, S5, S6, S7, S8]
	let f = []
	let result = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	]
	for (let i = 0; i < 8; i++) {
		//获取首位与尾位进行字符串拼接并将其从二进制形式转换成十进制，即S盒行数
		Srow = parseInt(ERXORK_8x6n[i][0].toString() + ERXORK_8x6n[i][5], 2)
		//获取中间4位进行字符串拼接并将其从二进制形式转换成十进制，即S盒列数
		Scol = parseInt(ERXORK_8x6n[i][1].toString() + ERXORK_8x6n[i][2] + ERXORK_8x6n[i][3] + ERXORK_8x6n[i][4], 2)
		// 根据对应S盒行列获取值，并转换成二进制
		ERXORK_8x4[i] = S[i][Srow][Scol].toString(2)
		// 字符串转换为数组
		ERXORK_8x4[i] = ERXORK_8x4[i].split('')
		// 将上两步字符串转换为二进制后的高位缺0补齐
		for (;;) {
			if (ERXORK_8x4[i].length < 4) {
				ERXORK_8x4[i].unshift('0')
			} else if (ERXORK_8x4[i].length == 4) {
				break
			}
		}


	}
	console.log('S盒', binary2Hex(ERXORK_8x4[0]), binary2Hex(ERXORK_8x4[1]), binary2Hex(ERXORK_8x4[2]), binary2Hex(
		ERXORK_8x4[3]), binary2Hex(ERXORK_8x4[4]), binary2Hex(ERXORK_8x4[5]), binary2Hex(ERXORK_8x4[6]), binary2Hex(
		ERXORK_8x4[7]))
	return ERXORK_8x4


}

/**
 * 获取P盒置换结果
 * @param {Object} ERXORK_8x4n
 * @param {Object} P
 */
function getPDisplace(ERXORK_8x4n, P) {
	let f = []
	let ERXORK_32n = []
	for (let i = 0; i < ERXORK_8x4n.length; i++) {
		ERXORK_32n.push(...ERXORK_8x4n[i])
		// for(let j = 0;j<ERXORK_8x4n[i].length;j++){

		// }
	}
	// console.log(ERXORK_32n,P)
	for (let i = 0; i < 32; i++) {
		f[i] = ERXORK_32n[P[i] - 1]
	}
	// console.log('f', f)
	return f
}

/**
 * 进行最终的置换
 * @param {Object} L16
 * @param {Object} R16
 * @param {Object} finalDisplace
 */
function getFinalDisplace(L16, R16, finalDisplaceArr) {
	let Arr = JSON.parse(JSON.stringify(R16)).concat(L16)
	// console.log(finalDisplaceArr)
	let result = []
	for (let i = 0; i < finalDisplaceArr.length; i++) {
		result[i] = Arr[finalDisplaceArr[i] - 1]
	}
	console.log(result)
	return result
}

/**
 * 二进制转十六进制
 * @param {Object} binary
 */
function binary2Hex(binary) {
	let hex = []
	let t = ''
	let hex_array = [{
		key: 0,
		val: "0000"
	}, {
		key: 1,
		val: "0001"
	}, {
		key: 2,
		val: "0010"
	}, {
		key: 3,
		val: "0011"
	}, {
		key: 4,
		val: "0100"
	}, {
		key: 5,
		val: "0101"
	}, {
		key: 6,
		val: "0110"
	}, {
		key: 7,
		val: "0111"
	}, {
		key: 8,
		val: "1000"
	}, {
		key: 9,
		val: "1001"
	}, {
		key: 'a',
		val: "1010"
	}, {
		key: 'b',
		val: "1011"
	}, {
		key: 'c',
		val: "1100"
	}, {
		key: 'd',
		val: "1101"
	}, {
		key: 'e',
		val: "1110"
	}, {
		key: 'f',
		val: "1111"
	}]

	for (let i = 0; i < binary.length; i++) {
		if (i % 4 == 3) {
			t = binary[i - 3].toString() + binary[i - 2] + binary[i - 1] + binary[i]
			// console.log(i)
			for (let j = 0; j < hex_array.length; j++) {
				if (t == hex_array[j].val) {
					hex.push(hex_array[j].key)
				}
			}
		} else {
			continue
		}
	}

	return hex
}

/**
 * 十六进制转二进制
 * @param {Object} hex
 */
function hex2Binary(hex) {
	let binary = []
	let t = ''
	let hex_array = [{
		key: 0,
		val: "0000"
	}, {
		key: 1,
		val: "0001"
	}, {
		key: 2,
		val: "0010"
	}, {
		key: 3,
		val: "0011"
	}, {
		key: 4,
		val: "0100"
	}, {
		key: 5,
		val: "0101"
	}, {
		key: 6,
		val: "0110"
	}, {
		key: 7,
		val: "0111"
	}, {
		key: 8,
		val: "1000"
	}, {
		key: 9,
		val: "1001"
	}, {
		key: 'a',
		val: "1010"
	}, {
		key: 'b',
		val: "1011"
	}, {
		key: 'c',
		val: "1100"
	}, {
		key: 'd',
		val: "1101"
	}, {
		key: 'e',
		val: "1110"
	}, {
		key: 'f',
		val: "1111"
	}]

	for (let i = 0; i < hex.length; i++) {
		if (i % 4 == 3) {
			t = hex[i - 3].toString() + hex[i - 2] + hex[i - 1] + hex[i]
			// console.log(i)
			for (let j = 0; j < hex_array.length; j++) {
				if (t == hex_array[j].val) {
					hex.push(hex_array[j].key)
				}
			}
		} else {
			continue
		}
	}

	return binary
}
