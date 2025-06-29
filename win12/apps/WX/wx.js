// wx.js - 适配微信风格聊天界面 - 核心聊天功能
    
// 配置
const apiUrl = "https://web-chat-api.ae85.cn";
const welcomeMessage = "您好，请问有什么可以帮助您？";

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
const chatBody = document.querySelector('.wx-chat-body');
const input = document.querySelector('.wx-input');
const sendBtn = document.querySelector('.wx-send-btn');
const attachBtn = document.getElementById('wx-attach-btn');
const footer = document.querySelector('.wx-footer');

// 附件上传
let fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

let currentFile = null;

// 上传进度条
let uploadProgressBar = document.createElement('div');
uploadProgressBar.className = 'web-chat-upload-progress';
uploadProgressBar.style.display = 'none';
uploadProgressBar.style.padding = '0 24px 10px';
uploadProgressBar.innerHTML = '<div class="bar" style="width:0%;height:6px;background:#1aad19;border-radius:3px;transition:width 0.2s;"></div><span class="percent" style="font-size:12px;margin-left:8px;"></span>';
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
filePreview.style.padding = '0 24px 10px';
filePreview.style.alignItems = 'center';
filePreview.style.gap = '10px';
footer.parentNode.insertBefore(filePreview, footer);

// ===== 收到消息播放提示音 =====
const msgAudio = new Audio('./static/2.m4a');

// ===== 3秒只能发一条 =====
let lastSendTime = 0;

// ===== 敏感词过滤 =====
const sensitiveWords = [
    '傻逼', 'sb', 'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy',
    '操你妈', '草泥马', '狗日的', '王八蛋', '混蛋', '贱人', '婊子',
    '死全家', '去死', '滚蛋', '垃圾', '废物', '白痴', '智障','傻叉','艹你'
];

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
        alert('消息包含敏感内容，无法发送。');
        return false;
    }
    return true;
}

// 加载历史消息 (由 wx.html 中的脚本调用)
function loadHistoryMessages(contactId) {
    if (!contactId) return;
    chatBody.innerHTML = '';
    const history = JSON.parse(localStorage.getItem(`chatHistory_${contactId}`) || '[]');
    history.forEach(msg => {
        renderMessage(msg.text, msg.sender, msg.type, msg.file, msg.timestamp);
    });
    if (history.length === 0 && welcomeMessage) {
        renderMessage(welcomeMessage, 'support', 'text', null, new Date().toISOString());
        saveMessage(contactId, welcomeMessage, 'support', 'text', null);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 保存消息 (由 wx.html 中的脚本调用)
function saveMessage(contactId, text, sender, type = 'text', file = null) {
    if (!contactId) return;
    const history = JSON.parse(localStorage.getItem(`chatHistory_${contactId}`) || '[]');
    const message = { text, sender, type, timestamp: new Date().toISOString() };
    if (file) {
        message.file = { name: file.name, type: file.type, size: file.size, filePath: file.filePath || null };
    }
    history.push(message);
    if (history.length > 100) history.shift();
    localStorage.setItem(`chatHistory_${contactId}`, JSON.stringify(history));
}

// 渲染消息
function renderMessage(text, sender, type = 'text', file = null, timestamp = null) {
    const row = document.createElement('div');
    row.className = 'wx-message-row' + (sender === 'user' ? ' self' : '');

    const avatarMeta = document.createElement('div');
    avatarMeta.className = 'wx-message-avatar-meta';

    const avatar = document.createElement('div');
    avatar.className = 'wx-message-avatar';
    const avatarImg = document.createElement('img');

    if (sender === 'user') {
        avatarImg.src = './static/user.png';
    } else {
        const activeContactAvatar = document.querySelector('.wx-chat-item.active')?.dataset.contactAvatar;
        avatarImg.src = activeContactAvatar || './static/wxtx.jpg';
    }
    avatar.appendChild(avatarImg);

    const timeMeta = document.createElement('div');
    timeMeta.className = 'wx-message-meta';
    timeMeta.textContent = formatTime(timestamp);

    avatarMeta.appendChild(avatar);
    avatarMeta.appendChild(timeMeta);

    const messageContainer = document.createElement('div');
    const bubble = document.createElement('div');
    bubble.className = 'wx-message-bubble';
    
    if (text) {
        bubble.appendChild(document.createTextNode(text));
    }
    
    if (file) {
        const mimeType = file.type || '';
        if (mimeType.startsWith('image/')) {
            const img = document.createElement('img');
            if (file.filePath) {
                img.src = `${apiUrl}/api/tg-file-proxy?filePath=${encodeURIComponent(file.filePath)}&fileName=${encodeURIComponent(file.name || 'image.jpg')}`;
            } else if (file instanceof Blob || file instanceof File) {
                img.src = URL.createObjectURL(file);
            }
            img.style.maxWidth = '100%';
            img.style.borderRadius = '4px';
            img.onclick = () => showImagePreview(img.src);
            bubble.appendChild(img);
        } else if (mimeType.startsWith('video/')) {
            const video = document.createElement('video');
            if (file.filePath) {
                video.src = `${apiUrl}/api/tg-file-proxy?filePath=${encodeURIComponent(file.filePath)}&fileName=${encodeURIComponent(file.name || 'video.mp4')}`;
            } else if (file instanceof Blob || file instanceof File) {
                video.src = URL.createObjectURL(file);
            }
            video.className = 'wx-message-video';
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
            fileLink.className = 'wx-message-file';
            fileLink.download = file.name || 'download';
            fileLink.innerHTML = `<i class="fas fa-paperclip"></i> <span>${file.name || '文件'}</span>`;
            bubble.appendChild(fileLink);
        }
    }
    
    messageContainer.appendChild(bubble);
    row.appendChild(avatarMeta);
    row.appendChild(messageContainer);
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function formatTime(ts) {
    const date = ts ? new Date(ts) : new Date();
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

function showImagePreview(src) {
    let previewMask = document.getElementById('wx-image-preview-mask');
    if (!previewMask) {
        previewMask = document.createElement('div');
        previewMask.id = 'wx-image-preview-mask';
        Object.assign(previewMask.style, {
            position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999
        });
        previewMask.onclick = () => { previewMask.style.display = 'none'; };
        document.body.appendChild(previewMask);
    }
    previewMask.innerHTML = '';
    const bigImg = document.createElement('img');
    bigImg.src = src;
    Object.assign(bigImg.style, {
        maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)'
    });
    bigImg.onclick = (e) => e.stopPropagation();
    previewMask.appendChild(bigImg);
    previewMask.style.display = 'flex';
}

// 选择文件
attachBtn.onclick = () => {
    if (input.disabled) return;
    fileInput.click();
};

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
            previewHtml += `<i class="fas fa-file" style="font-size:32px;color:#888;"></i>`;
        }
        previewHtml += `
            <div style="flex:1;min-width:0;">
                <div style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${file.name}</div>
                <div style="font-size:12px;color:#999;">${(file.size/1024).toFixed(1)}KB</div>
            </div>
            <div class="remove-file" style="color:#ff4444;cursor:pointer;padding:4px;"><i class="fas fa-times"></i></div>`;
        filePreview.innerHTML = previewHtml;
        filePreview.style.display = 'flex';
        filePreview.querySelector('.remove-file').onclick = () => clearFilePreview();
    }
};

