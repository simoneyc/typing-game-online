from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # 允許跨域請求

DATABASE = 'typing_scores.db'

# 初始化資料庫
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            mode TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_chars INTEGER NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# 獲取資料庫連接
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    # 確保表格存在
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            mode TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_chars INTEGER NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    return conn

# API: 提交分數
@app.route('/api/submit_score', methods=['POST'])
def submit_score():
    try:
        data = request.json
        player_name = data.get('player_name', '匿名玩家')
        mode = data.get('mode')
        difficulty = data.get('difficulty')
        score = data.get('score')
        total_chars = data.get('total_chars')
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # 驗證資料
        if not all([mode, difficulty, score is not None, total_chars is not None]):
            return jsonify({'success': False, 'message': '缺少必要資料'}), 400
        
        # 儲存到資料庫
        conn = get_db()
        c = conn.cursor()
        c.execute('''
            INSERT INTO scores (player_name, mode, difficulty, score, total_chars, date)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (player_name, mode, difficulty, score, total_chars, date))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': '分數已提交'})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# API: 獲取排行榜
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        mode = request.args.get('mode', 'zh')
        difficulty = request.args.get('difficulty', None)
        limit = int(request.args.get('limit', 10))
        
        conn = get_db()
        c = conn.cursor()
        
        if difficulty:
            # 特定難度的排行榜
            c.execute('''
                SELECT player_name, mode, difficulty, score, total_chars, date
                FROM scores
                WHERE mode = ? AND difficulty = ?
                ORDER BY score DESC, date ASC
                LIMIT ?
            ''', (mode, difficulty, limit))
        else:
            # 所有難度的排行榜
            c.execute('''
                SELECT player_name, mode, difficulty, score, total_chars, date
                FROM scores
                WHERE mode = ?
                ORDER BY score DESC, date ASC
                LIMIT ?
            ''', (mode, limit))
        
        rows = c.fetchall()
        conn.close()
        
        # 轉換為字典列表
        leaderboard = []
        for row in rows:
            leaderboard.append({
                'player_name': row['player_name'],
                'mode': row['mode'],
                'difficulty': row['difficulty'],
                'score': row['score'],
                'total_chars': row['total_chars'],
                'date': row['date']
            })
        
        return jsonify({'success': True, 'leaderboard': leaderboard})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# API: 獲取個人最佳記錄
@app.route('/api/best_scores', methods=['GET'])
def get_best_scores():
    try:
        mode = request.args.get('mode', 'zh')
        
        conn = get_db()
        c = conn.cursor()
        
        best_scores = {}
        
        for difficulty in ['easy', 'medium', 'hard']:
            c.execute('''
                SELECT player_name, score, total_chars, date
                FROM scores
                WHERE mode = ? AND difficulty = ?
                ORDER BY score DESC
                LIMIT 1
            ''', (mode, difficulty))
            
            row = c.fetchone()
            if row:
                best_scores[difficulty] = {
                    'player_name': row['player_name'],
                    'score': row['score'],
                    'total_chars': row['total_chars'],
                    'date': row['date']
                }
        
        conn.close()
        
        return jsonify({'success': True, 'best_scores': best_scores})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# API: 獲取統計資料
@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        conn = get_db()
        c = conn.cursor()
        
        # 總遊戲次數
        c.execute('SELECT COUNT(*) as total FROM scores')
        total_games = c.fetchone()['total']
        
        # 總玩家數（不重複）
        c.execute('SELECT COUNT(DISTINCT player_name) as total FROM scores')
        total_players = c.fetchone()['total']
        
        # 最高分
        c.execute('SELECT MAX(score) as max_score FROM scores')
        max_score = c.fetchone()['max_score'] or 0
        
        conn.close()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_games': total_games,
                'total_players': total_players,
                'max_score': max_score
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# 健康檢查
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'success': True, 'message': 'Server is running'})

if __name__ == '__main__':
    init_db()
    print("資料庫初始化完成")
    print("伺服器啟動在 http://localhost:5000")
    
    # 從環境變數獲取 PORT，Render 會自動設定
    port = int(os.environ.get('PORT', 5000))
    
    # 在生產環境使用 gunicorn，本地開發使用 Flask 內建伺服器
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
