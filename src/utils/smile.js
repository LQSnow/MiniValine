import ajax from './plugins/ajax'

const smile = (root) => {
  root.emoticonList = []
  root.emoticon = []
  for (var i = 0; i < root.emoticonUrl.length; i++) {
    getSmile(root, root.emoticonUrl[i])
  }
}
const getSmile = (root, Url) => {
  ajax({
    url: Url + '/index.json',
    type: 'GET',
    success: function (data) {
      data = eval('(' + data + ')')
      var tmp = []
      for (var i = 0; i < data[0].length; i++) {
        tmp.push(Url + '/' + data[0][i])
        root.emoticon[data[0][i]] = Url + '/' + data[0][i]
      }
      root.emoticonList.push(tmp)
    }
  })
}
module.exports = smile
