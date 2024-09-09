document.getElementById('solicitarPapoBtn').addEventListener('click', function() {
    // Mudar o GIF
    document.getElementById('gifImage').src = "https://media1.tenor.com/m/OXn4ngtA1w4AAAAd/ryan-gosling.gif";
    
    // Exibir fogos de artifício
    showFireworks();
});

function showFireworks() {
    var canvas = document.getElementById('fireworksCanvas');
    var context = canvas.getContext('2d');
    
    // Definindo o tamanho do canvas para cobrir a tela inteira
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Função para desenhar fogos de artifício
    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: Math.random() * -5 - 5
        };
        this.alpha = 1;
    }

    Firework.prototype.update = function() {
        this.velocity.y += 0.05; // gravidade
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    };

    Firework.prototype.draw = function() {
        context.save();
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    };

    var fireworks = [];

    function animate() {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.push(new Firework(canvas.width * Math.random(), canvas.height * Math.random()));

        for (var i = 0; i < fireworks.length; i++) {
            if (fireworks[i].alpha <= 0) {
                fireworks.splice(i, 1);
                i--;
                continue;
            }
            fireworks[i].update();
            fireworks[i].draw();
        }
    }

    animate();
}

document.getElementById('solicitarPapoBtn').addEventListener('click', function() {
    // Mudar o GIF
    document.getElementById('gifImage').src = "https://media1.tenor.com/m/OXn4ngtA1w4AAAAd/ryan-gosling.gif";

    //Exibir um pop-up
    alert("Mensagem enviada ao Telegram do Rei Soberano!");
    
    // Exibir fogos de artifício
    showFireworks();

    // Enviar mensagem pelo Telegram
    const chatId = '';
    const token = '';
    const message = 'Alguém clicou no botão "Solicitar papo".';
    const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(telegramApiUrl)
        .then(response => response.json())
        .then(data => console.log('Mensagem enviada pelo Telegram:', data))
        .catch(error => console.error('Erro ao enviar mensagem pelo Telegram:', error));
});
