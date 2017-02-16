module.exports = function(f, payload, callback) {
  (function() {
    const transform = (new Function('return ' + f))();
    const transformedPayload = transform(payload);
    callback(null, transformedPayload);
  })();
};
