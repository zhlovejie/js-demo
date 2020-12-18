# FLIP动画
>参考地址[https://aerotwist.com/blog/flip-your-animations/]

FLIP是一种助记缩写也是一种 Paul Lewis首创 的技术， 代表 First, Last, Invert, Play。 他的文章包含了对这一技术的一个很好的解释，但我会在这里概括一下：

First 记录元素动画前的位置和尺寸
Last 记录元素动画后的位置和尺寸，可以直接修改style，让元素瞬移过去
Invert 使用transform和opacity将元素恢复至动画前状态，即相反操作
Play 执行动画，将transform置为0或none，移动到动画后的位置和尺寸

这种动画方法，适合以下场景：

动画的Fist(初始态)或Last(最终态)不明确，这时候，使用FLIP非常容易做出动画效果。