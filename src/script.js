// Blackjack Card Counter Game Logic
class BlackjackTrainer {
    constructor() {
        this.gameState = {
            mode: null,
            isPlaying: false,
            isPaused: false,
            currentCards: [],
            correctAnswer: 0,
            userAnswer: null,
            timer: null,
            timeLeft: 0,
            timerDuration: 10,
            cardCount: 3,
            
            // Statistics
            streak: 0,
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            bestStreak: 0,
            startTime: null,
            totalTime: 0
        };
        
        this.elements = this.initializeElements();
        this.loadStats();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        return {
            // Mode selection
            modeSelection: document.getElementById('modeSelection'),
            modeButtons: document.querySelectorAll('.mode-btn'),
            
            // Game settings
            gameSettings: document.getElementById('gameSettings'),
            cardCountSelect: document.getElementById('cardCount'),
            timerDurationSelect: document.getElementById('timerDuration'),
            timerSetting: document.getElementById('timerSetting'),
            startGameBtn: document.getElementById('startGame'),
            
            // Game area
            gameArea: document.getElementById('gameArea'),
            cardsDisplay: document.getElementById('cardsDisplay'),
            questionText: document.getElementById('questionText'),
            
            // Timer
            timerDisplay: document.getElementById('timerDisplay'),
            timeLeftDisplay: document.getElementById('timeLeft'),
            
            // Answer sections
            answerOptions: document.getElementById('answerOptions'),
            optionButtons: document.querySelectorAll('.option-btn'),
            answerInput: document.getElementById('answerInput'),
            userAnswerInput: document.getElementById('userAnswer'),
            submitAnswerBtn: document.getElementById('submitAnswer'),
            practiceAnswer: document.getElementById('practiceAnswer'),
            correctTotalDisplay: document.getElementById('correctTotal'),
            nextCardBtn: document.getElementById('nextCard'),
            
            // Feedback
            feedback: document.getElementById('feedback'),
            continueBtn: document.getElementById('continueBtn'),
            
            // Controls
            newRoundBtn: document.getElementById('newRound'),
            changeModeBtn: document.getElementById('changeMode'),
            pauseGameBtn: document.getElementById('pauseGame'),
            
            // Stats
            streakDisplay: document.getElementById('streak'),
            scoreDisplay: document.getElementById('score'),
            accuracyDisplay: document.getElementById('accuracy'),
            bestStreakDisplay: document.getElementById('bestStreak')
        };
    }
    
