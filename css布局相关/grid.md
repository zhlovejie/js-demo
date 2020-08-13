# grid 网格布局 

```CSS
.grid_container {
  display: grid;
  /**/
  /* grid-template-rows: 25% 25% 25% 25% ; */
  /* grid-template-columns: 25% 25% 25% 25% ; */
  /*简写*/
  /* grid-template-rows: repeat(4,25%); */
  /* grid-template-columns: repeat(4,25%); */

  /*根据宽度和高度自动计算 行和列数*/
  /* grid-template-rows: repeat(auto-fill,100px); */
  /* grid-template-columns: repeat(auto-fill,100px); */
  
  /*指定 行行 或 列列 之间的比例关系*/
  /* grid-template-rows: 1fr 2fr 2fr 1fr; */
  /* grid-template-columns: repeat(auto-fill,100px); */

  /*以上多种方式混用  auto 浏览器自动计算宽度，，minmax() 适应布局  [r1] 指定网格线的名称*/
  /* grid-template-rows: [r1]100px 1fr auto minmax(100px,2fr); */

  /* grid-template-rows: repeat(auto-fill,100px); */
  /* grid-template-columns: repeat(auto-fill,100px); */
  
  grid-template-rows: repeat(3,50px);
  grid-template-columns: repeat(3,50px);
  /* grid-row-gap:20px; */
  /* grid-column-gap:20px; */
  /* 行间距列间距 最新标准规定  grid- 前缀省略  gap 为 <row-gap> 和 <column-gap> 的简写*/
  gap: 20px;

  /*指定项目的排列方式 默认 row 先行后列 dense标示尽量填满不出现空格*/
  /* grid-auto-flow: row; */
  /* grid-auto-flow: row dense; */
  /*指定区域 网格的名称  */
  /* grid-template-areas: none; */
  grid-template-areas:'a b c' 'd e f' 'g h i';
  
  /*指定创建的多余网格的列宽和行高*/
  grid-auto-rows: 50px;
  grid-auto-columns: 50px;

  /*项目内容的对齐方式  place-items:<align-items>(垂直方向) <justify-items>(水平方向)  简写方式*/
  /* place-items: center; */
  /*整个项目内容在容器内的对齐方式  place-content:<align-content>(垂直方向) <justify-content>(水平方向)  简写方式*/
  /* place-content: center; */
}

.grid_item{
  /*指定项目分别定位在那根网格线*/
  /*grid-column-start: auto; 左边框所在的垂直网格线*/
  /*grid-column-end: auto;右边框所在的垂直网格线*/
  /*grid-row-start: auto;上边框所在的水平网格线*/
  /*grid-row-end: auto;下边框所在的水平网格线*/
  /*这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。*/
  /* grid-column-start: span 3; */
  /* grid-row-start: span 3; */

  /* grid-column:<grid-column-start> <grid-column-end> 简写 */
  /* grid-column: 1/3; */
  /* grid-row:<grid-row-start> <grid-row-end> 简写 */
  /* grid-row: 1/3; */

  /* grid-column: span 3; */
  /* grid-row: span 3; */
  
  /*指定项目放在哪一个区域*/
  /*还可用作 grid-area: <row-start> / <column-start> / <row-end> / <column-end>; 简写方式*/
  /* grid-area:auto; */
  grid-area: span 3 / span 3;

  /* place-self:<align-self>(垂直方向) <justify-self>(水平方向) 简写 */
  /* place-self:center; start | end | center | stretch; */
}
```