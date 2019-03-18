const singleMarkTemplate = `<div class="card">
<div class="card-header">
    {% if properties.location %}{{ properties.location }} {% else %} {{ location }} {% endif %}
</div>
<div class="card-body">
      <div id="reviewResults" class="jumbotron" style="height: 50px; overflow: auto">
        {% if properties.review %} 
            <p>{{properties.review.author}}</p>
            <p>{{properties.review.description}}</p>
            <hr>     
        {% endif %}
      </div>
      <div>
          <h5>Ваш отзыв</h5>
          <form>
                <div class="form-group">
                  <input id="txtAuthor" type="text" class="form-control form-control-sm" placeholder="Ваше имя">
                </div>
                <div class="form-group">
                  <input id="txtLocation" type="text" class="form-control form-control-sm" placeholder="Укажите место">
                </div>
                <div class="form-group">
                    <textarea id="txtDescription" class="form-control form-control-sm" placeholder="Поделитесь вречатлениями"></textarea>
                </div>
                <button id="btnAdd" class="btn btn-primary float-right btn-sm">Добавить</button>
            </form>
      </div>
</div>
</div>`

const clusterTemplate = `<a id="aLocation" href="#" >{{ properties.location|raw }}</a>' +
'<div class=ballon_body>{{ properties.review.author|raw }}</div>' +
'<div class=ballon_footer>{{ properties.review.description|raw }}</div>`

export const SingleMarkTemplate = singleMarkTemplate;
export const ClusterTemplate = clusterTemplate;