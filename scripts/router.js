document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.querySelector('.wrap');
    const mainImageBox = document.querySelector('.main-image-box');
  
    function loadPage(path, url, showMainImage = false) {
      // 1. 페이드 아웃
      wrap.classList.add('fade-out');
      mainImageBox.classList.add('fade-out');
    
      setTimeout(() => {
        // 2. 콘텐츠 교체 (wrap은 투명 상태)
        fetch(path)
          .then(res => res.text())
          .then(html => {
            // 3. wrap 교체된 상태지만 아직 투명함
            wrap.innerHTML = html;
    
            // 4. 이미지 박스 표시 여부에 따라 처리
            if (showMainImage) {
              mainImageBox.style.display = 'block';
              // 페이드인 (약간 딜레이)
              setTimeout(() => {
                mainImageBox.classList.remove('fade-out');
              }, 10);
            } else {
              // 완전히 숨김
              mainImageBox.style.display = 'none';
            }
    
            // 5. wrap 페이드 인
            setTimeout(() => {
              wrap.classList.remove('fade-out');
            }, 10);
    
            // 6. URL 및 메뉴 상태 갱신
            history.pushState(null, '', url);
            updateMenuSelection();
          });
      }, 300); // wrap & image fade-out 시간
    }
    
    
  
    // 메뉴 이벤트
    document.getElementById('menu-home-profile').addEventListener('click', () => {
        loadPage('/pages/home.html', '/', true);
    });

    document.getElementById('menu-home').addEventListener('click', () => {
      loadPage('/pages/home.html', '/', true);
    });
  
    document.getElementById('menu-dream').addEventListener('click', () => {
      loadPage('/pages/dream.html', '/dream');
    });
  
    document.getElementById('menu-event').addEventListener('click', () => {
      loadPage('/pages/event.html', '/event');
    });

    document.getElementById('notice-page').addEventListener('click', () => {
        loadPage('/pages/notice.html', '/notice');
      });
  
    // 새로고침 또는 뒤로가기/앞으로가기
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      if (path === '/dream') loadPage('/pages/dream.html', '/dream');
      else if (path === '/event') loadPage('/pages/event.html', '/event');
      else if (path === '/notice') loadPage('/pages/notice-page.html', '/notice');
      else loadPage('/pages/home.html', '/', true);
    });

    // 현재 URL에 맞는 메뉴 항목에 테두리 추가 (home 제외)
    function updateMenuSelection() {
        const currentPath = window.location.pathname;

        // 모든 메뉴 항목에서 'selected' 클래스 제거
        const menuItems = document.querySelectorAll('.navmenu li');
        menuItems.forEach(item => item.classList.remove('selected'));

        // 'home' 메뉴는 제외하고, 현재 URL에 맞는 메뉴 항목에 'selected' 클래스 추가
        if (currentPath === '/dream') {
            document.getElementById('menu-dream').classList.add('selected');
        } else if (currentPath === '/event') {
            document.getElementById('menu-event').classList.add('selected');
        } else if (currentPath === '/notice') {
            document.getElementById('menu-notice').classList.add('selected');
        }
    }

    // 초기 로딩 시 메뉴 선택 상태 업데이트
    updateMenuSelection();
  
    // 초기 로딩
    const initialPath = window.location.pathname;
    if (initialPath === '/dream') loadPage('/pages/dream.html', '/dream');
    else if (initialPath === '/event') loadPage('/pages/event.html', '/event');
    else if (initialPath === '/notice') loadPage('/pages/notice.html', '/notice');
    else loadPage('/pages/home.html', '/', true);
  });
  