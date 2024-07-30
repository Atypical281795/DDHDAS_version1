from flask import Flask, jsonify, redirect, url_for
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # 启用CORS

@app.route('/logout', methods=['POST'])
def logout():
    # 启动新的Python脚本
    subprocess.Popen(['python', r'C:\Users\Ryan\Desktop\DDHDAS\public\login\act_login.py'])
    # 重定向到关闭窗口的页面
    return redirect(url_for('close_window'))

@app.route('/close_window')
def close_window():
    # 返回关闭窗口的HTML页面
    return app.send_static_file('close_window.html')

@app.route('/login')
def login():
    # 重定向到登录页面
    return redirect(r"C:\Users\Ryan\Desktop\DDHDAS\public\main\main.html")

if __name__ == '__main__':
    app.run(port=5000)
