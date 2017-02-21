const esprima = require('esprima');
const fs = require('fs');

const pl = "";eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 0=5(\'0\');2 7(){3 6}2 1(){3 1()}',8,8,'fs|a|function|return|const|require|10|b'.split('|'),0,{}))
//"//const fs = require('fs');function a(){return 10;}function a(){return 10;};"; //"function a(pl){var fp = {repo: pl.repository.full_name,author: pl.head_commit.author,branch: pl.ref,headCommitId: pl.head_commit.id,commitIds: pl.commits.map(function(elem){return elem.id;})};return fp;};";

var syntax = esprima.parse(pl);

// //recursive return rule//////////////////////////////////////////
function checkrec(obj) {
    if (obj.type === 'FunctionDeclaration') {
        var name = obj.id.name;
        if (obj.body.body[0].type === "ReturnStatement") {
            if (obj.body.body[0].argument.hasOwnProperty('callee')) {
                var called = obj.body.body[0].argument.callee;
                if (called.name === name) {
                    throw new Error("Recursive call!!!");
                } else {
                    console.log("you can proceed");
                }
            } else {
                console.log("you can proceed");
            }
        } else {
            console.log("not a return statement");
        }
    } else if (obj.type === "EmptyStatement") {
        console.log("EmptyStatement");
    } else if (obj.type === "VariableDeclaration") {
        if (obj.declarations[0].init.callee.name === 'require') {
            throw new Error("Imports not allowed!!!")
        } else {
            console.log("you can proceed");
        }
    } else {
        return "Not a function";
    }
};
// ////////////////////////////////////////////////////////////
syntax.body.map((prop) => {
    checkrec(prop);
});

var a,b,c;

var arr = Object.entries(syntax);

[a,b,c] = arr;
console.log("a="+ JSON.stringify(a),"b="+ JSON.stringify(b),"c="+ JSON.stringify(c),arr.length);

fs.writeFile(__dirname + '/../db/syntree.json', JSON.stringify(syntax), (err) => {
    if (err) {
        console.log(err);
    }
});
