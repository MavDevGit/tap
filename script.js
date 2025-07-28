class ShapeGame {
    constructor() {
        this.currentFigureIndex = 0;
        this.currentColorIndex = 0;
        this.score = 0;
        this.isPaused = false;
        this.tapCount = 0;
        this.audioEnabled = true;
        
        // Configuración de figuras mejoradas
        this.figures = [
            { name: 'Estrella', class: 'star', icon: '⭐', sound: 'star' },
            { name: 'Círculo', class: 'circle', icon: '⭕', sound: 'circle' },
            { name: 'Cuadrado', class: 'square', icon: '⬜', sound: 'square' },
            { name: 'Triángulo', class: 'triangle', icon: '🔺', sound: 'triangle' },
            { name: 'Corazón', class: 'heart', icon: '❤️', sound: 'heart' },
            { name: 'Diamante', class: 'diamond', icon: '💎', sound: 'diamond' },
            { name: 'Hexágono', class: 'hexagon', icon: '🔶', sound: 'hexagon' },
            { name: 'Óvalo', class: 'oval', icon: '🥚', sound: 'oval' },
            { name: 'Pentágono', class: 'pentagon', icon: '🔷', sound: 'pentagon' },
            { name: 'Octágono', class: 'octagon', icon: '🛑', sound: 'octagon' }
        ];
        
        // Configuración de colores mejorados
        this.colors = [
            { name: 'Rojo', value: '#ff6b6b', audio: 'rojo', sound: 'red' },
            { name: 'Azul', value: '#4ecdc4', audio: 'azul', sound: 'blue' },
            { name: 'Verde', value: '#96ceb4', audio: 'verde', sound: 'green' },
            { name: 'Amarillo', value: '#feca57', audio: 'amarillo', sound: 'yellow' },
            { name: 'Morado', value: '#a55eea', audio: 'morado', sound: 'purple' },
            { name: 'Naranja', value: '#fd79a8', audio: 'naranja', sound: 'orange' },
            { name: 'Rosa', value: '#ff9ff3', audio: 'rosa', sound: 'pink' },
            { name: 'Turquesa', value: '#54a0ff', audio: 'turquesa', sound: 'turquoise' },
            { name: 'Dorado', value: '#ffd93d', audio: 'dorado', sound: 'gold' },
            { name: 'Plateado', value: '#c0c0c0', audio: 'plateado', sound: 'silver' }
        ];
        
        // Inicializar elementos del DOM
        this.figureContainer = document.getElementById('figureContainer');
        this.figureName = document.getElementById('figureName');
        this.colorName = document.getElementById('colorName');
        this.scoreElement = document.getElementById('score');
        this.soundBtn = document.getElementById('soundBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.gameArea = document.getElementById('gameArea');
        
        // Inicializar audio mejorado con múltiples opciones
        this.initAdvancedAudio();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Mostrar primera figura
        this.showCurrentFigure();
    }
    
    initAdvancedAudio() {
        // Crear audio context para síntesis de voz
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Configurar múltiples opciones de TTS
        this.setupMultipleTTS();
        
        // Pre-cargar sonidos naturales
        this.loadNaturalSounds();
        
        // Configurar Azure Speech Services (opcional)
        this.setupAzureSpeech();
    }
    
    setupMultipleTTS() {
        // Configurar síntesis de voz mejorada
        this.speechSynthesis = window.speechSynthesis;
        this.voice = null;
        this.ttsOptions = {
            current: 'web-speech', // 'web-speech', 'azure', 'elevenlabs', 'openai'
            voices: []
        };
        
        // Esperar a que las voces estén disponibles
        if (this.speechSynthesis.onvoiceschanged !== undefined) {
            this.speechSynthesis.onvoiceschanged = () => {
                const voices = this.speechSynthesis.getVoices();
                this.ttsOptions.voices = voices;
                
                // Buscar las mejores voces en español
                const spanishVoices = voices.filter(voice => 
                    voice.lang.includes('es') || voice.lang.includes('ES')
                );
                
                // Priorizar voces de alta calidad
                this.voice = spanishVoices.find(voice => 
                    voice.name.includes('Google') || 
                    voice.name.includes('Natural') ||
                    voice.name.includes('Premium')
                ) || spanishVoices.find(voice => 
                    voice.name.includes('Microsoft') ||
                    voice.name.includes('Samantha')
                ) || spanishVoices[0] || voices[0];
                
                console.log('Voces disponibles:', voices.map(v => `${v.name} (${v.lang})`));
                console.log('Voz seleccionada:', this.voice?.name);
            };
        }
    }
    
    setupAzureSpeech() {
        // Configuración para Azure Speech Services (requiere suscripción)
        this.azureConfig = {
            subscriptionKey: '', // Agregar tu clave de Azure
            region: 'eastus',
            voiceName: 'es-ES-ElviraNeural', // Voz neural en español
            endpoint: ''
        };
        
        // Función para usar Azure Speech Services
        this.speakWithAzure = async (text) => {
            if (!this.azureConfig.subscriptionKey) return false;
            
            try {
                const response = await fetch(`https://${this.azureConfig.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': this.azureConfig.subscriptionKey,
                        'Content-Type': 'application/ssml+xml',
                        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
                    },
                    body: `<speak version='1.0' xml:lang='es-ES'>
                        <voice xml:lang='es-ES' xml:gender='Female' name='${this.azureConfig.voiceName}'>
                            ${text}
                        </voice>
                    </speak>`
                });
                
                if (response.ok) {
                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                    return true;
                }
            } catch (error) {
                console.error('Error con Azure Speech:', error);
            }
            return false;
        };
    }
    
    // Función para usar ElevenLabs (requiere API key)
    async speakWithElevenLabs(text) {
        const apiKey = ''; // Agregar tu API key de ElevenLabs
        if (!apiKey) return false;
        
        try {
            const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5
                    }
                })
            });
            
            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                return true;
            }
        } catch (error) {
            console.error('Error con ElevenLabs:', error);
        }
        return false;
    }
    
    // Función para usar OpenAI TTS (requiere API key)
    async speakWithOpenAI(text) {
        const apiKey = ''; // Agregar tu API key de OpenAI
        if (!apiKey) return false;
        
        try {
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: text,
                    voice: 'alloy', // alloy, echo, fable, onyx, nova, shimmer
                    response_format: 'mp3',
                    speed: 0.8
                })
            });
            
            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                return true;
            }
        } catch (error) {
            console.error('Error con OpenAI TTS:', error);
        }
        return false;
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
            
            // Configurar filtro para sonido más natural
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
            
            // Frecuencia variable para sonido más orgánico
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
            if (e.target.closest('.control-btn')) return; // No procesar clics en botones
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
            } else if (e.code === 'KeyT') {
                this.toggleTTSProvider();
            }
        });
    }
    
    handleTap() {
        if (this.isPaused) return;
        
        this.tapCount++;
        
        // Efecto visual de tap mejorado
        this.createTapEffect();
        
        // Reproducir sonido de tap mejorado
        this.playEnhancedTapSound();
        
        if (this.tapCount === 1) {
            // Primer tap: cambiar color
            this.changeColor();
            this.playCurrentAudio();
        } else if (this.tapCount === 2) {
            // Segundo tap: cambiar figura
            this.changeFigure();
            this.tapCount = 0;
            this.score++;
            this.updateScore();
            this.playCurrentAudio();
        }
    }
    
    playEnhancedTapSound() {
        // Usar sonido natural en lugar del básico
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
        
        // Posicionar el efecto donde se hizo clic
        const rect = this.gameArea.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        this.gameArea.appendChild(ripple);
        
        // Agregar animación CSS mejorada
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
    
    changeColor() {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
        this.showCurrentFigure();
    }
    
    changeFigure() {
        this.currentFigureIndex = (this.currentFigureIndex + 1) % this.figures.length;
        this.showCurrentFigure();
    }
    
    showCurrentFigure() {
        const currentFigure = this.figures[this.currentFigureIndex];
        const currentColor = this.colors[this.currentColorIndex];
        
        // Limpiar contenedor
        this.figureContainer.innerHTML = '';
        
        // Crear nueva figura con efectos mejorados
        const figureElement = document.createElement('div');
        figureElement.className = `figure ${currentFigure.class}`;
        figureElement.style.color = currentColor.value;
        
        // Efectos de brillo y sombra mejorados
        figureElement.style.boxShadow = `
            0 0 30px ${currentColor.value}40,
            0 8px 32px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.2)
        `;
        
        // Agregar gradiente interno para figuras más realistas
        figureElement.style.background = `linear-gradient(135deg, ${currentColor.value} 0%, ${this.adjustBrightness(currentColor.value, 1.2)} 50%, ${this.adjustBrightness(currentColor.value, 0.8)} 100%)`;
        
        this.figureContainer.appendChild(figureElement);
        
        // Actualizar información
        this.figureName.textContent = currentFigure.name;
        this.colorName.textContent = currentColor.name;
        this.colorName.style.color = currentColor.value;
    }
    
    adjustBrightness(hex, factor) {
        // Función para ajustar el brillo de un color
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        const newR = Math.min(255, Math.round(r * factor));
        const newG = Math.min(255, Math.round(g * factor));
        const newB = Math.min(255, Math.round(b * factor));
        
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
    
    async playCurrentAudio() {
        const currentFigure = this.figures[this.currentFigureIndex];
        const currentColor = this.colors[this.currentColorIndex];
        
        const text = `Es una ${currentFigure.name} de color ${currentColor.name}`;
        
        // Intentar diferentes proveedores de TTS en orden de calidad
        let success = false;
        
        // 1. Intentar OpenAI TTS (mejor calidad)
        if (this.ttsOptions.current === 'openai') {
            success = await this.speakWithOpenAI(text);
        }
        
        // 2. Intentar ElevenLabs (muy buena calidad)
        if (!success && this.ttsOptions.current === 'elevenlabs') {
            success = await this.speakWithElevenLabs(text);
        }
        
        // 3. Intentar Azure Speech Services
        if (!success && this.ttsOptions.current === 'azure') {
            success = await this.speakWithAzure(text);
        }
        
        // 4. Usar Web Speech API como fallback
        if (!success) {
            this.speakWithWebSpeech(text);
        }
    }
    
    speakWithWebSpeech(text) {
        if (this.speechSynthesis && this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }
        
        if (this.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.voice;
            utterance.rate = 0.75; // Más lento para mejor comprensión
            utterance.pitch = 1.1; // Tono ligeramente más alto
            utterance.volume = 0.9;
            utterance.lang = 'es-ES'; // Especificar idioma español
            this.speechSynthesis.speak(utterance);
        }
    }
    
    toggleTTSProvider() {
        const providers = ['web-speech', 'openai', 'elevenlabs', 'azure'];
        const currentIndex = providers.indexOf(this.ttsOptions.current);
        const nextIndex = (currentIndex + 1) % providers.length;
        this.ttsOptions.current = providers[nextIndex];
        
        console.log(`Cambiando a proveedor de TTS: ${this.ttsOptions.current}`);
        
        // Mostrar notificación visual
        this.showNotification(`Voz: ${this.ttsOptions.current}`);
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Nunito', sans-serif;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
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
        
        // Efecto de celebración cuando se alcanzan ciertos números
        if (this.score % 5 === 0) {
            this.celebrate();
        }
    }
    
    celebrate() {
        // Crear confeti mejorado
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createEnhancedConfetti();
            }, i * 80);
        }
        
        // Reproducir sonido de celebración mejorado
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
        
        // Agregar animación CSS mejorada si no existe
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
        // Usar sonido de campana mejorado
        if (this.naturalSounds.bell) {
            this.naturalSounds.bell();
        }
        
        // Seguido de chime
        setTimeout(() => {
            if (this.naturalSounds.chime) {
                this.naturalSounds.chime();
            }
        }, 300);
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ShapeGame();
});

// Manejar la activación del audio context en dispositivos móviles
document.addEventListener('click', () => {
    if (window.game && window.game.audioContext && window.game.audioContext.state === 'suspended') {
        window.game.audioContext.resume();
    }
}, { once: true }); 