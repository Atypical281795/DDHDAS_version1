document.getElementById('user-menu').addEventListener('click', function() {
    var dropdown = document.getElementById('user-dropdown');
    var menuArrow = document.getElementById('menu-arrow');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        menuArrow.style.transform = 'rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        menuArrow.style.transform = 'rotate(180deg)';
    }
});

document.getElementById('search-input').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var list = document.getElementById('image-list');
    var items = list.getElementsByTagName('li');
    for (var i = 0; i < items.length; i++) {
        var text = items[i].textContent.toLowerCase();
        if (text.indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});

['export-excel', 'export-image'].forEach(function(id) {
    document.getElementById(id).addEventListener('click', function() {
        alert('Button clicked: ' + this.textContent.trim());
    });
});

document.querySelectorAll('#image-list li').forEach(item => {
    item.addEventListener('click', function() {
        // 獲取點擊的影像名稱
        var imageName = this.textContent;
        // 替換 Original image 區塊中的影像
        updateOriginalImage(imageName);
    });
});

function updateOriginalImage(imageName) {
    // 構建影像的完整路徑，根據實際情況修改路徑
    var imagePath = `C:\\Users\\Ryan\\Desktop\\DDHDAS\\images\\${imageName}`;
    
    var img = document.getElementById('loaded-image');
    img.src = imagePath;
    img.style.display = 'block';
    
    // 隱藏 "Click to load image" 按鈕
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-button-2').style.display = 'block';
}

// 用來存儲選擇的影像文件
var selectedFile = null;

// 提取共用的事件處理邏輯到一個函數
function handleLoadImage() {
    document.getElementById('image-input').click();
}

// 為 "Click to load image" 按鈕添加事件處理器
document.getElementById('start-button').addEventListener('click', handleLoadImage);

// 為 "Select folder" 按鈕添加事件處理器
document.getElementById('select-folder').addEventListener('click', handleLoadImage);

// 處理文件選擇後的事件
document.getElementById('image-input').addEventListener('change', function(event) {
    // 更新選擇的影像文件
    selectedFile = event.target.files[0];

    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.getElementById('loaded-image');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('start-button').style.display = 'none';
            document.getElementById('start-button-2').style.display = 'block';
        }
        reader.readAsDataURL(selectedFile);
    }
});

// 用來記錄當前選擇的影像文件
var selectedFile = null;

// 用來記錄當前的影像來源
var imageSource = null;

// 提取共用的事件處理邏輯到一個函數
function handleLoadImage() {
    imageSource = 'folder'; // 設置來源為 'folder'
    document.getElementById('image-input').click();
}

// 為 "Click to load image" 按鈕添加事件處理器
document.getElementById('start-button').addEventListener('click', function() {
    imageSource = 'folder'; // 設置來源為 'folder'
});

// 為 "Select folder" 按鈕添加事件處理器
document.getElementById('select-folder').addEventListener('click', handleLoadImage);

// 處理文件選擇後的事件
document.getElementById('image-input').addEventListener('change', function(event) {
    // 更新選擇的影像文件
    selectedFile = event.target.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.getElementById('loaded-image');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('start-button').style.display = 'none';
            document.getElementById('start-button-2').style.display = 'block';
            
            // 根據選擇的來源更新 Original image 區塊中的影像
            if (imageSource === 'folder') {
                updateOriginalImageFromFile(selectedFile);
            }
        }
        reader.readAsDataURL(selectedFile);
    }
});

// 為 "image-list" 列表項目添加點擊事件處理器
document.querySelectorAll('#image-list li').forEach(item => {
    item.addEventListener('click', function() {
        // 獲取點擊的影像名稱
        var imageName = this.textContent;
        // 根據選擇的來源更新 Original image 區塊中的影像
        imageSource = 'list'; // 設置來源為 'list'
        updateOriginalImageFromList(imageName);
    });
});

