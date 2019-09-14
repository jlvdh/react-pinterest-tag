/* pinterest wrapper */

let initialized = false
let debug = false

const verifyInit = () => {
  if (!initialized) {
    console.warn('Pixel not initialized before using call ReactPixel.init with required params')
  }
  return initialized
}

const log = (...args) => {
  console.info(...['[pinterest-tracking]'].concat(args))
}

//
const defaultOptions = {
  debug: false
}

export default {
  init (uniqueTagId, userEmail, options = defaultOptions) {
    const em = {
      em: userEmail
    }

    /* eslint-disable */
      !function(e){if(!window.pintrk){window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
          n=window.pintrk;n.queue=[],n.version="3.0";var
          t=document.createElement("script");t.async=!0,t.src=e;var
          r=document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
      /* eslint-enable */

    if (!uniqueTagId) {
      console.warn('Please insert unique Tag id for initializing')
    } else {
      pintrk('load', uniqueTagId, userEmail ? em : {}) // eslint-disable-line no-undef

      initialized = true
      debug = options.debug
    }
  },

  pageView () {
    if (!verifyInit()) {
      return
    }

    pintrk('page') // eslint-disable-line no-undef

    if (debug) {
      log('called pintrk(\'page\');')
    }
  },

  track (title, data) {
    if (!verifyInit()) {
      return
    }

    pintrk('track', title, data) // eslint-disable-line no-undef

    if (debug) {
      log(`called fbq('track', '${title}');`)
      if (data) {
        log('with data', data)
      }
    }
  },

  pintrk (...args) {
    if (!verifyInit()) {
      return
    }

    pintrk(...args) // eslint-disable-line no-undef

    if (debug) {
      log(`called pintrk('${args.slice(0, 2).join('\', \'')}')`)

      if (args[2]) {
        log('with data', args[2])
      }
    }
  }
}
