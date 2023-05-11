//{ Driver Code Starts
//Initial Template for javascript

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    
    // console.log("hello world");
    let t = parseInt(readLine());
    let i = 0;
    for(;i<t;i++)
    {
        solve();
    }
}
function solve(){
    const msg=readLine();
    console.log("msg : ",msg);
}
// } Driver Code Ends


//User function Template for javascript

/**
 * @param {number} n
 * @return {number}
*/

class Solution {
    
    countFriendsPairings(n){
        console.log("hello")
    }
}