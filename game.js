function mostrarJuego() {
            document.getElementById('game-container').style.display = 'block';
            iniciarJuego();
        }

        function iniciarJuego() {
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');

            let player = { x: 50, y: 200, w: 20, h: 20, dy: 0, speed: 4, jumpPower: 7, jumps: 0 };
            let gravity = 0.4;
            let keys = {};
            let platforms = [
                {x: 0, y: 280, w: 600, h: 20}, // Suelo
                {x: 150, y: 220, w: 100, h: 10},
                {x: 300, y: 160, w: 100, h: 10},
                {x: 450, y: 100, w: 80, h: 10}  // Meta
            ];

            window.addEventListener('keydown', e => {
                keys[e.code] = true;
                if(e.code === 'Space' && player.jumps < 2) {
                    player.dy = -player.jumpPower;
                    player.jumps++;
                }
            });
            window.addEventListener('keyup', e => keys[e.code] = false);

            function update() {
                if (keys['ArrowRight']) player.x += player.speed;
                if (keys['ArrowLeft']) player.x -= player.speed;

                player.dy += gravity;
                player.y += player.dy;

                // Colisión con plataformas
                platforms.forEach(p => {
                    if (player.x < p.x + p.w && player.x + player.w > p.x &&
                        player.y < p.y + p.h && player.y + player.h > p.y && player.dy > 0) {
                        player.y = p.y - player.h;
                        player.dy = 0;
                        player.jumps = 0;
                    }
                });

                // Dibujar
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#198754'; // Color de la marca
                platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));
                
                ctx.fillStyle = 'red'; // Personaje
                ctx.fillRect(player.x, player.y, player.w, player.h);

                requestAnimationFrame(update);
            }
            update();
        }