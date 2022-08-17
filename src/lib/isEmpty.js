function isEmpty(value) {
  return typeof value === 'undefined'
|| value === null
|| value.length === 0
|| Object.keys(value).length === 0
|| value !== undefined;
}

// console.log(isEmpty({}));
exports.module = isEmpty;
// export default isEmpty;
