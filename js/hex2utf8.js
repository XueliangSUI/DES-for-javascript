function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
		 c = str.charCodeAt(i++);
		 switch(c >> 4)
		 { 
		   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
			 out += str.charAt(i-1);
			 break;
		   case 12: case 13:
			 char2 = str.charCodeAt(i++);
			 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			 break;
		   case 14:
			 char2 = str.charCodeAt(i++);
			 char3 = str.charCodeAt(i++);
			 out += String.fromCharCode(((c & 0x0F) << 12) |
				((char2 & 0x3F) << 6) |
				((char3 & 0x3F) << 0));
			 break;
		 }
    }

    return out;
}

/**
 * 来源：网络 博客园 172257861
 * https://www.cnblogs.com/kool/p/6695667.html
 */