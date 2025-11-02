// API配置
const API_URL = 'https://typing-game-online.onrender.com/api';

// 遊戲狀態
const gameState = {
    mode: 'zh',
    difficulty: 'medium',
    isPlaying: false,
    isPaused: false,
    currentText: '',
    currentIndex: 0,
    score: 0,
    correctChars: 0,
    totalChars: 0,
    startTime: null,
    timeLeft: 60,
    timerInterval: null,
    isComposing: false,
    usedTexts: [],
    leaderboardMode: 'online', // online 或 local
    leaderboardDifficulty: 'all' // all, easy, medium, hard
};

// 文字庫 (與之前相同，這裡省略以節省空間)
const textLibrary = {
    zh: {
        easy: [
            '今天天氣真好', '我喜歡吃水果', '你好嗎', '學習打字很有趣',
            '加油努力', '保持微笑', '相信自己', '永不放棄',
            '夢想成真', '快樂每一天', '陽光明媚', '春暖花開',
            '秋高氣爽', '冬日暖陽', '夏日炎炎', '風和日麗',
            '萬里無雲', '繁星點點', '月明星稀', '鳥語花香',
            '山明水秀', '花好月圓', '國泰民安', '風調雨順',
            '五穀豐登', '六畜興旺', '萬事如意', '心想事成',
            '吉祥如意', '步步高升', '財源廣進', '笑口常開',
            '身體健康', '闔家歡樂', '龍馬精神', '福如東海',
            '壽比南山', '恭喜發財', '大吉大利', '平安喜樂'
        ],
        medium: [
            '學而時習之不亦說乎', '三人行必有我師焉', '工欲善其事必先利其器',
            '千里之行始於足下', '讀萬卷書行萬里路', '溫故而知新可以為師矣',
            '學無止境持之以恆', '天道酬勤勤能補拙', '書山有路勤為徑',
            '學海無涯苦作舟', '吃得苦中苦方為人上人', '寶劍鋒從磨礪出',
            '梅花香自苦寒來', '不經一番寒徹骨', '焉得梅花撲鼻香',
            '業精於勤荒於嬉', '行成於思毀於隨', '黑髮不知勤學早',
            '白首方悔讀書遲', '少壯不努力老大徒傷悲', '一寸光陰一寸金',
            '寸金難買寸光陰', '有志者事竟成', '精誠所至金石為開',
            '海納百川有容乃大', '壁立千仞無欲則剛', '路遙知馬力',
            '日久見人心', '水滴石穿繩鋸木斷', '積少成多集腋成裘',
            '一分耕耘一分收穫', '機不可失時不再來', '防患於未然',
            '曲突徙薪未雨綢繆', '亡羊補牢猶未晚矣', '塞翁失馬焉知非福',
            '因禍得福轉危為安', '否極泰來柳暗花明', '守得雲開見月明',
            '撥雲見日重見天日'
        ],
        hard: [
            '人生就像一盒巧克力你永遠不知道下一顆是什麼味道',
            '成功不是終點失敗也不是末日繼續前進的勇氣才最可貴',
            '當你感到痛苦時請記住痛苦本身是成長的一部分',
            '不要害怕改變往往最困難的抉擇會帶來最好的結果',
            '生活中最重要的不是你站在什麼位置而是你朝什麼方向前進',
            '真正的智慧不在於知道所有的答案而在於問對的問題',
            '勇氣不是沒有恐懼而是即使恐懼也依然前行',
            '夢想不會逃跑會逃跑的永遠都是自己',
            '成功的秘訣在於對目標的忠實和對過程的堅持',
            '每一次失敗都是成功的前奏只要你不停下腳步',
            '時間就像海綿裡的水只要願意擠總還是有的',
            '機會永遠留給有準備的人而非只會等待的人',
            '態度決定高度細節決定成敗', '與其羨慕別人不如做好自己',
            '今天的努力是為了明天的輝煌',
            '堅持下去不是因為有希望才堅持而是堅持了才有希望',
            '世界上沒有絕望的處境只有對處境絕望的人',
            '成功的人找方法失敗的人找藉口',
            '困難像彈簧你弱它就強你強它就弱', '不要等待機會而要創造機會',
            '人生沒有彩排每一天都是現場直播',
            '機會只對進取有為的人開放庸人永遠無法光顧',
            '只要路是對的就不怕路遠', '最困難的時候就是離成功不遠了',
            '冰凍三尺非一日之寒', '知道自己要幹什麼夜深人靜好好想想',
            '沒有口水與汗水就沒有成功的淚水',
            '一個能從別人的觀念來看事情的人永遠不必為自己的前途擔心',
            '偉人之所以偉大是因為與別人共處逆境時',
            '別人失去了信心他卻下決心實現自己的目標',
            '世上沒有絕望的處境只有對處境絕望的人',
            '當你感到悲哀痛苦時最好是去學些什麼東西',
            '學習會使你永遠立於不敗之地'
        ]
    },
    en: {
        easy: [
            'hello world', 'good morning', 'have a nice day', 'thank you',
            'see you later', 'how are you', 'I love coding', 'practice makes perfect',
            'never give up', 'stay positive', 'be happy', 'dream big',
            'work hard', 'stay strong', 'keep going', 'believe in yourself',
            'make it happen', 'you can do it', 'stay focused', 'chase your dreams',
            'time is precious', 'keep learning', 'stay curious', 'be creative',
            'think positive', 'start today', 'never stop', 'keep trying',
            'stay humble', 'work smart', 'be brave', 'take action',
            'stay inspired', 'be patient', 'keep moving', 'stay motivated',
            'be yourself', 'live fully', 'enjoy life', 'spread love'
        ],
        medium: [
            'the quick brown fox jumps over the lazy dog',
            'practice typing every day to improve your speed',
            'coding is the language of the future',
            'learning never exhausts the mind',
            'success is not final failure is not fatal',
            'the only way to do great work is to love what you do',
            'innovation distinguishes between a leader and a follower',
            'your time is limited so dont waste it living someone elses life',
            'stay hungry stay foolish', 'life is what happens when youre busy making other plans',
            'get busy living or get busy dying',
            'whether you think you can or you think you cant youre right',
            'the future belongs to those who believe in the beauty of their dreams',
            'it is during our darkest moments that we must focus to see the light',
            'whoever is happy will make others happy too',
            'do not dwell in the past do not dream of the future',
            'concentrate the mind on the present moment',
            'the way to get started is to quit talking and begin doing',
            'dont let yesterday take up too much of today',
            'you learn more from failure than from success',
            'the best time to plant a tree was twenty years ago',
            'the second best time is now',
            'life is ten percent what happens to you and ninety percent how you react to it',
            'change your thoughts and you change your world',
            'the only impossible journey is the one you never begin',
            'in the middle of difficulty lies opportunity',
            'everything you can imagine is real',
            'do what you can with what you have where you are',
            'if you tell the truth you dont have to remember anything',
            'the best way out is always through'
        ],
        hard: [
            'programming is not about typing its about thinking and solving problems creatively',
            'the best way to predict the future is to invent it yourself through hard work and dedication',
            'debugging is like being a detective in a crime movie where you are also the murderer',
            'any fool can write code that a computer can understand good programmers write code that humans can understand',
            'first solve the problem then write the code always remember this golden rule',
            'simplicity is the soul of efficiency keep your code clean and maintainable',
            'the most important property of a program is whether it accomplishes the intention of its user',
            'walking on water and developing software from a specification are easy if both are frozen',
            'code is like humor when you have to explain it its bad',
            'make it work make it right make it fast in that order',
            'perfection is achieved not when there is nothing more to add but when there is nothing left to take away',
            'if debugging is the process of removing bugs then programming must be the process of putting them in',
            'testing leads to failure and failure leads to understanding',
            'deleted code is debugged code remember this when refactoring',
            'a good programmer is someone who always looks both ways before crossing a one way street',
            'talk is cheap show me the code prove your skills through action',
            'the computer was born to solve problems that did not exist before',
            'software is a great combination between artistry and engineering',
            'there are two ways to write error free programs only the third one works',
            'measuring programming progress by lines of code is like measuring aircraft building progress by weight',
            'the function of good software is to make the complex appear to be simple',
            'programs must be written for people to read and only incidentally for machines to execute',
            'the best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly',
            'controlling complexity is the essence of computer programming',
            'most good programmers do programming not because they expect to get paid or get adulation by the public but because it is fun to program'
        ]
    }
};

