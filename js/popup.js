const Popup = {
    init: function () {
        console.log("Popup.init开始执行");
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay); // 不再绑定点击事件

        // 创建弹窗
        const popup = document.createElement('div');
        popup.id = 'popup';

        // 创建标题元素
        const title = document.createElement('h2');

        // 创建一个容器来动态填充内容
        const content = document.createElement('div');
        content.id = 'popup-content';

        // 创建分割线
        const separator = document.createElement('div');
        separator.className = 'separator';

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container'; // 添加按钮容器类

        // 创建“好的”链接
        const okButton = document.createElement('a');
        okButton.innerText = '好的'; // 链接文字
        okButton.className = 'ok-button'; // 添加 CSS 类
        okButton.href = '#'; // 添加 href 属性

        // 点击“好的”时的逻辑
        okButton.onclick = (e) => {
            e.preventDefault(); // 阻止默认行为
            const redirectUrl = this.redirectUrl; // 从上下文中获取 redirectUrl
            if (redirectUrl) {
                window.location.href = redirectUrl; // 跳转到获取的链接
            }
            this.hide(); // 点击链接时关闭弹窗
        };

        buttonContainer.appendChild(okButton); // 将按钮添加到按钮容器
        popup.appendChild(title);
        popup.appendChild(content);
        popup.appendChild(separator);
        popup.appendChild(buttonContainer); // 将按钮容器添加到弹窗

        document.body.appendChild(popup);

        // 请求完成后再显示弹窗
        this.fetchAndCompareContent()
            .then(() => console.log("Popup.init执行完毕"))
            .catch(error => {
                console.error('Error:', error);
                // 如果请求失败，不显示弹窗
            });
    },

    show: function () {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    },

    hide: function () {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    },

    fetchAndCompareContent: function () {
        return fetch('https://s3.iphone8.vip/data/notify.json?v=' + Math.random())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // 从localStorage获取之前保存的内容
                const storedContent = localStorage.getItem('popupContent');
                // 将新的内容转换为JSON字符串以便比较
                const newContent = JSON.stringify(data);
                // 如果内容不一样，显示弹窗并更新localStorage
                if (newContent !== storedContent) {
                    this.show();
                    // 更新弹窗内容
                    const titleElement = document.querySelector('#popup h2');
                    titleElement.innerText = data.title;
                    const contentDiv = document.getElementById('popup-content');
                    const constent = data.description;
                    const content = constent.replace(/\\n/g, '</br>');
                    contentDiv.innerHTML = `</br><h4 style="color: #00c;">${data.datetime}</h4><div>${content}</div>`;
                    
                    // 保存最新的内容到localStorage
                    localStorage.setItem('popupContent', newContent);

                    // 获取重定向链接
                    this.redirectUrl = data.status;
                }
            });
    }
};

// 使用箭头函数确保this的上下文
document.addEventListener('DOMContentLoaded', () => Popup.init());
