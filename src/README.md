# Blackjack Card Counter Practice Website 🃏

A casino-themed static website to help you practice your blackjack card counting skills! Perfect for improving your mental math and getting ready for the tables.

## 🎰 Features

### Game Modes
- **Multiple Choice Mode**: Select the correct total from 4 options
- **Input Mode**: Type in the correct card total  
- **Timed Challenge**: Beat the countdown timer (5-30 seconds)
- **Practice Mode**: No pressure, take your time to learn

### Customization
- **Variable Card Count**: Practice with 2-6 cards
- **Adjustable Timer**: Configure countdown from 5-30 seconds
- **Difficulty Scaling**: More cards = higher scores

### Scoring & Progress
- **Streak Tracking**: Build up consecutive correct answers
- **Session Scoring**: Earn points based on speed and accuracy
- **Statistics**: Track accuracy percentage and best streak
- **Local Storage**: Your stats persist between sessions

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Use number keys (1-4) for multiple choice, spacebar for next round
- **Casino Theme**: Authentic green felt background with gold accents
- **Card Animations**: Smooth dealing animations for immersive experience

## 🚀 Getting Started

### Run Locally
1. Download or clone the files
2. Open a terminal in the project directory
3. Start a local server:
   ```bash
   python -m http.server 8080
   ```
   Or with Node.js:
   ```bash
   npx serve .
   ```
4. Open http://localhost:8080 in your browser

### Deploy to Azure Static Web Apps
1. Install the Azure Static Web Apps CLI:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. Deploy to Azure:
   ```bash
   npx swa deploy --env production
   ```

## 🎮 How to Play

1. **Choose Your Mode**: Select from Multiple Choice, Input, Timed Challenge, or Practice
2. **Configure Settings**: Set number of cards (2-6) and timer duration if applicable
3. **Start Playing**: Cards will be dealt automatically
4. **Calculate**: Add up the card values using blackjack rules:
   - Number cards (2-10): Face value
   - Face cards (J, Q, K): 10 points each
   - Aces: 11 points (or 1 if it would bust you over 21)
5. **Answer**: Select or type your answer before time runs out
6. **Build Streaks**: Get consecutive answers right to maximize your score!

## 🃏 Blackjack Card Values

- **Ace**: 11 (or 1 if total would exceed 21)
- **King, Queen, Jack**: 10
- **Number Cards**: Face value (2-10)

The game automatically handles "soft" Aces (converting from 11 to 1 when needed).

## ⌨️ Keyboard Shortcuts

- **1-4 Keys**: Select multiple choice answers
- **Enter**: Submit input answer
- **Spacebar**: Continue to next round
- **Escape**: Return to mode selection

## 📱 Mobile Friendly

The website is fully responsive and works great on:
- Desktop computers
- Tablets  
- Mobile phones

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks required
- **Local Storage**: Stats persist between sessions
- **Progressive Web App Ready**: Can be installed on mobile devices
- **Azure Static Web Apps Compatible**: Deploy with zero configuration

## 📁 File Structure

```
twentyone/
├── index.html              # Main game interface
├── styles.css              # Casino-themed styling
├── script.js               # Game logic and scoring
└── staticwebapp.config.json # Azure SWA configuration
```

## 🎯 Tips for Success

1. **Start with Practice Mode** to learn without pressure
2. **Use Multiple Choice** to get familiar with typical totals
3. **Progress to Timed Mode** once you're comfortable
4. **Focus on Aces** - they're the trickiest cards to handle
5. **Build up gradually** - start with 2-3 cards, then increase difficulty

## 🏆 Scoring System

- **Base Points**: 10 per correct answer
- **Card Difficulty Bonus**: +5 points per card beyond 2
- **Speed Bonus** (Timed Mode): +2 points per second remaining
- **Streak Multiplier**: 1.5x at 5+ streak, 2x at 10+ streak

## 📊 Statistics Tracked

- Current streak
- Session score  
- Overall accuracy percentage
- Best streak (persists between sessions)

---

**Good luck at the tables! 🎰**

Practice makes perfect, and this trainer will help you become lightning-fast at calculating card totals. Whether you're a beginner learning the basics or an experienced player looking to sharpen your skills, this tool has you covered!