// DOM 元素
const elements = {
    startScreen: document.getElementById('start-screen'),
    gameScreen: document.getElementById('game-screen'),
    endScreen: document.getElementById('end-screen'),
    targetText: document.getElementById('target-text'),
    userInput: document.getElementById('user-input'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),
    finalScore: document.getElementById('final-score'),
    totalChars: document.getElementById('total-chars'),
    newRecord: document.getElementById('new-record'),
    bestScores: document.getElementById('best-scores'),
    leaderboardContent: document.getElementById('leaderboard-content'),
    playerNameInput: document.getElementById('player-name'),
    submitScoreBtn: document.getElementById('submit-score-btn'),
    submitMessage: document.getElementById('submit-message')
};

// 初始化
function init() {
    setupEventListeners();
    loadLeaderboard();
    displayBestScores();
}

// 設定事件監聽器
function setupEventListeners() {
    // 模式切換
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            gameState.mode = e.target.dataset.mode;
            displayBestScores();
        });
    });

    // 難度選擇
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            gameState.difficulty = e.target.dataset.difficulty;
            startGame();
        });
    });

    // 遊戲控制
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('quit-btn').addEventListener('click', quitGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('back-btn').addEventListener('click', backToStart);

    // 輸入監聽
    elements.userInput.addEventListener('compositionstart', () => {
        gameState.isComposing = true;
    });
    
    elements.userInput.addEventListener('compositionend', (e) => {
        gameState.isComposing = false;
        handleInput(e);
    });
    
    elements.userInput.addEventListener('input', handleInput);
    elements.userInput.addEventListener('paste', (e) => e.preventDefault());

    // 排行榜標籤（中英文切換）
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            gameState.mode = e.target.dataset.tab; // 更新語言模式
            loadLeaderboard(); // 重新載入排行榜
        });
    });

    // 排行榜模式切換
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            gameState.leaderboardMode = e.target.dataset.mode;
            loadLeaderboard();
        });
    });

    // 難度篩選切換
    document.querySelectorAll('.diff-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.diff-tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            gameState.leaderboardDifficulty = e.target.dataset.difficulty;
            loadLeaderboard();
        });
    });

    // 提交分數按鈕
    elements.submitScoreBtn.addEventListener('click', submitScoreOnline);
}

