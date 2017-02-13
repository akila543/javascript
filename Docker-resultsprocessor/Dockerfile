FROM node
RUN apt-get update && apt-get install
ADD . /
WORKDIR /Pipeline
RUN ["npm", "install"]
CMD ["node", "index.js"]
