const Popup = {
    init: function() {
        console.log("Popup.init开始执行");
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 999;';
        document.body.appendChild(overlay);

        // 创建弹窗
        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.style.cssText = 'display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; padding: 20px; background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 8px; z-index: 1000;';

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.cssText = 'position: absolute; top: 10px; right: 10px; width: 20px; height: 20px; background: none; border: none; font-size: 18px; font-weight: bold; color: #000; cursor: pointer;';
        closeButton.onclick = Popup.hide;

        // 创建标题元素，但不设置内容
        const title = document.createElement('h2');
        title.style.cssText = 'text-align: center; margin: 0;';

        // 创建一个容器来动态填充内容
        const content = document.createElement('div');
        content.id = 'popup-content';

        popup.appendChild(closeButton);
        popup.appendChild(title);
        popup.appendChild(content);

        document.body.appendChild(popup);

        // 请求完成后再显示弹窗
        this.fetchAndCompareContent()
            .then(() => console.log("Popup.init执行完毕"))
            .catch(error => {
                console.error('Error:', error);
                // 如果请求失败，不显示弹窗
            });
    },

    show: function() {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    },

    hide: function() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    },

    fetchAndCompareContent: function() {
        return fetch('http://ae85.cn/config/data.json')
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
                const newContent = JSON.stringify(data.hant);

                // 如果内容不一样，显示弹窗并更新localStorage
                if (newContent !== storedContent) {
                    this.show();
                    // 更新弹窗内容
                    const titleElement = document.querySelector('#popup h2');
                    titleElement.innerText = data.name;
                    const contentDiv = document.getElementById('popup-content');
                    contentDiv.innerHTML = `<p>${data.hant}</p>`;
                    // 保存最新的内容到localStorage
                    localStorage.setItem('popupContent', newContent);
                }
            });
    }
};

// 使用箭头函数确保this的上下文
document.addEventListener('DOMContentLoaded', () => Popup.init());