// 更新 Original image 區塊中的影像（從文件）
function updateOriginalImageFromFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = document.getElementById('loaded-image');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('start-button-2').style.display = 'block';
    }
    reader.readAsDataURL(file);
}

// 更新 Original image 區塊中的影像（從列表）
function updateOriginalImageFromList(imageName) {
    var imagePath = `C:\\Users\\Ryan\\Desktop\\DDHDAS\\images\\${imageName}`;
    var img = document.getElementById('loaded-image');
    img.src = imagePath;
    img.style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-button-2').style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function() {
    const userNameElement = document.getElementById('user-name');

    // 從 localStorage 獲取用户名並設置
    let userName = localStorage.getItem('userName') || 'Your Name';
    userNameElement.textContent = userName;

    // 允許用户编辑名字，並在编辑后更新 localStorage
    userNameElement.contentEditable = true;
    userNameElement.addEventListener('blur', function() {
        localStorage.setItem('userName', this.textContent);
    });
});

// Existing code...

document.getElementById('start-button-2').addEventListener('click', function() {
    showConfirmationDialog();
});

function showConfirmationDialog() {
    var dialog = document.createElement('div');
    dialog.id = "parent";
    dialog.innerHTML = `
        <div id="confirmationDialog" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; padding: 20px; border-radius: 5px; text-align: center;">
                <h2>Whether to enhance the image?</h2>
                <button id="enhanceYes" style="margin-right: 10px;">YES</button>
                <button id="enhanceNo">NO</button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);

    document.getElementById('enhanceYes').addEventListener('click', function() {
        showLoadingScreen();
        setTimeout(function() {
            showEnhencedImage();
            updateLaterCheck();
            console.log("mf");
            document.body.removeChild(dialog);
        }, 3000);
    });

    document.getElementById('enhanceNo').addEventListener('click', function() {
        document.body.removeChild(dialog);
        showLoadingIcon();
        setTimeout(function() {
            showResultImage();
        }, 3000);
    });
}

function showLoadingScreen() {
    var dialog = document.getElementById('confirmationDialog');
    dialog.innerHTML = `
        <div id="loadingfuck" style="background: white; padding: 20px; border-radius: 5px; text-align: center;">
            <div class="loading-icon" style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <p>Loading...</p>
        </div>
    `;
}

function showLoadingIcon() {
    var laterImageContent = document.querySelector('.image-box:nth-child(2) .image-content');
    laterImageContent.innerHTML = '<div class="loading-icon" style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
}

function showEnhencedImage() {
    // Update the Original Image (left side)
    var originalImage = document.querySelector('.image-box:first-child .image-content img');
    originalImage.src = 'C:\\Users\\Ryan\\Desktop\\DDHDAS\\before.bmp'; // Replace with your actual image path
}

function updateLaterCheck() {
    // Update the Later Image (right side)
    var laterImageContent = document.querySelector('.image-box:nth-child(2) .image-content');
    laterImageContent.innerHTML = `
        <div id="laterCheckContent" style="background: white; padding: 20px; width: 280px; border-radius: 5px; text-align: center;">
            <h2>Whether to use enhanced image to produce results?</h2>
            <button id="returnButton" style="margin-right: 10px;">Return</button>
            <button id="continueButton">Continue</button>
        </div>
    `;

    // Add event listeners for the new buttons
    document.getElementById('returnButton').addEventListener('click', function() {
        showConfirmationDialog();
    });

    document.getElementById('continueButton').addEventListener('click', function() {
        showLoadingIcon();
        setTimeout(function() {
            showResultImage();
        }, 3000);
    });
}

function showResultImage() {
    var laterImageContent = document.querySelector('.image-box:nth-child(2) .image-content');
    laterImageContent.innerHTML = `
        <img src="C:\\Users\\Ryan\\Desktop\\DDHDAS\\after.bmp" style="max-width: 100%; max-height: 100%;" alt="Enhanced Image">
    `;

    var textArea = document.querySelector('textarea[placeholder="Description of symptoms"]');
    textArea.value = '░░░▐▀▀▄█▀▀▀▀▀▒▄▒▀▌░░░░\n░░░▐▒█▀▒▒▒▒▒▒▒▒▀█░░░░░\n░░░░█▒▒▒▒▒▒▒▒▒▒▒▀▌░░░░\n░░░░▌▒██▒▒▒▒██▒▒▒▐░░░░\n░░░░▌▒▒▄▒██▒▄▄▒▒▒▐░░░░\n░░░▐▒▒▒▀▄█▀█▄▀▒▒▒▒█▄░░\n░░░▀█▄▒▒▐▐▄▌▌▒▒▄▐▄▐░░░\n░░▄▀▒▒▄▒▒▀▀▀▒▒▒▒▀▒▀▄░░\n░░█▒▀█▀▌▒▒▒▒▒▄▄▄▐▒▒▐░░\n░░░▀▄▄▌▌▒▒▒▒▐▒▒▒▀▒▒▐░░\n░░░░░░░▐▌▒▒▒▒▀▄▄▄▄▄▀░░\n░░░░░░░░▐▄▒▒▒▒▒▒▒▒▐░░░\n░░░░░░░░▌▒▒▒▒▄▄▒▒▒▐░░░';
}

// Add CSS animation
var style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);


// Rest of the existing code...

// 添加顯示登出確認對話框的函數
function showLogoutConfirmationDialog() {
    var dialog = document.createElement('div');
    dialog.id = "logoutConfirmationDialog";
    dialog.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; padding: 20px; border-radius: 5px; text-align: center;">
                <h2>Do you want to logout?</h2>
                <button id="logoutYes" style="margin-right: 10px;">YES</button>
                <button id="logoutNo">NO</button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);

    document.getElementById('logoutYes').addEventListener('click', function() {
        // 執行登出腳本
        fetch('http://127.0.0.1:5000/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
                window.close();
            } else {
                response.json().then(data => {
                    if (data.success) {
                        alert('Logout successful.');
                    } else {
                        alert('Logout failed.');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        document.body.removeChild(dialog);
    });

    document.getElementById('logoutNo').addEventListener('click', function() {
        document.body.removeChild(dialog);
    });
}

// 添加 Exit 按鈕點擊事件處理器
document.getElementById('exit').addEventListener('click', function() {
    showLogoutConfirmationDialog();
});


function backToMenu() {
    window.location.href = "C:\\Users\\Ryan\\Desktop\\DDHDAS\\public\\main\\main.html";
}
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
            window.close();
        } else {
            response.json().then(data => {
                if (data.success) {
                    alert('Logout successful.');
                } else {
                    alert('Logout failed.');
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('export-image').addEventListener('click', function() {
    var laterImage = document.querySelector('.image-box:nth-child(2) .image-content img');

    if (laterImage) {
        // 獲取圖片的 src
        var imageSrc = laterImage.src;

        // 檢查圖片來源是否是本地文件
        if (imageSrc.startsWith('file://')) {
            alert('本地文件無法直接讀取，請使用網頁上的文件。');
        } else {
            // 將圖片轉換為 Blob
            fetch(imageSrc)
                .then(response => response.blob())
                .then(blob => {
                    var formData = new FormData();
                    formData.append('image', blob, 'image.png');

                    return fetch('/export-image', {
                        method: 'POST',
                        body: formData
                    });
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Image exported successfully!');
                    } else {
                        alert('Failed to export image.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error); // 調試日誌
                });
        }
    } else {
        alert('No image found to export.');
    }
});

document.getElementById('export-excel').addEventListener('click', function() {
    import('./export-csv.js')
        .then(module => {
            // 調用 exportCSV 函數
            module.exportCSV();
        })
        .catch(err => {
            console.error("Failed to load module:", err);
        });
});


