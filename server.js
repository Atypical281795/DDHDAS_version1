const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 配置 multer 用於文件上傳
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

// 處理影像上傳請求
app.post('/export-image', upload.single('image'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'exported_images', req.file.originalname);

    fs.rename(tempPath, targetPath, err => {
        if (err) {
            console.error('Error saving the file:', err);
            return res.status(500).send('Error saving the file.');
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
