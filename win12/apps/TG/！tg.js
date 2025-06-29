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
    e.preventDefault();
    const text = input.value.trim();
    if (!text && !currentFile) return;
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
                        // 发送成功后再显示消息
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

// ===== 新增：支持回车发送消息 =====
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey && !currentFile) {
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