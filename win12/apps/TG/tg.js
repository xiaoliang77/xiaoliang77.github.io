// tg.js - 适配 Telegram 风格聊天界面

// 配置
const apiUrl = "https://web-chat-api.ae85.cn";
const welcomeMessage = "您好，欢迎光临！请问有什么可以帮助您的？";

// 用户ID
const userId = localStorage.getItem('userId') || 'user_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('userId', userId);
const currentDomain = window.location.hostname;

// Ably 实时通信
const ably = new Ably.Realtime({
    authUrl: apiUrl + '/api/ably-token',
    clientId: userId
});

// DOM 元素
const chatBody = document.getElementById('tg-chat-body');
const input = document.querySelector('.tg-input');
const sendBtn = document.querySelector('.tg-send-btn');

// 附件上传
let fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

let currentFile = null;

// 附件按钮（用 paperclip 图标）
let attachBtn = document.createElement('button');
attachBtn.type = 'button';
attachBtn.innerHTML = '<i class="fas fa-paperclip"></i>';
attachBtn.style.background = 'none';
attachBtn.style.border = 'none';
attachBtn.style.fontSize = '20px';
attachBtn.style.marginRight = '10px';
attachBtn.style.cursor = 'pointer';
attachBtn.style.color = '#888'
attachBtn.title = '上传附件';
const footer = document.querySelector('.tg-footer');
footer.insertBefore(attachBtn, input);

// 上传进度条
let uploadProgressBar = document.createElement('div');
uploadProgressBar.className = 'web-chat-upload-progress';
uploadProgressBar.style.display = 'none';
uploadProgressBar.innerHTML = '<div class="bar" style="width:0%;height:6px;background:#2481cc;border-radius:3px;transition:width 0.2s;"></div><span class="percent" style="font-size:12px;margin-left:8px;"></span>';
footer.appendChild(uploadProgressBar);

// 取消上传按钮
let cancelUploadBtn = document.createElement('button');
cancelUploadBtn.type = 'button';
cancelUploadBtn.textContent = '取消上传';
cancelUploadBtn.style.display = 'none';
cancelUploadBtn.style.marginLeft = '10px';
cancelUploadBtn.style.background = '#ff4444';
cancelUploadBtn.style.color = '#fff';
cancelUploadBtn.style.border = 'none';
cancelUploadBtn.style.borderRadius = '4px';
cancelUploadBtn.style.padding = '4px 10px';
cancelUploadBtn.style.cursor = 'pointer';
uploadProgressBar.appendChild(cancelUploadBtn);

// 附件预览区
let filePreview = document.createElement('div');
filePreview.className = 'file-preview';
filePreview.style.display = 'none';
filePreview.style.marginBottom = '10px';
footer.parentNode.insertBefore(filePreview, footer);

// ===== 新增：收到消息播放提示音 =====
const msgAudio = new Audio('./static/1.m4a');

// ===== 新增：3秒只能发一条 =====
let lastSendTime = 0;

