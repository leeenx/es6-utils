/**
 * @author leeenx
 * @description 返回4位的二进制
 */
export const getBinary = (decimal, binLen = 4) => {
    const prefix = new Array(binLen).fill('0').join('');
    const binString = `${prefix}${Number(decimal).toString(2)}`;
    const len = binString.length;
    return binString.substr(len - binLen);
  };
  
  // base64 字符表
  const base64Alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '+', '/'
  ];
  
  /**
   * @author leeenx
   * @description 返回 base64字符码
   * @param index number 索引值
   */
  export const getBase64Code = index => {
    return base64Alphabet[index];
  };
  
  /**
   * @author leeenx
   * @description 返回在 base64Alphabet 的索引值
   * @param base64Code string base64字符
   */
  const getBase64Index = base64Code =>
    base64Alphabet.findIndex(code => code === base64Code);
  
  /**
   * @author leeenx
   * @description 32uuid 压缩成 22base64码
   */
  export const compress32UUID = uuid => {
    const len = uuid.length;
    if (len !== 32) {
      throw '传入的 uuid 长度不为32';
    }
    // 二进制长串
    let binString = '';
    for (let i = 0; i < len; ++i) {
      binString += getBinary(parseInt(uuid.charAt(i), 16));
    }
    let base64String = '';
    // 每6位二进制转成一个 base64码
    for (let i = 0; i < 22; ++i) {
      const index = parseInt(binString.substr(i * 6, 6), 2);
      const base64Code = getBase64Code(index);
      base64String += base64Code;
    }
    return base64String;
  };
  
  /**
   * @author leeenx
   * @description 22base64码 解压出来 32uuid
   */
  export const decompress32UUID = base64 => {
    const len = base64.length;
    if (len !== 22) {
      throw '传入的 base64 长度不为22';
    }
    // 二进制长串
    let binString = '';
    for (let i = 0; i < len; ++i) {
      const base64Code = base64.charAt(i);
      const index = getBase64Index(base64Code);
      const bin = getBinary(index, i === len - 1 ? 2 : 6);
      binString += bin;
    }
    let uuid = '';
    for (let i = 0; i < 32; ++i) {
      const hexCode = parseInt(binString.substr(i * 4, 4), 2).toString(16);
      uuid += hexCode
    }
    return uuid;
  };
  
