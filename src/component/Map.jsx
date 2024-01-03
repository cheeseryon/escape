import React ,{useState,useEffect}from 'react'

const {kakao} = window
const Map = ({item}) => {
const [storeAddress , setStoreAddress] = useState('')

  useEffect(() => {
    var mapContainer = document.getElementById('map');
    var mapOption  = {
      center: new kakao.maps.LatLng(37.5009333761724 , 127.024581465886 ),
      level:3 
    };
    var map = new kakao.maps.Map(mapContainer, mapOption );
    var places = new kakao.maps.services.Places(map);
    places.keywordSearch(item.store , callback);

    function callback (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x))
        map.setBounds(bounds)

        var level = map.getLevel()
        map.setLevel(level + 2)
      }
      
      let marker = new kakao.maps.Marker({
        map : map,
        position: new kakao.maps.LatLng(result[0].y, result[0].x),
      })

      let content = '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/' + result[0].id + '" target="_blank">' +
        '    <span class="title">' + item.store + '</span>' +
        '  </a>' +
        '</div>';

      let customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(result[0].y, result[0].x),
        content: content,
        yAnchor: 1 
      });

      setStoreAddress(result[0].address_name)
    }
  }, [item.id])


  return (
    <div className="mapCompWrap">
      <div className="storeNameAndAddress">
        <h3>매장 위치</h3>
        <span>{storeAddress}</span>
      </div> 
      
      <div className="storeMap">
        <div id="map"></div>
      </div>
    </div>
  )
}

export default Map
