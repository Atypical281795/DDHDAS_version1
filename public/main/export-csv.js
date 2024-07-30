export function exportCSV() {
    // 獲取使用者名稱
    const userName = document.getElementById('user-name').textContent;

    // 獲取使用者ID（假設用 localStorage 存儲）
    const userId = localStorage.getItem('userId') || 'unknown';

    // 獲取 Later image 影像名稱
    const laterImage = document.querySelector('.image-box:nth-child(2) img');
    const imageName = laterImage ? laterImage.src.split('\\').pop() : 'No Image';

    // 獲取 Description of symptoms 的內容
    const description = document.querySelector('textarea[placeholder="Description of symptoms"]').value;

    // 獲取當前時間戳記
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // 創建 CSV 內容
    const csvContent = `data:text/csv;charset=utf-8,User Name,User ID,Image Name,Description,Timestamp\n${userName},${userId},${imageName},${description},${timestamp}\n`;

    // 創建 CSV 文件並下載
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'exported_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Exporting CSV...');
}