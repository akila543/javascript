function transfun(payload){return {repoUrl:payload.repository.url,message:payload.head_commit.message,pushedAt:payload.repository.updatedat,author:payload.head_commit.author.username};}
