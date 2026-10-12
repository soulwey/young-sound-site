(() => {
  const d = window.YS;
  const root = document.querySelector('#app');
  const page = document.body.dataset.page || 'home';
  const a = (href,label,cls='') => `<a class="${cls}" href="${href}" ${href.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}>${label}</a>`;
  const nav = [ ['Главная','index.html','home'],['Услуги','services.html','services'],['Тарифы','pricing.html','pricing'],['Кейсы','cases.html','cases'],['Артисты','artists.html','artists'],['Отгрузить трек','submit.html','submit'],['Отправить демо','demo.html','demo'],['Контакты','contacts.html','contacts'] ];
  const navHtml = () => nav.map(([t,url,key])=>`<a href="${url}" class="${page===key?'active':''}">${t}</a>`).join('');
  const arrow = '<span aria-hidden="true">↗</span>';
  const button = (label,href,cls='button-primary') => a(href,`${label} ${arrow}`,`ys-btn ${cls}`);
  const eyebrow = (k,t) => `<div class="section-kicker"><span class="status-orbit"></span><span>${k}</span><span class="kicker-line"></span><span>${t}</span></div>`;
  const title = (html,second='')=> `<div class="section-heading"><h2>${html}</h2>${second?`<p>${second}</p>`:''}</div>`;
  const serviceCard = x=>`<article class="service-card reveal"><div class="service-top"><span>${x.n} / ${x.type}</span><span class="service-symbol">${x.symbol}</span></div><div><h3>${x.title}</h3><p>${x.desc}</p></div><div class="service-bottom"><div class="service-price-wrap"><small>СТОИМОСТЬ УСЛУГИ</small><strong class="service-price">${x.price}</strong></div>${a(`contacts.html?service=${encodeURIComponent(x.title)}`,'↗','circle-link')}</div></article>`;
  const serviceSection = (limit) => `<section class="wrap block" id="services">${eyebrow('01 / ЧТО ДЕЛАЕМ','END-TO-END SOUND')}${title('ТВОЯ МУЗЫКА.<br><em>НАША РАБОТА.</em>','Все этапы — в одном месте. Никакой конвейерной магии, только команда и конкретные задачи.')}<div class="services-grid">${d.services.slice(0,limit||d.services.length).map(serviceCard).join('')}</div>${limit?`<div class="section-cta">${button('Все услуги','services.html','button-outline')}</div>`:''}</section>`;
  const caseCard = x=>`<article class="case-card reveal ${x.featured?'case-featured':''} ${x.cover?'has-art':''}"><div class="case-head"><span class="tag">${x.type}</span><span class="case-index">YS // ${x.id.toUpperCase()}</span></div><a href="${x.source}" target="_blank" rel="noopener noreferrer" class="case-art" aria-label="Открыть: ${x.artist} — ${x.track}">${x.cover?`<img src="${x.cover}" alt="Обложка ${x.artist} — ${x.track}" loading="lazy" decoding="async">`:x.id==='euphoria'?'<span class="wave-case-mark">МОЯ<br>ВОЛНА</span><span class="case-art-ring"></span>':'<span class="case-art-ring"></span>'}<div class="case-art-title">${x.artist}<small>— ${x.track}</small></div><span class="case-art-symbol">↗</span></a><div class="case-body"><h3>${x.title}</h3><p>${x.details}</p><div class="case-metrics"><div><strong>${x.a}</strong><span>${x.aLabel}</span></div>${x.b?`<div><strong>${x.b}</strong><span>${x.bLabel}</span></div>`:''}</div>${x.proof?`<p class="case-proof">✳ ${x.proof}</p>`:''}<div class="case-actions">${a(x.source,`${x.sourceLabel||'Смотреть кейс'} ${arrow}`,'case-link')}${x.featured?a('contacts.html?service='+encodeURIComponent('Продвижение в «Моей волне»'),'Обсудить продвижение ↗','case-link case-promo-link'):''}</div></div></article>`;
  const caseSection = () => `<section class="wrap block" id="cases">${eyebrow('04 / КЕЙСЫ ПРОДВИЖЕНИЯ','NO EMPTY PROMISES')}${title('НЕ СЛОВА.<br><em>РЕЗУЛЬТАТЫ.</em>','Результаты продвижения в «Моей волне» по предоставленным скриншотам и публикациям лейбла.') }<div class="case-grid">${d.cases.map(caseCard).join('')}</div></section>`;

  const distributionRates=()=>`<section class="wrap block ys-rate-section" id="distribution-prices">
    ${eyebrow('01 / ДИСТРИБУЦИЯ','РАЗМЕЩЕНИЕ МУЗЫКИ')}
    ${title('ЦЕНЫ НА<br><em>ДИСТРИБУЦИЮ.</em>','Простой прайс на отгрузку музыки — без выдуманных пакетов и скрытых тарифов.')}
    <div class="ys-rate-grid">${d.distributionFormats.map((f,i)=>`<a class="ys-rate-card reveal" href="submit.html?format=${encodeURIComponent(f.title)}" aria-label="Отгрузить ${f.title} — ${f.price}">
      <div class="ys-rate-top"><span>0${i+1} / DIGITAL RELEASE</span><span aria-hidden="true">↗</span></div>
      <h3>${f.title}</h3>
      <p>${f.description}</p>
      <div class="ys-rate-price">${f.price}</div>
      <div class="ys-rate-cta">ОТГРУЗИТЬ РЕЛИЗ <span aria-hidden="true">↗</span></div>
    </a>`).join('')}</div>
    <p class="ys-rate-note">Стоимость за отгрузку указанного формата. Сроки и технические требования согласовываются перед выпуском.</p>
  </section>`;

  const tape =()=>`<div class="marquee" aria-hidden="true"><div class="marquee-inner">${Array(4).fill('<span>YOUNG SOUND</span><b>✳</b><span>MAKE IT LOUD</span><b>✳</b><span>INDEPENDENT SOUND</span><b>✳</b>').join('')}</div></div>`;
  const trust =()=> `<section class="trust-band"><div class="wrap trust-layout reveal"><div class="trust-stars"><span class="five">5.0</span><span class="stars">★★★★★</span><span>РЕЙТИНГ НА ЯНДЕКС КАРТАХ</span></div><div class="trust-copy"><h2>О ТЕБЕ УЗНАЮТ.<br>О НАС УЖЕ <em>ГОВОРЯТ.</em></h2><p>Отзывы о студии можно посмотреть прямо на Яндекс Картах — из первоисточника, без выдуманных цитат.</p>${a(d.links.map,'Отзывы и адрес студии ↗','underlined')}</div></div></section>`;
  const reviews =()=> `<section class="wrap block reviews-section" id="reviews">${eyebrow('03 / ОТЗЫВЫ','REAL PEOPLE / REAL SOUND')}${title('СЛОВО<br><em>НАШИМ АРТИСТАМ.</em>','Впечатления людей, которые уже были у нас. Краткие пересказы отзывов с Яндекс Карт — с именами и ссылкой на оригинал.')}<div class="reviews-grid">${d.reviews.map((r,i)=>`<article class="review-card reveal"><div class="review-heading"><span>★★★★★</span><small>REVIEW // 0${i+1}</small></div><div class="review-topic">${r.topic}</div><p>${r.text}</p><div class="review-bottom"><div><strong>${r.author}</strong><span>${r.date}</span></div>${a(d.links.reviews,'Читать в Яндекс Картах ↗')}</div></article>`).join('')}</div><div class="reviews-more">${a(d.links.reviews,'ВСЕ ОТЗЫВЫ НА ЯНДЕКС КАРТАХ ↗','underlined')}</div></section>`;

  const playlistGroups=[
    {title:'ПОП / ТАНЦЫ / ХИТЫ',items:['Останови вечеринку','Поп новинки 2026','Танцы до утра','Будущие хиты','Живой звук']},
    {title:'РОК / ЭЛЕКТРОНИКА / НОВИНКИ',items:['Рокстар','Нитро новинки','В ритме','Вибро','Лучшее 2026']},
    {title:'ЛЕТНИЕ / ЖАНРОВЫЕ ПОДБОРКИ',items:['Заряд радости','Летний вайб','Яркие новинки','Новый шансон 2026','Трэп на блоке']}
  ];
  const playlistPromo=()=>{
    const strips=playlistGroups.map((g,j)=>`<div class="ys-promo-collection reveal">
      <div class="ys-promo-collection-title"><span>SELECTION // 0${j+1}</span><strong>${g.title}</strong></div>
      <div class="ys-promo-gallery">${g.items.map((name,i)=>`<div class="ys-promo-playlist" title="${name}">
        <div class="ys-promo-cover" style="--col:${i*25}%;--line:${j*50}%"><span class="ys-promo-cover-arrow">↗</span></div>
        <div class="ys-promo-name">${name}</div></div>`).join('')}</div>
    </div>`).join('');
    return `<section class="wrap block ys-promo" id="playlist-promo">
      ${eyebrow('02 / ПЛЕЙЛИСТЫ','EDITORIAL & PLAYLIST SUPPORT')}
      ${title('НАШИ АРТИСТЫ<br><em>РЕГУЛЯРНО ПОЛУЧАЮТ ПРОМО.</em>','Релизы Young Sound появляются в заметных плейлистах и музыкальных подборках. Вот часть плейлистов из наших публикаций.')}
      <div class="ys-promo-feature reveal"><div><span class="ys-promo-kicker">ПРОМО, КОТОРОЕ ВИДНО</span><h3>В ГЛАВНЫХ<br><em>ПОДБОРКАХ.</em></h3></div><p>Мы поддерживаем музыку после релиза: работаем над охватом, помогаем артистам попадать в подборки и знакомиться с новой аудиторией. В галерее — реальные обложки плейлистов со скриншотов Young Sound.</p><span class="ys-promo-feature-star" aria-hidden="true">✳</span></div>
      <div class="ys-promo-collections">${strips}</div>
      <div class="ys-promo-footer"><p>Внешний вид подборок зафиксирован на предоставленных скриншотах. Состав плейлистов со временем меняется.</p>${button('Далее — продвижение в «Моей волне»','#wave-promo','button-outline')}</div>
    </section>`;
  };

  const artistCard=(r,i)=>`<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="roster-card reveal" data-artist="${r.name.toLowerCase()} ${r.track.toLowerCase()}" aria-label="${r.name}: ${r.track}"><div class="roster-visual roster-visual-${i%4}">${r.cover?`<img src="${r.cover}" loading="lazy" decoding="async" alt="Обложка релиза ${r.name} — ${r.track}">`:`<div class="roster-abstract"><span class="roster-abstract-rings"></span><b>${r.initials}</b></div>`}<span class="roster-serial">YS / ${String(i+1).padStart(2,'0')}</span><span class="roster-corner">↗</span></div><div class="roster-info"><div><h3>${r.name}</h3><p>${r.track}</p></div><span>↗</span></div><div class="roster-meta">РЕЛИЗ YOUNG SOUND <span>${r.cover?'Обложка релиза':'Арт-карточка'}</span></div></a>`;
  const artistRoster=(compact=false)=>`<section class="wrap block roster-block" id="roster">${eyebrow('05 / АРТИСТЫ','YOUNG SOUND ARTISTS')}${title('ЗВУЧАТ<br><em>ПО-СВОЕМУ.</em>','Артисты из каталога Young Sound на Яндекс Музыке. + Soulwey.')}${compact?'':`<div class="roster-toolbar"><label class="roster-search-label" for="roster-search">НАЙТИ ИСПОЛНИТЕЛЯ<input id="roster-search" type="search" placeholder="Имя артиста или название трека…" autocomplete="off"></label><span>${d.artistRoster.length} ИСПОЛНИТЕЛЕЙ В ПОДБОРКЕ</span></div>`}<div class="roster-grid">${d.artistRoster.slice(0,compact?4:undefined).map(artistCard).join('')}</div><div class="roster-bottom"><p>Полный каталог лейбла Young Sound можно посмотреть на официальной странице Яндекс Музыки.</p>${button('Весь каталог на Яндекс Музыке',d.links.yandexLabel,'button-outline')}${compact?button('Все артисты','artists.html','button-primary'):''}</div></section>`;
  const labelBanner=()=>`<section class="label-catalog-band"><div class="wrap label-catalog-inner"><div class="label-catalog-number">LABEL ID 777245 / OFFICIAL CATALOG</div><div class="label-catalog-copy"><span class="micro">YOUNG SOUND × ЯНДЕКС МУЗЫКА</span><h2>ВСЕ АРТИСТЫ.<br><em>ВСЕ РЕЛИЗЫ.</em></h2><p>Официальная страница нашего лейбла в Яндекс Музыке. Исследуй каталог и находи новых исполнителей.</p>${button('Открыть лейбл на Яндекс Музыке',d.links.yandexLabel,'button-light')}</div><div class="label-catalog-disc" aria-hidden="true">YS<span>✳</span></div></div></section>`;
  const releases =()=> !d.releases.length ? '' : `<section class="wrap block">${eyebrow('05 / РЕЛИЗЫ','SELECTED DROPS')}${title('МУЗЫКА,<br><em>С КОТОРОЙ МЫ РАБОТАЕМ.</em>','Релизы из официальных подборок Young Sound.')}<div class="releases-grid">${d.releases.map((r,i)=>`<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="release reveal"><div class="release-art art-${i%4}">${r.cover?`<img src="${r.cover}" alt="Обложка ${r.artist} — ${r.track}" loading="lazy" decoding="async">`:`<span class="release-disc"></span><strong>${r.initials}</strong>`}<span class="release-corner">YS/0${i+1}</span></div><div class="release-caption"><div><strong>${r.artist}</strong><span>${r.track}</span></div><span>↗</span></div></a>`).join('')}</div><p class="footnote">Подборка релизов по публикациям Telegram-канала, а не список эксклюзивно подписанных артистов.</p></section>`;
  const cta =()=>`<section class="final-cta"><div class="wrap final-cta-inner"><div><span class="micro">READY WHEN YOU ARE ///</span><h2>ПОРА<br><em>ЗВУЧАТЬ.</em></h2><p>Есть трек, идея или просто вопрос? Напиши нам. Разберёмся, что нужно именно твоему проекту.</p>${button('Отправить демо','demo.html','button-light')}</div><div class="giant-asterisk" aria-hidden="true">✳</div></div></section>`;
  const header=()=>`<header class="site-header"><div class="wrap header-inner"><a class="wordmark" href="index.html" aria-label="Young Sound: главная"><span class="wordmark-star">✳</span><span>YOUNG<br><strong>SOUND</strong></span></a><nav id="desktop-nav" aria-label="Навигация">${navHtml()}</nav><div class="nav-cta">${button('Отправить демо','demo.html','nav-button')}</div><button class="mobile-toggle" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span></button></div><nav class="mobile-menu" aria-label="Мобильная навигация">${navHtml()}${a('demo.html','ОТПРАВИТЬ ДЕМО ↗')}</nav></header>`;
  const footer=()=>`<footer class="footer"><div class="wrap"><div class="footer-top"><div><a class="footer-logo" href="index.html">YOUNG<span>✳</span><br>SOUND</a><p>Запись. Продакшн. Дистрибуция.<br>Продвижение. Все этапы одного звука.</p></div><div class="footer-nav"><div><small>НАВИГАЦИЯ</small>${nav.map(([t,url])=>a(url,t)).join('')}</div><div><small>НА СВЯЗИ</small>${a(d.links.telegram,'TELEGRAM ↗')}${a(d.links.vk,'ВКОНТАКТЕ ↗')}${a(d.links.yandexLabel,'ЛЕЙБЛ / ЯНДЕКС МУЗЫКА ↗')}${a(d.links.manager,'МЕНЕДЖЕР ↗')}${a(d.links.map,'ЯНДЕКС КАРТЫ ↗')}${a(d.links.phone,'ПОЗВОНИТЬ ↗')}</div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} YOUNG SOUND</span><span>${a('privacy.html','ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ')}</span><span>MADE FOR MUSIC ✳</span></div></div></footer>`;

  /* Label-first homepage: distribution -> playlists -> My Wave -> studio work. */
  const distributionFeature=()=>{
    return `<section class="wrap block ys-label-first" id="distribution">
      ${eyebrow('01 / ДИСТРИБУЦИЯ','RELEASE WITH YOUNG SOUND')}
      <div class="ys-label-first-layout">
        <div class="ys-label-first-heading reveal">
          <span class="ys-step-pill">YOUNG SOUND / LABEL</span>
          <h2>ТВОЙ РЕЛИЗ.<br><em>НА ВСЕХ ПЛОЩАДКАХ.</em></h2>
          <p>Помогаем артистам выпустить музыку на стримингах: подготовить трек, оформить данные релиза и передать его для публикации.</p>
          <div class="ys-label-actions">
            ${button('Отгрузить трек','submit.html')}
            ${button('Что входит в выпуск?','services.html#distribution','button-outline')}
          </div>
        </div>
        <div class="ys-label-first-panel reveal">
          <div class="ys-label-panel-kicker">ДИСТРИБУЦИЯ / ЦЕНЫ НА РЕЛИЗЫ <span>↗</span></div>
          <div class="ys-distribution-rows">
            ${d.distributionFormats.map((f,i)=>`<a href="submit.html?format=${encodeURIComponent(f.title)}" class="ys-distribution-row"><span class="ys-distribution-num">0${i+1}</span><div><strong>${f.title}</strong><small>${f.description}</small></div><b>${f.price}</b><span class="ys-distribution-arrow">↗</span></a>`).join('')}
          </div>
          <div class="ys-label-panel-foot">Отгрузка релиза на музыкальные площадки. Все цены указаны в рублях.</div>
        </div>
      </div>
    </section>`;
  };
  const myWaveFeature=()=>{
    const service=d.services.find(s=>s.title==='Продвижение в «Моей волне»');
    return `<section class="wrap block ys-wave-feature" id="wave-promo">
      ${eyebrow('03 / ПРОДВИЖЕНИЕ','YANDEX MUSIC / MY WAVE')}
      <div class="ys-wave-feature-inner reveal">
        <div class="ys-wave-feature-content">
          <span class="ys-step-pill">ПОСЛЕ РЕЛИЗА / БОЛЬШЕ СЛУШАТЕЛЕЙ</span>
          <h2>ПРОДВИЖЕНИЕ<br>В <em>«МОЕЙ ВОЛНЕ».</em></h2>
          <p>После выпуска работаем над тем, чтобы музыку услышала новая аудитория. Продвижение в рекомендациях Яндекс Музыки строится индивидуально — результат и попадания не гарантируются.</p>
          <div class="ys-wave-feature-actions">${button('Обсудить продвижение','contacts.html?service='+encodeURIComponent(service.title))}${button('Посмотреть результаты','cases.html','button-outline')}</div>
        </div>
        <div class="ys-wave-feature-offer"><span>СТАРТ ПРОДВИЖЕНИЯ ОТ</span><strong>45 000 <small>₽</small></strong><div>ИНДИВИДУАЛЬНАЯ ПРОМО-КАМПАНИЯ <b>✳</b></div></div>
      </div>
    </section>`;
  };
  const studioServices=()=>`<section class="wrap block ys-studio-services" id="studio-services">
    ${eyebrow('05 / СТУДИЯ','RECORDING / MIX / BEATS')}
    ${title('ЗАПИШЕМ.<br><em>СВЕДЁМ. СОЗДАДИМ.</em>','Помимо дистрибуции и продвижения, поможем сделать саму музыку: от записи вокала до финального мастера и оригинального бита.')}
    <div class="services-grid">${d.services.filter(s=>s.title!=='Дистрибуция'&&!s.title.includes('Моей волне')).map(serviceCard).join('')}</div>
    <div class="section-cta">${button('Все услуги и цены','pricing.html','button-outline')}</div>
  </section>`;

  const hero=()=>`<main><section class="hero"><div class="hero-noise"></div><div class="wrap hero-inner"><div class="hero-copy"><div class="hero-meta"><span class="live-dot"></span>YOUNG SOUND / СТУДИЯ И ЛЕЙБЛ</div><h1>ТВОЙ ЗВУК.<br><span>ТВОИ</span><br><em>ПРАВИЛА.</em></h1><div class="hero-bottom"><p>От первой идеи до релиза в рекомендациях. Делаем музыку, визуал и продвижение в одном месте.</p><div class="hero-buttons">${button('Отправить демо','demo.html')}${button('Наши кейсы','cases.html','button-glass')}</div></div></div><div class="hero-graphic" aria-hidden="true"><div class="orbit orbit-1"></div><div class="orbit orbit-2"></div><div class="orbit-center"><span>YS</span><small>✳ EST. FOR MUSIC ✳</small></div><div class="hero-corner-label">STAY<br>YOUNG.<br>SOUND<br>LOUD.</div><div class="wave-bars">${Array.from({length:39},(_,i)=>`<i style="--h:${16+Math.round((Math.sin(i*0.72)+1)*15+(Math.sin(i*1.77)+1)*16)}px;--i:${i}"></i>`).join('')}</div></div></div><div class="hero-foot wrap"><span>001 — ПОЛНЫЙ ЦИКЛ РЕЛИЗА</span><span>СКРОЛЛ ВНИЗ ↓</span><span>МОСКОВСКАЯ ОБЛАСТЬ / ONLINE WORLDWIDE</span></div></section>${tape()}${distributionFeature()}${playlistPromo()}${myWaveFeature()}${caseSection()}${studioServices()}${trust()}${reviews()}${artistRoster(true)}${releases()}${cta()}</main>`;
  const pageHero=(number,kicker,h,desc)=>`<section class="subhero wrap"><div class="subhero-meta"><span class="live-dot"></span> YS / ${number} / ${kicker}</div><h1>${h}</h1><p>${desc}</p><span class="subhero-glyph">✳</span></section>`;
  const home=hero;
  const services=()=> `<main>${pageHero('01','ЧТО МЫ ДЕЛАЕМ','ПОЛНЫЙ <em>ЦИКЛ.</em>','Сначала выпускаем музыку, показываем результаты в плейлистах, затем помогаем с продвижением. Запись, сведение и биты — тоже у нас.')}${distributionFeature()}${playlistPromo()}${myWaveFeature()}${studioServices()}${cta()}</main>`;
  const pricing=()=>`<main>
    ${pageHero('02','АКТУАЛЬНЫЕ ЦЕНЫ','ПРОЗРАЧНЫЕ <em>ТАРИФЫ.</em>','Отгрузка сингла, EP и альбома по фиксированным ценам. Запись, сведение и продвижение — отдельно.')}
    ${distributionRates()}
    <section class="wrap block" id="other-prices">
      ${eyebrow('02 / ДРУГИЕ УСЛУГИ','RECORD / MIX / BEATS / PROMO')}
      ${title('ЕЩЁ БОЛЬШЕ<br><em>ДЛЯ ТВОЕЙ МУЗЫКИ.</em>')}
      <div class="mini-prices">${d.services.filter(s=>s.title!=='Дистрибуция').map(s=>`<a href="contacts.html?service=${encodeURIComponent(s.title)}"><div><strong>${s.title}</strong><span class="mini-price">${s.price}</span></div><b>↗</b></a>`).join('')}</div>
      <p class="package-note">Перед началом работ согласуем техническое задание, состав услуг и сроки.</p>
    </section>
    ${cta()}
  </main>`;
  const cases=()=>`<main>${pageHero('03','НАШИ РАБОТЫ','ЗВУК, <em>КОТОРЫЙ СЛЫШАТ.</em>','Скриншоты и цифры не заменяют музыку. Но подтверждают, что мы действительно работаем с релизами.')}${caseSection()}${trust()}${reviews()}${releases()}${cta()}</main>`;
  const artists=()=>`<main>${pageHero('04','АРТИСТЫ И КАТАЛОГ','У КАЖДОГО<br><em>СВОЙ ЗВУК.</em>','Знакомься с артистами и релизами Young Sound. Полный каталог находится в Яндекс Музыке.')}${labelBanner()}${artistRoster()}${releases()}${cta()}</main>`;
  const contacts=()=>`<main>${pageHero('05','СВЯЗАТЬСЯ','СДЕЛАЕМ <em>ГРОМЧЕ.</em>','Расскажи о треке и задаче. Никаких длинных брифов для первого сообщения.')}
    <section class="wrap block contact-layout"><div class="contact-info">${eyebrow('01 / НАПИСАТЬ','SAY HELLO')}<h2>МУЗЫКА<br>НАЧИНАЕТСЯ<br><em>С ДИАЛОГА.</em></h2>${button('Написать @soulweyyy',d.links.manager)}<div class="contact-methods">${a(d.links.telegram,'НОВОСТИ И КЕЙСЫ / TELEGRAM ↗')}${a(d.links.vk,'ТОВАРЫ И СООБЩЕСТВО / VK ↗')}</div></div><div class="contact-panel"><div class="panel-top">ЗАЯВКА / YOUNG SOUND <span>✳</span></div><form id="lead-form"><label>КАК ТЕБЯ ЗОВУТ / НИК<input type="text" name="name" placeholder="Например, Soulwey" maxlength="100" required></label><label>TELEGRAM<input type="text" name="telegram" placeholder="@username" maxlength="80" required></label><label>ССЫЛКА НА МУЗЫКУ<input type="url" name="link" placeholder="https://music.yandex.ru/..." maxlength="500"></label><label>ЧТО НУЖНО<select name="service" id="service-field">${['Выбрать услугу',...d.services.map(x=>x.title),...d.distributionFormats.filter(x=>x.title!=='Сингл').map(x=>'Дистрибуция — '+x.title),'Другое'].map((s,i)=>`<option value="${i?s:''}">${s}</option>`).join('')}</select></label><label>БЮДЖЕТ (НЕОБЯЗАТЕЛЬНО)<input type="text" name="budget" placeholder="Например, до 20 000 ₽" maxlength="80"></label><label>ПАРА СЛОВ О ЗАДАЧЕ<textarea name="comment" placeholder="Что за релиз, какие сроки, что важно?" rows="4" maxlength="1800"></textarea></label><button class="ys-btn button-primary form-submit" type="submit">Подготовить сообщение в Telegram ↗</button><p class="form-caption">Форма подготовит текст и скопирует его. Затем откроется чат менеджера в Telegram: вставь сообщение и отправь. Данные никуда не сохраняются.</p><p id="form-message" class="form-feedback" role="status" aria-live="polite"></p></form></div></section><section class="wrap block location"><div>${eyebrow('02 / ПРИЕЗЖАЙ','MOSCOW REGION')}<h2>НАША<br><em>СТУДИЯ.</em></h2><p>${d.location}</p><div class="location-links">${button('Открыть Яндекс Карты',d.links.map,'button-outline')}${a(d.links.phone,'ПОЗВОНИТЬ: +7 (915) 087-78-40','underlined')}<span class="rating-small">★★★★★ &nbsp; ${d.rating} / Яндекс Карты</span></div></div><a href="${d.links.map}" target="_blank" rel="noopener noreferrer" class="map-art" aria-label="Открыть студию Young Sound на Яндекс Картах"><span>YOUNG SOUND</span><strong>55.797° N<br>37.938° E</strong><b>↗</b><span class="map-cross map-cross-a">✳</span><span class="map-cross map-cross-b">✳</span></a></section></main>`;

  const demo=()=>`<main>${pageHero('07','ДЕМО НА РАССМОТРЕНИЕ','ПОКАЖИ <em>СВОЙ ЗВУК.</em>','Слушаем новые имена. Пришли демо и пару слов о себе — изучим материал и свяжемся, если он заинтересует команду.')}
    <section class="wrap block demo-layout">
      <div class="demo-manifesto reveal">
        ${eyebrow('DEMO DROP / YOUNG SOUND','НОВЫЕ ИМЕНА')}
        <h2>У НАС ЕСТЬ<br>МЕСТО ДЛЯ<br><em>ТВОЕЙ МУЗЫКИ.</em></h2>
        <p>Готовый трек, набросок или первый релиз — отправь ссылку, доступную для прослушивания. Не нужно заполнять метаданные для дистрибуции: здесь именно отбор демо.</p>
        <div class="demo-instructions"><span>01 / Подготовь трек</span><span>02 / Загрузи в облако</span><span>03 / Пришли ссылку и контакты</span></div>
        <p>Уже готов выпускать трек? ${a('submit.html','Перейти к отгрузке релиза ↗','underlined')}</p>
      </div>
      <div class="contact-panel demo-panel reveal"><div class="panel-top">ОТПРАВИТЬ ДЕМО <span>✳</span></div>
        <form id="demo-form">
          <label>ПСЕВДОНИМ / ИМЯ *<input name="name" required maxlength="120" placeholder="Как тебя зовут"></label>
          <label>TELEGRAM *<input name="telegram" required maxlength="120" placeholder="@username"></label>
          <label>ССЫЛКА НА ДЕМО *<input type="url" name="demoLink" required maxlength="600" placeholder="https://disk.yandex.ru/..." pattern="https?://.+"></label>
          <label>ЖАНР / НАПРАВЛЕНИЕ<input name="genre" maxlength="100" placeholder="Рэп, рок, электроника..."></label>
          <label>РАССКАЖИ О СЕБЕ И ТРЕКЕ<textarea name="about" rows="5" maxlength="1600" placeholder="Кто ты, чем вдохновляешься, что хочешь сделать с треком..."></textarea></label>
          <label class="demo-agreement"><input type="checkbox" name="rights" required><span>Подтверждаю, что вправе предоставить трек для прослушивания и согласен на обработку данных для ответа на заявку.</span></label>
          <button type="submit" class="ys-btn button-primary form-submit">Подготовить демо для Telegram ↗</button>
          <p class="form-caption">Сайт скопирует данные и откроет Telegram менеджера. Вставь сообщение в чат и отправь сам — автоматической передачи демо пока нет.</p>
          <p id="demo-feedback" class="form-feedback" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section></main>`;
  const privacy=()=>`<main>${pageHero('06','ПРАВОВАЯ ИНФОРМАЦИЯ','ПРИВАТНОСТЬ <em>ВАЖНА.</em>','Как работает форма связи на сайте Young Sound.')}<section class="wrap legal-text"><h2>Обработка данных при обращении</h2><p>Формы «Связаться» и «Отправить демо» подготавливают сообщение в браузере для самостоятельной отправки в Telegram, не загружая файлы на сервер. Форма «Отгрузить трек» при отправке передаёт сведения о релизе, контактные данные, историю песни и прикреплённые файлы на сервер Young Sound для рассмотрения заявки.</p><p>После настройки сервиса файлы и данные направляются в Telegram менеджеру через бота. На нашем сервере файлы хранятся только временно в оперативной памяти для доставки и не помещаются в постоянную базу данных. В Telegram переданные файлы хранятся в соответствии с политикой платформы. Паспортные сведения, адрес регистрации, ИНН и банковские реквизиты не запрашиваются и не отправляются через этот сайт. При согласовании релиза их необходимо передавать через отдельный защищённый канал. Не загружайте материалы, на которые не имеете прав.</p><p>После нажатия «Подготовить сообщение» текст копируется в буфер обмена, а браузер открывает Telegram по ссылке менеджера. Отправка сообщения происходит только если вы самостоятельно вставите его в чат и нажмёте кнопку отправки.</p><p>Переходя на Telegram, VK или Яндекс Карты, вы пользуетесь внешними сервисами на условиях их собственных документов о конфиденциальности.</p><p>Эта информационная страница описывает обработку обращений и загрузок релизов. Данные используются для рассмотрения и ответа на заявку. Для запроса удаления или уточнения данных обратитесь к менеджеру. Для связи: <a href="${d.links.manager}" target="_blank" rel="noopener noreferrer">@soulweyyy</a>.</p></section></main>`;

  const submit=()=>`<main>${pageHero('06','ОТГРУЗИТЬ ТРЕК','ГОТОВ К <em>РЕЛИЗУ?</em>','Подготовим твой трек к дистрибуции. Заполни карточку релиза, прикрепи WAV и обложку, а также расскажи историю своей песни.')}
<section class="wrap block upload-layout">
  <aside class="upload-aside reveal">
    ${eyebrow('RELEASE DELIVERY','YOUNG SOUND')}
    <h2>ТВОЙ ТРЕК.<br><em>ТВОЯ ИСТОРИЯ.</em></h2>
    <p>Одна анкета для музыки, метаданных, ссылок на артистов и промо о релизе. Это заявка на рассмотрение; дата публикации подтверждается отдельно.</p>
    <div class="upload-steps">
      <div><b>01</b><span>ИНФОРМАЦИЯ О ТРЕКЕ</span></div>
      <div><b>02</b><span>КАРТОЧКИ АРТИСТА</span></div>
      <div><b>03</b><span>WAV И ОБЛОЖКА</span></div>
      <div><b>04</b><span>ИСТОРИЯ ДЛЯ ПРОМО</span></div>
      <div><b>05</b><span>О ТЕБЕ И ДОКУМЕНТАХ</span></div>
    </div>
    <p class="upload-fine">Для больших WAV используй ссылку на облако. Данные паспорта, адрес регистрации и банковские реквизиты запросим отдельно по защищённому каналу перед оформлением договора.</p>
  </aside>
  <div class="upload-panel reveal">
    <div class="panel-top"><span>ОТГРУЗКА ТРЕКА / YOUNG SOUND</span><span>✳</span></div>
    <div id="delivery-status" class="delivery-status" role="status">Проверяем подключение сервиса приёма заявок…</div>
    <form id="release-form" enctype="multipart/form-data">
      <div class="form-stage"><span>01</span> О ТРЕКЕ</div>
      <div class="form-two">
        <label>ПСЕВДОНИМ ИСПОЛНИТЕЛЯ *<input name="artist" required maxlength="120" placeholder="Точно как на площадках"></label>
        <label>НАЗВАНИЕ ПЕСНИ *<input name="trackTitle" required maxlength="180" placeholder="Название релиза"></label>
        <label>ФОРМАТ<select name="releaseType"><option>Сингл</option><option>EP</option><option>Альбом</option></select></label>
        <label>ЖАНР *<input name="genre" required maxlength="100" placeholder="Хип-хоп, рок, поп, DnB…"></label>
        <label>ЖЕЛАЕМАЯ ДАТА ВЫХОДА *<input name="releaseDate" type="date" required></label>
        <label>ЯЗЫК ПЕСНИ<input name="language" maxlength="100" value="Русский"></label>
        <label>УЧАСТНИКИ / FEAT.<input name="featured" maxlength="250" placeholder="При наличии"></label>
        <label>НЕНОРМАТИВНАЯ ЛЕКСИКА?<select name="explicit"><option>Нет</option><option>Да</option></select></label>
        <label>АВТОР ТЕКСТА<input name="authors" maxlength="300" placeholder="ФИО или псевдоним"></label>
        <label>КОМПОЗИТОР / БИТМЕЙКЕР<input name="composer" maxlength="300" placeholder="ФИО или псевдоним"></label>
        <label>ПРАВООБЛАДАТЕЛЬ<input name="owner" maxlength="250" placeholder="ФИО, ИП или организация"></label>
        <label>ISRC (ЕСЛИ ЕСТЬ)<input name="isrc" maxlength="40" placeholder="Необязательно"></label>
      </div>
      <div class="form-stage"><span>02</span> КАРТОЧКИ МУЗЫКАНТА И ОТРЫВОК</div>
      <p class="upload-fine">Если у тебя уже есть страницы артиста, оставь ссылки — так мы не создадим дубли профилей на площадках.</p>
      <div class="form-two">
        <label>VK МУЗЫКА<input name="vkArtistUrl" type="url" maxlength="500" placeholder="https://vk.com/..."></label>
        <label>ЯНДЕКС МУЗЫКА<input name="yandexArtistUrl" type="url" maxlength="500" placeholder="https://music.yandex.ru/artist/..."></label>
        <label>APPLE MUSIC<input name="appleArtistUrl" type="url" maxlength="500" placeholder="https://music.apple.com/..."></label>
        <label>ТАЙМИНГ ОТРЫВКА ДЛЯ TIKTOK<input name="tiktokTime" maxlength="60" placeholder="Например: 00:43–01:13"></label>
      </div>
      <label>ТЕКСТ ПЕСНИ (ПО ЖЕЛАНИЮ)<textarea name="lyrics" rows="5" maxlength="5000" placeholder="Вставь текст или оставь поле пустым"></textarea></label>
      <div class="form-stage"><span>03</span> АУДИО И ОБЛОЖКА</div>
      <div class="form-two">
        <label class="upload-file">АУДИО В ФОРМАТЕ WAV *
          <input id="track-file" name="track" type="file" accept=".wav,audio/wav,audio/x-wav">
          <span class="upload-file-visual"><b>↥</b><span>ВЫБРАТЬ WAV<small id="track-filename">Только WAV · до 45 МБ, либо ссылка ниже</small></span></span>
        </label>
        <label class="upload-file">ОБЛОЖКА *
          <input id="cover-file" name="cover" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" required>
          <span class="upload-file-visual"><b>▧</b><span>ЗАГРУЗИТЬ ОБЛОЖКУ<small id="cover-filename">JPG / PNG / WEBP · до 10 МБ</small></span></span>
        </label>
      </div>
      <label>ССЫЛКА НА WAV В ОБЛАКЕ (ЕСЛИ ФАЙЛ БОЛЬШЕ 45 МБ)<input name="cloudLink" type="url" maxlength="500" placeholder="https://disk.yandex.ru/..."></label>
      <div class="form-stage"><span>04</span> ИСТОРИЯ ДЛЯ ПРОМО РЕЛИЗА</div>
      <p class="upload-fine">Не обязательно писать пресс-релиз. Ответь на несколько вопросов — по ним мы сможем подготовить интересное описание песни и промоматериалы.</p>
      <label>КАК ПИСАЛСЯ ТРЕК?<textarea name="promoStory" rows="3" maxlength="1100" placeholder="Где и с кем записывал? Как появилась идея? Были ли интересные моменты?"></textarea></label>
      <label>О ЧЁМ ПЕСНЯ?<textarea name="promoMeaning" rows="3" maxlength="1100" placeholder="Какой смысл, настроение или история стоят за текстом?"></textarea></label>
      <label>ЧТО ВДОХНОВИЛО НА СОЗДАНИЕ?<textarea name="promoInspiration" rows="3" maxlength="900" placeholder="Событие, человек, состояние, референс…"></textarea></label>
      <label>КОМУ МОЖЕТ ОТКЛИКНУТЬСЯ ТРЕК?<textarea name="promoAudience" rows="3" maxlength="900" placeholder="Кто твой слушатель? На какие треки или жанры похожа песня?"></textarea></label>
      <label>ЧТО СТОИТ ПОДЧЕРКНУТЬ В ПРОМО?<textarea name="promoHighlight" rows="3" maxlength="900" placeholder="Цепляющая строчка, история, факт о релизе, любимый момент…"></textarea></label>
      <div class="form-stage"><span>05</span> О ТЕБЕ И ОФОРМЛЕНИИ</div>
      <div class="form-two">
        <label>КТО ПОДАЁТ РЕЛИЗ? *<select name="legalType" required><option value="">Выбрать</option><option>Физическое лицо</option><option>Самозанятый</option><option>ИП</option><option>ООО / другое юрлицо</option></select></label>
        <label>ФИО / НАЗВАНИЕ ИП ИЛИ ОРГАНИЗАЦИИ *<input name="legalName" maxlength="250" required placeholder="Как в официальных документах"></label>
        <label>НОМЕР ТЕЛЕФОНА *<input name="phone" type="tel" maxlength="35" required placeholder="+7 900 000-00-00"></label>
        <label>E-MAIL *<input name="email" type="email" maxlength="140" required placeholder="name@example.com"></label>
        <label>ТЕЛЕГРАМ ДЛЯ СВЯЗИ<input name="telegram" maxlength="120" placeholder="@username"></label>
      </div>
      <details class="secure-legal">
        <summary>Какие документы потребуются после согласования? <span>+</span></summary>
        <p>Для договора и выплат нам также понадобятся:</p>
        <ul>
          <li>Дата рождения</li>
          <li>Паспортные данные: серия и номер, кем и когда выдан</li>
          <li>Адрес регистрации по паспорту</li>
          <li>ИНН</li>
          <li>Банковские реквизиты: получатель, БИК, расчётный счёт</li>
        </ul>
        <p>Эти сведения не вводятся в открытую анкету и не уходят в Telegram-бота. Передадим ссылку на защищённый способ оформления при согласовании релиза. Полный номер банковской карты, CVV и коды из SMS не нужны.</p>
      </details>
      <label>ДОПОЛНИТЕЛЬНЫЙ КОММЕНТАРИЙ<textarea name="notes" rows="3" maxlength="1100" placeholder="Особые условия, вопросы, даты, пожелания…"></textarea></label>
      <label class="upload-check"><input name="copyright" type="checkbox" value="yes" required><span>Подтверждаю, что имею права или необходимые разрешения на музыку, текст и обложку.</span></label>
      <label class="upload-check"><input name="consent" type="checkbox" value="yes" required><span>Согласен на передачу указанных данных и файлов команде Young Sound для рассмотрения заявки и связи со мной. <a href="privacy.html">Подробнее об обработке данных</a>.</span></label>
      <label class="upload-honey" aria-hidden="true">Не заполнять<input name="website" autocomplete="off" tabindex="-1"></label>
      <button type="submit" class="ys-btn button-primary upload-submit" id="release-submit">ОТПРАВИТЬ ЗАЯВКУ И ФАЙЛЫ ↗</button>
      <div id="release-feedback" role="status" aria-live="polite" class="release-feedback"></div>
      <p class="upload-fine">Подтверждение доставки появится только после ответа сервера. Если приём заявок временно недоступен, свяжись с нами в <a href="${d.links.manager}" target="_blank" rel="noopener noreferrer">Telegram</a>.</p>
    </form>
  </div>
</section></main>`;

  const pages={home,services,pricing,cases,artists,contacts,privacy,submit,demo};
  root.innerHTML=header()+pages[page]()+footer();
  const mobileToggle=document.querySelector('.mobile-toggle');
  mobileToggle?.addEventListener('click',()=>{ const expanded=mobileToggle.getAttribute('aria-expanded')==='true'; mobileToggle.setAttribute('aria-expanded',String(!expanded)); document.querySelector('.site-header')?.classList.toggle('mobile-open',!expanded); });
  const rosterSearch=document.querySelector('#roster-search');
  rosterSearch?.addEventListener('input',()=>{
    const q=rosterSearch.value.trim().toLowerCase();
    document.querySelectorAll('.roster-card[data-artist]').forEach(el=>{el.hidden=!!q&&!el.dataset.artist.includes(q)});
  });
  const revealNodes=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:0.11});revealNodes.forEach(n=>io.observe(n));}else revealNodes.forEach(n=>n.classList.add('visible'));
  const serviceParam=new URLSearchParams(location.search).get('service');
  const serviceSelect=document.querySelector('#service-field'); if(serviceParam&&serviceSelect){ const matched=[...serviceSelect.options].find(o=>o.textContent.toLowerCase()===serviceParam.toLowerCase()); if(matched) serviceSelect.value=matched.value;}
  document.querySelector('#lead-form')?.addEventListener('submit',async ev=>{
    ev.preventDefault(); const fd=new FormData(ev.currentTarget);
    const message=[`Привет! Хочу обсудить проект с Young Sound.`,``, `Имя / ник: ${fd.get('name')}`,`Telegram: ${fd.get('telegram')}`,`Музыка: ${fd.get('link')||'пока нет ссылки'}`,`Услуга: ${fd.get('service')||'пока не выбрана'}`,`Бюджет: ${fd.get('budget')||'обсудим'}`,`Задача: ${fd.get('comment')||'расскажу в переписке'}`].join('\n');
    let copied=false;try {await navigator.clipboard.writeText(message);copied=true;} catch(e){ const area=document.createElement('textarea');area.value=message;area.style.position='fixed';area.style.top='-1000px';document.body.appendChild(area);area.select();copied=document.execCommand('copy');area.remove();}
    const feedback=document.querySelector('#form-message');
    if(copied){feedback.textContent='✓ Текст скопирован. Вставь его в открывшийся чат и отправь.';window.open(d.links.manager,'_blank','noopener,noreferrer');}
    else {feedback.textContent='Не получилось скопировать текст. Нажми на кнопку «Написать @soulweyyy» слева и отправь данные вручную.';}
  });

  document.querySelector('#demo-form')?.addEventListener('submit',async ev=>{
    ev.preventDefault();
    const fd=new FormData(ev.currentTarget);
    const message=[
      'Привет! Хочу отправить демо в Young Sound.',
      '',
      'Артист: '+fd.get('name'),
      'Telegram: '+fd.get('telegram'),
      'Ссылка на демо: '+fd.get('demoLink'),
      'Жанр: '+(fd.get('genre')||'не указан'),
      'О себе и треке: '+(fd.get('about')||'расскажу позже')
    ].join('\n');
    const feedback=document.querySelector('#demo-feedback');
    try {
      await navigator.clipboard.writeText(message);
      feedback.textContent='Текст скопирован. Вставь его в Telegram и нажми «Отправить».';
      window.open(d.links.manager,'_blank','noopener,noreferrer');
    } catch (e) {
      feedback.textContent='Не получилось скопировать данные автоматически. Отправь ссылку на трек и свой контакт менеджеру вручную: @soulweyyy';
      window.open(d.links.manager,'_blank','noopener,noreferrer');
    }
  });

})();