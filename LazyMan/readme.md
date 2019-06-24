## 面试题 LazyMan 

### 题目介绍
>实现一个LazyMan，可以按照以下方式调用:
>LazyMan("Hank")
>输出:
Hi! This is Hank!
>LazyMan("Hank").sleep(10).eat("dinner")
>输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
>LazyMan("Hank").eat("dinner").eat("supper")
>输出
Hi This is Hank!
Eat dinner~
Eat supper~
>LazyMan("Hank").sleepFirst(5).eat("supper")
>输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
>以此类推。


### 考察知识点
1. 方法链式调用
2. 类的使用和面向对象编程的思路
3. 最少知识原则，也即 迪米特法则（Law of Demeter）
4. 代码的书写结构和命名

### 题目思路解析
1. 看题目输出示例，可以确定这是拟人化的输出，也就是说：应该编写一个类来定义一类人，叫做LazyMan。可以输出名字、吃饭、睡觉等行为。
2. 从输出的句子可以看出，sleepFrist的优先级是最高的，其他行为的优先级一致。
3. 从三个例子来看，都得先调用LazyMan来初始化一个人，才能继续后续行为，所以LazyMan是一个接口。
4. 句子是按调用方法的次序进行顺序执行的，是一个队列。