function clearFilePreview() {
    filePreview.style.display = 'none';
    filePreview.innerHTML = '';
    currentFile = null;
    fileInput.value = '';
}

// 发送消息
async function sendMessage() {
    const now = Date.now();
    if (now - lastSendTime < 3000) {
        alert('消息发送太频繁，请稍后再试。');
        return;
    }
    lastSendTime = now;
    const text = input.value.trim();
    if (!text && !currentFile) return;

    // ===== 新增：敏感词检查 =====
    if (text && !checkSensitiveContent(text)) {
        return;
    }

    const activeContactId = document.querySelector('.wx-chat-item.active')?.dataset.contactId;
    if (activeContactId !== 'contact1') return;

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
                        saveMessage(activeContactId, text, 'user', type, fileObj);
                        if (window.updateChatListLastMessage) {
                            let messageText;
                            if (type === 'image') messageText = '[图片]';
                            else if (type === 'video') messageText = '[视频]';
                            else messageText = '[文件]';
                            window.updateChatListLastMessage(activeContactId, messageText);
                        }
                        clearFilePreview();
                        input.value = '';
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
                renderMessage(text, 'user', 'text', null, new Date().toISOString());
                saveMessage(activeContactId, text, 'user', 'text', null);
                if (window.updateChatListLastMessage) {
                    window.updateChatListLastMessage(activeContactId, text);
                }
                input.value = '';
            } else {
                console.error('发送消息失败:', responseData.error);
            }
        }
    } catch (error) {
        console.error('发送消息出错:', error);
    } finally {
        sendBtn.disabled = false;
    }
}

sendBtn.onclick = sendMessage;
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Ably 接收客服消息
const channel = ably.channels.get(`chat:${userId}`);
channel.subscribe('message', (message) => {
    const activeContactId = document.querySelector('.wx-chat-item.active')?.dataset.contactId;
    saveMessage('contact1', message.data.text, 'support', message.data.type, message.data.file);

    if (window.updateChatListLastMessage) {
        let lastMessageText = message.data.text;
        if (message.data.file) {
            const fileType = message.data.file.type || '';
            if (fileType.startsWith('image/')) lastMessageText = '[图片]';
            else if (fileType.startsWith('video/')) lastMessageText = '[视频]';
            else lastMessageText = '[文件]';
        }
        window.updateChatListLastMessage('contact1', lastMessageText);
    }

    if (activeContactId === 'contact1') {
        renderMessage(message.data.text, 'support', message.data.type, message.data.file);
    }
    try { msgAudio.currentTime = 0; msgAudio.play(); } catch(e){}
}); 