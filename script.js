class AnimalGame {
    constructor() {
        this.currentAnimalIndex = 0;
        this.score = 0;
        this.isPaused = false;
        this.tapCount = 0;
        
        // Configuración de animales con imágenes libres
        this.animals = [
            { 
                name: 'Perro', 
                sound: 'Guau guau', 
                image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=400&fit=crop&crop=center',
                audio: 'dog'
            },
            { 
                name: 'Gato', 
                sound: 'Miau miau', 
                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=center',
                audio: 'cat'
            },
            { 
                name: 'Vaca', 
                sound: 'Muu muu', 
                image: 'https://images.unsplash.com/photo-1546445317-29d911b6fa5f?w=400&h=400&fit=crop&crop=center',
                audio: 'cow'
            },
            { 
                name: 'Oveja', 
                sound: 'Beee beee', 
                image: 'https://images.unsplash.com/photo-1500595046743-cd271d694e30?w=400&h=400&fit=crop&crop=center',
                audio: 'sheep'
            },
            { 
                name: 'Pollo', 
                sound: 'Pío pío', 
                image: 'https://images.unsplash.com/photo-1563281577-a7be47e20d51?w=400&h=400&fit=crop&crop=center',
                audio: 'chicken'
            },
            { 
                name: 'Caballo', 
                sound: 'Relincho', 
                image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5f?w=400&h=400&fit=crop&crop=center',
                audio: 'horse'
            },
            { 
                name: 'Cerdo', 
                sound: 'Oink oink', 
                image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=400&fit=crop&crop=center',
                audio: 'pig'
            },
            { 
                name: 'Pato', 
                sound: 'Cuac cuac', 
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=400&fit=crop&crop=center',
                audio: 'duck'
            },
            { 
                name: 'Elefante', 
                sound: 'Barrito', 
                image: 'https://images.unsplash.com/photo-1557050543-4d5f2e07c5e7?w=400&h=400&fit=crop&crop=center',
                audio: 'elephant'
            },
            { 
                name: 'León', 
                sound: 'Rugido', 
                image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop&crop=center',
                audio: 'lion'
            },
            { 
                name: 'Tigre', 
                sound: 'Rugido', 
                image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=400&fit=crop&crop=center',
                audio: 'tiger'
            },
            { 
                name: 'Jirafa', 
                sound: 'Sonido suave', 
                image: 'https://images.unsplash.com/photo-1547721064-da2cf13ce3a5?w=400&h=400&fit=crop&crop=center',
                audio: 'giraffe'
            }
        ];
        
        // Inicializar elementos del DOM
        this.animalContainer = document.getElementById('animalContainer');
        this.animalName = document.getElementById('animalName');
        this.animalSound = document.getElementById('animalSound');
        this.scoreElement = document.getElementById('score');
        this.soundBtn = document.getElementById('soundBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.gameArea = document.getElementById('gameArea');
        
        // Inicializar audio
        this.initAudio();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Mostrar primer animal
        this.showCurrentAnimal();
    }
    
    initAudio() {
        // Crear audio context para síntesis de voz
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Configurar síntesis de voz
        this.speechSynthesis = window.speechSynthesis;
        this.voice = null;
        
        // Esperar a que las voces estén disponibles
        if (this.speechSynthesis.onvoiceschanged !== undefined) {
            this.speechSynthesis.onvoiceschanged = () => {
                const voices = this.speechSynthesis.getVoices();
                // Buscar voz en español
                this.voice = voices.find(voice => 
                    voice.lang.includes('es') || voice.lang.includes('ES')
                ) || voices[0];
            };
        }
        
        // Pre-cargar sonidos naturales
        this.loadNaturalSounds();
    }
    
    loadNaturalSounds() {
        // Crear sonidos naturales usando Web Audio API
        this.naturalSounds = {
            tap: this.createNaturalTapSound(),
            pop: this.createPopSound(),
            sparkle: this.createSparkleSound(),
            bell: this.createBellSound(),
            chime: this.createChimeSound()
        };
    }
    
    createNaturalTapSound() {
        return () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
            
            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.15);
            
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
        };
    }
    
    createPopSound() {
        return () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
            filter.Q.setValueAtTime(2, this.audioContext.currentTime);
            
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }
    
    createSparkleSound() {
        return () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(3000, this.audioContext.currentTime);
            
            oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(2400, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }
    
    createBellSound() {
        return () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        };
    }
    
    createChimeSound() {
        return () => {
            const notes = [523, 659, 784]; // C, E, G
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    const filter = this.audioContext.createBiquadFilter();
                    
                    oscillator.connect(filter);
                    filter.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
                    
                    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.4);
                }, index * 150);
            });
        };
    }
    
    setupEventListeners() {
        // Evento de tap/clic en el área de juego
        this.gameArea.addEventListener('click', (e) => {
            if (e.target.closest('.control-btn')) return;
            this.handleTap();
        });
        
        // Evento de touch para dispositivos móviles
        this.gameArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTap();
        });
        
        // Botón de sonido
        this.soundBtn.addEventListener('click', () => {
            this.playCurrentAudio();
        });
        
        // Botón de pausa
        this.pauseBtn.addEventListener('click', () => {
            this.togglePause();
        });
        
        // Eventos de teclado para accesibilidad
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleTap();
            } else if (e.code === 'KeyS') {
                this.playCurrentAudio();
            } else if (e.code === 'KeyP') {
                this.togglePause();
            }
        });
    }
    
    handleTap() {
        if (this.isPaused) return;
        
        this.tapCount++;
        
        // Efecto visual de tap
        this.createTapEffect();
        
        // Reproducir sonido de tap
        this.playEnhancedTapSound();
        
        if (this.tapCount === 1) {
            // Primer tap: cambiar animal
            this.changeAnimal();
            this.playCurrentAudio();
        } else if (this.tapCount === 2) {
            // Segundo tap: mostrar información adicional
            this.showAnimalInfo();
            this.tapCount = 0;
            this.score++;
            this.updateScore();
        }
    }
    
    playEnhancedTapSound() {
        if (this.naturalSounds.tap) {
            this.naturalSounds.tap();
        }
    }
    
    createTapEffect() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
            transform: scale(0);
            animation: ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = this.gameArea.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        this.gameArea.appendChild(ripple);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 800);
    }
    
    changeAnimal() {
        this.currentAnimalIndex = (this.currentAnimalIndex + 1) % this.animals.length;
        this.showCurrentAnimal();
    }
    
    showCurrentAnimal() {
        const currentAnimal = this.animals[this.currentAnimalIndex];
        
        // Limpiar contenedor
        this.animalContainer.innerHTML = '';
        
        // Crear imagen del animal
        const animalImage = document.createElement('img');
        animalImage.src = currentAnimal.image;
        animalImage.alt = currentAnimal.name;
        animalImage.className = 'animal-image';
        animalImage.style.cssText = `
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: popIn 0.6s ease-out;
        `;
        
        this.animalContainer.appendChild(animalImage);
        
        // Actualizar información
        this.animalName.textContent = currentAnimal.name;
        this.animalSound.textContent = currentAnimal.sound;
    }
    
    showAnimalInfo() {
        const currentAnimal = this.animals[this.currentAnimalIndex];
        
        // Crear información adicional
        const info = document.createElement('div');
        info.className = 'animal-info';
        info.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.95);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: popIn 0.3s ease-out;
        `;
        
        info.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #333;">${currentAnimal.name}</h3>
            <p style="margin: 0; color: #666;">Sonido: ${currentAnimal.sound}</p>
        `;
        
        this.gameArea.appendChild(info);
        
        setTimeout(() => {
            info.remove();
        }, 2000);
    }
    
    playCurrentAudio() {
        const currentAnimal = this.animals[this.currentAnimalIndex];
        
        const text = `Es un ${currentAnimal.name}. Hace ${currentAnimal.sound}`;
        
        if (this.speechSynthesis && this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }
        
        if (this.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.voice;
            utterance.rate = 0.75;
            utterance.pitch = 1.1;
            utterance.volume = 0.9;
            utterance.lang = 'es-ES';
            this.speechSynthesis.speak(utterance);
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const icon = this.pauseBtn.querySelector('i');
        
        if (this.isPaused) {
            icon.className = 'fas fa-play';
            this.gameArea.style.opacity = '0.5';
            this.gameArea.style.transform = 'scale(0.98)';
        } else {
            icon.className = 'fas fa-pause';
            this.gameArea.style.opacity = '1';
            this.gameArea.style.transform = 'scale(1)';
        }
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score % 5 === 0) {
            this.celebrate();
        }
    }
    
    celebrate() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createEnhancedConfetti();
            }, i * 80);
        }
        
        this.playEnhancedCelebrationSound();
    }
    
    createEnhancedConfetti() {
        const confetti = document.createElement('div');
        const colors = ['#ff6b6b', '#4ecdc4', '#96ceb4', '#feca57', '#a55eea', '#fd79a8', '#ff9ff3', '#54a0ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${color};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            pointer-events: none;
            z-index: 1000;
            animation: enhanced-confetti-fall 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            border-radius: ${shape === 'circle' ? '50%' : '0'};
            clip-path: ${shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
        `;
        
        document.body.appendChild(confetti);
        
        if (!document.querySelector('#enhanced-confetti-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-confetti-style';
            style.textContent = `
                @keyframes enhanced-confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg) scale(1);
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 100}px) rotate(720deg) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
    
    playEnhancedCelebrationSound() {
        if (this.naturalSounds.bell) {
            this.naturalSounds.bell();
        }
        
        setTimeout(() => {
            if (this.naturalSounds.chime) {
                this.naturalSounds.chime();
            }
        }, 300);
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.game = new AnimalGame();
});

// Manejar la activación del audio context en dispositivos móviles
document.addEventListener('click', () => {
    if (window.game && window.game.audioContext && window.game.audioContext.state === 'suspended') {
        window.game.audioContext.resume();
    }
}, { once: true }); 