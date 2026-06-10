# 🎮 lovelyPresent — Project Init Document

> **Назначение этого файла:** Полный контекст проекта для быстрого погружения любой нейросети (Claude, GPT, Cursor и т.д.) или нового разработчика в суть задачи. При новом чате — скопируй содержимое этого файла в начало диалога.

---

## 🧠 Концепция

**lovelyPresent** — это личный веб-сайт-подарок для девушки, выполненный в стиле пиксельной RPG-игры. Идея: наша история — это приключение двух персонажей из разных миров, каждый этап отношений — это уровень игры.

### Визуальная идея (референс — прикреплённый скриншот в репозитории)
- **Hero-секция:** экран разделён на две части — слева тёплый мир (вулканы, огонь, оранжевые тона), справа зелёный мир (лес, трава, природа). По центру два пиксельных персонажа стоят рядом, между ними пиксельное сердце. Слоган: *"Two different worlds. One beautiful adventure."*
- **Timeline "Our Adventure":** горизонтальная прокрутка уровней (Level 1 → Level 2 → ... → Final Level), каждый уровень — дата и событие из реальной жизни пары, пиксельный арт-момент.
- **Power-ups секция:** три колонки — слева "Power-ups" (качества отношений: Passion, Growth, Trust, Laughter), центр — тёмная карточка с тёплой цитатой, справа "Extras" (ссылки: Gallery, Letters, About Us).
- **Footer:** `MADE WITH ♥ BY US, FOR US` + иконки Instagram, Spotify, Email.

### Навигация
`HOME | OUR JOURNEY | GALLERY | LETTERS | ABOUT US` + иконки музыки (♪) и настроек (⚙).

---

## 🏗 Архитектура проекта

### Стек технологий

| Слой | Технология | Версия |
|------|-----------|--------|
| Frontend framework | React | 19.x |
| Language | TypeScript | 6.x |
| Build tool | Vite | 8.x |
| Carousel/Gallery | @blossom-carousel/react | 1.1.1 |
| Routing | React Router v6 | (добавить) |
| Анимация (базовый стек) | CSS Animations + Framer Motion | — |
| Анимация (расширенный стек) | GSAP + PixiJS / Spine | — |
| Pixel-шрифт | Press Start 2P (Google Fonts) | — |
| Стилизация | CSS Modules + CSS Variables | — |
| Хостинг | Amvera / Vercel / Netlify | — |

### Структура папок (целевая)

```
lovelyPresent/
├── public/
│   ├── assets/
│   │   ├── sprites/          # Пиксельные персонажи, тайлы
│   │   ├── backgrounds/      # Фоны секций
│   │   └── sounds/           # Фоновая музыка, эффекты
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthScreen.tsx        # Экран входа с персонажами
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Два мира, два персонажа
│   │   │   ├── TimelineSection.tsx   # "Our Adventure" уровни
│   │   │   ├── PowerUpsSection.tsx   # Power-ups / Extras
│   │   │   └── GallerySection.tsx    # BlossomCarousel с фото
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── OurJourney.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Letters.tsx
│   │   │   └── AboutUs.tsx
│   │   └── ui/
│   │       ├── PixelButton.tsx
│   │       ├── PixelCard.tsx
│   │       ├── PixelHeart.tsx
│   │       └── SpeechBubble.tsx
│   ├── hooks/
│   │   ├── useAuth.ts                # Логика аутентификации
│   │   ├── usePixelAnimation.ts      # Хук для спрайт-анимаций
│   │   └── useSound.ts               # Управление звуком
│   ├── store/
│   │   └── authStore.ts              # Zustand или Context для auth
│   ├── data/
│   │   ├── timeline.ts               # Данные уровней (даты, события)
│   │   ├── letters.ts                # Письма / сообщения
│   │   └── gallery.ts                # Список фото для карусели
│   ├── styles/
│   │   ├── tokens.css                # CSS переменные (цвета, шрифты)
│   │   ├── base.css
│   │   └── pixel.css                 # Pixel-art утилиты
│   ├── App.tsx
│   ├── main.tsx
│   └── types.d.ts
├── init.md                           # ЭТОТ ФАЙЛ
├── package.json
└── vite.config.ts
```

---

## 🎭 Система аутентификации

### Концепция: "Two Worlds Login"

Вместо стандартной формы — интерактивная сцена с пиксельными персонажами.

