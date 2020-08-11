//这是个关于闭包的面试题比较不错，理解了这个题目后，闭包也就不是问题了
function test(a, b) {
  console.log(b)
  return {
      test: function (c) {
          return test(c, a);
      }
  };
}

var retA = test(0); //第一次调用 生成了闭包引用 {a:0}
retA.test(2);  //后续同一对象上调用 引用的闭包相同 都是 {a:0}
retA.test(4);
retA.test(8);

var retB = test(0).test(2).test(4).test(8); //连续调用test函数  每次都生成新的闭包引用
var retC = test('good').test('bad'); //以最后一次 生成的闭包为准 
retC.test('good');
retC.test('bad');