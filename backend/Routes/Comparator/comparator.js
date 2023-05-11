
const comparator = async (givenText, correctText) => {
    givenText=givenText.trim();
    correctText=correctText.trim();
    console.log("in comparator");
    // console.log(givenText, "vs ", correctText);
    const matchResult={
        status:'AC',
    }
    
    givenSplit=givenText.split(/\r?\n/);
    correctSplit=correctText.split(/\r?\n/);
    // console.log(givenSplit,correctSplit)
    if(!givenSplit || !correctSplit || givenSplit.length !== correctSplit.length){
        matchResult.status='WA'
    }else{
        let len=correctSplit.length;
        for(let i=0;i<len;i++){
            // console.log(givenSplit[i],correctSplit[i],givenSplit[i]===correctSplit[i]);
            if(givenSplit[i] !== correctSplit[i]){
                matchResult.status='WA';
                break;
            }
        }
    }
    console.log("matchResult : ",matchResult);
    return matchResult;
}

module.exports = {
    comparator: comparator
}