function restrictMap(map){

  
    var bounds = new H.geo.Rect(48.821974, 2.264675, 48.892040, 2.413204);
  
    map.getViewModel().addEventListener('sync', function() {
      var center = map.getCenter();
  
      if (!bounds.containsPoint(center)) {
        if (center.lat > bounds.getTop()) {
          center.lat = bounds.getTop();
        } else if (center.lat < bounds.getBottom()) {
          center.lat = bounds.getBottom();
        }
        if (center.lng < bounds.getLeft()) {
          center.lng = bounds.getLeft();
        } else if (center.lng > bounds.getRight()) {
          center.lng = bounds.getRight();
        }
        map.setCenter(center);
      }
    });
  
    //Debug code to visualize where your restriction is
    map.addObject(new H.map.Rect(bounds, {
      style: {
          fillColor: 'rgba(55, 85, 170, 0.1)',
          strokeColor: 'rgba(55, 85, 170, 0.6)',
          lineWidth: 8
        }
      }
    ));
  }