FROM node
MAINTAINER varun
RUN apt-get update && apt-get install
RUN mkdir /jobScheduler
ADD . /jobScheduler
WORKDIR /jobScheduler
RUN npm install
CMD ["node","index.js"]
