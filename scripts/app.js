particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00d4ff' }, /* 霓虹蓝粒子 */
        shape: { type: 'circle', stroke: { width: 0 } },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 0.7 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// 模态框交互
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('wechat-modal');
    const caseButtons = document.querySelectorAll('.case-button');
    const closeButton = document.querySelector('.close-button');
    const modalCaseLink = document.getElementById('modal-case-link');

    // 调试日志
    console.log('Modal element:', modal);
    console.log('Case buttons:', caseButtons);
    console.log('Close button:', closeButton);
    console.log('Modal case link:', modalCaseLink);

    if (!modal || !caseButtons.length || !closeButton || !modalCaseLink) {
        console.error('Modal elements not found. Check HTML IDs and classes.');
        return;
    }

    // 打开模态框
    caseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const link = button.getAttribute('data-link');
            console.log('Opening modal for link:', link);
            modalCaseLink.setAttribute('href', link);
            modal.style.display = 'flex';
        });
    });

    // 关闭模态框
    closeButton.addEventListener('click', () => {
        console.log('Closing modal');
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Closing modal by clicking outside');
            modal.style.display = 'none';
        }
    });
});

(function adjustContentPadding() {
    function setContentPadding() {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        const sections = document.querySelector('.sections');
        const content = document.querySelector('.content');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            if (hero) {
                hero.style.paddingTop = `${navbarHeight + 20}px`;
            }
            if (sections) {
                sections.style.paddingTop = `${navbarHeight + 20}px`;
            }
            if (content) {
                content.style.paddingTop = `${navbarHeight + 20}px`;
            }
        }
    }

    // 初始设置
    setContentPadding();
    
    // 监听窗口调整
    window.addEventListener('resize', setContentPadding);
})();
