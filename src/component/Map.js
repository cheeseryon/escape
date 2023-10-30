import React ,{useState,useEffect}from 'react'

const {kakao} = window
const Map = ({item}) => {
  const [storeMap , setStoreMap] = useState()
  const [address , setAddress] = useState()
  useEffect(() => {
    setStoreMap(item.store)
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.5009333761724 , 127.024581465886 ),
      level:3 
    };
    
    var map = new kakao.maps.Map(container, options);
    
    var places = new kakao.maps.services.Places(map);
    places.keywordSearch(item.store , callback);

    function callback (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x))
        map.setBounds(bounds)
        displayMarker(result)
        var level = map.getLevel()
        map.setLevel(level + 2)

        setAddress(result[0])
      }
    };

    function displayMarker(data) {
      let marker = new kakao.maps.Marker({
        map : map,
        position: new kakao.maps.LatLng(data[0].y, data[0].x),
      })
    }
  }, [])

  return (
    <div>
      <div className="storeMap">
        <h3>매장 위치</h3>
        <div id="map"></div>
      </div>
    </div>
  )
}

export default Map
