# 🎮 lovelyPresent — Project Init Document

> **Назначение этого файла:** Полный контекст проекта для быстрого погружения любой нейросети (Claude, GPT, Cursor и т.д.) или нового разработчика в суть задачи. При новом чате — скопируй содержимое этого файла в начало диалога.

---

## 🧠 Концепция

**lovelyPresent** — личный веб-сайт-подарок для девушки, выполненный в стиле пиксельной RPG-игры. Наша история — приключение двух персонажей из разных миров. Каждый этап отношений — уровень игры.

### Визуальная идея (референс — скриншот в корне репозитория `fd9ae9de...jpg`)

- **Hero-секция:** экран разделён на две части — слева тёплый мир (вулканы, огонь, оранжевые тона), справа зелёный мир (лес, трава, природа). По центру два пиксельных персонажа рядом, между ними пиксельное сердце. Слоган: _"Two different worlds. One beautiful adventure."_
- **Timeline "Our Adventure":** горизонтальная прокрутка уровней (Level 1 → ... → Final Level), каждый уровень — дата и событие из реальной жизни пары.
- **Power-ups секция:** три колонки — слева "Power-ups" (Passion, Growth, Trust, Laughter), центр — тёмная карточка с цитатой, справа "Extras" (Gallery, Letters, About Us).
- **Footer:** `MADE WITH ♥ BY US, FOR US` + иконки Instagram, Spotify, Email.

### Навигация

`HOME | OUR JOURNEY | GALLERY | LETTERS | ABOUT US` + иконки музыки (♪) и настроек (⚙).

---

## 🏗 Архитектура проекта

### Стек технологий

| Слой               | Технология                     | Статус          |
| ------------------ | ------------------------------ | --------------- |
| Frontend framework | React 19 + TypeScript          | ✅ настроен     |
| Build tool         | Vite 8                         | ✅ настроен     |
| Routing            | React Router v6                | ✅ реализован   |
| Аутентификация     | React Context (`authStore.ts`) | ✅ реализована  |
| Carousel/Gallery   | @blossom-carousel/react 1.1.1  | ✅ установлен   |
| Анимации           | Framer Motion + CSS @keyframes | ✅ в auth       |
| Pixel-шрифт        | Press Start 2P (Google Fonts)  | ✅ подключён    |
| Body-шрифт         | Satoshi (Fontshare)            | ✅ подключён    |
| Стилизация         | CSS Modules + CSS Variables    | ✅ реализована  |
| Хостинг            | Amvera / Vercel / Netlify      | ⬜ не задеплоен |
| Расширенный стек   | GSAP + PixiJS                  | ⬜ не начат     |

### Структура папок (актуальная)

```
lovelyPresent/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── sprites/
│   │   │   ├── char1_idle.png        ✅ сгенерирован (огненный персонаж)
│   │   │   └── char2_idle.png        ✅ сгенерирован (природный персонаж)
│   │   └── backgrounds/
│   │       ├── bg_fire_world.png     ✅ сгенерирован (вулканический пейзаж)
│   │       └── bg_nature_world.png   ✅ сгенерирован (лесной пейзаж)
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthScreen.tsx        ✅ реализован полностью
│   │   │   └── AuthScreen.module.css ✅ реализован полностью
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            ⬜ заготовка
│   │   │   └── Footer.tsx            ⬜ заготовка
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       ⬜ не начат
│   │   │   ├── TimelineSection.tsx   ⬜ не начат
│   │   │   ├── PowerUpsSection.tsx   ⬜ не начат
│   │   │   └── GallerySection.tsx    ⬜ не начат
│   │   ├── pages/
│   │   │   ├── Home.tsx              ⬜ заготовка
│   │   │   ├── OurJourney.tsx        ⬜ заготовка
│   │   │   ├── Gallery.tsx           ⬜ заготовка
│   │   │   ├── Letters.tsx           ⬜ заготовка
│   │   │   └── AboutUs.tsx           ⬜ заготовка
│   │   └── ui/                       ⬜ компоненты не вынесены отдельно
│   ├── store/
│   │   └── authStore.ts              ✅ реализован (React Context)
│   ├── data/
│   │   ├── timeline.ts               ⬜ нужно создать
│   │   ├── letters.ts                ⬜ нужно создать
│   │   └── gallery.ts                ⬜ нужно создать
│   ├── styles/
│   │   ├── tokens.css                ✅ все переменные определены
│   │   ├── base.css                  ✅ реализован
│   │   └── pixel.css                 ✅ компоненты: btn-pixel, pixel-input, pixel-card и др.
│   ├── App.tsx                       ✅ роутинг + AuthContext провайдер
│   ├── main.tsx                      ✅
│   └── types.d.ts                    ✅
├── init.md                           ← ЭТОТ ФАЙЛ
├── package.json
└── vite.config.ts
```

