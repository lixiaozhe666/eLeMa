/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function UrlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  arr.forEach((item) => {
    let tempArr = item.substring(1).split('=')
    let id = tempArr[0]
    let value = tempArr[1]
    obj[id] = value
  })
  return obj
}
