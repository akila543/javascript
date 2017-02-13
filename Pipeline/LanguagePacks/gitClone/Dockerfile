FROM ubuntu
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y \
  nodejs \
  build-essential \
  git
RUN ln -s `which nodejs` /usr/local/bin/node
RUN ["npm","install","-g","mocha"]
RUN ["npm","install","-g","eslint"]
RUN ["npm","install","-g","eslint-plugin-promise"]
RUN ["npm","install","-g","eslint-config-standard"]
RUN ["npm","install","-g","eslint-plugin-standard"]
RUN ["npm","install","-g","htmlhint"]
RUN ["npm","install","-g","istanbul"]
RUN ["npm","install","-g","should"]
RUN ["npm","install","-g","esprima"]
ADD . /
COPY ./configFiles/* /tmp/
RUN chmod -R 0777 /stackroute
WORKDIR /
VOLUME /tmp
RUN ["npm","install"]
CMD ["npm","start"]
