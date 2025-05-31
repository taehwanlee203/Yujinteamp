const pointKey = 'userPoint';
const ownedKey = 'ownedProducts';
const defaultPoint = 12300;

const pointDisplay = document.getElementById('point');
const ownedDisplay = document.getElementById('ownedCount');
const listEl = document.getElementById('productList');

// 상품 데이터
const products = [
  { name: '복숭아 선물세트', point: 10000, category: 'gift', img: 'https://img.wemep.co.kr/deal/7/666/2386667/ed2c8cd6fdaa8e60163daa22a52d6a1fd4c2720e.jpg' },
  { name: '생활용품 세트', point: 7000, category: 'gift', img: 'https://de89qjx90gu7m.cloudfront.net/familymall_prod/product/44afae03-d361-4304-8706-3d7ad1bb1b79.png' },
  { name: '주민센터 헬스장 체험권', point: 5000, category: 'ticket', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1ZJUdRe2ZeBlQ6GizI4wDso4tWNTv5tdmg&s' },
  { name: '요가 클래스 이용권', point: 8000, category: 'ticket', img: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2024/05/pro-20240526162800139904-1024x1024.png' },
  { name: '부천 지역상품권 5천원권', point: 5000, category: 'voucher', img:'https://image.newdaily.co.kr/site/data/img/2012/03/20/2012032000059_thumb.jpg' },
  { name: '부천 지역상품권 1만원권', point: 10000, category: 'voucher', img: 'https://onnurigift.or.kr/public/images/main/sec3-img3.webp' }
];

// 현재 포인트
function getCurrentPoint() {
  const saved = localStorage.getItem(pointKey);
  return saved ? parseInt(saved) : defaultPoint;
}

function setCurrentPoint(value) {
  localStorage.setItem(pointKey, value);
  pointDisplay.textContent = value.toLocaleString();
}

// 보유 상품 관련
function getOwnedProducts() {
  return JSON.parse(localStorage.getItem(ownedKey)) || {};
}

function setOwnedProducts(data) {
  localStorage.setItem(ownedKey, JSON.stringify(data));
  updateOwnedCount();
}

function updateOwnedCount() {
  const owned = getOwnedProducts();
  const total = Object.values(owned).reduce((sum, count) => sum + count, 0);
  ownedDisplay.textContent = total;
}

// 상품 목록 렌더링
function renderProducts(filter = 'all') {
  listEl.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach((p, index) => {
    const item = document.createElement('div');
    item.className = 'product-card';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="product-name">${p.name}</div>
      <div class="product-point">${p.point.toLocaleString()}P</div>
      <button class="exchange-btn" onclick="exchangeProduct(${index})">교환하기</button>
    `;
    listEl.appendChild(item);
  });
}

// 교환 처리
function exchangeProduct(index) {
  const product = products[index];
  const current = getCurrentPoint();

  if (product.point > current) {
    alert('포인트가 부족합니다!');
    return;
  }

  const newPoint = current - product.point;
  setCurrentPoint(newPoint);

  const owned = getOwnedProducts();
  owned[product.name] = (owned[product.name] || 0) + 1;
  setOwnedProducts(owned);

  alert(`${product.point.toLocaleString()}P를 사용하여 ${product.name}을(를) 구매했습니다!`);
}

// 보유 상품 보기
function showOwnedItems() {
  const owned = getOwnedProducts();
  const items = Object.entries(owned);
  
  if (items.length === 0) {
    alert('보유한 상품이 없습니다.');
    return;
  }

  let message = '📦 보유한 상품 목록:\n\n';
  items.forEach(([name, count]) => {
    message += `• ${name}: ${count}개\n`;
  });

  alert(message);
}

// 필터링 버튼
function filterCategory(category) {
  renderProducts(category);
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  const current = getCurrentPoint();
  setCurrentPoint(current);
  updateOwnedCount();
  renderProducts();
});
