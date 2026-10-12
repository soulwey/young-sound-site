(() => {
  const form=document.querySelector('#release-form'); if(!form) return;
  const api='https://young-sound-upload-api.onrender.com';
  const status=document.querySelector('#delivery-status'),feedback=document.querySelector('#release-feedback'),submit=document.querySelector('#release-submit');
  let ready=false;
  const setFeedback=(text,success=false)=>{feedback.textContent=text;feedback.classList.toggle('sent',success)};
  async function statusCheck(){
    try{
      const r=await fetch(api+'/api/status',{cache:'no-store'});
      if(!r.ok)throw Error('not ready');
      const x=await r.json();ready=!!x.configured;
      status.textContent=ready?'● СЕРВИС ОТПРАВКИ ПОДКЛЮЧЕН · Telegram':'◌ ФОРМА ГОТОВА · ожидается настройка Telegram-бота владельцем сайта';
      status.classList.toggle('ready',ready);
    }catch(_){ status.textContent='◌ Сервер загружается или временно недоступен. Попробуй позднее.'; }
  }
  statusCheck();
  for(const [id,label] of [['track-file','track-filename'],['cover-file','cover-filename']]){
    const f=document.querySelector('#'+id),name=document.querySelector('#'+label);
    f.addEventListener('change',()=>{
      if(f.files.length){let x=f.files[0];name.textContent=x.name+' · '+(x.size/1048576).toFixed(1)+' МБ';}
    });
  }
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();setFeedback('');
    const f=new FormData(form);
    if(!f.get('telegram')?.trim()&&!f.get('email')?.trim()){setFeedback('Укажи Telegram или email для ответа.');return;}
    const track=f.get('track'),cover=f.get('cover'),url=f.get('cloudLink');
    if((!track||track.size===0)&&!url){setFeedback('Выбери аудиофайл или добавь ссылку на облако.');return;}
    if(track&&track.size>45*1048576){setFeedback('Аудио больше 45 МБ: используй ссылку на облако.');return;}
    if(cover&&cover.size>10*1048576){setFeedback('Обложка больше 10 МБ: загрузи файл поменьше.');return;}
    if(!ready){setFeedback('Приём файлов ещё не подключён к Telegram. Сейчас сообщение не отправлено. После подключения бота попробуй снова или напиши менеджеру @soulweyyy.');statusCheck();return;}
    submit.disabled=true;submit.textContent='ОТПРАВЛЯЕМ ФАЙЛ… НЕ ЗАКРЫВАЙ СТРАНИЦУ';setFeedback('Загружаем релиз и ждём подтверждения от Telegram. Большой файл может отправляться около минуты.');
    try{
      const r=await fetch(api+'/api/submit',{method:'POST',body:f});
      const result=await r.json().catch(()=>({ok:false,error:'Непонятный ответ сервера'}));
      if(!r.ok||!result.ok)throw Error(result.error||'Ошибка отправки файла.');
      setFeedback('✓ '+result.message+' Номер заявки: '+result.id+'. Мы свяжемся с тобой по указанным контактам.',true);
      form.reset();document.querySelector('#track-filename').textContent='WAV / MP3 / FLAC / AIFF — до 45 МБ';document.querySelector('#cover-filename').textContent='JPG / PNG / WEBP — до 10 МБ';
    }catch(err){setFeedback('Не удалось подтвердить доставку: '+err.message+' При необходимости напиши менеджеру @soulweyyy.');}
    finally{submit.disabled=false;submit.textContent='ОТПРАВИТЬ ТРЕК В YOUNG SOUND ↗';}
  });
})();