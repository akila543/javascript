module.exports = function(transfun, payload, callback) {
  (function() {
    const transform = (new Function('return ' + transfun))();
    console.log(transform);
    const transformedPayload = transform(payload);
    callback(null, transformedPayload);
  })();
};