// ===== 新增：敏感词用 编码 =====
const sensUnicode = '\u50bb\u903c\u002c\u0073\u0062\u002c\u0061\u0073\u0073\u0068\u006f\u006c\u0065\u002c\u0064\u0069\u0063\u006b\u002c\u0070\u0075\u0073\u0073\u0079\u002c\u8349\u6ce5\u9a6c\u002c\u72d7\u65e5\u7684\u002c\u738b\u516b\u86cb\u002c\u6df7\u86cb\u002c\u8d31\u4eba\u002c\u5a4a\u5b50\u002c\u6b7b\u5168\u5bb6\u002c\u53bb\u6b7b\u002c\u6eda\u86cb\u002c\u5783\u573e\u002c\u5e9f\u7269\u002c\u767d\u75f4\u002c\u667a\u969c\u002c\u8279\u4f60\u002c\u4f60\u5988\u002c\u5c3c\u739b\u002c\u4f60\u5a18\u7684\u002c\u4f60\u4e2b\u7684\u002c\u6b7b\u5988\u002c\u6b7b\u7238\u002c\u6740\u4f60\u002c\u64cd\u4f60\u002c\u808f\u4f60\u002c\u0063\u0061\u006f\u4f60\u002c\u8349\u4f60\u002c\u9760\u4f60\u002c\u72d7\u903c\u002c\u72d7\u0042\u002c\u72d7\u4e1c\u897f\u002c\u72d7\u5a18\u517b\u7684\u002c\u6742\u79cd\u002c\u755c\u751f\u002c\u8d31\u79cd\u002c\u6495\u903c\u002c\u5976\u5b50\u002c\u5976\u5988\u002c\u5976\u5988\u903c\u002c\u5976\u8336\u5a4a\u002c\u8336\u827a\u5a4a\u002c\u7eff\u8336\u5a4a\u002c\u5fc3\u673a\u5a4a\u002c\u5978\u4f60\u002c\u5f3a\u5978\u002c\u65e5\u4f60\u002c\u65e5\u4e86\u72d7\u002c\u5f31\u667a\u002c\u7cbe\u795e\u75c5\u002c\u795e\u7ecf\u75c5\u002c\u8822\u8d27\u002c\u8822\u732a\u002c\u8822\u72d7\u002c\u903c\u6837\u002c\u8d31\u8d27\u002c\u6bcd\u72d7\u002c\u6b7b\u903c\u002c\u70c2\u4eba\u002c\u70c2\u8d27\u002c\u5e9f\u67f4\u002c\u7b28\u86cb\u002c\u5446\u903c\u002c\u641e\u4f60\u002c\u64cd\u7206\u002c\u7206\u83ca\u002c\u5976\u5927\u002c\u5976\u5c0f\u002c\u5c41\u80a1\u5927\u002c\u4f60\u4e2a\u5934\u002c\u4f60\u5168\u5bb6\u002c\u4f60\u7956\u5b97\u002c\u765e\u86e4\u87c6\u002c\u6076\u5fc3\u6b7b\u4e86\u002c\u62c9\u5c4e\u002c\u653e\u5c41\u002c\u6492\u5c3f\u002c\u4f60\u4e11\u002c\u4e11\u516b\u602a\u002c\u5403\u5c4e\u002c\u767d\u83b2\u82b1\u002c\u8868\u5b50\u002c\u9a9a\u8d27\u002c\u9a9a\u903c\u002c\u6deb\u8361\u002c\u6deb\u5a03\u002c\u8089\u4fbf\u5668\u002c\u4eba\u6e23\u002c\u6bd2\u7624\u002c\u0066\u002a\u002a\u006b\u002c\u0066\u0075\u006b\u002c\u0066\u0075\u0071\u002c\u0066\u0063\u006b\u002c\u0066\u0075\u0063\u006b\u002c\u0073\u0068\u0069\u0074\u002c\u0073\u0068\u0078\u0074\u002c\u0073\u0068\u0074\u002c\u0062\u0069\u0074\u0063\u0068\u002c\u0062\u0074\u0063\u0068\u002c\u0062\u0031\u0074\u0063\u0068\u002c\u0062\u0021\u0074\u0063\u0068\u002c\u50bb\u0042\u002c\u6492\u6bd4\u002c\u50bb\u0058\u002c\u5403\u0053\u002c\u0063\u0068\u0069\u0073\u0068\u0069\u002c\u5403\ud83d\udca9\u002c\u8349\u4f60\u9a6c\u002c\u0063\u006e\u006d\u002c\u0063\u006e\u006d\u002c\u0072\u4f60\u002c\u0072\u0069\u4f60\u002c\u64cd\u4f60\u5988\u002c\u0063\u4f60\u006d\u7684\u002c\u0063\u4f60\u5988\u002c\u5783\u573e\u4eba\u002c\u5f31\u667a\u513f\u002c\u4f60\ud83d\udc0e\u002c\u72d7\u6bd4\u002c\u72d7\u5e01\u002c\u6deb\u002c\u6deb\u4e71\u002c\u6deb\u8361\u7684\u8d27\u002c\u9e21\u5df4\u002c\u9e21\u513f\u002c\u004a\u0042\u002c\u006a\u0038\u002c\u0062\u0069\u002c\u0062\u4e86\u72d7\u002c\u006e\u006d\u0073\u006c\u002c\u0064\u0074\u0073\u002c\u7b11\u6b7b\u6211\u4e86\u4f60\u4e2a\u006e\u0074\u002c\u0073\u002e\u0062\u002c\u0073\u002a\u0062\u002c\u0073\u00d7\u0062\u002c\u0077\u0064\u006e\u006d\u0064\u002c\u0064\u0073\u0073\u0071\u002c\u0063\u006e\u006d\u0062'; 
function fromUnicode(unicodeStr) {
    return unicodeStr.replace(/\\u[\dA-Fa-f]{4}/g, match => {
      return String.fromCharCode(parseInt(match.replace('\\u', ''), 16));
    });
  }
