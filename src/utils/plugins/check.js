const check = {
  mail (m) {
    return {
      k: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(m),
      v: m
    }
  },
  link (l) {
    if (l.length > 0) {
      l = /^(http|https)/.test(l) ? l : `http://${l}`
    }
    return {
      k:
        l.length > 0
          ? /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(
            l
          )
          : true,
      v: l
    }
  }
}
module.exports = check
