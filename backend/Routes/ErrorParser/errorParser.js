
const errorParser = (error,removePattern="",shiftLeft=3) => {
    let arrOfError = error.toString().split(removePattern)
    arrOfError.splice(0, shiftLeft)
    error = arrOfError.join(' ');
    return error;
}
module.exports = {
    errorParser: errorParser
}