function fetchCoinList() {
  // Localize jQuery variable
  var jQuery

  // ** HOW TO USE ** //
  // <script src="/scripts/coinscript.js"></script>
  // <div id="coin-list"></div>

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined) {
    var script_tag = document.createElement('script')
    script_tag.setAttribute('type', 'text/javascript')
    script_tag.setAttribute(
      'src',
      'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
    )
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () {
        // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          scriptLoadHandler()
        }
      }
    } else {
      // Other browsers
      script_tag.onload = scriptLoadHandler
    }
    // Try to find the head, otherwise default to the documentElement
    ;(
      document.getElementsByTagName('head')[0] || document.documentElement
    ).appendChild(script_tag)
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery
    main()
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true)
    // Call our main function
    main()
  }

  /******** Our main function ********/
  function main() {
    jQuery(document).ready(function ($) {
      // We can use jQuery here
      $.get(
        'https://killer-whale-backend-ro3qa.ondigitalocean.app/coin-list',
        (coinList) => {
          let { coin } = coinList
          var list = document.createElement('ul')
          list.setAttribute('style', 'list-style-type: none;')
          $.each(coin, (i) => {
            var li = document.createElement('li')

            li.appendChild(document.createTextNode(coin[i].coin))
            list.appendChild(li)
          })
          document.getElementById('coin-list').appendChild(list)
        }
      ).fail((error) => {
        console.log('Error retrieving coin list: ', error.responseText)
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetchCoinList()
})
