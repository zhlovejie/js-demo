window.__TEMPLATE__ = `
    <article class="container" >
    <div id="recipe-media-container" class="recipe-media-container" >
        <video 
            id="recipe-media" 
            :poster="recipe.square_image.url_pattern | formatVedioPoster" 
            :src="recipe.square_video.url" 
            width="720" 
            height="720" 
            controls="controls" playsinline class="recipe-media" style="width: 100%;height:auto;" >
        </video>
    </div>
    <h1 class="recipe-name title-1" >{{recipe.name}} {{recipe.name_adj}}</h1>
    <section class="recipe-meta" >
        <div class="recipe-meta-item time" >
            <div class="meta-name" >时间</div>
            <div class="meta-value" >{{recipe.time_consuming}}</div>
        </div>
        <div class="recipe-meta-item difficulty" >
            <div class="meta-name" >难度</div>
            <div class="meta-value" >
                {{recipe.difficulty_text}}
            </div>
        </div>
        <div class="recipe-meta-item score" v-if="recipe.score > 1">
            <div class="meta-name" >评分</div>
            <div class="meta-value" >
                {{recipe.score | formatScore}}
                <span class="score-icons" v-for="star in calcScore(recipe.score)">
                    <img  src="//s.chuimg.com/dist/vcook/img/star-selected-unable.84fb468.png" width="16" height="16" >
                </span>
            </div>
        </div>
    </section>
    <hr class="divider" >
    <section class="recipe-ings" >
        <h3 class="title-2" >用料<span class="recipe-serving" v-if="recipe.serving.length > 0">{{recipe.serving}}</span></h3>
        <div class="ing-group" v-for="(item,index) in recipe.ing_groups" :key="index">
            <div class="ing-group-name" v-if="item.name.length > 0">{{item.name}}</div>
            <div class="ing-group-ings" >
                <div class="ing" v-for="(ing,index1) in item.ings" :key="index1">
                    <div class="ing-name" >{{ing.name}}</div>
                    <div class="ing-unit" >{{ing.amount}}</div>
                </div>
            </div>
        </div>
    </section>
    <section class="steps" >
        <div class="step" v-for="(step,index) in recipe.steps" :key="index">
            <h4 class="title-2" >制作步骤 {{index + 1}}</h4>
            <div class="step-text" >{{step.text}}</div>
        </div>
    </section>
    <section class="tips" >
        <h3 class="title-2" >诀窍点</h3>
        <p class="tips-content" >{{recipe.tips}}</p>
    </section>
    </article>
`
