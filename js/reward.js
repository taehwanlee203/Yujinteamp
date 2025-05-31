const pointKey = 'userPoint';
const stepKey = 'stepCount';
let prevPosition = null;
let totalDistance = 0;

// 자치센터 좌표 (예: 부천시청 근처)
const centerLat = 37.503274;
const centerLng = 126.766204;
const centerRadius = 100; // meters
let centerBonusGiven = false;

function getCurrentPoint() {
  return parseInt(localStorage.getItem(pointKey) || '0');
}

function setCurrentPoint(val) {
  localStorage.setItem(pointKey, val);
  document.getElementById('point').textContent = val;
}

function getStepCount() {
  return parseInt(localStorage.getItem(stepKey) || '0');
}

function setStepCount(val) {
  localStorage.setItem(stepKey, val);
  document.getElementById('stepCount').textContent = val;
}

function startTracking() {
  if (!navigator.geolocation) {
    alert('GPS를 지원하지 않는 브라우저입니다.');
    return;
  }

  navigator.geolocation.watchPosition(
    position => {
      const { latitude, longitude } = position.coords;
      document.getElementById('location').textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

      // 이전 위치로부터 거리 계산
      if (prevPosition) {
        const dist = getDistanceFromLatLonInM(prevPosition.lat, prevPosition.lng, latitude, longitude);
        if (dist > 1) {
          totalDistance += dist;

          // 거리 → 걸음 수 (1걸음 ≈ 0.7m)
          const steps = Math.floor(totalDistance / 0.7);
          const lastSteps = getStepCount();
          if (steps > lastSteps) {
            setStepCount(steps);

            // 포인트 지급 (1000걸음당 100P)
            const newPoints = Math.floor(steps / 1000) * 100;
            if (newPoints > getCurrentPoint()) {
              setCurrentPoint(newPoints);
              showStatus('🎉 1000걸음 달성! +100P 지급!');
            }
          }
        }
      }

      // 자치센터 위치 도달 체크
      if (!centerBonusGiven) {
        const d = getDistanceFromLatLonInM(latitude, longitude, centerLat, centerLng);
        if (d <= centerRadius) {
          const bonus = getCurrentPoint() + 500;
          setCurrentPoint(bonus);
          centerBonusGiven = true;
          showStatus('🏛️ 자치센터 도착! +500P 보너스!');
        }
      }

      prevPosition = { lat: latitude, lng: longitude };
    },
    error => {
      alert('위치 정보를 가져올 수 없습니다.');
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000,
    }
  );
}

function showStatus(msg) {
  const el = document.getElementById('statusMsg');
  el.textContent = msg;
  setTimeout(() => (el.textContent = ''), 5000);
}

function resetSteps() {
  setStepCount(0);
  totalDistance = 0;
  centerBonusGiven = false;
  showStatus('👣 걸음 수가 초기화되었습니다.');
}

// 위도 경도 거리 계산 함수 (Haversine)
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// 초기 표시
document.addEventListener('DOMContentLoaded', () => {
  setCurrentPoint(getCurrentPoint());
  setStepCount(getStepCount());
});
