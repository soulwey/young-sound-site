/* Young Sound — content config. Edit services, prices, cases, links here. */
window.YS = {
  brand: 'YOUNG SOUND',
  links: {
    telegram: 'https://t.me/young_sound',
    manager: 'https://t.me/soulweyyy',
    vk: 'https://vk.ru/youngsoundprod',
    map: 'https://yandex.ru/maps/org/yang_saund/71248442046/',
    reviews: 'https://yandex.com/maps/org/young_sound/71248442046/reviews/',
    phone: 'tel:+79150877840'
  },
  location: 'Московская область, Балашиха, Советская улица, 36',
  rating: '5.0', // Check this rating against live Yandex Maps periodically.
  reviews: [
    { author: 'Гульсария Байгужина', date: '11 апреля 2025', topic: 'ЗАПИСЬ И ПОДАЧА', text: 'Отмечает профессиональное оборудование и помощь звукорежиссёра в раскрытии потенциала исполнителя.' },
    { author: 'Полина Мжачих', date: '28 мая 2025', topic: 'АТМОСФЕРА', text: 'Приезжает для записи из другого города и выделяет поддержку команды и дружелюбную обстановку.' },
    { author: 'Данил', date: '26 января 2025', topic: 'БИТМЕЙКИНГ', text: 'Заказывал бит по референсу. По его оценке, результат превзошёл ожидания.' },
  ],
  services: [
    { n:'01', symbol:'◉', title:'Запись вокала', type:'PRODUCTION', desc:'Чистая запись, внимание к подаче и помощь в студии. От демо до готового дубля.', price:'Стоимость по запросу' },
    { n:'02', symbol:'≈', title:'Сведение и мастеринг', type:'SOUND', desc:'Собираем вокал и инструментал в плотный звук, который уверенно работает на площадках.', price:'Стоимость по запросу' },
    { n:'03', symbol:'⌁', title:'Биты и продакшн', type:'BEAT LAB', desc:'Авторские инструменталы, аранжировки и продюсирование в эстетике твоего проекта.', price:'Стоимость по запросу' },
    { n:'04', symbol:'↗', title:'Дистрибуция', type:'RELEASE', desc:'Подготовка релиза, метаданные и доставка на музыкальные площадки.', price:'Стоимость по запросу' },
    { n:'05', symbol:'✳', title:'Продвижение релиза', type:'PROMO', desc:'Разбираем потенциал трека и подбираем понятную стратегию продвижения.', price:'Индивидуальный расчёт' },
    { n:'06', symbol:'▧', title:'Дизайн обложек', type:'VISUAL', desc:'Визуал, который считывается с маленькой иконки и запоминается.', price:'Уточнить актуальную цену' },
    { n:'07', symbol:'▶', title:'Нейро-клипы', type:'VIDEO', desc:'Арт-дирекшн и видеоконтент под настроение и эстетику релиза.', price:'Уточнить актуальную цену' },
    { n:'08', symbol:'✦', title:'Нейро-фотосессии', type:'AI ART', desc:'Новый образ для релиза, соцсетей и промокампании.', price:'Уточнить актуальную цену' },
  ],
  cases: [
    { id:'trissa', type:'ЯНДЕКС МУЗЫКА / МОЯ ВОЛНА', artist:'TRISSA', track:'Мажет', title:'Трек нашёл новую аудиторию', details:'Результат за 90 дней после попадания в «Мою волну» Яндекс Музыки.', a:'86 070', aLabel:'ПРОСЛУШИВАНИЙ', b:'41 777', bLabel:'СЛУШАТЕЛЕЙ', source:'https://t.me/young_sound/455', featured:true },
    { id:'playlist', type:'РЕДАКТОРСКАЯ ПОДДЕРЖКА', artist:'YOUNG SOUND', track:'Плейлисты', title:'Релизы в редакторских подборках', details:'Наши артисты получали поддержку в редакторских плейлистах Яндекс Музыки. Публикация и подтверждение — в канале.', a:'EDITORIAL', aLabel:'ПОДДЕРЖКА ПЛОЩАДОК', b:'', bLabel:'', source:'https://t.me/young_sound/458', featured:false },
  ],
  releases: [
    { artist:'PILANA', track:'Слёзы-океаны', initials:'PL', url:'https://t.me/young_sound' },
    { artist:'платите', track:'Дропс', initials:'ПЛ', url:'https://t.me/young_sound' },
    { artist:'КИШУЛЬГА', track:'Твои мысли', initials:'КШ', url:'https://t.me/young_sound' },
    { artist:'PILANA', track:'Мысли и слова', initials:'PL', url:'https://t.me/young_sound' },
    { artist:'платите', track:'Такси', initials:'ПЛ', url:'https://t.me/young_sound' },
    { artist:'Buddy Hulk', track:'Карие глаза', initials:'BH', url:'https://t.me/young_sound' },
  ],
  packages: [
    { n:'01', title:'START', subtitle:'Сделать музыку', featured:false, price:'ПО ЗАПРОСУ', caption:'Для артиста, который начинает с идеи', items:[['Подбор направления / разбор референсов',true],['Музыкальный продакшн',true],['Работа над звучанием',true],['Дистрибуция',false],['Продвижение',false]] },
    { n:'02', title:'RELEASE', subtitle:'Выпустить трек', featured:true, price:'ПО ЗАПРОСУ', caption:'Для артиста, которому нужен готовый релиз', items:[['План производства релиза',true],['Запись / работа с вокалом',true],['Сведение и мастеринг',true],['Обложка и упаковка',true],['Дистрибуция',true],['Продвижение',false]] },
    { n:'03', title:'FULL CYCLE', subtitle:'Запустить проект', featured:false, price:'ПО ЗАПРОСУ', caption:'Когда нужен весь путь от идеи до аудитории', items:[['Продакшн и запись',true],['Сведение и мастеринг',true],['Обложка и визуальная концепция',true],['Дистрибуция',true],['Промоплан релиза',true],['Видеоконтент — по задаче',true]] },
  ]
};