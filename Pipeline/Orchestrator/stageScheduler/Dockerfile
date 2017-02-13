FROM node
RUN apt-get update && apt-get install
RUN mkdir /stageScheduler
ADD . /stageScheduler
WORKDIR /stageScheduler
RUN ["npm","install"]
CMD ["node","index.js"]
