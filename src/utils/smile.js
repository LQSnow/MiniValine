import ajax from './plugins/ajax'

const smile = (root) => {
  window.MV.emoticonUrl = root.emoticonUrl
  if (!window.MV.emoticonList) {
    let s = localStorage && localStorage.getItem('MiniValineSmile')
    if (s) {
      s = JSON.parse(s)
      if (s.emoticonUrl.length == root.emoticonUrl.length) {
        root.emoticonList = s.emoticonList
        root.emoticon = []
        for (var i = 0; i < root.emoticonList.length; i++) {
          for (var j = 0; j < root.emoticonList[i].length; j++) {
            root.emoticon[root.emoticonList[i][j].split('/')[root.emoticonList[i][j].split('/').length - 1]] = root.emoticonList[i][j]
          }
        }
        window.MV.emoticonList = root.emoticonList
        window.MV.emoticon = root.emoticon
        window.MV.getSmile = 0
      } else {
        window.MV.getSmile = 1
      }
    } else {
      window.MV.getSmile = 1
    }
    if (window.MV.getSmile) {
      root.emoticonList = []
      root.emoticon = []
      for (var k = 0; k < root.emoticonUrl.length; k++) {
        getSmile(root, root.emoticonUrl[k])
      }
      window.MV.emoticonList = root.emoticonList
      window.MV.emoticon = root.emoticon
    } else {
      root.emoticonList = window.MV.emoticonList
      root.emoticon = window.MV.emoticon
    }
    setTimeout(function () {
      localStorage && localStorage.setItem(
        'MiniValineSmile',
        JSON.stringify({
          emoticonUrl: window.MV.emoticonUrl,
          emoticonList: window.MV.emoticonList
        })
      )
    }, 5000)
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
