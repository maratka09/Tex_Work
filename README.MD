AI Assistant with Voice Input 🤖🎙️
Современное веб-приложение для общения с искусственным интеллектом, поддерживающее текстовый и голосовой ввод. Проект разработан в рамках выполнения тестового задания для Fullstack-разработчика.

🚀 Основные возможности
Интеллектуальный чат: Интеграция с API ChatGPT для получения ответов в реальном времени.

Голосовой ввод: Реализовано преобразование речи в текст с помощью Web Speech API.

Современный UI: Минималистичный интерфейс на Tailwind CSS с использованием дизайнерского шрифта Montserrat.

UX фишки: Автоматический скролл чата, индикация печати ("Думаю..."), плавные тени и адаптивность.

🛠 Технологический стек
Frontend: React, Tailwind CSS, Lucide React (иконки).

Backend: Python (Django) + Django REST Framework.

API: OpenAI (ChatGPT).

Fonts: Montserrat (Google Fonts).

📦 Установка и запуск
1. Клонирование репозитория

Bash
git clone https://github.com/maratka09/Tex_Work.git
cd ai_chat
2. Запуск Backend

Bash
cd backend
# Если Node.js:
npm install
npm start
# Если Python:
pip install -r requirements.txt
python manage.py runserver
3. Запуск Frontend

Bash
cd frontend
npm install
npm start
📋 Выполнение требований ТЗ
[x] Поле ввода и отправка текста.

[x] Подключение к API ИИ и отображение ответов.

[x] Голосовой ввод (Web Speech API).

[x] Обработка ошибок и индикатор загрузки.

[x] Чистый код и современная стилизация.