// API調用函數
async function submitScoreOnline() {
    const playerName = elements.playerNameInput.value.trim() || '匿名玩家';
    
    elements.submitScoreBtn.disabled = true;
    elements.submitMessage.textContent = '提交中...';
    elements.submitMessage.className = 'submit-message';
    
    try {
        const response = await fetch(`${API_URL}/submit_score`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player_name: playerName,
                mode: gameState.mode,
                difficulty: gameState.difficulty,
                score: gameState.score,
                total_chars: gameState.totalChars
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            elements.submitMessage.textContent = '✓ 提交成功！';
            elements.submitMessage.className = 'submit-message success';
            
            // 重新載入排行榜
            setTimeout(() => {
                gameState.leaderboardMode = 'online';
                document.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.mode-tab-btn[data-mode="online"]').classList.add('active');
                loadLeaderboard();
            }, 1000);
        } else {
            elements.submitMessage.textContent = '✗ 提交失敗：' + data.message;
            elements.submitMessage.className = 'submit-message error';
            elements.submitScoreBtn.disabled = false;
        }
    } catch (error) {
        elements.submitMessage.textContent = '✗ 連接伺服器失敗，請確認後端是否啟動';
        elements.submitMessage.className = 'submit-message error';
        elements.submitScoreBtn.disabled = false;
    }
}

