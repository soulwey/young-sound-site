/* Young Sound calculator — no tracking, payments or automatic submission. */
(() => {
  const shell=document.getElementById('calculator');
  if(!shell) return;
  const inputs=[...shell.querySelectorAll('.ys-calc-option')];
  const outTotal=document.getElementById('ys-calc-total');
  const outFrom=document.getElementById('ys-calc-from');
  const outHint=document.getElementById('ys-calc-hint');
  const outItems=document.getElementById('ys-calc-selected');
  const button=document.getElementById('ys-calc-copy');
  const feedback=document.getElementById('ys-calc-feedback');
  const fmt=(x)=>new Intl.NumberFormat('ru-RU').format(x)+' ₽';
  const selected=()=>inputs.filter(el=>el.checked&&Number(el.dataset.amount)>0).map(el=>({
    label:el.dataset.label,
    amount:Number(el.dataset.amount),
    minimum:el.dataset.minimum==='1',
    group:el.dataset.group,
    key:el.value
  }));
  const refresh=()=>{
    const items=selected();
    const amount=items.reduce((total,item)=>total+item.amount,0);
    const hasMin=items.some(item=>item.minimum);
    outTotal.textContent=fmt(amount);
    outFrom.textContent=hasMin?'ОТ':'';
    outHint.textContent=items.length===0?'Выбери хотя бы одну услугу.':
      hasMin?'Сумма от указанной: некоторые услуги рассчитываются индивидуально.':'Предварительная стоимость выбранных услуг.';
    const overlapping=items.some(item=>item.key==='turnkey')&&items.some(item=>item.group==='production'&&item.key!=='turnkey');
    if(overlapping) outHint.textContent+=' Проверь с менеджером, не входят ли отдельные работы в песню под ключ.';
    outItems.replaceChildren();
    if(!items.length){
      const p=document.createElement('p');p.textContent='Пока ничего не выбрано';outItems.appendChild(p);
    }else{
      items.forEach(item=>{
        const row=document.createElement('div');row.className='ys-calc-line';
        const name=document.createElement('span');name.textContent=item.label;
        const price=document.createElement('strong');price.textContent=(item.minimum?'от ':'')+fmt(item.amount);
        row.append(name,price);outItems.appendChild(row);
      });
    }
    button.disabled=!items.length;
    feedback.textContent='';
  };
  inputs.forEach(el=>el.addEventListener('change',refresh));
  document.getElementById('ys-calc-reset')?.addEventListener('click',()=>{
    inputs.forEach(el=>{el.checked=el.type==='radio'&&el.value==='none';});
    const name=document.getElementById('ys-calc-name');
    const note=document.getElementById('ys-calc-note');
    if(name)name.value='';
    if(note)note.value='';
    refresh();
  });
  const makeMessage=()=>{
    const items=selected();
    const amount=items.reduce((sum,item)=>sum+item.amount,0);
    const from=items.some(item=>item.minimum);
    const name=document.getElementById('ys-calc-name')?.value.trim()||'не указано';
    const note=document.getElementById('ys-calc-note')?.value.trim()||'нет';
    return ['Здравствуйте! Хочу рассчитать заказ Young Sound.','',
      'Имя / псевдоним: '+name,'','Выбранные услуги:',
      ...items.map((item,i)=>(i+1)+'. '+item.label+' — '+(item.minimum?'от ':'')+fmt(item.amount)),
      '','Итого: '+(from?'от ':'')+fmt(amount),
      from?'Окончательная сумма зависит от объёма продвижения.':'Итоговая стоимость требует согласования.',
      'Комментарий: '+note,'','Подскажите, пожалуйста, детали заказа.'].join('\n');
  };
  button?.addEventListener('click',async()=>{
    if(!selected().length)return;
    const message=makeMessage();
    let copied=false;
    try{
      if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(message);copied=true;}
    }catch(err){copied=false;}
    if(!copied){
      const area=document.createElement('textarea');
      area.value=message;area.style.position='fixed';area.style.left='-9999px';
      document.body.appendChild(area);area.focus();area.select();
      try{copied=document.execCommand('copy');}catch(err){copied=false;}
      area.remove();
    }
    feedback.textContent=copied
      ?'✓ Расчёт скопирован. Нажми «Написать в Telegram», вставь сообщение и отправь.'
      :'Автоматическое копирование недоступно. Напиши менеджеру в Telegram и перечисли выбранные услуги.';
  });
  refresh();
})();