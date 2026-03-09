document.addEventListener('DOMContentLoaded', () => {
    // ЗАПРЕТ СКАЧИВАНИЯ И КОПИРОВАНИЯ КАРТИНОК
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // 1. Sticky Header
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animation (Vibe Coding micro-interactions)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of the sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Мобильное меню находится в разработке!');
        });
    }

    // 5. Interactive Leaflet Map
    if (document.getElementById('projectMap')) {
        // Initialize map centered on St. Petersburg
        const map = L.map('projectMap').setView([59.9386, 30.3141], 9);

        // Add Base Tile Layer (CartoDB Positron for a light, clean vibe)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Marker Data
        const projectsData = [
            {
                id: 1,
                title: "Дачный дом 6х8, СНТ Новая Рохма",
                lat: 60.20,
                lng: 30.30,
                status: "in-progress",
                statusText: "🏗️ В процессе",
                size: "48 м² + терраса",
                time: "идет стройка",
                img: "images/map-rohma-1.webp",
                type: "summer"
            },
            {
                id: 2,
                title: "Дом для ПМЖ, д. Виркино",
                lat: 59.43,
                lng: 30.16,
                status: "in-progress",
                statusText: "🏗️ В процессе",
                size: "166 м²",
                time: "идет стройка",
                img: "images/map-virkino-1.webp",
                type: "frame",
                gallery: [
                    "images/map-virkino-2.webp",
                    "images/map-virkino-3.webp"
                ]
            },
            {
                id: 3,
                title: "Дом для ПМЖ, КП Норлэнд",
                lat: 60.58,
                lng: 30.16,
                status: "in-progress",
                statusText: "🏗️ В процессе",
                size: "48 м² + терраса",
                time: "идет стройка",
                img: "images/map-norland-1.webp",
                type: "frame",
                gallery: [
                    "images/map-norland-2.webp",
                    "images/map-norland-3.webp",
                    "images/map-norland-4.webp"
                ]
            },
            {
                id: 4,
                title: "Дом с мансардой, с. Рождествено",
                lat: 59.317,
                lng: 29.935,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-rozdestvenno-1.webp",
                type: "frame"
            },
            {
                id: 5,
                title: "Одноэтажный дом, с. Рождествено",
                lat: 59.319,
                lng: 29.955,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-rozdestvenno-2.webp",
                type: "frame",
                gallery: [
                    "images/map-rozdestvenno-2-2.webp",
                    "images/map-rozdestvenno-2-3.webp",
                    "images/map-rozdestvenno-2-4.webp"
                ]
            },
            {
                id: 6,
                title: "Сезонный дом, ур. Черниговка",
                lat: 60.439,
                lng: 29.638,
                status: "completed",
                statusText: "✅ Завершен",
                size: "42 м²",
                time: "Завершен",
                img: "images/map-chernigovka.webp",
                type: "summer"
            },
            {
                id: 7,
                title: "Каркасный дом 6х6, СНТ Красная Звездочка",
                lat: 59.845,
                lng: 30.645,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/krasnaya-zvezdochka-1.webp",
                type: "frame",
                gallery: [
                    "images/krasnaya-zvezdochka-2.webp",
                    "images/krasnaya-zvezdochka-3.webp",
                    "images/krasnaya-zvezdochka-4.webp"
                ]
            },
            {
                id: 8,
                title: "Садовый дом 6х6, д. Лопухинка",
                lat: 59.739,
                lng: 29.411,
                status: "completed",
                statusText: "✅ Завершен",
                size: "36 м²",
                time: "Завершен",
                img: "images/map-lopuhinka.webp",
                type: "summer"
            },
            {
                id: 9,
                title: "Бытовка 6х2, п. Нурма",
                lat: 59.559,
                lng: 31.020,
                status: "completed",
                statusText: "✅ Завершен",
                size: "12 м²",
                time: "Завершен",
                img: "images/map-nurma-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-nurma-2.webp",
                    "images/map-nurma-3.webp",
                    "images/map-nurma-4.webp"
                ]
            },
            {
                id: 10,
                title: "Бытовка 6х2,4 с террасой, п. Кирилловское",
                lat: 60.470,
                lng: 29.287,
                status: "completed",
                statusText: "✅ Завершен",
                size: "14.4 м² + терраса",
                time: "Завершен",
                img: "images/map-kirillovskoe-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-kirillovskoe-2.webp",
                    "images/map-kirillovskoe-3.webp"
                ]
            },
            {
                id: 11,
                title: "Каркасный дом 6х8, п. Кротово",
                lat: 60.900,
                lng: 29.983,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-krotovo-1.webp",
                type: "frame",
                gallery: [
                    "images/map-krotovo-2.webp",
                    "images/map-krotovo-3.webp",
                    "images/map-krotovo-4.webp"
                ]
            },
            {
                id: 12,
                title: "Садовый дом 6х5, д. Вопша",
                lat: 59.488,
                lng: 30.051,
                status: "completed",
                statusText: "✅ Завершен",
                size: "39 м²",
                time: "Завершен",
                img: "images/map-vopsha.webp",
                type: "summer"
            },
            {
                id: 13,
                title: "Каркасный дом 6х6, г. Всеволожск",
                lat: 60.019,
                lng: 30.645,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-vsevolozsk-1.webp",
                type: "frame",
                gallery: [
                    "images/map-vsevolozsk-2.webp",
                    "images/map-vsevolozsk-3.webp",
                    "images/map-vsevolozsk-4.webp",
                    "images/map-vsevolozsk-5.webp",
                    "images/map-vsevolozsk-6.webp"
                ]
            },
            {
                id: 14,
                title: "Садовый дом 6х6, п. Дубки",
                lat: 59.926,
                lng: 29.595,
                status: "completed",
                statusText: "✅ Завершен",
                size: "36 м²",
                time: "Завершен",
                img: "images/map-dubki-1.webp",
                type: "summer",
                gallery: [
                    "images/map-dubki-2.webp"
                ]
            },
            {
                id: 15,
                title: "Бытовка 6х2,5 с террасой, СНТ Солнечное (массив Проба)",
                lat: 60.102,
                lng: 30.798,
                status: "completed",
                statusText: "✅ Завершен",
                size: "15 м² + терраса",
                time: "Завершен",
                img: "images/map-proba-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-proba-2.webp",
                    "images/map-proba-3.webp",
                    "images/map-proba-4.webp"
                ]
            },
            {
                id: 16,
                title: "Каркасный дом с мансардой, г. Никольское",
                lat: 59.704,
                lng: 30.786,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-nikolskoe-1.webp",
                type: "frame"
            },
            {
                id: 17,
                title: "Каркасный дом с мансардой, д. Малое Замостье",
                lat: 59.547,
                lng: 30.221,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-maloe-zamostie-1.webp",
                type: "frame",
                gallery: [
                    "images/map-maloe-zamostie-2.webp",
                    "images/map-maloe-zamostie-3.webp",
                    "images/map-maloe-zamostie-4.webp",
                    "images/map-maloe-zamostie-5.webp",
                    "images/map-maloe-zamostie-6.webp"
                ]
            },
            {
                id: 18,
                title: "Каркасный дом с мансардой, д. Хапо-Ое",
                lat: 59.884,
                lng: 30.744,
                status: "completed",
                statusText: "✅ Завершен",
                size: "144 м²",
                time: "Завершен",
                img: "images/map-hapo-oe-1.webp",
                type: "frame"
            },
            {
                id: 19,
                title: "Каркасный дом Барнхаус, г.п. Федоровское",
                lat: 59.663,
                lng: 30.531,
                status: "completed",
                statusText: "✅ Завершен",
                size: "30 м²",
                time: "Завершен",
                img: "images/map-fedorovskoe-1.webp",
                type: "frame",
                gallery: [
                    "images/map-fedorovskoe-2.webp",
                    "images/map-fedorovskoe-3.webp",
                    "images/map-fedorovskoe-4.webp"
                ]
            },
            {
                id: 20,
                title: "Каркасный дом 8х9, массив Пупышево",
                lat: 59.932,
                lng: 32.110,
                status: "completed",
                statusText: "✅ Завершен",
                size: "144 м²",
                time: "Завершен",
                img: "images/map-pupyshevo-1.webp",
                type: "frame",
                gallery: [
                    "images/map-pupyshevo-2.webp",
                    "images/map-pupyshevo-3.webp",
                    "images/map-pupyshevo-4.webp",
                    "images/map-pupyshevo-5.webp"
                ]
            },
            {
                id: 21,
                title: "Каркасный дом с мансардой, КП Родное",
                lat: 59.627,
                lng: 30.497,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-rodnoe-1.webp",
                type: "frame",
                gallery: [
                    "images/map-rodnoe-2.webp",
                    "images/map-rodnoe-3.webp",
                    "images/map-rodnoe-4.webp"
                ]
            },
            {
                id: 22,
                title: "Бытовка 6х3, СНТ Автомобилист",
                lat: 59.923,
                lng: 32.118,
                status: "completed",
                statusText: "✅ Завершен",
                size: "18 м²",
                time: "Завершен",
                img: "images/map-avtomobilist-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-avtomobilist-2.webp",
                    "images/map-avtomobilist-3.webp"
                ]
            },
            {
                id: 23,
                title: "Садовый дом 6х6 с террасой, д. Коккорево",
                lat: 60.070,
                lng: 31.065,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-kokkorevo-1.webp",
                type: "summer",
                gallery: [
                    "images/map-kokkorevo-2.webp",
                    "images/map-kokkorevo-3.webp",
                    "images/map-kokkorevo-4.webp"
                ]
            },
            {
                id: 24,
                title: "Садовый дом 6х5 с террасой, СНТ Орбита",
                lat: 59.753,
                lng: 30.245,
                status: "completed",
                statusText: "✅ Завершен",
                size: "39 м²",
                time: "Завершен",
                img: "images/map-orbita-1.webp",
                type: "summer",
                gallery: [
                    "images/map-orbita-2.webp"
                ]
            },
            {
                id: 25,
                title: "Садовый дом 6х5 с террасой, д. Орехово",
                lat: 60.497,
                lng: 30.271,
                status: "completed",
                statusText: "✅ Завершен",
                size: "42 м²",
                time: "Завершен",
                img: "images/map-orehovoe-1.webp",
                type: "summer"
            },
            {
                id: 26,
                title: "Садовый дом 6х4, СНТ Озеро (Красницы)",
                lat: 59.447,
                lng: 30.254,
                status: "completed",
                statusText: "✅ Завершен",
                size: "24 м²",
                time: "Завершен",
                img: "images/snt-ozero-1.webp",
                type: "summer",
                gallery: [
                    "images/snt-ozero-2.webp",
                    "images/snt-ozero-3.webp",
                    "images/snt-ozero-4.webp",
                    "images/snt-ozero-5.webp",
                    "images/snt-ozero-6.webp",
                    "images/snt-ozero-7.webp",
                    "images/snt-ozero-8.webp"
                ]
            },
            {
                id: 27,
                title: "Бытовка 6х3 с террасой, СНТ Беляевский мох",
                lat: 59.894,
                lng: 31.041,
                status: "completed",
                statusText: "✅ Завершен",
                size: "27 м²",
                time: "Завершен",
                img: "images/belyaevskiy-moh-1.webp",
                type: "cabin",
                gallery: [
                    "images/belyaevskiy-moh-2.webp",
                    "images/belyaevskiy-moh-3.webp",
                    "images/belyaevskiy-moh-4.webp",
                    "images/belyaevskiy-moh-5.webp",
                    "images/belyaevskiy-moh-6.webp"
                ]
            },
            {
                id: 28,
                title: "Дом в стиле Барнхаус, д. Лопухинка",
                lat: 59.730,
                lng: 29.411,
                status: "completed",
                statusText: "✅ Завершен",
                size: "66 м²",
                time: "Завершен",
                img: "images/map-lopyhinka-1.webp",
                type: "frame",
                gallery: [
                    "images/map-lopyhinka-2.webp"
                ]
            },
            {
                id: 29,
                title: "Бытовка 5х2,5, д. Старосиверская",
                lat: 59.361,
                lng: 30.111,
                status: "completed",
                statusText: "✅ Завершен",
                size: "12,5 м²",
                time: "Завершен",
                img: "images/map-starosiverskaya-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-starosiverskaya-2.webp",
                    "images/map-starosiverskaya-3.webp"
                ]
            },
            {
                id: 30,
                title: "Угловая бытовка 6х6х2, д. Черная Лахта",
                lat: 59.974,
                lng: 29.255,
                status: "completed",
                statusText: "✅ Завершен",
                size: "20 м²",
                time: "Завершен",
                img: "images/map-chernaya-lahta-1.webp",
                type: "cabin"
            },
            {
                id: 31,
                title: "Дачный дом 6х5, д. Городки",
                lat: 58.690,
                lng: 29.841,
                status: "completed",
                statusText: "✅ Завершен",
                size: "25 м²",
                time: "Завершен",
                img: "images/map-gorodki-1.webp",
                type: "summer",
                gallery: [
                    "images/map-gorodki-2.webp",
                    "images/map-gorodki-3.webp",
                    "images/map-gorodki-4.webp"
                ]
            },
            {
                id: 32,
                title: "Садовый дом 6х6 с террасой, д. Лесколово",
                lat: 60.271,
                lng: 30.463,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-leskolovo-1.webp",
                type: "summer",
                gallery: [
                    "images/map-leskolovo-2.webp",
                    "images/map-leskolovo-3.webp"
                ]
            },
            {
                id: 33,
                title: "Дачный дом 6х6, СНТ Большие Пороги",
                lat: 59.779,
                lng: 30.776,
                status: "completed",
                statusText: "✅ Завершен",
                size: "36 м²",
                time: "Завершен",
                img: "images/map-polshie-porogi-1.webp",
                type: "summer",
                gallery: [
                    "images/map-polshie-porogi-2.webp",
                    "images/map-polshie-porogi-3.webp",
                    "images/map-polshie-porogi-4.webp",
                    "images/map-polshie-porogi-5.webp"
                ]
            },
            {
                id: 34,
                title: "Дом 6х6 с террасой и балконом, с. Рождествено",
                lat: 59.324,
                lng: 29.949,
                status: "completed",
                statusText: "✅ Завершен",
                size: "144 м²",
                time: "Завершен",
                img: "images/map-rozdestvenno-3-1.webp",
                type: "frame"
            },
            {
                id: 35,
                title: "Каркасный дом 6х8 с террасой, пос. Мшинская",
                lat: 59.016,
                lng: 29.939,
                status: "completed",
                statusText: "✅ Завершен",
                size: "60 м²",
                time: "Завершен",
                img: "images/map-mshinskaya-1.webp",
                type: "frame",
                gallery: [
                    "images/map-mshinskaya-2.webp",
                    "images/map-mshinskaya-3.webp"
                ]
            },
            {
                id: 36,
                title: "Дом 6х6 с террасой, с. Рождествено",
                lat: 59.325,
                lng: 29.950,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-rozdestvenno-4-1.webp",
                type: "frame",
                gallery: [
                    "images/map-rozdestvenno-4-2.webp"
                ]
            },
            {
                id: 37,
                title: "Дачный дом 6х6 с террасой, д. Новое Замостье",
                lat: 59.350,
                lng: 29.927,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-novoe-zamostie-1.webp",
                type: "summer",
                gallery: [
                    "images/map-novoe-zamostie-2.webp",
                    "images/map-novoe-zamostie-3.webp",
                    "images/map-novoe-zamostie-4.webp",
                    "images/map-novoe-zamostie-5.webp",
                    "images/map-novoe-zamostie-6.webp",
                    "images/map-novoe-zamostie-7.webp"
                ]
            },
            {
                id: 38,
                title: "Каркасный дом 8х8, д. Большие Пороги",
                lat: 59.782,
                lng: 30.770,
                status: "completed",
                statusText: "✅ Завершен",
                size: "64 м²",
                time: "Завершен",
                img: "images/map-bolshie-porogi-1.webp",
                type: "frame",
                gallery: [
                    "images/map-bolshie-porogi-2.webp",
                    "images/map-bolshie-porogi-3.webp",
                    "images/map-bolshie-porogi-4.webp"
                ]
            },
            {
                id: 39,
                title: "Каркасный дом 6х8 с террасой, КП Константиновский",
                lat: 60.647,
                lng: 29.642,
                status: "completed",
                statusText: "✅ Завершен",
                size: "64 м²",
                time: "Завершен",
                img: "images/map-konstantinovsky-1.webp",
                type: "frame",
                gallery: [
                    "images/map-konstantinovsky-2.webp",
                    "images/map-konstantinovsky-3.webp",
                    "images/map-konstantinovsky-4.webp",
                    "images/map-konstantinovsky-5.webp"
                ]
            },
            {
                id: 40,
                title: "Каркасный дом 8х8, массив Дунай",
                lat: 59.957,
                lng: 30.932,
                status: "completed",
                statusText: "✅ Завершен",
                size: "64 м²",
                time: "Завершен",
                img: "images/map-dynai-1.webp",
                type: "frame",
                gallery: [
                    "images/map-dynai-2.webp",
                    "images/map-dynai-3.webp",
                    "images/map-dynai-4.webp",
                    "images/map-dynai-5.webp"
                ]
            },
            {
                id: 41,
                title: "Каркасный дом 8х7 с террасой, пос. Коробицыно",
                lat: 60.516,
                lng: 29.721,
                status: "completed",
                statusText: "✅ Завершен",
                size: "70 м²",
                time: "Завершен",
                img: "images/map-korobitsyno-1.webp",
                type: "frame",
                gallery: [
                    "images/map-korobitsyno-2.webp",
                    "images/map-korobitsyno-3.webp"
                ]
            },
            {
                id: 42,
                title: "Садовый дом 5х5, г. Высоцк",
                lat: 60.626,
                lng: 28.564,
                status: "completed",
                statusText: "✅ Завершен",
                size: "25 м²",
                time: "Завершен",
                img: "images/map-vysotsk-1.webp",
                type: "summer",
                gallery: [
                    "images/map-vysotsk-2.webp",
                    "images/map-vysotsk-3.webp"
                ]
            },
            {
                id: 43,
                title: "Каркасный дом 6х8 с террасой, д. Дятлово",
                lat: 60.474,
                lng: 28.931,
                status: "completed",
                statusText: "✅ Завершен",
                size: "64 м²",
                time: "Завершен",
                img: "images/map-dyatlovo-1.webp",
                type: "frame",
                gallery: [
                    "images/map-dyatlovo-2.webp",
                    "images/map-dyatlovo-3.webp",
                    "images/map-dyatlovo-4.webp"
                ]
            },
            {
                id: 44,
                title: "Каркасный дом с мансардой, д. Вырица",
                lat: 59.414,
                lng: 30.347,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-vyritsa-1.webp",
                type: "frame",
                gallery: [
                    "images/map-vyritsa-2.webp",
                    "images/map-vyritsa-3.webp",
                    "images/map-vyritsa-4.webp"
                ]
            },
            {
                id: 45,
                title: "Бытовка 5х2,5, д. Орехово",
                lat: 60.498,
                lng: 30.270,
                status: "completed",
                statusText: "✅ Завершен",
                size: "12,5 м²",
                time: "Завершен",
                img: "images/map-orehovo-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-orehovo-2.webp",
                    "images/map-orehovo-3.webp",
                    "images/map-orehovo-4.webp"
                ]
            },
            {
                id: 46,
                title: "Каркасный дом 10х8 с террасой, д. Юкки",
                lat: 60.111,
                lng: 30.288,
                status: "completed",
                statusText: "✅ Завершен",
                size: "96 м²",
                time: "Завершен",
                img: "images/map-yukki-1.webp",
                type: "frame",
                gallery: [
                    "images/map-yukki-2.webp",
                    "images/map-yukki-3.webp",
                    "images/map-yukki-4.webp",
                    "images/map-yukki-5.webp"
                ]
            },
            {
                id: 47,
                title: "Садовый дом 6х6, д. Новая Буря",
                lat: 59.724,
                lng: 29.464,
                status: "completed",
                statusText: "✅ Завершен",
                size: "36 м²",
                time: "Завершен",
                img: "images/map-lopuhinka-1-1.webp",
                type: "summer",
                gallery: [
                    "images/map-lopuhinka-1-2.webp",
                    "images/map-lopuhinka-1-3.webp",
                    "images/map-lopuhinka-1-4.webp"
                ]
            },
            {
                id: 48,
                title: "Бытовка 5х2,5, пос. Речников",
                lat: 60.068,
                lng: 32.334,
                status: "completed",
                statusText: "✅ Завершен",
                size: "12,5 м²",
                time: "Завершен",
                img: "images/map-rechnikov-1.webp",
                type: "cabin"
            },
            {
                id: 49,
                title: "Каркасный дом 6х8 с террасой, д. Выра",
                lat: 59.345,
                lng: 29.960,
                status: "completed",
                statusText: "✅ Завершен",
                size: "57 м²",
                time: "Завершен",
                img: "images/map-vyra-1.webp",
                type: "frame",
                gallery: [
                    "images/map-vyra-2.webp",
                    "images/map-vyra-3.webp",
                    "images/map-vyra-4.webp",
                    "images/map-vyra-5.webp",
                    "images/map-vyra-6.webp"
                ]
            },
            {
                id: 50,
                title: "Каркасный дом с мансардой 6х6, д. Тавры",
                lat: 59.918,
                lng: 30.696,
                status: "completed",
                statusText: "✅ Завершен",
                size: "72 м²",
                time: "Завершен",
                img: "images/map-tavry-1.webp",
                type: "frame",
                gallery: [
                    "images/map-tavry-2.webp",
                    "images/map-tavry-3.webp",
                    "images/map-tavry-4.webp"
                ]
            },
            {
                id: 51,
                title: "Бытовка 6х3, КП \"Солнечный сад\"",
                lat: 59.705,
                lng: 29.455,
                status: "completed",
                statusText: "✅ Завершен",
                size: "18 м²",
                time: "Завершен",
                img: "images/map-solnecniy-sad-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-solnecniy-sad-2.webp",
                    "images/map-solnecniy-sad-3.webp"
                ]
            },
            {
                id: 52,
                title: "Бытовка 6х2 с террасой, пос. Денисово",
                lat: 60.524,
                lng: 30.547,
                status: "completed",
                statusText: "✅ Завершен",
                size: "21 м²",
                time: "Завершен",
                img: "images/map-denisovo-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-denisovo-2.webp",
                    "images/map-denisovo-3.webp",
                    "images/map-denisovo-4.webp"
                ]
            },
            {
                id: 53,
                title: "Бытовка 6х4 с террасой, СНТ Строитель",
                lat: 59.582,
                lng: 30.362,
                status: "completed",
                statusText: "✅ Завершен",
                size: "32 м²",
                time: "Завершен",
                img: "images/map-stroitel-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-stroitel-2.webp",
                    "images/map-stroitel-3.webp",
                    "images/map-stroitel-4.webp",
                    "images/map-stroitel-5.webp"
                ]
            },
            {
                id: 54,
                title: "Садовый дом 6х6 с террасой, с. Рождествено",
                lat: 59.322,
                lng: 29.940,
                status: "completed",
                statusText: "✅ Завершен",
                size: "48 м²",
                time: "Завершен",
                img: "images/map-rozdestvenno-5-1.webp",
                type: "summer",
                gallery: [
                    "images/map-rozdestvenno-5-2.webp",
                    "images/map-rozdestvenno-5-3.webp"
                ]
            },
            {
                id: 55,
                title: "Бытовка 4х2,5, д. Вильповицы",
                lat: 59.751,
                lng: 29.689,
                status: "completed",
                statusText: "✅ Завершен",
                size: "10 м²",
                time: "Завершен",
                img: "images/map-vylpovitsy-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-vylpovitsy-2.webp",
                    "images/map-vylpovitsy-3.webp",
                    "images/map-vylpovitsy-4.webp"
                ]
            },
            {
                id: 56,
                title: "Бытовка 6х2,5 с террасой, СНТ Соколинское",
                lat: 60.626,
                lng: 28.843,
                status: "completed",
                statusText: "✅ Завершен",
                size: "27 м²",
                time: "Завершен",
                img: "images/snt-sokolinskoe-1.webp",
                type: "cabin",
                gallery: [
                    "images/snt-sokolinskoe-2.webp",
                    "images/snt-sokolinskoe-3.webp",
                    "images/snt-sokolinskoe-4.webp",
                    "images/snt-sokolinskoe-5.webp",
                    "images/snt-sokolinskoe-6.webp",
                    "images/snt-sokolinskoe-7.webp"
                ]
            },
            {
                id: 57,
                title: "Бытовка 4х2, урочище Большое Горелово",
                lat: 59.789,
                lng: 29.555,
                status: "completed",
                statusText: "✅ Завершен",
                size: "8 м²",
                time: "Завершен",
                img: "images/map-bolshoe-gorelovo-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-bolshoe-gorelovo-2.webp"
                ]
            },
            {
                id: 58,
                title: "Бытовка 4х2,5 с террасой, СНТ Рыбацкое",
                lat: 60.034,
                lng: 32.336,
                status: "completed",
                statusText: "✅ Завершен",
                size: "18 м²",
                time: "Завершен",
                img: "images/map-rybatskoe-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-rybatskoe-2.webp",
                    "images/map-rybatskoe-3.webp"
                ]
            },
            {
                id: 59,
                title: "Бытовка 4х2, КП \"Елкино\"",
                lat: 59.656,
                lng: 29.657,
                status: "completed",
                statusText: "✅ Завершен",
                size: "8 м²",
                time: "Завершен",
                img: "images/map-elkino-1.webp",
                type: "cabin"
            },
            {
                id: 60,
                title: "Садовый дом 6х5 с террасой, д. Старая Слобода",
                lat: 60.777,
                lng: 33.322,
                status: "completed",
                statusText: "✅ Завершен",
                size: "39 м²",
                time: "Завершен",
                img: "images/map-staraya-sloboda-1.webp",
                type: "summer",
                gallery: [
                    "images/map-staraya-sloboda-2.webp",
                    "images/map-staraya-sloboda-3.webp"
                ]
            },
            {
                id: 61,
                title: "Бытовка 5х2,5, пос. Новинка",
                lat: 59.185,
                lng: 30.372,
                status: "completed",
                statusText: "✅ Завершен",
                size: "12,5 м²",
                time: "Завершен",
                img: "images/map-novinka-1.webp",
                type: "cabin",
                gallery: [
                    "images/map-novinka-2.webp",
                    "images/map-novinka-3.webp"
                ]
            }
        ];

        let markers = [];

        // Custom Icons
        const greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const orangeIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        function renderMarkers(filter) {
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];
            const markerGroup = L.featureGroup();

            projectsData.forEach(project => {
                if (filter === 'all' || project.status === filter || project.type === filter) {
                    const icon = project.status === 'completed' ? greenIcon : orangeIcon;
                    const marker = L.marker([project.lat, project.lng], { icon: icon });

                    const slides = [project.img, ...(project.gallery || [])];
                    const slidesHtml = slides.map(img => `
                        <div class="swiper-slide">
                            <img src="${img}" alt="${project.title}" class="popup-image">
                        </div>
                    `).join('');

                    const popupHtml = `
                        <div class="popup-card">
                            <div class="swiper popup-swiper">
                                <div class="swiper-wrapper">
                                    ${slidesHtml}
                                </div>
                                <div class="swiper-button-next swiper-button-white"></div>
                                <div class="swiper-button-prev swiper-button-white"></div>
                            </div>
                            <div class="popup-info">
                                <h4>${project.title}</h4>
                                <span class="popup-status status-${project.status}">${project.statusText}</span>
                                <div class="popup-details">
                                    <span><strong>Площадь:</strong> ${project.size}</span>
                                    <span><strong>Срок:</strong> ${project.time}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    marker.bindPopup(popupHtml, {
                        maxWidth: 280,
                        minWidth: 280
                    });
                    marker.addTo(map);
                    markers.push(marker);
                    markerGroup.addLayer(marker);
                }
            });

            if (markers.length > 0) {
                map.fitBounds(markerGroup.getBounds(), { padding: [50, 50] });
            }
        }

        // Initialize Swiper in popups when they open
        map.on('popupopen', function (e) {
            const popupNode = e.popup.getElement();
            const swiperEl = popupNode.querySelector('.popup-swiper');
            if (swiperEl) {
                new Swiper(swiperEl, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    navigation: {
                        nextEl: swiperEl.querySelector('.swiper-button-next'),
                        prevEl: swiperEl.querySelector('.swiper-button-prev'),
                    },
                });
            }
        });

        // Initial render
        renderMarkers('all');

        // Filter Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Re-render markers
                const filterValue = e.target.getAttribute('data-filter');
                renderMarkers(filterValue);
            });
        });
    }

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // 7. Promo & Calculation Modal Logic
    const promoModal = document.getElementById('promo-modal');
    const calcModal = document.getElementById('calc-modal');
    const calcProjectName = document.getElementById('calc-project-name');

    const openPromoBtns = document.querySelectorAll('.open-promo-modal');
    const openCalcBtns = document.querySelectorAll('.open-calc-modal');

    const closePromoBtn = document.querySelector('.promo-modal-close');
    const closeCalcBtn = document.querySelector('.calc-modal-close');

    // Toggle Promo Modal
    openPromoBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (promoModal) promoModal.classList.add('active');
    }));

    if (closePromoBtn) {
        closePromoBtn.addEventListener('click', () => promoModal.classList.remove('active'));
    }

    // Toggle Calculation Modal
    openCalcBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (calcModal) {
            const projectName = btn.getAttribute('data-project') || "Проект";
            if (calcProjectName) calcProjectName.textContent = `Проект: ${projectName}`;
            calcModal.classList.add('active');
        }
    }));

    if (closeCalcBtn) {
        closeCalcBtn.addEventListener('click', () => calcModal.classList.remove('active'));
    }

    window.addEventListener('click', (e) => {
        if (promoModal && e.target === promoModal) {
            promoModal.classList.remove('active');
        }
        if (calcModal && e.target === calcModal) {
            calcModal.classList.remove('active');
        }
    });

    // Handle Promo Gift Name logic based on the date
    const promoGiftNameEls = document.querySelectorAll('.promo-gift-name');
    const date = new Date().getDate();
    let giftName = "Антисептирование каркаса постройки";

    if (date >= 8 && date <= 14) {
        giftName = "Фундамент в подарок";
    } else if (date >= 15 && date <= 21) {
        giftName = "Сетка от грызунов в подарок";
    } else if (date >= 22) {
        // From 22 to 31 we loop back to option 1 or could use another. Let's use 1 as it completes the loop.
        giftName = "Антисептирование каркаса постройки";
    }

    promoGiftNameEls.forEach(el => {
        el.textContent = giftName;
    });

    // Timer Logic (7 days counter based on localstorage)
    const promoTimeEls = {
        d: document.querySelectorAll('.promo-days'),
        h: document.querySelectorAll('.promo-hours'),
        m: document.querySelectorAll('.promo-minutes'),
        s: document.querySelectorAll('.promo-seconds')
    };

    if (promoTimeEls.d.length > 0) {
        function updatePromoTimer() {
            const now = new Date();

            // Calculate end of the current week (Sunday 23:59:59)
            const weekEnd = new Date(now);
            const day = now.getDay(); // 0 (Sun) to 6 (Sat)
            const diffDays = day === 0 ? 0 : 7 - day; // Days until next Sunday

            weekEnd.setDate(now.getDate() + diffDays);
            weekEnd.setHours(23, 59, 59, 999);

            let diff = weekEnd.getTime() - now.getTime();

            if (diff <= 0) {
                // If the week ended, it will start counting for the next week automatically
                diff = 0;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            promoTimeEls.d.forEach(el => el.textContent = d.toString().padStart(2, '0'));
            promoTimeEls.h.forEach(el => el.textContent = h.toString().padStart(2, '0'));
            promoTimeEls.m.forEach(el => el.textContent = m.toString().padStart(2, '0'));
            promoTimeEls.s.forEach(el => el.textContent = s.toString().padStart(2, '0'));
        }

        const timerInterval = setInterval(updatePromoTimer, 1000);
        updatePromoTimer();
    }

    // 8. Swiper Initialization for Product Cards
    const productSwipers = document.querySelectorAll('.product-swiper');
    if (productSwipers.length > 0) {
        productSwipers.forEach(swiperEl => {
            // Dynamically add navigation buttons if they don't exist
            if (!swiperEl.querySelector('.swiper-button-next')) {
                const nextBtn = document.createElement('div');
                nextBtn.className = 'swiper-button-next';
                const prevBtn = document.createElement('div');
                prevBtn.className = 'swiper-button-prev';
                swiperEl.appendChild(nextBtn);
                swiperEl.appendChild(prevBtn);
            }

            new Swiper(swiperEl, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                watchSlidesProgress: true,
                allowTouchMove: true,
                grabCursor: true,
                navigation: {
                    nextEl: swiperEl.querySelector('.swiper-button-next'),
                    prevEl: swiperEl.querySelector('.swiper-button-prev'),
                },
                pagination: {
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                },
                preventClicks: false,
                preventClicksPropagation: false,
            });
        });
    }

    // 10. Filter and Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    const catalogGrid = document.querySelector('.catalog-grid');

    if (sortSelect && catalogGrid) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            const productCards = Array.from(catalogGrid.querySelectorAll('.product-card'));

            productCards.sort((a, b) => {
                const priceA = parseFloat(a.dataset.price || 0);
                const priceB = parseFloat(b.dataset.price || 0);
                const sizeA = parseFloat(a.dataset.size || 0);
                const sizeB = parseFloat(b.dataset.size || 0);
                const popA = parseInt(a.dataset.popular || 0);
                const popB = parseInt(b.dataset.popular || 0);

                if (sortValue === 'price-asc') {
                    return priceA - priceB;
                } else if (sortValue === 'price-desc') {
                    return priceB - priceA;
                } else if (sortValue === 'size') {
                    return sizeA - sizeB;
                } else if (sortValue === 'popular') {
                    return popA - popB;
                }
                return 0;
            });

            productCards.forEach((card, index) => {
                card.classList.remove('active');
                card.style.transitionDelay = `${index * 0.1}s`;
                catalogGrid.appendChild(card);
            });

            setTimeout(() => {
                productCards.forEach((card) => {
                    card.classList.add('active');
                });
            }, 50);
        });
    }

    // 11. Filter functionality
    const mainFilterBtns = document.querySelectorAll('.catalog-filters .filter-btn');
    if (mainFilterBtns.length > 0 && catalogGrid) {
        mainFilterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                mainFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.dataset.filter;
                const productCards = Array.from(catalogGrid.querySelectorAll('.product-card'));

                productCards.forEach((card) => {
                    const titleElement = card.querySelector('.product-title');
                    const titleText = titleElement ? titleElement.innerText.toLowerCase() : '';

                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        card.classList.remove('active');
                        setTimeout(() => card.classList.add('active'), 10);
                    } else if (filterValue === 'terrace') {
                        if (titleText.includes('с террасой')) {
                            card.style.display = 'block';
                            card.classList.remove('active');
                            setTimeout(() => card.classList.add('active'), 10);
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('active');
                        }
                    } else if (filterValue === '1-bedroom') {
                        const allText = card.innerText.toLowerCase();
                        if (allText.includes('1 спальня') || allText.includes('1 спальней')) {
                            card.style.display = 'block';
                            card.classList.remove('active');
                            setTimeout(() => card.classList.add('active'), 10);
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('active');
                        }
                    } else if (filterValue === 'mansard') {
                        const allText = card.innerText.toLowerCase();
                        if (allText.includes('мансард')) {
                            card.style.display = 'block';
                            card.classList.remove('active');
                            setTimeout(() => card.classList.add('active'), 10);
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('active');
                        }
                    }
                });
            });
        });
    }

    // 12. Reviews Slider Initialization
    const initReviewsSlider = () => {
        const sliderEl = document.querySelector('.reviews-slider');
        if (!sliderEl) return;

        const reviewsSwiper = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.reviews-slider .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.reviews-slider-wrapper .swiper-button-next',
                prevEl: '.reviews-slider-wrapper .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1100: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }
        });

        setTimeout(() => {
            reviewsSwiper.update();
        }, 500);
    };

    initReviewsSlider();

    // 13. Call Modal Logic (Заказать звонок)
    const initCallModal = () => {
        if (!document.getElementById('call-modal')) {
            const modalHTML = `
                <div class="modal-overlay" id="call-modal">
                    <div class="modal-content">
                        <button class="modal-close call-modal-close">×</button>
                        <div class="modal-header">
                            <h3>Заказать звонок</h3>
                            <p>Оставьте свои контакты, и мы перезвоним вам в ближайшее время.</p>
                        </div>
                        <form class="modal-form" id="call-form">
                            <input type="text" class="form-input" placeholder="Ваше имя" required>
                            <input type="tel" class="form-input" placeholder="Ваш телефон" required>
                            <div style="display: flex; align-items: flex-start; margin-top: 15px; margin-bottom: 15px;">
                                <input type="checkbox" required style="margin-right: 8px; margin-top: 3px; width: 16px; height: 16px; cursor: pointer;">
                                <label style="font-size: 0.8rem; color: #718096; line-height: 1.4; cursor: pointer;">Я согласен на обработку персональных данных и соглашаюсь с <a href="privacy.html" target="_blank" style="text-decoration: underline; color: inherit;">политикой</a></label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" style="width: 100%;">Отправить</button>
                        </form>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const callModal = document.getElementById('call-modal');
        const openCallBtns = document.querySelectorAll('.cta-button');
        const closeCallBtn = document.querySelector('.call-modal-close');
        const callForm = document.getElementById('call-form');

        openCallBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                callModal.classList.add('active');
            });
        });

        if (closeCallBtn) {
            closeCallBtn.addEventListener('click', () => {
                callModal.classList.remove('active');
            });
        }

        if (callModal) {
            callModal.addEventListener('click', (e) => {
                if (e.target === callModal) {
                    callModal.classList.remove('active');
                }
            });
        }

        // Обработка отправки всех форм на сайте в Битрикс24
        const allForms = document.querySelectorAll('form');
        allForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const nameInput = form.querySelector('input[type="text"]');
                const phoneInput = form.querySelector('input[type="tel"]');
                const messageInput = form.querySelector('textarea');

                const nameValue = nameInput ? nameInput.value : 'Без имени';
                const phoneValue = phoneInput ? phoneInput.value : 'Не указан';
                const messageValue = messageInput ? messageInput.value : '';

                // TODO: Вставьте ваш входящий вебхук Битрикс24 вместо пустой строки!
                // Пример: 'https://vash-domen.bitrix24.ru/rest/1/1as2d3f4g5h6j7k8/crm.lead.add.json'
                const bitrixWebhookUrl = 'https://mvillage.bitrix24.ru/rest/7/f1um8857s7je3gys/crm.lead.add.json';

                if (bitrixWebhookUrl) {
                    try {
                        const response = await fetch(bitrixWebhookUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                fields: {
                                    TITLE: "Новая заявка с сайта Уютный Дом",
                                    NAME: nameValue,
                                    PHONE: [{ "VALUE": phoneValue, "VALUE_TYPE": "WORK" }],
                                    COMMENTS: messageValue,
                                    SOURCE_ID: "WEB"
                                }
                            })
                        });
                        if (response.ok) {
                            alert('Спасибо! Ваша заявка успешно отправлена.');
                        } else {
                            alert('Произошла ошибка при отправке заявки. Пожалуйста, свяжитесь с нами по телефону.');
                        }
                    } catch (error) {
                        console.error('Ошибка Битрикс24:', error);
                        alert('Произошла ошибка при отправке заявки. Пожалуйста, свяжитесь с нами по телефону.');
                    }
                } else {
                    console.log('Имитация отправки в Битрикс:', { nameValue, phoneValue, messageValue });
                    alert('Спасибо! Ваша заявка оправлена. (Внимание: интеграция с Битрикс24 еще не настроена)');
                }

                form.reset();

                // Закрываем модалки, если форма была внутри них
                const modal = form.closest('.modal-overlay') || form.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });
    };

    initCallModal();

    // 12. Gallery Swiper
    if (document.querySelector('.gallery-swiper')) {
        new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.gallery-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.gallery-nav-next',
                prevEl: '.gallery-nav-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            }
        });
    }
});