async function fetchOnlineLeaderboard(mode, difficulty = null) {
    try {
        let url = `${API_URL}/leaderboard?mode=${mode}&limit=10`;
        if (difficulty && difficulty !== 'all') {
            url += `&difficulty=${difficulty}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            return data.leaderboard;
        }
        return [];
    } catch (error) {
        console.error('獲取線上排行榜失敗:', error);
        return [];
    }
}

// 開始遊戲
function startGame() {
    resetGameState();
    switchScreen('game');
    
    gameState.isPlaying = true;
    gameState.currentText = getRandomText();
    gameState.startTime = Date.now();
    
    displayTargetText();
    elements.userInput.disabled = false;
    elements.userInput.value = '';
    elements.userInput.focus();
    
    startTimer();
}

// 重置遊戲狀態
function resetGameState() {
    gameState.currentIndex = 0;
    gameState.score = 0;
    gameState.correctChars = 0;
    gameState.totalChars = 0;
    gameState.timeLeft = 60;
    gameState.isPaused = false;
    gameState.isComposing = false;
    gameState.usedTexts = [];
    
    updateDisplay();
}

// 獲取隨機文字
function getRandomText() {
    const allTexts = textLibrary[gameState.mode][gameState.difficulty];
    const availableTexts = allTexts.filter(text => !gameState.usedTexts.includes(text));
    
    if (availableTexts.length === 0) {
        gameState.usedTexts = [];
        return allTexts[Math.floor(Math.random() * allTexts.length)];
    }
    
    const selectedText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
    gameState.usedTexts.push(selectedText);
    
    return selectedText;
}

// 顯示目標文字
function displayTargetText() {
    const text = gameState.currentText;
    let html = '';
    
    for (let i = 0; i < text.length; i++) {
        let className = 'char';
        
        if (i < gameState.currentIndex) {
            const userChar = elements.userInput.value[i];
            className += userChar === text[i] ? ' correct' : ' incorrect';
        } else if (i === gameState.currentIndex) {
            className += ' current';
        }
        
        html += `<span class="${className}">${text[i]}</span>`;
    }
    
    elements.targetText.innerHTML = html;
}

// 處理輸入
function handleInput(e) {
    if (!gameState.isPlaying || gameState.isPaused) return;
    if (gameState.isComposing) return;
    
    const userText = elements.userInput.value;
    const targetText = gameState.currentText;
    
    gameState.currentIndex = userText.length;
    
    displayTargetText();
    updateDisplay();
    
    if (userText === targetText) {
        gameState.score += targetText.length;
        gameState.totalChars += targetText.length;
        
        updateDisplay();
        
        setTimeout(() => {
            elements.userInput.value = '';
            gameState.currentText = getRandomText();
            gameState.currentIndex = 0;
            displayTargetText();
        }, 200);
    }
}

// 更新顯示
function updateDisplay() {
    elements.timer.textContent = gameState.timeLeft;
    elements.score.textContent = gameState.score;
}

// 計時器
function startTimer() {
    gameState.timerInterval = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            elements.timer.textContent = gameState.timeLeft;
            
            if (gameState.timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// 暫停/繼續
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const btn = document.getElementById('pause-btn');
    btn.textContent = gameState.isPaused ? '繼續' : '暫停';
    elements.userInput.disabled = gameState.isPaused;
    
    if (!gameState.isPaused) {
        elements.userInput.focus();
    }
}

// 結束遊戲
function endGame() {
    gameState.isPlaying = false;
    clearInterval(gameState.timerInterval);
    elements.userInput.disabled = true;
    
    // 計算部分輸入的分數
    const userText = elements.userInput.value;
    const targetText = gameState.currentText;
    
    let partialCorrect = 0;
    for (let i = 0; i < userText.length && i < targetText.length; i++) {
        if (userText[i] === targetText[i]) {
            partialCorrect++;
        }
    }
    
    gameState.score += partialCorrect;
    gameState.totalChars += userText.length;
    
    // 顯示結果
    elements.finalScore.textContent = gameState.score;
    elements.totalChars.textContent = gameState.totalChars;
    
    // 儲存到本地
    const isNewRecord = saveScoreLocal({
        mode: gameState.mode,
        difficulty: gameState.difficulty,
        score: gameState.score,
        totalChars: gameState.totalChars,
        date: new Date().toISOString()
    });
    
    if (isNewRecord) {
        elements.newRecord.classList.remove('hidden');
    } else {
        elements.newRecord.classList.add('hidden');
    }
    
    // 重置提交按鈕和訊息
    elements.submitScoreBtn.disabled = false;
    elements.submitMessage.className = 'submit-message hidden';
    elements.playerNameInput.value = '';
    
    switchScreen('end');
    loadLeaderboard();
}

// 退出遊戲
function quitGame() {
    if (confirm('確定要結束當前遊戲嗎？')) {
        endGame();
    }
}

// 重新開始
function restartGame() {
    startGame();
}

// 返回開始畫面
function backToStart() {
    switchScreen('start');
    displayBestScores();
}

// 切換畫面
function switchScreen(screen) {
    elements.startScreen.classList.remove('active');
    elements.gameScreen.classList.remove('active');
    elements.endScreen.classList.remove('active');
    
    switch(screen) {
        case 'start':
            elements.startScreen.classList.add('active');
            break;
        case 'game':
            elements.gameScreen.classList.add('active');
            break;
        case 'end':
            elements.endScreen.classList.add('active');
            break;
    }
}

// 儲存分數到本地
function saveScoreLocal(scoreData) {
    let scores = JSON.parse(localStorage.getItem('typingGameScores')) || [];
    scores.push(scoreData);
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 50);
    
    localStorage.setItem('typingGameScores', JSON.stringify(scores));
    
    const sameTypeScores = scores.filter(s => 
        s.mode === scoreData.mode && s.difficulty === scoreData.difficulty
    );
    
    return sameTypeScores[0].score === scoreData.score;
}

// 載入排行榜
async function loadLeaderboard() {
    if (gameState.leaderboardMode === 'online') {
        await displayOnlineLeaderboard(gameState.mode);
    } else {
        displayLocalLeaderboard(gameState.mode);
    }
}

// 顯示線上排行榜
async function displayOnlineLeaderboard(mode) {
    const scores = await fetchOnlineLeaderboard(mode, gameState.leaderboardDifficulty);
    
    const modeText = mode === 'zh' ? '中文' : '英文';
    const difficultyText = getDifficultyFilterName(gameState.leaderboardDifficulty);
    
    if (scores.length === 0) {
        elements.leaderboardContent.innerHTML = `<div class="empty-leaderboard">還沒有任何${modeText}${difficultyText}線上記錄</div>`;
        return;
    }
    
    let html = `<div style="text-align: center; margin-bottom: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-weight: bold; color: #667eea;">📊 ${modeText}${difficultyText}排行榜</div>`;
    
    scores.forEach((score, index) => {
        const rank = index + 1;
        const topClass = rank <= 3 ? `top-${rank}` : '';
        const date = new Date(score.date).toLocaleDateString('zh-TW');
        
        html += `
            <div class="leaderboard-item ${topClass}">
                <div class="rank">${rank}</div>
                <div class="difficulty-tag ${score.difficulty}">${getDifficultyName(score.difficulty)}</div>
                <div class="score-value">${score.player_name}</div>
                <div class="score-value">${score.score}分</div>
                <div class="date">${date}</div>
            </div>
        `;
    });
    
    elements.leaderboardContent.innerHTML = html;
}

// 顯示本地排行榜
function displayLocalLeaderboard(mode) {
    const scores = JSON.parse(localStorage.getItem('typingGameScores')) || [];
    let filteredScores = scores.filter(s => s.mode === mode);
    
    // 如果選擇了特定難度，進行篩選
    if (gameState.leaderboardDifficulty !== 'all') {
        filteredScores = filteredScores.filter(s => s.difficulty === gameState.leaderboardDifficulty);
    }
    
    filteredScores = filteredScores.slice(0, 10);
    
    const modeText = mode === 'zh' ? '中文' : '英文';
    const difficultyText = getDifficultyFilterName(gameState.leaderboardDifficulty);
    
    if (filteredScores.length === 0) {
        elements.leaderboardContent.innerHTML = `<div class="empty-leaderboard">還沒有${modeText}${difficultyText}本地記錄</div>`;
        return;
    }
    
    let html = `<div style="text-align: center; margin-bottom: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-weight: bold; color: #667eea;">💾 ${modeText}${difficultyText}本地記錄</div>`;
    
    filteredScores.forEach((score, index) => {
        const rank = index + 1;
        const topClass = rank <= 3 ? `top-${rank}` : '';
        const date = new Date(score.date).toLocaleDateString('zh-TW');
        
        html += `
            <div class="leaderboard-item ${topClass}">
                <div class="rank">${rank}</div>
                <div class="difficulty-tag ${score.difficulty}">${getDifficultyName(score.difficulty)}</div>
                <div class="score-value">${score.score}分</div>
                <div class="wpm-value">${score.totalChars}字</div>
                <div class="date">${date}</div>
            </div>
        `;
    });
    
    elements.leaderboardContent.innerHTML = html;
}

// 顯示最佳分數
function displayBestScores() {
    const scores = JSON.parse(localStorage.getItem('typingGameScores')) || [];
    const filteredScores = scores.filter(s => s.mode === gameState.mode);
    
    const difficulties = ['easy', 'medium', 'hard'];
    let html = '';
    
    difficulties.forEach(diff => {
        const bestScore = filteredScores
            .filter(s => s.difficulty === diff)
            .sort((a, b) => b.score - a.score)[0];
        
        if (bestScore) {
            html += `
                <div class="best-score-item">
                    <span>${getDifficultyName(diff)}</span>
                    <span><strong>${bestScore.score}</strong>分 | ${bestScore.totalChars}字</span>
                </div>
            `;
        }
    });
    
    if (html === '') {
        html = '<div class="empty-leaderboard">還沒有記錄</div>';
    }
    
    elements.bestScores.innerHTML = html;
}

// 獲取難度名稱
function getDifficultyName(difficulty) {
    const names = {
        easy: '簡單',
        medium: '中等',
        hard: '困難'
    };
    return names[difficulty] || difficulty;
}

// 獲取難度篩選名稱
function getDifficultyFilterName(difficulty) {
    const names = {
        all: '',
        easy: '簡單',
        medium: '中等',
        hard: '困難'
    };
    return names[difficulty] || '';
}

// 頁面載入時初始化

document.addEventListener('DOMContentLoaded', init);

