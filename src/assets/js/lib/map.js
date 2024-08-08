var map
var infowindow

var styles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [
      {
        weight: '2.00',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#9c9c9c',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7b7b7b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#EDEDED',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#EDEDED',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#EDEDED',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
]

let allInfoBox = document.querySelectorAll('.mapContentBox .conItem')
var PGSMap = {
  hideMapInfo: () => {
    allInfoBox.forEach((info) => {
      info.style.display = 'none'
    })
  },
  mapContinentInfo: function (id) {
    PGSMap.hideMapInfo()
    document.getElementById(id).style.display = 'block'
  },
  continentLocationMap: function (locations, latLng) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: window.innerWidth > 768 ? 9.8 : 8.5,
      controlSize: window.innerWidth > 768 ? 40 : 30,
      styles: styles,
      disableDefaultUI: true,
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: true,
      draggable: true,
      //  gestureHandling: 'none',
      draggableCursor: 'default',
    })

    var overlay, i
    var allMarkers = []

    for (i = 0; i < locations.length; i++) {
      var overlay = new CustomMarker(locations[i][0], map, {
        marker_id: locations[i][2],
        defaultclick: locations[i][3],
      })
      allMarkers.push(overlay)

      google.maps.event.addDomListener(
        overlay,
        'click',
        (function (overlay, i) {
          return function () {
            map.panTo(locations[i][0])

            PGSMap.mapContinentInfo(locations[i][2])
          }
        })(overlay, i)
      )
    }
  },
}

PGSMap.hideMapInfo()

function CustomMarker(latlng, map, args, defaultclick) {
  this.latlng = latlng
  this.args = args

  this.defaultclick = defaultclick

  this.setMap(map)
}
CustomMarker.prototype = new google.maps.OverlayView()
CustomMarker.prototype.draw = function () {
  var self = this
  var div = this.div

  if (!div) {
    div = this.div = document.createElement('div')
    div.className = 'map-marker-container'
    div.innerHTML =
      '<div class="marker-container">' +
      '<div class="marker-card">' +
      '<svg width="32.197" height="42.884" viewBox="0 0 32.197 42.884"><path d="M17.193,0c.851.14,1.712.24,2.553.427a16.163,16.163,0,0,1,12.23,12.905,17.678,17.678,0,0,1-1.228,9.62A44.6,44.6,0,0,1,25.1,32.841a79.556,79.556,0,0,1-8.31,9.632c-.552.548-.814.548-1.366,0A73.278,73.278,0,0,1,4.261,28.554,30.817,30.817,0,0,1,.376,19.44,16.057,16.057,0,0,1,14.732.068,1.8,1.8,0,0,0,15.012,0ZM16.1,8.711a7.368,7.368,0,1,0,7.384,7.376A7.378,7.378,0,0,0,16.1,8.711" transform="translate(-0.001)" fill="currentColor"/></svg>' +
      '</div>' +
      '</div>'
    google.maps.event.addDomListener(div, 'click', function (event) {
      let allBox = document.querySelectorAll('.map-marker-container')

      allBox.forEach((box) => {
        box.classList.remove('infoBox-opened')
      })
      google.maps.event.trigger(self, 'click')

      div.classList.add('infoBox-opened')
    })
    if (typeof self.args.marker_id !== 'undefined') {
      div.dataset.marker_id = self.args.marker_id
    }
    var panes = this.getPanes()
    panes.overlayImage.appendChild(div)

    if (
      typeof self.args.defaultclick !== 'undefined' &&
      self.args.defaultclick === true
    ) {
      div.click()
    }
  }
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng)
  if (point) {
    div.style.left = point.x + 'px'
    div.style.top = point.y + 'px'
  }
}
CustomMarker.prototype.remove = function () {
  if (this.div) {
    this.div.parentNode.removeChild(this.div)
    this.div = null
    $(this).removeClass('clicked')
  }
}
CustomMarker.prototype.getPosition = function () {
  return this.latlng
}
