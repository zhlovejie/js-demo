# 图片懒加载DEMO

方式一：
>检测 offset.top < clientHeight + scrollTop

方式二：
>检测 getBoundingClientRect().top < clientHeight

方式三：
>利用  IntersectionObserver intersectionRatio值 监测dom是否可见
