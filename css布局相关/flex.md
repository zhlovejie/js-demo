# flex 弹性布局 

```CSS
.flex_demo{
  display: flex;
  /*应用在容器上的*/
  flex-flow: row wrap; /*主轴方向<flex-direction> 和换行<flex-wrap> 简写 */
  justify-content: center; /*水平方向对齐方式*/
  align-items: center; /*垂直方向对齐方式*/
  /*应用在容器内项目上的*/
  order: 1; /*项目的显示顺序 默认0 最大越靠前*/
  /*项目放大<flex-grow> 缩小<flex-shrink> 分配钱占据主轴空间<flex-basis> 简写*/
  /*有两种默认值 auto(1 1 auto) 和 none (0 0 auto)*/
  flex: 1 1 150px; 
  /*单独定义 在交叉轴的对齐方式 默认覆盖<align-items> */
  align-self: center;
}
```