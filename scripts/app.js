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

    // 检查模态框元素是否存在。如果不存在，则只输出警告，但不阻止后续代码执行。
    if (!modal || !caseButtons.length || !closeButton || !modalCaseLink) {
        console.warn('Modal elements not found. Modal functionality will be skipped.'); // 将 error 改为 warn，并移除 return
        // 不执行return; 这样后续代码可以继续执行
    } else {
        // 只有当所有模态框元素都存在时，才添加事件监听器
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
    }
});
