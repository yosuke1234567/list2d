import { Item } from '@/stores/looks'

export const codeStr = (looks: Item[][], basePath: string) => {

  const map = looks.map((look, index) => (`
    <!-- スタイル ${index + 1} -->
    <li id="area${index + 1}">
      <div class="image_wrapper">
        <ul class="image">
          <li class="active fade"><img src="${basePath}/img/${index + 1}_1.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_2.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_3.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_4.jpg" alt="" width="690" height="970"></li>
        </ul>
        <!-- ここにサムネイル -->
      </div>

      <div class="about-add">
        <div class="about-add__inner">
          <p class="about-add__ttl">LOOK<span>_</span></p>
          <hr class="about-add__line-top">
          ${
      look.map(item => (
        `
          <div class="about-add__desc">
            <a href="${item.href}" target="_blank">
              <p class="about-add__desc-list">${item.category}</p>
              <p class="about-add__desc-list">101-${item.productId}</p>
              <p class="about-add__desc-list">&yen;${item.price}</p>${item.sizes ? `
              <p class="about-add__desc-list">［${item.sizes}］</p>` : ''}
            </a>
          </div>
        `
      )).join("")
          }
          <div class="about-add__btn">
            <a href="/${`search?fr=${look.map((item, index) => (
                index == 0 ? `101-${item.productId}` : `+101-${item.productId}`
              )).join("")}&un=fku`}" target="_blank">
              <span>CHECK</span>
            </a>
          </div>
          <hr class="about-add__line-under">
        </div>
      </div>
    </li><!-- /スタイル ${index + 1} -->
  `)).join("")

return (`
<div class="style_detail">
  <ul>
    ${map}
  </ul>
</div><!-- /.style_detail -->
`)
}