**Сценарий входа:**
1. Экран загружается: два персонажа стоят по разные стороны экрана, спиной друг к другу, миры разделены.
2. Поле "login" — вводится что-то личное (например, дата первого сообщения, кличка питомца, место первой встречи — в формате кода). При правильном вводе — персонаж слева делает шаг к центру.
3. Поле "password" — второй личный факт. При правильном вводе — персонаж справа делает шаг к центру.
4. Когда оба поля верны — персонажи встречаются по центру, над ними появляется пиксельное сердце, играет звуковой эффект, и происходит переход на главную страницу с анимацией "Start Game".

**Технически:**
- Данные логина/пароля хранятся как env-переменные (Vite: `VITE_AUTH_LOGIN`, `VITE_AUTH_PASSWORD`) — без бэкенда.
- Состояние хранится в памяти (sessionStorage или React Context), без localStorage (если проект на Amvera — там доступен).
- Роут `/` = AuthScreen, после успеха — React Router redirect на `/home`.

**Альтернативный вариант с картинками:**
- Показать фото двух людей (пиксельный стиль), игрок "выбирает" персонажа кликом, потом вводит пароль.

---

## 📄 Страницы и их содержимое

### `/home` — Главная
- Hero-секция (см. выше)
- Timeline "Our Adventure" (горизонтальная прокрутка)
- Power-ups + Quote + Extras

### `/our-journey` — Наше путешествие
- Развёрнутый таймлайн с вертикальной прокруткой
- Каждый уровень: дата, название события, текст, картинка/спрайт

### `/gallery` — Галерея
- **BlossomCarousel** — основная библиотека для карусели фото
- Фотографии пары в пиксельных рамках
- Возможность fullscreen просмотра

### `/letters` — Письма
- Страница с "письмами" (сообщениями) друг другу
- Оформлены как пиксельные свитки или диалоговые окна из RPG
- Анимация "печатания текста" (typewriter effect)

### `/about-us` — О нас
- Профили двух персонажей (как RPG character sheet)
- Характеристики: Имя, Класс, Сила, Мудрость, Харизма (с юмором)
- Короткие bio

---

## 🎨 Дизайн-токены

```css
/* Цветовая палитра — тёплый оранжевый + зелёный природный */
:root {
  /* Мир персонажа 1 (огонь) */
  --color-fire-primary: #E8740C;
  --color-fire-dark: #8B3A00;
  --color-fire-light: #FFA855;
  --color-lava: #C0392B;

  /* Мир персонажа 2 (природа) */
  --color-nature-primary: #4A7C59;
  --color-nature-dark: #2D5A3D;
  --color-nature-light: #7EC995;
  --color-grass: #5B8C3E;

  /* Нейтральные (UI) */
  --color-bg-dark: #1A1208;
  --color-bg-parchment: #F5E6C8;
  --color-bg-card: #2C1F0E;
  --color-text-main: #2C1A00;
  --color-text-light: #F5E6C8;
  --color-border-pixel: #5C3D1E;

  /* Акцент */
  --color-heart: #E74C6A;
  --color-heart-light: #FF8FA3;
  --color-gold: #F0C040;

  /* Шрифты */
  --font-pixel: 'Press Start 2P', monospace;  /* заголовки, кнопки */
  --font-body: 'DM Sans', sans-serif;          /* основной текст */

  /* Пиксельные тени (pixel-perfect) */
  --shadow-pixel: 4px 4px 0px var(--color-border-pixel);
  --shadow-pixel-hover: 6px 6px 0px var(--color-border-pixel);
}
```

---

## 🎬 Анимационный стек

### Базовый (MVP — реализовать в первую очередь)
| Анимация | Технология | Описание |
|----------|-----------|---------|
| Hero персонажи | CSS `@keyframes` | Idle-анимация (покачивание) |
| Scroll reveal | Intersection Observer | Уровни появляются при скролле |
| Typewriter | CSS animation / JS | Текст печатается в письмах |
| Auth walk | CSS `@keyframes` | Персонажи идут к центру |
| Переходы страниц | Framer Motion | `AnimatePresence` + slide |
| Hover на кнопках | CSS | Pixel-смещение на 2px вниз |

### Расширенный (если останется время)
| Анимация | Технология | Описание |
|----------|-----------|---------|
| 2D спрайт-анимация | PixiJS + Spritesheet | Персонажи с множеством кадров |
| Параллакс фонов | GSAP ScrollTrigger | Слои фона движутся с разной скоростью |
| Частицы (сердечки) | PixiJS Particles | Эффект конфетти при входе |
| Spine-анимации | Spine + PixiJS | Профессиональные 2D анимации персонажей |
| Звук | Howler.js | Фоновая музыка + SFX |

---

## 📦 BlossomCarousel — интеграция

