const hash = require("hash.js")

exports.hashValue = (value) => {
    return hash.sha256().update(value).digest("hex")
}

exports.verifyValueHash = (value,original) => {
    const valueHash = hash.sha256().update(value).digest("hex")
    
    return valueHash === original
}