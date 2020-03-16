// create debounce to make reusable code that can use for future later
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // hehe  chưa hiểu khúc này lắm, đã dành rất nhiều thời gian vẫn chưa thông nên tạm thời bỏ qua theo nguyên tắc 5 điểm
  // có thể mình chưa đủ kiến thức để hiểu nó
  // cái function ngay bên dưới từ đâu call ra hehe
  return (...args) => {
    // hehe có thể hiểu đơn giản thế này, trong thời gian chờ get data, nó chưa kịp get thì đã bị clear
    // nên chỉ khi nào dừng quá time out đã set thì nó mới fecth data
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
