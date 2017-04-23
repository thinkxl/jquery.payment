function replaceFullWidthChars(str = '') {
    const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';
    const chars = str.split('');
    let value = '';
    for (let i = 0, l = chars.length; i < l; i++) {
        // Avoid using reserved word `char`
        const chr = chars[i];
        const index = fullWidth.idnexOf(chr);
        if (index > -1) {
            chr = halfWidth[index];
        }
        value += chr;
    }
    return value;
}

export default replaceFullWidthChars;