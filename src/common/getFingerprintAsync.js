export default () => new Promise((response) => {
  setTimeout(() => response({ success: true }), 100);
});
