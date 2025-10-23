# Space Invaders Clone

A classic Space Invaders game built with React, featuring a rocket ship defending Earth against waves of flying saucers!

## Features

- 🚀 Classic arcade gameplay with modern React implementation
- 🛸 Flying saucer enemies with randomized colors each game
- ⭐ Animated starfield background
- 💥 Explosion effects for both player and enemies
- 🎮 Smooth keyboard controls
- 📊 Score tracking and lives system

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/space-invaders-clone.git
cd space-invaders-clone
```

2. Install dependencies:
```bash
npm install
```

Required dependencies:
- `react` (^18.0.0)
- `react-dom` (^18.0.0)
- A build tool like Vite or Create React App

## Project Setup

### Option 1: Using Vite (Recommended)

1. Create a new Vite project:
```bash
npm create vite@latest space-invaders -- --template react
cd space-invaders
```

2. Replace the contents of `src/App.jsx` with the Space Invaders component code

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

### Option 2: Using Create React App

1. Create a new React app:
```bash
npx create-react-app space-invaders
cd space-invaders
```

2. Replace the contents of `src/App.js` with the Space Invaders component code

3. Start the development server:
```bash
npm start
```

## Deployment

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/space-invaders-clone"
}
```

3. Deploy:
```bash
npm run deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Deploy to Netlify

1. Build your project:
```bash
npm run build
```

2. Drag and drop the `dist` or `build` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

## How to Play

### Game Objective
Defend Earth by destroying all the flying saucers before they reach the bottom of the screen!

### Controls
- **Arrow Left (←)**: Move your rocket ship left
- **Arrow Right (→)**: Move your rocket ship right
- **Spacebar**: Fire bullets at the enemy ships

### Game Rules

1. **Destroy the Invaders**: Shoot all the flying saucers to win the wave
2. **Avoid Enemy Fire**: Flying saucers shoot back! Dodge their bullets
3. **Don't Let Them Land**: If any enemy reaches the bottom of the screen, game over!
4. **Watch Out for Collisions**: If an enemy ship crashes into you, you lose a life
5. **Lives**: You have 3 lives. Lose them all and it's game over
6. **Scoring**: Each destroyed enemy is worth 10 points

### Gameplay Tips

- Keep moving to avoid enemy fire
- Try to destroy the lower enemies first to reduce incoming fire
- The enemies move faster as they get closer to you
- Each new game features enemies in different colors!
- Watch for the animated explosion when you get hit - your ship will respawn after

## Game Features Explained

### Visual Elements
- **Rocket Ship (Player)**: Silver rocket with red nose cone, blue window, and orange fins with flame effects
- **Flying Saucers (Enemies)**: Classic UFO design with dome cockpit, cyan windows, and colored rim lights
- **Starfield Background**: Scrolling stars create a sense of movement through space
- **Explosions**: Orange and yellow fireball effects for dramatic impact

### Technical Details
- Built with React hooks (useState, useEffect, useRef)
- Canvas-based rendering for smooth 60 FPS gameplay
- Collision detection for bullets, ships, and boundaries
- State management for game flow (start, playing, explosion, game over)

## Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### File Structure
```
space-invaders/
├── src/
│   ├── App.jsx          # Main game component
│   ├── main.jsx         # Entry point
│   └── index.css        # Styles (if needed)
├── public/
├── package.json
└── README.md
```

## Customization

You can customize the game by modifying these values in the code:

- **Enemy Count**: Change the rows and columns in `initEnemies()`
- **Player Speed**: Adjust `player.speed` value
- **Enemy Colors**: Add more colors to the `colors` array in `startGame()`
- **Bullet Speed**: Modify the speed values in `updateBullets()`
- **Enemy Fire Rate**: Change the timer in `updateEnemies()` (default: 1000ms)

## Troubleshooting

### Game doesn't start
- Make sure all dependencies are installed: `npm install`
- Check browser console for errors
- Ensure you're using a modern browser with Canvas support

### Controls not working
- Click on the game canvas to ensure it has focus
- Check that your keyboard is functioning properly
- Try refreshing the page

### Performance issues
- Close other browser tabs to free up resources
- Try a different browser (Chrome or Firefox recommended)
- Reduce the number of stars in the background if needed

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with HTML5 Canvas support

## License

MIT License - feel free to use and modify this game for your own projects!

## Credits

Created as a modern remake of the classic Space Invaders arcade game.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Have fun defending Earth from the alien invasion! 🚀👾🛸