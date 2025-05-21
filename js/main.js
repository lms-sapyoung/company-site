document.addEventListener('DOMContentLoaded', function() {
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
    
    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 포트폴리오 아이템과 핵심 서비스 아이템에 스크롤 애니메이션 클래스 추가
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const valueCards = document.querySelectorAll('.value-card');
    
    portfolioItems.forEach(item => {
        item.classList.add('scroll-animation');
    });
    
    valueCards.forEach(card => {
        card.classList.add('scroll-animation');
    });
    
    // 스크롤 애니메이션
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 페이지 로드 시 애니메이션
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // 핵심 서비스 카드는 페이지 로드 시 바로 표시
        valueCards.forEach(card => {
            card.classList.add('scrolled');
        });
        
        // 현재 화면에 보이는 요소들에 대해 스크롤 애니메이션 적용
        handleScrollAnimation();
    }, 500);
    
    // 스크롤 목적지로 부드럽게 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 폼 제출 이벤트 핸들러
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // 여기에 폼 제출 로직 추가 (서버로 전송 등)
            console.log('Form submitted:', formValues);
            
            // 성공 메시지 표시
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = '메시지가 성공적으로 전송되었습니다.';
            
            this.reset();
            this.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
});
