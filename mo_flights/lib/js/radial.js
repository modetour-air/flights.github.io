$(document).ready(function () {
  let dialCurrentRotation = 0;
  const dataRadialMenu = ['','','','','','',''];
  const sliceSize = 360 / dataRadialMenu.length;
  
  const $radialMenu = $('.radial_menu');
  const $sideMenu = $('.m_side_menu');
  const $centerBtn = $('.m_center');
  
  let rafId = null;
  let lastRotation = 0;
  let startAngle = 0;
  let lastAngle = 0;
  
  $sideMenu.css('transition', 'transform 0.1s ease-out');
  
  const applyRotation = (rotation, immediate = false) => {
    if (rotation !== lastRotation) {
      if (immediate) {
        $sideMenu.css('transition', 'none');
      }
      $sideMenu.css('transform', `rotate(${rotation}deg)`);
      lastRotation = rotation;
      if (immediate) {
        $sideMenu[0].offsetHeight;
        $sideMenu.css('transition', 'transform 0.1s ease-out');
      }
    }
  }
  
  const getAngle = (x, y, rect) => {
    return Math.atan2(y - (rect.top + rect.height / 2), x - (rect.left + rect.width / 2)) * 180 / Math.PI;
  }
  
  const normalizeAngle = (angle) => {
    return ((angle % 360) + 360) % 360;
  }
  
  const getShortestRotation = (from, to) => {
    const diff = normalizeAngle(to - from);
    if (diff > 180) {
      return diff - 360;
    }
    return diff;
  }
  
  $radialMenu.on('touchstart', function (e) {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    const centerBtnRect = $centerBtn[0].getBoundingClientRect();
    startAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY, centerBtnRect);
    lastAngle = startAngle;
    
    applyRotation(dialCurrentRotation, true);
  });
  
  $radialMenu.on('touchmove', function (e) {
    e.preventDefault();
    
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    rafId = requestAnimationFrame(function() {
      const centerBtnRect = $centerBtn[0].getBoundingClientRect();
      const currentAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY, centerBtnRect);
      
      let deltaAngle = getShortestRotation(lastAngle, currentAngle);
      dialCurrentRotation += deltaAngle;
      
      applyRotation(dialCurrentRotation, true);
      
      lastAngle = currentAngle;
    });
  });
  
  $radialMenu.on('touchend', function () {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    dialCurrentRotation = Math.round(dialCurrentRotation / sliceSize) * sliceSize;
    
    let selectedIndex = Math.round(normalizeAngle(dialCurrentRotation) / sliceSize) % dataRadialMenu.length;
    selectedIndex = (selectedIndex + dataRadialMenu.length) % dataRadialMenu.length;
    
    const selectedItem = dataRadialMenu[selectedIndex];
    
    console.log('Selected index:', selectedIndex);
    console.log('Selected item:', selectedItem);
    
    applyRotation(dialCurrentRotation);
  });
  
  applyRotation(dialCurrentRotation, true);
});
