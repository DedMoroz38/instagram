exports.jsArrayToSQLArrayConverter = (jsArry) => {
  return '(' + jsArry.join(', ') + ')';
}