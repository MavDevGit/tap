# 🎮 Juego de Figuras para Niños

Un juego educativo interactivo diseñado específicamente para niños de 2 años, que ayuda a aprender figuras geométricas y colores de manera divertida y estimulante.

## ✨ Características

- **Figuras Coloridas**: Estrellas, círculos, cuadrados, triángulos, corazones, diamantes, hexágonos, óvalos, pentágonos y octágonos
- **Colores Vibrantes**: 10 colores diferentes que cambian aleatoriamente
- **Interfaz Táctil**: Diseñada para dispositivos táctiles y pantallas táctiles
- **Audio Educativo**: Múltiples opciones de síntesis de voz de alta calidad
- **Efectos Visuales**: Animaciones suaves y efectos de celebración
- **Diseño Responsive**: Funciona perfectamente en tablets, móviles y computadoras
- **Interfaz Moderna**: Diseño atractivo y fácil de usar para niños

## 🚀 Despliegue en Vercel

### **Opción 1: Despliegue Directo (Recomendado)**

1. **Sube tu código a GitHub:**
```bash
git init
git add .
git commit -m "Primer commit - Juego educativo"
git branch -M main
git remote add origin https://github.com/tu-usuario/juego-figuras-ninos.git
git push -u origin main
```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio
   - Vercel detectará automáticamente que es un proyecto estático

3. **Configuración automática:**
   - **Framework Preset**: Other
   - **Build Command**: `npm run build` (o dejar vacío)
   - **Output Directory**: `.` (raíz del proyecto)
   - **Install Command**: `npm install` (opcional)

### **Opción 2: Despliegue con CLI**

1. **Instala Vercel CLI:**
```bash
npm i -g vercel
```

2. **Despliega:**
```bash
vercel
```

3. **Sigue las instrucciones:**
   - ¿Set up and deploy? → `y`
   - ¿Which scope? → Selecciona tu cuenta
   - ¿Link to existing project? → `n`
   - ¿What's your project's name? → `juego-figuras-ninos`
   - ¿In which directory is your code located? → `./`
   - ¿Want to override the settings? → `n`

### **Opción 3: Despliegue Manual**

1. **Prepara los archivos:**
```bash
# Asegúrate de tener todos los archivos
ls -la
# Deberías ver: index.html, styles.css, script.js, vercel.json, package.json
```

2. **Sube a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Arrastra y suelta tu carpeta del proyecto
   - Vercel detectará la configuración automáticamente

## 🎯 Cómo Jugar

1. **Primer Tap**: Cambia el color de la figura actual
2. **Segundo Tap**: Cambia a la siguiente figura
3. **Botón de Sonido**: Reproduce el audio que describe la figura y color
4. **Botón de Pausa**: Pausa o reanuda el juego
5. **Tecla T**: Cambia entre diferentes proveedores de voz

## 🎨 Figuras Incluidas

- ⭐ Estrella
- ⭕ Círculo
- ⬜ Cuadrado
- 🔺 Triángulo
- ❤️ Corazón
- 💎 Diamante
- 🔶 Hexágono
- 🥚 Óvalo
- 🔷 Pentágono
- 🛑 Octágono

## 🌈 Colores Disponibles

- 🔴 Rojo
- 🔵 Azul
- 🟢 Verde
- 🟡 Amarillo
- 🟣 Morado
- 🟠 Naranja
- 🩷 Rosa
- 🔷 Turquesa
- 🟡 Dorado
- ⚪ Plateado

## 🎵 Tecnologías de Voz Disponibles

### **1. OpenAI TTS (Recomendado)**
- **Calidad**: Excelente, similar a ChatGPT
- **Configuración**: Requiere API key de OpenAI
- **Voz**: Muy natural y expresiva
- **Costo**: ~$0.015 por 1,000 caracteres

### **2. ElevenLabs**
- **Calidad**: Muy alta, voces clonadas
- **Configuración**: Requiere API key de ElevenLabs
- **Voz**: Extremadamente natural
- **Costo**: Plan gratuito disponible

### **3. Azure Speech Services**
- **Calidad**: Alta, voces neurales
- **Configuración**: Requiere suscripción de Azure
- **Voz**: Muy natural en español
- **Costo**: ~$16 por millón de caracteres

### **4. Web Speech API (Gratuito)**
- **Calidad**: Variable según el navegador
- **Configuración**: No requiere configuración
- **Voz**: Básica pero funcional
- **Costo**: Gratuito

## 🚀 Configuración de Voces Avanzadas

### **Para OpenAI TTS:**
1. Obtén una API key en [OpenAI Platform](https://platform.openai.com/)
2. En `script.js`, línea 280, agrega tu API key:
```javascript
const apiKey = 'tu-api-key-aqui';
```

### **Para ElevenLabs:**
1. Regístrate en [ElevenLabs](https://elevenlabs.io/)
2. Obtén tu API key
3. En `script.js`, línea 320, agrega tu API key:
```javascript
const apiKey = 'tu-api-key-aqui';
```

### **Para Azure Speech Services:**
1. Crea una cuenta en [Azure](https://azure.microsoft.com/)
2. Crea un recurso de Speech Services
3. En `script.js`, línea 250, agrega tu subscription key:
```javascript
subscriptionKey: 'tu-subscription-key-aqui',
```

## 🎮 Controles

- **Tap/Clic**: Cambiar color o figura
- **Espacio**: Alternar entre colores y figuras
- **S**: Reproducir audio
- **P**: Pausar/Reanudar
- **T**: Cambiar proveedor de voz

## 🎯 Objetivos Educativos

- Aprender nombres de figuras geométricas
- Reconocer y nombrar colores
- Desarrollar coordinación ojo-mano
- Mejorar la atención y concentración
- Estimular la curiosidad y exploración

## 📁 Estructura del Proyecto

```
tap/
├── index.html          # Página principal
├── styles.css          # Estilos y animaciones
├── script.js           # Lógica del juego con múltiples TTS
├── vercel.json         # Configuración para Vercel
├── package.json        # Metadatos del proyecto
├── .gitignore          # Archivos a ignorar
└── README.md          # Documentación
```

## 🎨 Personalización

El juego es fácilmente personalizable:

- **Agregar Figuras**: Modificar el array `figures` en `script.js`
- **Cambiar Colores**: Editar el array `colors` en `script.js`
- **Ajustar Animaciones**: Modificar las animaciones CSS en `styles.css`
- **Personalizar Audio**: Cambiar la voz o velocidad en `script.js`
- **Configurar TTS**: Agregar API keys para voces avanzadas

## 🌟 Características Especiales

- **Efectos de Confeti**: Celebración visual cada 5 figuras
- **Animaciones Suaves**: Transiciones fluidas entre figuras
- **Interfaz Intuitiva**: Diseño pensado para niños pequeños
- **Accesibilidad**: Controles de teclado incluidos
- **Responsive Design**: Se adapta a cualquier tamaño de pantalla
- **Múltiples Voces**: Cambio dinámico entre proveedores de TTS
- **Sonidos Naturales**: Efectos de audio orgánicos

## 💡 Recomendaciones de Voz

### **Para Mejor Calidad:**
1. **OpenAI TTS**: La mejor opción para voz natural
2. **ElevenLabs**: Excelente para voces personalizadas
3. **Azure Speech**: Muy buena para español

### **Para Uso Gratuito:**
- **Web Speech API**: Funciona sin configuración
- **ElevenLabs**: Plan gratuito disponible

## 🔧 Solución de Problemas

### **Si no funciona el audio:**
1. Verifica que el navegador permita audio
2. Asegúrate de que las API keys estén configuradas
3. Revisa la consola del navegador para errores

### **Para cambiar de voz:**
- Presiona la tecla **T** para cambiar entre proveedores
- Verás una notificación indicando el proveedor actual

### **Problemas de despliegue en Vercel:**
1. **Error de build**: Verifica que todos los archivos estén en la raíz
2. **404 en rutas**: El `vercel.json` ya está configurado para SPA
3. **CORS**: No debería haber problemas con archivos estáticos
4. **Cache**: Vercel cachea automáticamente los archivos estáticos

## 🚀 Ventajas del Despliegue en Vercel

- **Velocidad**: CDN global para carga rápida
- **SSL**: Certificado HTTPS automático
- **Custom Domain**: Dominio personalizado fácil de configurar
- **Analytics**: Estadísticas de visitas incluidas
- **Preview Deployments**: Versiones de prueba automáticas
- **Git Integration**: Despliegue automático con cada push

¡Disfruta aprendiendo con este juego educativo! 🎉 