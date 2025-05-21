document.addEventListener('DOMContentLoaded', function() {
    // 헤더 불러오기
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // 현재 페이지에 해당하는 메뉴 활성화
            setActiveNavItem();
            
            // 헤더 로드 후 이벤트 리스너 설정
            setupHeaderEventListeners();
        });
    
    // 푸터 불러오기
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

// 현재 페이지에 해당하는 네비게이션 아이템 활성화
function setActiveNavItem() {
    // 현재 페이지 경로 가져오기
    const currentPage = window.location.pathname.split('/').pop();
    
    // 기본값은 홈페이지
    let activeNavId = 'nav-home';
    
    // 현재 페이지에 따라 활성화할 네비게이션 아이템 결정
    if (currentPage === 'about.html') {
        activeNavId = 'nav-about';
    } else if (currentPage === 'location.html') {
        activeNavId = 'nav-location';
    } else if (currentPage === 'portfolio.html') {
        activeNavId = 'nav-portfolio';
    }
    
    // 모든 네비게이션 링크에서 active 클래스 제거
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // 현재 페이지에 해당하는 네비게이션 링크에 active 클래스 추가
    const activeNavItem = document.getElementById(activeNavId);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// 헤더 관련 이벤트 리스너 설정
function setupHeaderEventListeners() {
    // 모바일 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 햄버거 메뉴 아이콘 애니메이션
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            // 메뉴가 열려있으면 바디 스크롤 방지
            document.body.classList.toggle('menu-open');
        });
    }
    
    // 메뉴 아이템 클릭 시 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
} 