import { GBUrl } from '../Default'
import timeAgo from './timeago'
const vcard = function (root, m) {
  m.set('nick', m.get('nick').slice(0, 20).trim().replace(/&/g, '&amp;').replace(/\//g, '&#x2F').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;'))
  const Hash = m.get('mailMd5')
  var gravatarUrl = `${GBUrl + Hash}?size=80&d=robohash`
  if ((typeof root.config.barrager == 'undefined') || (root.config.barrager)) {
    try {
      if (window.MV.barrager.enable) {
        if (typeof window.MV.barrager.bottom == 'undefined') {
          window.MV.barrager.bottom = $(window).height()
        }
        if (window.MV.barrager.bottom < 60) {
          window.MV.barrager.bottom = $(window).height() - 60
        } else {
          window.MV.barrager.bottom = window.MV.barrager.bottom - 60
        }
        var item = {
          img: gravatarUrl,
          info: m.get('comment').replace(/<[^>]+>/g, '').replace(/\n/g, '').replace(/\r\n/g, '').slice(0, 25).trim(),
          href: '#' + m.id,
          bottom: window.MV.barrager.bottom,
          close: true,
          speed: Math.random() * Math.random() * 60 + 20,
          color: '#ffffff',
          old_ie_color: '#ffffff'
        }
        $('body').barrager(item)
      }
    } catch (e) {}
  }
  if (root.mode === 'DesertsP') {
    const HTML = '<div class="vcomment-body">' +
			'<div class="vhead" >' +
				`<img class="vavatar lazyload" data-src="${gravatarUrl}"/>` +
				`<a rid='${m.id}' at='@${m.get('nick')}' class="vat" id="at-${m.id}">${root.i18n.reply}</a>` +
				`<div class="vmeta-info">${m.get('link') ? `<a class="vname" href="${m.get('link')}" target="_blank" rel="nofollow" > ${m.get('nick')}</a>` : `<span class="vname">${m.get('nick')}</span>`}${Hash === root.adminEmailMd5.toLowerCase().trim() ? '<span class="spacer">·</span><span class="vtime"><svg xmlns:xlink="http://www.w3.org/1999/xlink" p-id="1615" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" style="height: .8em;width: .8em;fill: #777;" class="icon" t="1559101574545"><defs><style type="text/css"></style></defs><path d="M582.044306 993.554603l17.113098-99.494753-72.233191-70.442285c-25.072678-24.27672-34.027206-57.109988-24.07773-87.555383 9.949475-30.445394 36.41508-51.538282 70.840264-56.51302l87.356393-12.735328c-3.780801-2.586864-7.163622-5.173727-10.347454-7.95958-10.944423-9.551496-18.705014-19.699961-23.480762-30.047415s-7.561601-21.092888-8.15857-31.440342c-0.596969-10.546444 0-20.893898 1.989895-31.042363 1.392927-8.15857 3.581811-15.123202 6.168675-20.893898 2.586864-5.770696 5.969685-10.546444 10.148465-14.725223 4.17878-3.97979 8.755538-7.95958 14.327244-11.541391 5.571706-3.780801 11.143412-8.15857 17.312087-13.730276 5.372717-4.775748 10.148465-11.342402 14.725223-19.898951 4.17878-8.357559 8.15857-17.113098 11.541391-25.868636 3.382822-9.949475 6.566654-20.694909 9.153517-31.440342 6.765643-1.989895 13.133307-5.571706 19.301982-11.143412 5.372717-4.775748 10.148465-11.342402 14.725223-19.898951 4.17878-8.556549 7.561601-19.699961 9.551496-34.027206 1.392927-10.944423 1.193937-19.898951-0.397979-27.460552-1.591916-7.561601-3.97979-13.531286-6.566654-18.307035-2.586864-5.571706-6.367664-9.750486-11.143412-12.337349 0.596969-27.062573-0.994948-54.324135-5.173727-81.386708-3.183832-23.082783-9.153517-47.558492-17.710066-73.626117s-21.291877-49.946366-38.205985-71.636222c-7.561601-9.551496-17.312087-18.904003-29.649436-28.05752-11.93937-9.153517-26.067625-17.312087-41.588807-24.873688-15.720171-7.561601-32.43529-13.531286-50.344345-18.307035s-37.012048-7.163622-56.51302-7.163622c-15.720171 0-31.838321 1.591916-48.35445 4.17878-16.715119 2.984843-33.032258 7.561601-49.349398 14.327244-16.31714 6.765643-32.43529 16.11815-48.35445 28.05752s-30.246405 27.062573-43.180723 45.369607c-13.531286 19.500972-23.878741 41.588807-31.042363 66.064516-7.163622 24.475709-12.13836 47.558492-14.725223 69.248348-3.581811 25.868636-4.775748 51.737272-4.17878 77.406918-5.571706 6.964633-9.750486 13.929265-12.337349 21.490867-2.785853 6.765643-4.576759 14.725223-5.571706 23.878741-1.193937 9.153517 0 19.699961 3.382822 31.042363 3.581811 11.541391 7.561601 20.29693 12.337349 26.465604 4.775748 6.168675 9.153517 10.944423 13.332297 14.327244 4.775748 3.581811 9.551496 5.770696 14.327244 7.163622 3.382822 10.745433 6.765643 21.291877 10.148465 31.440342 3.382822 8.755538 6.964633 17.312087 11.143412 25.868636 4.17878 8.556549 8.755538 15.123202 14.327244 19.898951 11.740381 9.551496 21.888846 18.705014 31.042363 27.460552 9.153517 8.755538 14.327244 21.291877 15.720171 37.609017 0.596969 10.347454 0.994948 19.898951 0.994948 28.654489 0 8.954528-1.591916 17.312087-4.576759 25.470657-2.984843 8.15857-8.556549 16.31714-16.31714 24.475709-7.760591 8.15857-18.705014 16.715119-33.032258 25.470657-17.511077 11.541391-38.006996 20.29693-61.487757 26.465604-23.480762 6.168675-125.761368 41.389817-147.849203 48.951419-21.888846 7.362612-41.190828 17.511077-57.507967 30.445394-16.11815 12.735328-26.266615 31.838321-30.445394 56.910999C2.387875 881.52351 0.994949 888.488143 4.57676 916.346674c3.581811 27.659541 9.153517 44.17567 16.715119 49.747377 6.168675 4.576759 23.679751 10.148465 52.931209 16.715119 29.251457 6.566654 213.11776 41.190828 426.633501 41.190828 27.858531 0 54.722114-0.596969 80.59075-1.790906C580.253401 1012.856585 580.45239 1003.305088 582.044306 993.554603z" p-id="1616"></path><path d="M1004.300038 748.399532l-106.459386-15.521182c-16.31714-2.387874-35.619122-16.31714-42.981733-31.241353l-47.558492-96.509911c-3.581811-7.362612-8.556549-11.143412-13.332297-11.143412-4.775748 0-9.551496 3.780801-13.332297 11.143412l-47.558492 96.509911c-7.362612 14.725223-26.664594 28.853478-42.981733 31.241353l-106.459386 15.521182c-16.31714 2.387874-20.09794 13.730276-8.15857 25.271667l77.008939 75.019044c11.740381 11.541391 19.102993 34.226195 16.31714 50.543335l-18.108045 106.061407c-1.989895 11.740381 2.586864 18.705014 10.745433 18.705014 3.183832 0 6.765643-0.994948 10.745433-3.183832l95.116984-50.145356c7.362612-3.780801 16.914108-5.770696 26.465604-5.770696 9.551496 0 19.301982 1.989895 26.465604 5.770696l95.116984 50.145356c3.97979 2.188885 7.760591 3.183832 10.745433 3.183832 8.15857 0 12.735328-6.964633 10.745433-18.705014l-18.108045-106.061407c-2.785853-16.31714 4.576759-39.001943 16.31714-50.543335l77.008939-75.019044C1024.198988 762.129808 1020.617177 750.787406 1004.300038 748.399532z" p-id="1617"></path></svg></span><span class="spacer">·</span>' : '<span class="spacer">·</span>'}` +
				`<span class="vtime">${timeAgo(m.get('createdAt'), root.i18n)}</span>` +
				'</div>' +
			'</div>' +
			`<section class="text-wrapper"  id="comment-${m.id}">` +
				`<div class="vcomment">${m.get('comment')}</div>` +
			'</section>' +
		'</div>' +
		'<div class="vcomment-children">' +
			'<div class="vshow-children-wrapper" style="display: none"></div>' +
			`<ul class="vlist" id="children-list-${m.id}"></ul>` +
		'</div>'
    return HTML
  } else if (root.mode === 'xCss') {
    let ua = m.get('ua') || ''
    let uaMeta = ''
    const svgstr = 'https://cdn.jsdelivr.net/gh/MiniValine/svg@master/'
    if (ua && !root.config.closeUA) {
      ua = uaparser(ua)
      try {
        if (ua.browser && ua.browser.name) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr
          const bn = ua.browser.name.toLowerCase()
          if (['samsung browser'].includes(bn)) {
            uaMeta += 'mobile-alt'
          } else if (['android browser'].includes(bn)) {
            uaMeta += 'android'
          } else if (['mobile safari', 'safari'].includes(bn)) {
            uaMeta += 'safari'
          } else if (['ie', 'iemobile'].includes(bn)) {
            uaMeta += 'internet-explorer'
          } else if (['wechat'].includes(bn)) {
            uaMeta += 'weixin'
          } else if (['qqbrowser', 'qqbrowserlite', 'qq'].includes(bn)) {
            uaMeta += 'qq'
          } else if (['baiduboxapp', 'baidu'].includes(bn)) {
            uaMeta += 'paw'
          } else if (['chrome', 'chromium', 'chrome headless', 'chrome webview'].includes(bn)) {
            uaMeta += 'chrome'
          } else if (['opera mobi', 'opera', 'opera coast', 'opera mini', 'opera tablet'].includes(bn)) {
            uaMeta += 'opera'
          } else if (['firefox', 'edge'].includes(bn)) {
            uaMeta += bn
          } else {
            uaMeta += 'snapchat-ghost'
          }
          uaMeta += '.svg"/></i>' +
			ua.browser.name +
			' ' +
			(ua.browser.version ? ua.browser.version : '') +
			'</span>' +
			' '
        } else {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'stars.svg"/></i>Magical APP</span>'
        }
        if (ua.os && ua.os.name) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr
          const on = ua.os.name.toLowerCase()
          if (['mac os', 'ios'].includes(on)) {
            uaMeta += 'apple'
          } else if (['chromium os'].includes(on)) {
            uaMeta += 'chrome'
          } else if (['firefox os'].includes(on)) {
            uaMeta += 'firefox'
          } else if (['windows phone', 'windows'].includes(on)) {
            uaMeta += 'windows'
          } else if (['android', 'linux', 'ubuntu', 'suse', 'redhat', 'fedora', 'centos', 'blackberry'].includes(on)) {
            uaMeta += on
          } else {
            uaMeta += 'snapchat-ghost'
          }
          uaMeta += '.svg"/></i>' +
			ua.os.name +
			' ' +
			(ua.os.version ? ua.os.version : '') +
			'</span>'
        } else {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'magic.svg"/></i>Magical OS</span>'
        }
      } catch (e) {}
    }
    if (root.config.region) {
      try {
        var loc = m.get('log').region.data.location
        if (loc) {
          uaMeta += '<span class="vsys"><i><embed class="msvg" src="' + svgstr + 'map.svg"/></i>' + loc + '</span>'
        }
      } catch (e) {}
    }
    var gat = ''
    if ((!root.config.closeFlag) && (!root.config.cloudflag)) {
      try {
        root.master = root.master.map(i => i.toLowerCase())
        root.friends = root.friends.map(i => i.toLowerCase())
        var ism = root.master.includes(m.get('mailMd5').toLowerCase())
        var isf = root.friends.includes(m.get('mailMd5').toLowerCase())
        gat = ism
          ? '<span class="vtag vmaster">' +
        root.tagMeta[0] +
        '</span>'
          : isf
            ? '<span class="vtag vfriend">' +
			root.tagMeta[1] +
			'</span>'
            : '<span class="vtag vvisitor">' +
			root.tagMeta[2] +
			'</span>'
      } catch (e) {}
    }
    if ((!root.config.closeFlag) && root.config.cloudflag) {
      try {
        var vRoles = root.cloudFlag.Roles
        var ehash = m.get('mailMd5').toLowerCase().toUpperCase()
        var vflag = root.cloudFlag.Users[ehash]
        if (!vflag) {
          gat = '<span class="vtag" style="background:' + `${vRoles.visitor && vRoles.visitor.color ? vRoles.visitor.color : '#828282'}` + ';">' + `${vRoles.visitor && vRoles.visitor.nick ? vRoles.visitor.nick : 'visitor'}` + '</span>'
        } else {
          gat = '<span class="vtag" style="background:' + `${root.cloudFlag.Roles[vflag] && root.cloudFlag.Roles[vflag].color ? root.cloudFlag.Roles[vflag].color : '#6cf'}` + ';">' + `${root.cloudFlag.Roles[vflag] && root.cloudFlag.Roles[vflag].nick ? root.cloudFlag.Roles[vflag].nick : 'visitor'}` + '</span>'
        }
      } catch (e) {}
    }
    gat = root.tagMeta.length ? gat : ''
    const HTML = '<div class="vcomment-body">' +
			'<div class="vhead" >' +
				`<img class="vavatar lazyload" data-src="${gravatarUrl}"/>` +
				`<a rid='${m.id}' at='@${m.get('nick')}' class="vat" id="at-${m.id}">${root.i18n.reply}</a>` +
				`<div class="vmeta-info">${m.get('link') ? `<a class="vname" href="${m.get('link')}" target="_blank" rel="nofollow" > ${m.get('nick')}</a>${gat}<span class="vsysinfo">${uaMeta}</span>` : `<span class="vname">${m.get('nick')}</span> ${gat} ${uaMeta}`}` +
				`<br/><span class="vtime">${timeAgo(m.get('createdAt'), root.i18n)}</span>` +
				'</div>' +
			'</div>' +
			`<section class="text-wrapper"  id="comment-${m.id}">` +
				`<div class="vcomment">${m.get('comment')}</div>` +
			'</section>' +
		'</div>' +
		'<div class="vcomment-children">' +
			'<div class="vshow-children-wrapper" style="display: none"></div>' +
			`<ul class="vlist" id="children-list-${m.id}"></ul>` +
		'</div>'
    return HTML
  }
}

module.exports = vcard
