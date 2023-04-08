import { Item } from '@/stores/looks'

export const codeStr = (looks: Item[][], basePath: string) => {

  const map = looks.map((look, index) => (`
    <li id="area${index + 1}">
      <div>
        <ul>
          <li><img src="${basePath}/img/${index + 1}_1.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_2.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_3.jpg" alt="" width="690" height="970"></li>
          <li><img src="${basePath}/img/${index + 1}_4.jpg" alt="" width="690" height="970"></li>
        </ul>
      </div>

      <div>
        <div>
          <p>LOOK<span>_</span></p>
          <hr>
          ${
      look.map(item => (
        `
          <div>
            <a href="${item.href}" target="_blank">
              <p>${item.category}</p>
              <p>101-${item.productId}</p>
              <p>&yen;${item.price}</p>${item.sizes ? `
              <p>［${item.sizes}］</p>` : ''}
            </a>
          </div>
        `
      )).join("")
          }
          <div className="about-add__btn">
            <a href="/${`search?fr=${look.map((item, index) => (
                index == 0 ? `101-${item.productId}` : `+101-${item.productId}`
              )).join("")}&un=fku`}" target="_blank">
              <span>CHECK</span>
            </a>
          </div>
          <hr>
        </div>
      </div>
    </li>
  `)).join("")

return (`
<div>
  <ul>
    ${map}
  </ul>
</div>
`)
}