    bindEvents() {
        // Mode selection
        this.elements.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectMode(btn.dataset.mode);
            });
        });
        
        // Game settings
        this.elements.startGameBtn.addEventListener('click', () => {
            this.startGame();
        });
        
        this.elements.cardCountSelect.addEventListener('change', (e) => {
            this.gameState.cardCount = parseInt(e.target.value);
        });
        
        this.elements.timerDurationSelect.addEventListener('change', (e) => {
            this.gameState.timerDuration = parseInt(e.target.value);
        });
        
        // Answer handling
        this.elements.optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectAnswer(parseInt(btn.dataset.value));
            });
        });
        
        this.elements.submitAnswerBtn.addEventListener('click', () => {
            this.submitInputAnswer();
        });
        
        this.elements.userAnswerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitInputAnswer();
            }
        });
        
        this.elements.nextCardBtn.addEventListener('click', () => {
            this.nextRound();
        });
        
        this.elements.continueBtn.addEventListener('click', () => {
            this.hideFeedback();
            this.nextRound();
        });
        
        // Game controls
        this.elements.newRoundBtn.addEventListener('click', () => {
            this.nextRound();
        });
        
        this.elements.changeModeBtn.addEventListener('click', () => {
            this.returnToModeSelection();
        });
        
        this.elements.pauseGameBtn.addEventListener('click', () => {
            this.togglePause();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    selectMode(mode) {
        this.gameState.mode = mode;
        this.showGameSettings();
        
        // Show/hide timer setting based on mode
        if (mode === 'timed') {
            this.elements.timerSetting.style.display = 'flex';
        } else {
            this.elements.timerSetting.style.display = 'none';
        }
    }
    
    showGameSettings() {
        this.elements.modeSelection.style.display = 'none';
        this.elements.gameSettings.style.display = 'block';
    }
    
    startGame() {
        this.gameState.isPlaying = true;
        this.gameState.startTime = Date.now();
        this.elements.gameSettings.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
        
        // Show pause button for timed mode
        if (this.gameState.mode === 'timed') {
            this.elements.pauseGameBtn.style.display = 'inline-block';
        }
        
        this.nextRound();
    }
    
    nextRound() {
        this.clearTimer();
        this.generateCards();
        this.setupAnswerMethod();
        this.updateDisplay();
        
        if (this.gameState.mode === 'timed') {
            this.startTimer();
        }
    }
    
    generateCards() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const cardCount = this.gameState.cardCount;
        
        this.gameState.currentCards = [];
        this.gameState.correctAnswer = 0;
        
        for (let i = 0; i < cardCount; i++) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const rank = ranks[Math.floor(Math.random() * ranks.length)];
            const isRed = suit === '♥' || suit === '♦';
            
            let value;
            if (rank === 'A') {
                // For simplicity, always count Ace as 11 initially
                // Advanced version could handle soft/hard totals
                value = 11;
            } else if (['J', 'Q', 'K'].includes(rank)) {
                value = 10;
            } else {
                value = parseInt(rank);
            }
            
            this.gameState.currentCards.push({
                suit,
                rank,
                value,
                isRed
            });
            
            this.gameState.correctAnswer += value;
        }
        
        // Handle Aces for blackjack rules (simple version)
        // If total > 21 and there are Aces valued at 11, convert them to 1
        let aceCount = this.gameState.currentCards.filter(card => card.rank === 'A').length;
        while (this.gameState.correctAnswer > 21 && aceCount > 0) {
            this.gameState.correctAnswer -= 10; // Change Ace from 11 to 1
            aceCount--;
        }
        
        this.displayCards();
    }
    
    displayCards() {
        this.elements.cardsDisplay.innerHTML = '';
        
        this.gameState.currentCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.isRed ? 'red' : ''}`;
            cardElement.style.animationDelay = `${index * 0.1}s`;
            
            cardElement.innerHTML = `
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${card.suit}</div>
            `;
            
            this.elements.cardsDisplay.appendChild(cardElement);
        });
    }
    
    setupAnswerMethod() {
        // Hide all answer methods first
        this.elements.answerOptions.style.display = 'none';
        this.elements.answerInput.style.display = 'none';
        this.elements.practiceAnswer.style.display = 'none';
        
        switch (this.gameState.mode) {
            case 'multiple-choice':
            case 'timed':
                this.setupMultipleChoice();
                break;
            case 'input':
                this.setupInputMode();
                break;
            case 'practice':
                this.setupPracticeMode();
                break;
        }
    }
    
    setupMultipleChoice() {
        this.elements.answerOptions.style.display = 'grid';
        const correctAnswer = this.gameState.correctAnswer;
        
        // Generate 3 incorrect answers
        const incorrectAnswers = new Set();
        while (incorrectAnswers.size < 3) {
            let incorrect = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
            if (incorrect !== correctAnswer && incorrect > 0 && incorrect <= 30) {
                incorrectAnswers.add(incorrect);
            }
        }
        
        // Combine and shuffle answers
        const allAnswers = [correctAnswer, ...Array.from(incorrectAnswers)];
        this.shuffleArray(allAnswers);
        
        // Set button values and reset styles
        this.elements.optionButtons.forEach((btn, index) => {
            btn.dataset.value = allAnswers[index];
            btn.textContent = allAnswers[index];
            btn.className = 'option-btn';
            btn.disabled = false;
        });
    }
    
    setupInputMode() {
        this.elements.answerInput.style.display = 'flex';
        this.elements.userAnswerInput.value = '';
        this.elements.userAnswerInput.focus();
    }
    
    setupPracticeMode() {
        this.elements.practiceAnswer.style.display = 'block';
        this.elements.correctTotalDisplay.textContent = this.gameState.correctAnswer;
    }
    
    selectAnswer(answer) {
        if (!this.gameState.isPlaying) return;
        
        this.clearTimer();
        this.gameState.userAnswer = answer;
        this.gameState.totalQuestions++;
        
        const isCorrect = answer === this.gameState.correctAnswer;
        
        // Visual feedback on buttons
        this.elements.optionButtons.forEach(btn => {
            const btnValue = parseInt(btn.dataset.value);
            if (btnValue === this.gameState.correctAnswer) {
                btn.classList.add('correct');
            } else if (btnValue === answer && !isCorrect) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });
        
        this.processAnswer(isCorrect);
    }
    
    submitInputAnswer() {
        if (!this.gameState.isPlaying) return;
        
        const answer = parseInt(this.elements.userAnswerInput.value);
        if (isNaN(answer) || answer < 1) {
            this.elements.userAnswerInput.focus();
            return;
        }
        
        this.clearTimer();
        this.gameState.userAnswer = answer;
        this.gameState.totalQuestions++;
        
        const isCorrect = answer === this.gameState.correctAnswer;
        this.processAnswer(isCorrect);
    }
    
    processAnswer(isCorrect) {
        if (isCorrect) {
            this.gameState.correctAnswers++;
            this.gameState.streak++;
            this.gameState.score += this.calculateScore();
            
            if (this.gameState.streak > this.gameState.bestStreak) {
                this.gameState.bestStreak = this.gameState.streak;
            }
        } else {
            this.gameState.streak = 0;
        }
        
        this.updateDisplay();
        this.saveStats();
        
        if (this.gameState.mode !== 'practice') {
            this.showFeedback(isCorrect);
        } else {
            // In practice mode, immediately go to next round
            setTimeout(() => {
                this.nextRound();
            }, 2000);
        }
    }
    
    calculateScore() {
        let baseScore = 10;
        
        // Bonus for difficulty (more cards = more points)
        baseScore += (this.gameState.cardCount - 2) * 5;
        
        // Bonus for speed in timed mode
        if (this.gameState.mode === 'timed') {
            const timeBonus = Math.max(0, this.gameState.timeLeft * 2);
            baseScore += timeBonus;
        }
        
        // Streak bonus
        if (this.gameState.streak >= 5) {
            baseScore *= 1.5;
        } else if (this.gameState.streak >= 10) {
            baseScore *= 2;
        }
        
        return Math.round(baseScore);
    }
    
    showFeedback(isCorrect) {
        this.elements.feedback.style.display = 'block';
        this.elements.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        const feedbackText = this.elements.feedback.querySelector('.feedback-text');
        if (isCorrect) {
            const messages = [
                'Excellent!', 'Perfect!', 'Great job!', 'Brilliant!', 
                'Outstanding!', 'Fantastic!', 'Well done!'
            ];
            feedbackText.textContent = messages[Math.floor(Math.random() * messages.length)];
        } else {
            feedbackText.innerHTML = `
                Incorrect! The correct answer was <strong>${this.gameState.correctAnswer}</strong>
            `;
        }
    }
    
    hideFeedback() {
        this.elements.feedback.style.display = 'none';
    }
    
    startTimer() {
        this.gameState.timeLeft = this.gameState.timerDuration;
        this.elements.timerDisplay.style.display = 'block';
        this.updateTimerDisplay();
        
        this.gameState.timer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        this.elements.timeLeftDisplay.textContent = this.gameState.timeLeft;
        
        // Add urgent styling when time is running out
        const timerCircle = document.querySelector('.timer-circle');
        if (this.gameState.timeLeft <= 3) {
            timerCircle.classList.add('timer-urgent');
        } else {
            timerCircle.classList.remove('timer-urgent');
        }
    }
    
    timeUp() {
        this.clearTimer();
        this.gameState.totalQuestions++;
        this.gameState.streak = 0;
        this.updateDisplay();
        this.saveStats();
        
        this.elements.feedback.style.display = 'block';
        this.elements.feedback.className = 'feedback incorrect';
        const feedbackText = this.elements.feedback.querySelector('.feedback-text');
        feedbackText.innerHTML = `
            Time's up! The correct answer was <strong>${this.gameState.correctAnswer}</strong>
        `;
    }
    
    clearTimer() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
        this.elements.timerDisplay.style.display = 'none';
    }
    
    togglePause() {
        if (this.gameState.isPaused) {
            this.gameState.isPaused = false;
            this.elements.pauseGameBtn.textContent = 'Pause';
            if (this.gameState.mode === 'timed') {
                this.startTimer();
            }
        } else {
            this.gameState.isPaused = true;
            this.elements.pauseGameBtn.textContent = 'Resume';
            this.clearTimer();
        }
    }
    
    returnToModeSelection() {
        this.gameState.isPlaying = false;
        this.clearTimer();
        this.elements.gameArea.style.display = 'none';
        this.elements.gameSettings.style.display = 'none';
        this.elements.modeSelection.style.display = 'block';
        this.hideFeedback();
    }
    
    updateDisplay() {
        this.elements.streakDisplay.textContent = this.gameState.streak;
        this.elements.scoreDisplay.textContent = this.gameState.score.toLocaleString();
        this.elements.bestStreakDisplay.textContent = this.gameState.bestStreak;
        
        const accuracy = this.gameState.totalQuestions > 0 
            ? Math.round((this.gameState.correctAnswers / this.gameState.totalQuestions) * 100)
            : 0;
        this.elements.accuracyDisplay.textContent = `${accuracy}%`;
    }
    
    handleKeyboard(e) {
        if (!this.gameState.isPlaying) return;
        
        // Number keys for multiple choice
        if (this.gameState.mode === 'multiple-choice' || this.gameState.mode === 'timed') {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 4) {
                const btn = this.elements.optionButtons[num - 1];
                if (btn && !btn.disabled) {
                    btn.click();
                }
            }
        }
        
        // Space for next round
        if (e.key === ' ') {
            e.preventDefault();
            if (this.elements.feedback.style.display === 'none') {
                this.nextRound();
            } else {
                this.elements.continueBtn.click();
            }
        }
        
        // Escape to return to mode selection
        if (e.key === 'Escape') {
            this.returnToModeSelection();
        }
    }
    
    saveStats() {
        const stats = {
            bestStreak: this.gameState.bestStreak,
            totalScore: this.gameState.score,
            totalQuestions: this.gameState.totalQuestions,
            correctAnswers: this.gameState.correctAnswers,
            lastPlayed: Date.now()
        };
        
        localStorage.setItem('blackjackTrainerStats', JSON.stringify(stats));
    }
    
    loadStats() {
        const saved = localStorage.getItem('blackjackTrainerStats');
        if (saved) {
            const stats = JSON.parse(saved);
            this.gameState.bestStreak = stats.bestStreak || 0;
            
            // Don't load score/questions from previous sessions for now
            // Could be extended to have persistent scoring
        }
    }
    
    // Utility methods
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    reset() {
        this.gameState.streak = 0;
        this.gameState.score = 0;
        this.gameState.totalQuestions = 0;
        this.gameState.correctAnswers = 0;
        this.updateDisplay();
        this.saveStats();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.blackjackTrainer = new BlackjackTrainer();
    
    // Add a reset button for development/testing
    console.log('Blackjack Trainer loaded! Use blackjackTrainer.reset() to reset stats.');
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}