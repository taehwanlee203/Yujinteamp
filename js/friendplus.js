const users = [
    { name: '최유진', steps: 4235, avatar: 'images/choi.jpg' },
    { name: '박보검', steps: 6012, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK-Yac__UPfEx8JpEgwMU9Pg6STw-0BMl36A&s' },
    { name: '박보영', steps: 3111, avatar: 'https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20231112111658_351e44d80215caf989506870458fef61.jpg' },
    { name: '변우석', steps: 5288, avatar: 'https://cdn.stardailynews.co.kr/news/photo/202412/467253_491656_1626.jpg' },
    { name: '정해인', steps: 2088, avatar: 'https://image.inews24.com/v1/77005bdb9d5e24.jpg' }
  ];

  const userList = document.getElementById('userList');
  const searchInput = document.getElementById('searchInput');

  function renderUsers(filter = '') {
    userList.innerHTML = '';

    const filteredUsers = users.filter(user =>
      user.name.includes(filter)
    );

    filteredUsers.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <div class="user-info">
          <img src="${user.avatar}" alt="유저 프로필" />
          <div class="details">
            <div class="name">${user.name}</div>
            <div class="steps">오늘 ${user.steps.toLocaleString()}걸음</div>
          </div>
        </div>
        <button class="add-btn">친구 요청</button>
      `;
      userList.appendChild(card);
    });
  }

  // 초기 렌더링
  renderUsers();

  // 검색 이벤트
  searchInput.addEventListener('input', () => {
    renderUsers(searchInput.value.trim());
  });