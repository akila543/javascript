FROM node
RUN apt-get update && apt-get install
RUN mkdir /stateInitializer
ADD . /stateInitializer
WORKDIR /stateInitializer
RUN npm install
CMD ["node","index.js"]