---

## 🎭 Система аутентификации — РЕАЛИЗОВАНА ✅

### Концепция: "Two Worlds Login"

**Сценарий входа (реализован):**

1. Экран загружается: два персонажа стоят по разные стороны. Разделитель по центру. Оба персонажа делают idle-bob (CSS `@keyframes idle-bob`, работает на **внутреннем div**, не конфликтует с Framer Motion).
2. Вводится логин → `auth.login()` проверяет без изменения `isAuthenticated` → при успехе `setPhase('password')`, персонажи делают первый шаг навстречу через `useAnimation` (Framer Motion по оси X).
3. Вводится пароль → `auth.authenticate()` проверяет, **не трогает** `isAuthenticated` → при успехе `setPhase('success')`.
4. Фаза `success`: персонажи сходятся (второй шаг), через 500ms появляется сердце ❤️ + частицы, через **2400ms** вызывается `auth.confirmAuth()` — только тогда `isAuthenticated = true` → роутер переходит на `/home`.

**Важный архитектурный паттерн (исправлен баг):**

```ts
// authStore.ts
authenticate(password); // только проверяет → return true/false, НЕ меняет isAuthenticated
confirmAuth(); // ставит isAuthenticated=true — вызывать ТОЛЬКО после анимации
```

Роутер в `App.tsx` смотрит только на `isAuthenticated`. Если вызвать `confirmAuth()` до анимации — роутер моментально перекинет на `/home`.

**Хранение credentials:**

```
.env.local   (в .gitignore)
VITE_AUTH_LOGIN=<личное>
VITE_AUTH_PASSWORD=<личное>
# Без .env — заглушка 'dev'/'dev'
```

**Известная проблема с `scaleX` у Framer Motion:**
Зеркальный персонаж (char2) — `scaleX: -1` задаётся через **inline `style={}`** на `motion.div`, а не через CSS-класс. Framer управляет `transform` через `style`, CSS-класс будет перезаписан.

---

## 🎨 Дизайн-токены (`src/styles/tokens.css`) — РЕАЛИЗОВАНЫ ✅

Все переменные определены. Ключевые:

```css
:root {
  /* Шрифты */
  --font-pixel: "Press Start 2P", monospace;
  --font-body: "Satoshi", "Inter", sans-serif;

  /* Миры */
  --fire-primary: #e67e22;
  --fire-dark: #a04000;
  --fire-light: #f5a623;
  --nature-primary: #27ae60;
  --nature-dark: #1a6b3a;
  --nature-light: #52d68a;

  /* UI поверхности */
  --color-bg: #f5ede0; /* светлый пергамент */
  --color-bg-dark: #32221a; /* тёмный фон (auth, footer) */
  --color-bg-dark-card: #2a1c10; /* тёмная карточка */
  --color-bg-card: #fdf6ee;

  /* Текст */
  --color-text: #2c1a0e; /* тёмный на светлом */
  --color-text-light: #f5ede0; /* светлый на тёмном */

  /* Пиксельные утилиты */
  --shadow-pixel: 4px 4px 0 var(--color-border-pixel);
  --shadow-pixel-sm: 2px 2px 0 var(--color-border-pixel);
  --shadow-pixel-lg: 6px 6px 0 var(--color-border-pixel);
  --transition-fast: 120ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Критично для pixel-input:** фон захардкожен `#1a1008`, текст `#f5e6c8` — это сознательное решение для стабильного контраста на любом фоне.

---

## 🖼 Ассеты — СГЕНЕРИРОВАНЫ ✅

