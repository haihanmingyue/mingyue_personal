import JSEncrypt from 'jsencrypt'
//去密钥生成网址去生成公钥和密钥 http://tools.jb51.net/password/rsa_encode

//加密给后端
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjjcMLMeDWCnGBVKozUJcWfkmISTQtsbtNAKJ6P4EPAb5RCV/Da5bJ6tNDNBcEdrnPZUo9THsmQL7cU9Dl3Abwf421uFKpUjyeSt3nnkAJxMq4zvEZr7HqDMqX3sP6xxeb3BxrqR3aBEf2Xu50ZitQ+nrY0u1ucdV70s4qisGmoQIDAQAB'

//前端用的解密，和后端解密的key不是同一个
const privateKey ='MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAJTF6zpEluC1abWF5ey9s+vh90FsJ288RDluS6mtlO0BrDdSzS7RjANsEdBUS6WLi6FGPkvKxBH4N7Od0jqaMDBw6aanPWrFvmT4bllF9Ko5gvc+JvwIOUjRE8ZqzQSuebvKocpbbwur9n4OFf/nilY6iqBoIiwO3+2pjpWIevGFAgMBAAECgYAAmBzFJg57NcZHDxKYxDYygDvKU1oB9/nmx9G+Cv8wBiRvsSE4KWaXgeg9ToTh06GaYosvps7rKnRgf4YeLUz5dv6mWmoJ8JAb1UrWXyPCJBxDXoaQVhAFWmb/VT504r/tGUBDgL3q9hCoetEQ0Q+zV8mG0W8l1lpyWhVw8cOiMQJBAMpCnkMt7YSEpR3tfIYoSATwtAiSrejZjHAVPdQEaoeHthN4qTwlwtJ4+sNeLjDBnYMx3RrXGxy3FwzQg4EFQ7UCQQC8TTPZxkebpW9DOwRhx7U40lf0XHKs1uTMPCn5CYOzO4Xor5rhv22K4vCclXUqa2nAhWemU9jz1nugH5oE8DiRAkEAx3rElAUsCFK6drXO5pG71gN/zCS+GLTW6YRJol1oo5qZXMLYRlYHu4VN7HlqnPOX4di/9MTKHJwGw8CysgD7MQJBALMotWPH3wv9XJ5YAbRTAl7860iJyWYf1HNp7vmPDuqygJdCtZeCvmP9xrcFEQR6TJUrmNHNR0fBU8CnMLDwKrECQQDGXSTXm7E1WrUZ7GkwuwxWeiPa5MVAQ2Iw/PbufU1pYgY/0fO3p3IznlNWkX7hi16fWFD2lSs4z7GxjvRaq58k'

/**
 * 最长加密长度
 */
const MAX_ENCRYPT_BLOCK = 117
/**
 * 最长解码长度
 */
const MAX_DECRYPT_BLOCK = 128

/**
 * @description RSA加密(支持长字符加密)
 */
export const encryptedData = (data: any) =>{
    //创建实例
    const jsEncrypt = new JSEncrypt({default_key_size: "1024"})
    // 设置公钥
    jsEncrypt.setPublicKey(
        `${publicKey}`
    )
    return jsEncrypt.encrypt(data);
}

/**
 * @description RSA解密(支持长字符解密)
 * @param data
 * @returns {PromiseLike<ArrayBuffer>}
 */
export const decryptedData = (data:any) =>{
    const jsEncrypt = new JSEncrypt({default_key_size: "1024"})
    //设置私钥
    jsEncrypt.setPrivateKey(
        `${privateKey}`
    )

    return jsEncrypt.decrypt(data);
}