Библиотека уже установлена (`@blossom-carousel/react@1.1.1`) и частично интегрирована в `App.tsx`.

**Документация:** https://www.blossom-carousel.com/docs/framework-guides/react-nextjs

**Ключевые возможности для проекта:**
- Native scroll + physics-based drag на десктопе
- CSS scroll-snap совместимость
- `ref.current.prev()` / `ref.current.next()` для кастомных кнопок
- Overscroll API для кастомных эффектов
- 0 KB на тач-устройствах (чистый нативный скролл)

**Использование в Gallery:**
```tsx
import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/core/style.css";

// CSS для слайдов:
// .gallery-slide { width: 300px; scroll-snap-align: center; }
// .carousel { scroll-snap-type: x mandatory; }
```

---

## 🗓 План разработки (спринты)

### Sprint 1 — Основа и Auth (2-3 дня)
- [ ] Настройка React Router v6
- [ ] AuthScreen компонент (базовый без анимации персонажей)
- [ ] ENV-переменные для логина/пароля
- [ ] Дизайн-токены в `tokens.css`
- [ ] Navbar и Footer компоненты
- [ ] Базовый роутинг всех страниц

### Sprint 2 — Главная страница (3-4 дня)
- [ ] HeroSection — два мира, два персонажа (CSS/SVG)
- [ ] TimelineSection — горизонтальный скролл уровней
- [ ] PowerUpsSection — три колонки
- [ ] Pixel-компоненты UI (PixelButton, PixelCard, SpeechBubble)
- [ ] Контентные данные в `data/timeline.ts`

### Sprint 3 — Галерея и письма (2-3 дня)
- [ ] Gallery страница с BlossomCarousel
- [ ] Загрузка реальных фото в `public/assets/`
- [ ] Letters страница с typewriter-эффектом
- [ ] About Us страница (RPG character sheets)

### Sprint 4 — Анимация Auth + polish (2-3 дня)
- [ ] Анимация персонажей на AuthScreen (CSS walk)
- [ ] Framer Motion переходы между страницами
- [ ] Scroll reveal анимации (Intersection Observer)
- [ ] Idle-анимации персонажей в Hero
- [ ] Звук (опционально — Howler.js)

### Sprint 5 — 2D анимация (если есть время)
- [ ] PixiJS setup
- [ ] Spritesheet персонажей
- [ ] Параллакс фонов с GSAP ScrollTrigger
- [ ] Частицы-сердечки при входе

---

## 🔑 Важные файлы и их роль

| Файл | Роль |
|------|------|
| `src/App.tsx` | Корневой компонент, роутинг, сейчас там BlossomCarousel демо |
| `src/data/timeline.ts` | **Нужно создать** — данные уровней (даты, события) |
| `src/data/letters.ts` | **Нужно создать** — тексты писем |
| `src/data/gallery.ts` | **Нужно создать** — пути к фото |
| `src/styles/tokens.css` | **Нужно создать** — CSS переменные |
| `.env.local` | **Нужно создать** — `VITE_AUTH_LOGIN`, `VITE_AUTH_PASSWORD` |
| `public/assets/sprites/` | **Нужно создать** — пиксельные спрайты |

---

## 🧩 Текущее состояние репозитория

- **Framework:** React 19 + TypeScript 6 + Vite 8
- **Установлено:** `@blossom-carousel/react@1.1.1`
- **App.tsx:** содержит демо BlossomCarousel с 12 слайдами
- **Страницы:** пока нет (только демо)
- **Роутинг:** не настроен
- **Аутентификация:** не реализована
- **Данные:** не добавлены (ни фото, ни тексты)

---

## 📝 Контекст для AI-ассистента

Когда ты получаешь этот файл, ты должен знать:

1. **Это личный подарочный сайт**, не коммерческий проект. Содержимое (даты, имена, фото) будет добавлено вручную разработчиком.
2. **Разработчик — опытный фронтенд-разработчик** (React/TypeScript), поэтому не нужно объяснять базовые концепции.
3. **Стиль — пиксельная RPG**, всё должно выглядеть как игра, но с современным UX.
4. **BlossomCarousel уже в проекте** — используй его для всех каруселей/галерей, не предлагай другие библиотеки.
5. **Аутентификация без бэкенда** — только ENV-переменные Vite, никаких серверов.
6. **Приоритет:** сначала сделать работающий MVP (Sprint 1-3), потом улучшать анимации.
7. **Деплой:** скорее всего Amvera (есть поддержка Node.js) или Vercel.

---

*Последнее обновление: июнь 2026*
*Репозиторий: https://github.com/YaNokavi/lovelyPresent*
