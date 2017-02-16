const fs = require('fs');

var transformer = function(pl) {
    var fp = {
        repo: pl.repository.full_name,
        author: pl.head_commit.author,
        branch: pl.ref,
        headCommitId: pl.head_commit.id,
        commitIds: pl.commits.map((elem) => {
          return elem.id;
        });
    };
    return fp;
};

fs.readFile(__dirname + '/../db/payload.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        var transformedPayload = transformer(JSON.parse(data.toString()));
        console.log(transformedPayload);
    }
});