const sensitiveWords = fromUnicode(sensUnicode).split(',');

function containsSensitiveWords(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return sensitiveWords.some(word => 
        lowerText.includes(word.toLowerCase()) || 
        text.includes(word)
    );
}

function checkSensitiveContent(text) {
    if (containsSensitiveWords(text)) {
        showMessageBox('消息包含敏感内容，无法发送。', '请文明用语');
        return false;
    }
    return true;
}

// 加载历史消息
function loadHistoryMessages() {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.forEach(msg => {
        renderMessage(msg.text, msg.sender, msg.type, msg.file, msg.timestamp);
    });
    if (history.length === 0 && welcomeMessage) {
        renderMessage(welcomeMessage, 'support', 'text', null, new Date().toISOString());
        saveMessage(welcomeMessage, 'support', 'text', null);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 保存消息
function saveMessage(text, sender, type = 'text', file = null) {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const message = {
        text,
        sender,
        type,
        timestamp: new Date().toISOString()
    };
    if (file) {
        message.file = {
            name: file.name,
            type: file.type,
            size: file.size,
            filePath: file.filePath || null
        };
    }
    history.push(message);
    if (history.length > 100) history.shift();
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

// 渲染消息
function renderMessage(text, sender, type = 'text', file = null, timestamp = null) {
    const row = document.createElement('div');
    row.className = 'tg-message-row' + (sender === 'user' ? ' self' : '');
    const avatar = document.createElement('div');
    avatar.className = 'tg-message-avatar';
    if (sender === 'user') {
        avatar.textContent = 'W';
        avatar.style.background = '#f2711c';
    } else {
        // Y 头像用图片
        avatar.innerHTML = '<img src="./static/1.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
        avatar.style.background = 'none';
    }
    const bubbleWrap = document.createElement('div');
    const bubble = document.createElement('div');
    bubble.className = 'tg-message-bubble';
    // 文本
    if (text) {
        const textDiv = document.createElement('div');
        textDiv.textContent = text;
        bubble.appendChild(textDiv);
    }
    // 附件
    if (file) {
        const mimeType = file.type || '';
        if (mimeType.startsWith('image/')) {
            const img = document.createElement('img');
            if (file.filePath) {
                img.src = `${apiUrl}/api/tg-file-proxy?filePath=${encodeURIComponent(file.filePath)}&fileName=${encodeURIComponent(file.name || 'image.jpg')}`;
            } else if (file instanceof Blob || file instanceof File) {
                img.src = URL.createObjectURL(file);
            }
            img.className = 'tg-message-img';
            img.onclick = () => showImagePreview(img.src);
            bubble.appendChild(img);
        } else if (mimeType.startsWith('video/')) {
            const video = document.createElement('video');
            if (file.filePath) {
                video.src = `${apiUrl}/api/tg-file-proxy?filePath=${encodeURIComponent(file.filePath)}&fileName=${encodeURIComponent(file.name || 'video.mp4')}`;
            } else if (file instanceof Blob || file instanceof File) {
                video.src = URL.createObjectURL(file);
            }
            video.className = 'tg-message-video';
            video.controls = true;
            bubble.appendChild(video);
        } else {
            const fileLink = document.createElement('a');
            fileLink.target = '_blank';
            if (file.filePath) {
                fileLink.href = `${apiUrl}/api/tg-file-proxy?filePath=${encodeURIComponent(file.filePath)}&fileName=${encodeURIComponent(file.name || 'download')}`;
            } else if (file instanceof Blob || file instanceof File) {
                fileLink.href = URL.createObjectURL(file);
            }
            fileLink.className = 'tg-message-file';
            fileLink.download = file.name || 'download';
            fileLink.innerHTML = `<i class="fas fa-paperclip"></i> <span>${file.name || '文件'}</span>`;
            bubble.appendChild(fileLink);
        }
    }
    // 时间
    const timeSpan = document.createElement('span');
    timeSpan.className = 'tg-message-meta-inline';
    timeSpan.textContent = formatTime(timestamp);
    bubble.appendChild(timeSpan);
    bubbleWrap.appendChild(bubble);
    row.appendChild(avatar);
    row.appendChild(bubbleWrap);
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function formatTime(ts) {
    const date = ts ? new Date(ts) : new Date();
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// 图片放大预览
function showImagePreview(src) {
    let previewMask = document.getElementById('tg-image-preview-mask');
    if (!previewMask) {
        previewMask = document.createElement('div');
        previewMask.id = 'tg-image-preview-mask';
        previewMask.style.position = 'fixed';
        previewMask.style.left = 0;
        previewMask.style.top = 0;
        previewMask.style.width = '100vw';
        previewMask.style.height = '100vh';
        previewMask.style.background = 'rgba(0,0,0,0.7)';
        previewMask.style.display = 'flex';
        previewMask.style.alignItems = 'center';
        previewMask.style.justifyContent = 'center';
        previewMask.style.zIndex = 9999;
        previewMask.onclick = function() { previewMask.style.display = 'none'; };
        document.body.appendChild(previewMask);
    }
    previewMask.innerHTML = '';
    const bigImg = document.createElement('img');
    bigImg.src = src;
    bigImg.style.maxWidth = '90vw';
    bigImg.style.maxHeight = '90vh';
    bigImg.style.borderRadius = '8px';
    bigImg.style.boxShadow = '0 2px 16px rgba(0,0,0,0.3)';
    bigImg.onclick = function(e) { e.stopPropagation(); };
    previewMask.appendChild(bigImg);
    previewMask.style.display = 'flex';
}

// 选择文件
attachBtn.onclick = () => fileInput.click();
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        currentFile = file;
        let previewHtml = '';
        if (file.type.startsWith('image/')) {
            previewHtml += `<img src="${URL.createObjectURL(file)}" style="max-width:40px;max-height:40px;border-radius:4px;">`;
        } else if (file.type.startsWith('video/')) {
            previewHtml += `<i class="fas fa-video" style="font-size:32px;color:#888;"></i>`;
        } else {
            previewHtml += `<i class="fas fa-paperclip" style="font-size:32px;color:#888;"></i>`;
        }
        previewHtml += `
            <div class="file-info" style="flex:1;min-width:0;">
                <div class="file-name" style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${file.name}</div>
                <div class="file-size" style="font-size:12px;color:#999;">${(file.size/1024).toFixed(1)}KB</div>
            </div>
            <div class="remove-file" style="color:#ff4444;cursor:pointer;padding:4px;"><i class="fas fa-times"></i></div>
        `;
        filePreview.innerHTML = previewHtml;
        filePreview.style.display = 'flex';
        filePreview.querySelector('.remove-file').onclick = function() {
            currentFile = null;
            fileInput.value = '';
            filePreview.style.display = 'none';
            input.value = '';
        };
    }
};

// 清空附件预览
function clearFilePreview() {
    filePreview.style.display = 'none';
    filePreview.innerHTML = '';
    currentFile = null;
    fileInput.value = '';
    input.value = '';
}

// 发送消息
sendBtn.onclick = async (e) => {
    const now = Date.now();
    if (now - lastSendTime < 3000) {
        showMessageBox('消息发送太频繁，请稍后再试。');
        return;
    }
    lastSendTime = now;
    e.preventDefault();
    const text = input.value.trim();
    if (!text && !currentFile) return;
    
    // ===== 新增：敏感词检查 =====
    if (text && !checkSensitiveContent(text)) {
        return;
    }
    
    sendBtn.disabled = true;
    try {
        if (currentFile) {
            uploadProgressBar.style.display = 'flex';
            uploadProgressBar.querySelector('.bar').style.width = '0%';
            uploadProgressBar.querySelector('.percent').textContent = '0%';
            cancelUploadBtn.style.display = 'inline-block';
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('message', text);
            formData.append('domain', currentDomain);
            formData.append('file', currentFile);
            formData.append('type', currentFile.type.startsWith('image/') ? 'image' : (currentFile.type.startsWith('video/') ? 'video' : 'file'));
            formData.append('fileName', currentFile.name);
            formData.append('fileType', currentFile.type);
            formData.append('fileSize', currentFile.size);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', apiUrl + '/api/send-message', true);
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    uploadProgressBar.querySelector('.bar').style.width = percent + '%';
                    uploadProgressBar.querySelector('.percent').textContent = percent + '%';
                }
            };
            cancelUploadBtn.onclick = function() {
                xhr.abort();
                uploadProgressBar.style.display = 'none';
                cancelUploadBtn.style.display = 'none';
                sendBtn.disabled = false;
                clearFilePreview();
            };
            xhr.onload = function() {
                uploadProgressBar.style.display = 'none';
                cancelUploadBtn.style.display = 'none';
                sendBtn.disabled = false;
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    if (!xhr.status || xhr.status < 200 || xhr.status >= 300) {
                        console.error('发送消息失败:', responseData.error);
                    } else {
                        const type = currentFile.type.startsWith('image/') ? 'image' : (currentFile.type.startsWith('video/') ? 'video' : 'file');
                        let fileObj = {
                            name: currentFile.name,
                            type: currentFile.type,
                            size: currentFile.size,
                            filePath: responseData.fileId || null
                        };
                        renderMessage(text, 'user', type, fileObj, new Date().toISOString());
                        saveMessage(text, 'user', type, fileObj);
                        clearFilePreview();
                    }
                } catch (err) {
                    console.error('解析响应失败:', err);
                    clearFilePreview();
                }
            };
            xhr.onerror = function() {
                uploadProgressBar.style.display = 'none';
                cancelUploadBtn.style.display = 'none';
                sendBtn.disabled = false;
                clearFilePreview();
                console.error('发送消息出错: 网络错误');
            };
            xhr.send(formData);
        } else {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('message', text);
            formData.append('domain', currentDomain);
            const response = await fetch(apiUrl + '/api/send-message', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            if (response.ok) {
                input.value = '';
                renderMessage(text, 'user', 'text', null, new Date().toISOString());
                saveMessage(text, 'user', 'text', null);
            } else {
                console.error('发送消息失败:', responseData.error);
            }
            sendBtn.disabled = false;
        }
    } catch (error) {
        uploadProgressBar.style.display = 'none';
        cancelUploadBtn.style.display = 'none';
        sendBtn.disabled = false;
        clearFilePreview();
        console.error('发送消息出错:', error);
    }
};

// ===== 全局自定义消息弹窗 =====
function showMessageBox(message, title = '提示') {
    const box = document.getElementById('tg-message-box-mask');
    if (!box) return;
    box.querySelector('.tg-message-box-title').textContent = title;
    box.querySelector('.tg-message-box-content').textContent = message;
    box.style.display = 'flex';
    window.tgMessageBoxOpen = true;
    const btn = box.querySelector('.tg-message-box-btn');
    btn.onclick = () => {
        box.style.display = 'none';
        window.tgMessageBoxOpen = false;
    };
}

// 回车监听优化：弹窗显示时不发送
input.addEventListener('keydown', function(e) {
    if (window.tgMessageBoxOpen) return;
    if (e.key === 'Enter' && !e.shiftKey && !currentFile) {
        const now = Date.now();
        if (now - lastSendTime < 3000) {
            showMessageBox('消息发送太频繁，请稍后再试。');
            return;
        }
        lastSendTime = now;
        // ===== 新增：敏感词检查 =====
        const text = input.value.trim();
        if (text && !checkSensitiveContent(text)) {
            return;
        }
        e.preventDefault();
        sendBtn.click();
    }
});

// Ably 接收客服消息
ably.connection.on('connected', () => {
    loadHistoryMessages();
});
const channel = ably.channels.get(`chat:${userId}`);
channel.subscribe('message', (message) => {
    renderMessage(message.data.text, 'support', message.data.type, message.data.file, new Date().toISOString());
    saveMessage(message.data.text, 'support', message.data.type, message.data.file);
    try { msgAudio.currentTime = 0; msgAudio.play(); } catch(e){}
}); 