### Персонажи (`src/assets/sprites/`)

- **`char1_idle.png`** — огненный персонаж (рыжие волосы, оранжевый наряд, огненные мотивы)
- **`char2_idle.png`** — природный персонаж (зелёные волосы с листиком, белый наряд с сердцем)

### Фоны (`src/assets/backgrounds/`)

- **`bg_fire_world.png`** — вулканический пейзаж (лава, вулканы, оранжевое небо)
- **`bg_nature_world.png`** — лесной пейзаж (деревья, холмы, мягкий зелёный)

Все ассеты в пиксельном стиле 16-bit, тайловый вид снизу (character standing on ground).

---

## 📄 Страницы и их содержимое

### `/` — AuthScreen ✅ реализован

Экран входа с двумя персонажами и анимацией встречи.

### `/home` — Главная ⬜ заготовка

- HeroSection — два мира, два персонажа (idle-анимация)
- TimelineSection — горизонтальный скролл уровней
- PowerUpsSection — три колонки

### `/our-journey` — Путешествие ⬜

Развёрнутый вертикальный таймлайн. Данные из `src/data/timeline.ts`.

### `/gallery` — Галерея ⬜

**BlossomCarousel** — основная библиотека. Данные из `src/data/gallery.ts`.

### `/letters` — Письма ⬜

RPG-диалоговые окна, typewriter-эффект. Данные из `src/data/letters.ts`.

### `/about-us` — О нас ⬜

RPG character sheets для обоих персонажей.

---

## 📦 BlossomCarousel — интеграция

Установлен: `@blossom-carousel/react@1.1.1`. **Использовать только его для всех каруселей.**

**Документация:** https://www.blossom-carousel.com/docs/framework-guides/react-nextjs

```tsx
import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/core/style.css";

// CSS: .gallery-slide { width: 300px; scroll-snap-align: center; }
// ref.current.prev() / ref.current.next() для кастомных кнопок
```

---

## 🎬 Анимационный стек

### Базовый — в работе

| Анимация               | Технология                                       | Статус        |
| ---------------------- | ------------------------------------------------ | ------------- |
| Idle-bob персонажей    | CSS `@keyframes idle-bob` на inner div           | ✅ auth экран |
| Auth walk (X-движение) | Framer Motion `useAnimation` на outer div        | ✅ auth экран |
| Auth heart + частицы   | Framer Motion `AnimatePresence`                  | ✅ auth экран |
| Переходы страниц       | Framer Motion `AnimatePresence` + `pageVariants` | ✅ App.tsx    |
| Форма shake при ошибке | CSS `@keyframes form-shake`                      | ✅ auth экран |
| Scroll reveal          | Intersection Observer                            | ⬜ не начат   |
| Typewriter (Letters)   | CSS / JS                                         | ⬜ не начат   |
| Idle в Hero-секции     | CSS `@keyframes`                                 | ⬜ не начат   |

### Расширенный (Sprint 5)

| Анимация           | Технология           | Статус |
| ------------------ | -------------------- | ------ |
| 2D спрайт-анимации | PixiJS + Spritesheet | ⬜     |
| Параллакс фонов    | GSAP ScrollTrigger   | ⬜     |
| Частицы-сердечки   | PixiJS Particles     | ⬜     |
| Звук               | Howler.js            | ⬜     |

---

## ⚠️ Известные архитектурные решения и ловушки

1. **`confirmAuth()` vs `authenticate()`** — см. раздел аутентификации. Никогда не вызывать `confirmAuth()` сразу при вводе пароля — только после завершения анимации.

2. **Framer Motion + CSS transform конфликт** — если `motion.div` делает `animate={{ x: ... }}`, любые CSS-классы с `transform` будут перезаписаны. Решение: вложенные div-ы — outer для Framer (X/Y), inner для CSS (@keyframes).

3. **`scaleX: -1` через inline style** — не через CSS-класс, иначе Framer перезапишет.

4. **`pixel-input` контраст** — фон и цвет текста захардкожены, не через CSS-переменные. Это намеренно: `var(--color-text)` наследует тёмный цвет и пропадает на тёмном фоне формы.

5. **localStorage/sessionStorage** — если деплой на Amvera/Vercel, доступны. Если на Perplexity/iframe-среде — заблокированы. Текущая реализация использует React state (в памяти) — безопасно в обоих случаях.

6. **ENV-переменные** — `VITE_AUTH_LOGIN` и `VITE_AUTH_PASSWORD` вшиваются в бандл при сборке. Для production не добавлять в публичный репозиторий, только `.env.local` (он в `.gitignore`).

---

## 🗓 План разработки (спринты)

### Sprint 1 — Основа ✅ ЗАВЕРШЁН

- [x] React Router v6 настроен
- [x] AuthScreen с анимацией персонажей
- [x] ENV-переменные для логина/пароля
- [x] Дизайн-токены в `tokens.css`
- [x] Базовый роутинг всех страниц
- [x] Pixel UI классы (`pixel.css`)

### Sprint 2 — Главная страница ⬜ В РАБОТЕ

- [ ] HeroSection — два мира, два персонажа (idle в hero)
- [ ] TimelineSection — горизонтальный скролл уровней
- [ ] PowerUpsSection — три колонки
- [ ] Pixel-компоненты UI вынести в `ui/`
- [ ] Контентные данные в `data/timeline.ts`
- [ ] Navbar + Footer компоненты

### Sprint 3 — Галерея и письма ⬜

- [ ] Gallery с BlossomCarousel + реальные фото
- [ ] Letters с typewriter-эффектом
- [ ] About Us — RPG character sheets
- [ ] `data/letters.ts`, `data/gallery.ts`

### Sprint 4 — Polish ⬜

- [ ] Scroll reveal анимации (Intersection Observer)
- [ ] Idle-анимация персонажей в HeroSection
- [ ] Мобильная адаптация всех страниц
- [ ] Звук (опционально — Howler.js)

### Sprint 5 — 2D анимация ⬜ (если останется время)

- [ ] PixiJS setup
- [ ] Spritesheet персонажей
- [ ] Параллакс с GSAP ScrollTrigger
- [ ] Частицы-сердечки

---

## 🔑 Ключевые файлы

| Файл                                 | Роль                                                    | Статус              |
| ------------------------------------ | ------------------------------------------------------- | ------------------- |
| `src/App.tsx`                        | Корневой компонент, роутинг, AuthContext провайдер      | ✅                  |
| `src/store/authStore.ts`             | Auth state: login / authenticate / confirmAuth / logout | ✅                  |
| `src/components/auth/AuthScreen.tsx` | Экран входа, анимация персонажей                        | ✅                  |
| `src/styles/tokens.css`              | Все CSS переменные проекта                              | ✅                  |
| `src/styles/pixel.css`               | Pixel UI классы (btn-pixel, pixel-input и др.)          | ✅                  |
| `src/data/timeline.ts`               | Данные уровней (даты, события)                          | ⬜ создать          |
| `src/data/letters.ts`                | Тексты писем                                            | ⬜ создать          |
| `src/data/gallery.ts`                | Пути к фото                                             | ⬜ создать          |
| `.env.local`                         | `VITE_AUTH_LOGIN`, `VITE_AUTH_PASSWORD`                 | ⬜ создать локально |

---

## 📝 Контекст для AI-ассистента

1. **Личный подарочный сайт**, не коммерческий. Даты, имена, фото добавляются вручную.
2. **Разработчик — опытный фронтенд** (React/TypeScript), не нужно объяснять базовые концепции.
3. **Стиль — пиксельная RPG 16-bit**, современный UX внутри пиксельной эстетики.
4. **BlossomCarousel уже в проекте** — использовать только его для каруселей.
5. **Аутентификация без бэкенда** — только ENV-переменные Vite.
6. **Framer Motion + CSS transform** — всегда разделять outer (Framer) и inner (CSS) div.
7. **`confirmAuth()` вызывается только после анимации** — не сразу при правильном пароле.
8. **Приоритет:** Sprint 2 (главная страница) — следующий шаг.
9. **Деплой:** Amvera (предпочтительно) или Vercel.

---

_Последнее обновление: июнь 2026, после завершения Sprint 1_
_Репозиторий: https://github.com/YaNokavi/lovelyPresent_
