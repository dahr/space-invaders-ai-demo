import React, { useState, useEffect, useRef } from 'react';

const SpaceInvaders = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [explosionFrame, setExplosionFrame] = useState(0);
  const [enemyColor, setEnemyColor] = useState('#888888');

  // Reset body styles
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const gameRef = useRef({
    player: { x: 575, y: 730, width: 50, height: 30, speed: 7 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
    enemyExplosions: [],
    keys: {},
    enemyDirection: 1,
    enemySpeed: 1.5,
    lastEnemyShot: 0,
    animationId: null,
    stars: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    const initEnemies = () => {
      game.enemies = [];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
          game.enemies.push({
            x: col * 100 + 150,
            y: row * 70 + 60,
            width: 40,
            height: 30,
            alive: true
          });
        }
      }
    };

    const initStars = () => {
      game.stars = [];
      for (let i = 0; i < 150; i++) {
        game.stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawStars = () => {
      ctx.fillStyle = '#ffffff';
      game.stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
    };

    const updateStars = () => {
      game.stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const drawPlayer = () => {
      if (gameState === 'explosion') {
        ctx.fillStyle = '#ff6600';
        const frame = Math.min(explosionFrame, 30);
        const size = 20 + frame * 2;
        ctx.beginPath();
        ctx.arc(game.player.x + game.player.width / 2, game.player.y + game.player.height / 2, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(game.player.x + game.player.width / 2, game.player.y + game.player.height / 2, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(game.player.x + game.player.width / 2, game.player.y + game.player.height / 2, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const cx = game.player.x + game.player.width / 2;
        const cy = game.player.y + game.player.height / 2;
        
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(cx - 8, cy - 10, 16, 25);
        
        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx - 8, cy - 10);
        ctx.lineTo(cx + 8, cy - 10);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#4a90e2';
        ctx.beginPath();
        ctx.arc(cx, cy - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy + 5);
        ctx.lineTo(cx - 18, cy + 15);
        ctx.lineTo(cx - 8, cy + 15);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(cx + 8, cy + 5);
        ctx.lineTo(cx + 18, cy + 15);
        ctx.lineTo(cx + 8, cy + 15);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy + 15);
        ctx.lineTo(cx - 3, cy + 25);
        ctx.lineTo(cx, cy + 20);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(cx + 6, cy + 15);
        ctx.lineTo(cx + 3, cy + 25);
        ctx.lineTo(cx, cy + 20);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy + 15);
        ctx.lineTo(cx, cy + 28);
        ctx.lineTo(cx + 2, cy + 15);
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawEnemies = () => {
      game.enemies.forEach(enemy => {
        if (enemy.alive) {
          const cx = enemy.x + enemy.width / 2;
          const cy = enemy.y + enemy.height / 2;
          
          ctx.fillStyle = '#555555';
          ctx.beginPath();
          ctx.ellipse(cx, cy + 3, 16, 5, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = enemyColor;
          ctx.beginPath();
          ctx.ellipse(cx, cy, 20, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          
          const lighterColor = lightenColor(enemyColor, 40);
          ctx.fillStyle = lighterColor;
          ctx.beginPath();
          ctx.ellipse(cx, cy - 6, 10, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#00ffff';
          ctx.beginPath();
          ctx.ellipse(cx, cy - 6, 6, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.arc(cx - 15, cy, 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#ffff00';
          ctx.beginPath();
          ctx.arc(cx, cy + 1, 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.arc(cx + 15, cy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      game.enemyExplosions.forEach(explosion => {
        const progress = explosion.frame / 15;
        const size = 15 + explosion.frame * 3;
        
        ctx.fillStyle = `rgba(255, 102, 0, ${1 - progress})`;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 255, 0, ${1 - progress})`;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const lightenColor = (color, percent) => {
      const num = parseInt(color.replace('#', ''), 16);
      const r = Math.min(255, ((num >> 16) & 0xff) + percent);
      const g = Math.min(255, ((num >> 8) & 0xff) + percent);
      const b = Math.min(255, (num & 0xff) + percent);
      return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    };

    const drawBullets = () => {
      ctx.fillStyle = '#ffff00';
      game.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
      });
      
      ctx.fillStyle = '#ff00ff';
      game.enemyBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
      });
    };

    const updatePlayer = () => {
      if (game.keys['ArrowLeft'] && game.player.x > 0) {
        game.player.x -= game.player.speed;
      }
      if (game.keys['ArrowRight'] && game.player.x < canvas.width - game.player.width) {
        game.player.x += game.player.speed;
      }
    };

    const updateBullets = () => {
      game.bullets = game.bullets.filter(bullet => {
        bullet.y -= 7;
        return bullet.y > 0;
      });

      game.enemyBullets = game.enemyBullets.filter(bullet => {
        bullet.y += 5;
        return bullet.y < canvas.height;
      });
    };

    const updateEnemyExplosions = () => {
      game.enemyExplosions = game.enemyExplosions.filter(explosion => {
        explosion.frame++;
        return explosion.frame < 15;
      });
    };

    const checkCollisions = () => {
      game.bullets.forEach((bullet, bIndex) => {
        game.enemies.forEach(enemy => {
          if (enemy.alive &&
              bullet.x < enemy.x + enemy.width &&
              bullet.x + 4 > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + 10 > enemy.y) {
            enemy.alive = false;
            game.bullets.splice(bIndex, 1);
            setScore(s => s + 10);
            
            game.enemyExplosions.push({
              x: enemy.x + enemy.width / 2,
              y: enemy.y + enemy.height / 2,
              frame: 0
            });
          }
        });
      });

      game.enemyBullets.forEach((bullet, bIndex) => {
        if (bullet.x < game.player.x + game.player.width &&
            bullet.x + 4 > game.player.x &&
            bullet.y < game.player.y + game.player.height &&
            bullet.y + 10 > game.player.y) {
          game.enemyBullets.splice(bIndex, 1);
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameState('gameOver');
            } else {
              setGameState('explosion');
              setExplosionFrame(0);
            }
            return newLives;
          });
        }
      });

      // Check if any enemy ship collides with player
      game.enemies.forEach(enemy => {
        if (enemy.alive &&
            enemy.x < game.player.x + game.player.width &&
            enemy.x + enemy.width > game.player.x &&
            enemy.y < game.player.y + game.player.height &&
            enemy.y + enemy.height > game.player.y) {
          enemy.alive = false;
          game.enemyExplosions.push({
            x: enemy.x + enemy.width / 2,
            y: enemy.y + enemy.height / 2,
            frame: 0
          });
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setGameState('gameOver');
            } else {
              setGameState('explosion');
              setExplosionFrame(0);
            }
            return newLives;
          });
        }
      });
    };

    const updateEnemies = () => {
      let shouldMoveDown = false;
      
      game.enemies.forEach(enemy => {
        if (!enemy.alive) return;
        
        enemy.x += game.enemyDirection * game.enemySpeed;
        
        if (enemy.x <= 0 || enemy.x >= canvas.width - enemy.width) {
          shouldMoveDown = true;
        }
      });

      if (shouldMoveDown) {
        game.enemyDirection *= -1;
        game.enemies.forEach(enemy => {
          if (enemy.alive) enemy.y += 20;
        });
      }

      const now = Date.now();
      if (now - game.lastEnemyShot > 1000) {
        const aliveEnemies = game.enemies.filter(e => e.alive);
        if (aliveEnemies.length > 0) {
          const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
          game.enemyBullets.push({
            x: shooter.x + shooter.width / 2,
            y: shooter.y + shooter.height
          });
          game.lastEnemyShot = now;
        }
      }
    };

    const checkWinCondition = () => {
      if (game.enemies.every(e => !e.alive)) {
        setGameState('gameOver');
      }
      
      // Check if any enemy reached the bottom
      const bottomReached = game.enemies.some(enemy => 
        enemy.alive && enemy.y + enemy.height >= canvas.height
      );
      
      if (bottomReached) {
        setGameState('gameOver');
      }
    };

    const gameLoop = () => {
      if (gameState !== 'playing' && gameState !== 'explosion') return;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();
      updateStars();

      if (gameState === 'explosion') {
        setExplosionFrame(f => {
          const newFrame = f + 1;
          if (newFrame >= 60) {
            game.player.x = 575;
            game.bullets = [];
            game.enemyBullets = [];
            setGameState('playing');
            return 0;
          }
          return newFrame;
        });
        
        drawPlayer();
        drawEnemies();
      } else {
        updatePlayer();
        updateBullets();
        updateEnemies();
        updateEnemyExplosions();
        checkCollisions();
        checkWinCondition();

        drawPlayer();
        drawEnemies();
        drawBullets();
      }

      game.animationId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      game.keys[e.key] = true;
      if (e.key === ' ' && gameState === 'playing') {
        e.preventDefault();
        game.bullets.push({
          x: game.player.x + game.player.width / 2 - 2,
          y: game.player.y
        });
      }
    };

    const handleKeyUp = (e) => {
      game.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    if (gameState === 'playing' || gameState === 'explosion') {
      if (gameState === 'playing') {
        initEnemies();
        if (game.stars.length === 0) {
          initStars();
        }
      }
      gameLoop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (game.animationId) {
        cancelAnimationFrame(game.animationId);
      }
    };
  }, [gameState, explosionFrame]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    gameRef.current.bullets = [];
    gameRef.current.enemyBullets = [];
    gameRef.current.player.x = 575;
    
    // Generate random color for enemy ships
    const colors = ['#888888', '#4a90e2', '#9b59b6', '#e74c3c', '#2ecc71', '#f39c12', '#1abc9c', '#e67e22'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setEnemyColor(randomColor);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '40px',
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold'
      }}>
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        style={{
          border: '4px solid #3b82f6',
          backgroundColor: '#000',
          display: 'block',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
        }}
      />

      {gameState === 'start' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>SPACE INVADERS</h1>
            <p style={{
              marginBottom: '20px',
              fontSize: '18px'
            }}>Arrow keys to move, Space to shoot</p>
            <button
              onClick={startGame}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '24px',
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>GAME OVER</h1>
            <p style={{
              fontSize: '32px',
              marginBottom: '20px'
            }}>Final Score: {score}</p>
            <button
              onClick={startGame}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '24px',
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceInvaders;