# PROMPT — Solum AI: hero con scroll 3D narrativo (concepto 3a)

> Pega este archivo en Claude Code como especificación. Está escrito para implementarse
> **desde cero** en el proyecto existente. No hay HTML que copiar: esto es la fuente de verdad.

---

## 0. Contexto

Solum AI es una consultora de IA que automatiza procesos y construye webs y apps para pymes.
La home debe transmitir **seguridad y competencia**, no espectáculo técnico.

El diseño anterior falla porque el 3D gira sin motivo y compite con el texto de venta.
La regla que gobierna todo este documento:

> **Cada grado de movimiento está atado a un dato.** El objeto solo cambia cuando cambia el mensaje.
> Si un movimiento no comunica nada, se elimina.

---

## 1. Qué hay que construir

Una sección de home de **620vh** con una escena **sticky de 100vh**. Dentro de esa escena:

- **Columna izquierda (46 %)**: el escudo 3D del logo (WebGL) + un raíl de actos + elementos auxiliares.
- **Columna derecha (54 %)**: la columna de texto, que se desplaza verticalmente con el scroll.
- La columna izquierda lleva `overflow: hidden`: **el 3D nunca invade la columna de texto.**

El progreso de scroll de la sección se normaliza a `p ∈ [0, 1]` y **todo** se deriva de `p`.

### Los cinco actos

| Acto | Rango de `p` | Mensaje | Estado del 3D |
|---|---|---|---|
| 01 Problema | 0.00 – 0.22 | "Tu negocio no tiene un problema de esfuerzo. Tiene un problema de piezas sueltas." | 4 capas dispersas |
| 02 Sistema | 0.22 – 0.42 | "Las unimos en un solo sistema, y ese sistema tiene un dueño: nosotros." | escudo sellado |
| 03 Automatización | 0.42 – 0.62 | "Quitamos de tu día el trabajo que una máquina ya puede hacer." | escudo + red de nodos |
| 04 Webs y apps | 0.62 – 0.82 | "Y construimos el producto donde vive tu negocio." | escudo + 3 pantallas |
| 05 Empezar | 0.82 – 1.00 | "Diagnóstico gratuito. Te decimos qué automatizar primero." | escudo acercándose, iluminado |

---

## 2. Geometría del escudo (autoritativa — no improvisar)

Caja de **100 × 108** unidades.

Contorno exterior (6 puntos, en % de la caja):
```
50% 0%   →   100% 20%   →   100% 60%   →   50% 100%   →   0% 60%   →   0% 20%
```

Galón interior — **es un agujero real, no un trazo**:
```
50% 26%  →  82% 56%  →  66% 56%  →  50% 41%  →  34% 56%  →  18% 56%
```

En three.js: `THREE.Shape` con el contorno + `THREE.Path` con el galón añadido a `shape.holes`,
extruido con `ExtrudeGeometry`:
- `depth` = 0.18 × altura del escudo
- bisel opcional ≤ 2 % de la altura, `bevelSegments: 2`
- resultado esperado: ~200–400 triángulos. Nada de GLTF, nada de modelo externo.

Material: `MeshStandardMaterial({ color: 0xC79063, roughness: 0.45, metalness: 0.6 })`.

---

## 3. Curva de animación, acto por acto

Easing único para todo: `outCubic` → `e = 1 - (1 - t)³`.
Helper: `seg(p, a, b) = clamp((p - a) / (b - a), 0, 1)`.

### Acto 01 — ensamblaje (0.00 → 0.30)
```
a = outCubic(seg(p, 0, 0.30))
```
Cuatro instancias del escudo (o cuatro slices de la extrusión) parten de posiciones dispersas y
convergen. Desplazamiento máximo **±170 px** en pantalla, rotación inicial máxima **±40°**,
opacidad de 0.22 a 1. La escena: `rotateX 14° → 0°`, `rotateY −24° → −14°`, `scale 0.80 → 1.00`.

**El ensamblaje es irreversible**: una vez `p > 0.30`, el escudo no vuelve a desarmarse ni subiendo.

### Acto 02 → 05 — anclado (0.30 → 1.00)
```
q = seg(p, 0.30, 1)
rotationY = -18° + 36° * q
```
Nada más. El escudo no flota, no orbita, no rebota.

### Elementos auxiliares — **nunca dos a la vez**
```
nodosOpacidad     = min(seg(p, 0.42, 0.50), 1 - seg(p, 0.58, 0.64))
pantallasOpacidad = min(seg(p, 0.64, 0.72), 1 - seg(p, 0.80, 0.86))
```
Nodos: `scale 0.86 → 1.0`, `rotate −8° → 0°`.
Pantallas: `scale 0.90 → 1.0`, `translateY 14px → 0`.

### Acto 05 — cierre (0.84 → 1.00)
```
c = outCubic(seg(p, 0.84, 1))
scale = 1.00 + 0.14 * c
```
La luz clave orbita de 120° a 30°. El glow radial sube de 0.20 a 0.30 de opacidad.
Es el **único** momento del scroll con degradado en el material.

### Columna de texto
```
translateY = -(alturaEscena * 4 * p)
```
Cinco bloques, cada uno exactamente de la altura de la escena, apilados. Movimiento lineal — no
usar easing aquí: el texto debe seguir al dedo del usuario 1:1.

### Contadores (esto es lo que hace el scroll "informativo")
| Contador | Valor | Rango de `p` |
|---|---|---|
| Herramientas desconectadas | 0 → 6 | 0.06 – 0.20 |
| Horas/semana perdidas | 0 → 11 | 0.10 – 0.22 |
| Días al primer proceso vivo | 0 → 14 | 0.86 – 0.97 |

**Los contadores solo suben.** Guardar el máximo alcanzado y no decrementar nunca, incluso si el
usuario sube rápido. Un número que baja destruye la credibilidad del dato.
Las tres cifras son **provisionales**: el cliente las sustituirá por datos reales.

---

## 4. Sistema de nodos (ilustración del acto 03)

Rejilla de 80 × 80. Cuatro nodos y tres conectores:

| Nodo | Posición | Tamaño | Color | Significado |
|---|---|---|---|---|
| Entrada | 28, 0 | 22 ø | `#C79063` | paso automatizado / IA |
| Izquierdo | 2, 30 | 18 ø | `#EFE7DC` | sistema del cliente |
| Derecho | 60, 30 | 18 ø | `#EFE7DC` | sistema del cliente |
| Salida | 28, 58 | 22 ø | `#C79063` | paso automatizado / IA |

Conectores: grosor 2, color `#5E4A36`, dibujados **debajo** de los nodos, sin puntas de flecha.
Solo ángulos 0/45/90°. Máximo dos tamaños de nodo y dos colores de nodo. Nunca sobre fondo blanco.

## 5. Pantallas (ilustración del acto 04)

Tres rectángulos **solo de contorno** (escritorio, móvil, app interna): contorno 1.5 px, radio
7–11 px, relleno con opacidad máxima del 10 %. Son un diagrama, **no** mockups: no meter capturas
de pantalla ni interfaces falsas dentro.

---

## 6. Tokens

```
--graphite-900: #0E0D0A   /* fondo */
--graphite-800: #131209   /* superficies */
--line:         #241F19   /* bordes */
--copper-500:   #C79063   /* marca */
--copper-700:   #5E4A36   /* conectores */
--bone-100:     #EFE7DC   /* texto principal */
--bone-400:     #B3AB9E   /* texto secundario */
--bone-600:     #8C8578   /* etiquetas */
```

Tipografía: **Archivo** 800 para titulares (`letter-spacing: -0.03em`), Archivo 400 para cuerpo,
**JetBrains Mono** 400–500 para etiquetas y cifras auxiliares (mayúsculas, tracking 0.14–0.2em).
**No usar Arial, Helvetica, Inter ni Roboto.**

---

## 7. Rendimiento (requisitos, no sugerencias)

- Una escena, una malla, dos luces. Sin HDRI, sin postproceso, sin sombras de contacto.
- **< 300 KB** de JS de 3D. Primer render en **< 1,5 s**.
- Listener de scroll **pasivo**; toda escritura de estilos y todo render dentro de
  `requestAnimationFrame`. Nunca escribir estilos dentro del handler del evento.
- Pausar el bucle de render cuando la escena sale del viewport (`IntersectionObserver`).
- `dpr` limitado a `min(devicePixelRatio, 2)`.

## 8. Móvil y accesibilidad

Con `prefers-reduced-motion: reduce` **o** ancho de viewport < 900 px:
- **No cargar WebGL en absoluto** (import dinámico condicionado, no solo ocultarlo).
- El escudo se muestra como imagen estática (SVG) en la parte superior.
- Los cinco actos pasan a ser cinco secciones apiladas normales, mismo orden y mismo texto.
- Los contadores muestran su valor final directamente.

## 9. Prohibido

Secuestrar el scroll (scroll-jacking, imán entre secciones) · más de un objeto 3D en pantalla ·
partículas · destellos (lens flare) · rebote elástico · desarmar el escudo al subir · nodos y
pantallas simultáneos · rellenar el galón del escudo · rotar el escudo más de ±18° tras sellarse ·
mockups reales dentro de los rectángulos del acto 04.

## 10. Criterios de aceptación

1. El scroll nativo nunca se bloquea ni se imanta.
2. El escudo queda sellado en `p = 0.30` y no vuelve a desarmarse en ninguna dirección.
3. Nodos y pantallas nunca coexisten en pantalla.
4. Los contadores nunca decrecen.
5. Con `prefers-reduced-motion` la página cuenta exactamente la misma historia sin WebGL.
6. El galón del escudo es un agujero real: se ve el fondo a través de él, también en 3D.
