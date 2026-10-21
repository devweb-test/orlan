/* Loaded before native scripts. Retains their client-side behavior and map callbacks. */
(() => {
  window.ym=()=>{};window._tmr=[];
  let loading=false,ready=false,callbacks=[];
  window.offlineMaps=[];
  window.offlineYandexReady=callback=>{if(ready)callback();else callbacks.push(callback);};
  window.offlineLoadYandex=()=>{
    if(loading||ready)return;loading=true;
    const script=document.createElement('script');script.src='https://api-maps.yandex.ru/2.1/?lang=ru_RU&ns=orlanMaps';
    script.onerror=()=>{loading=false;};
    script.onload=()=>{
      window.orlanMaps.ready(()=>{
        const api=window.orlanMaps;const OriginalMap=api.Map;
        api.Map=function(element,state,options){
          const map=new OriginalMap(element,state,options);const host=typeof element==='string'?document.getElementById(element):element;
          host.offlineMap=map;window.offlineMaps.push({host,map});window.dispatchEvent(new CustomEvent('offline-map-created',{detail:{host,map}}));return map;
        };api.Map.prototype=OriginalMap.prototype;
        window.ymaps=api;ready=true;loading=false;
        const pending=callbacks;callbacks=[];pending.forEach(callback=>{try{callback();}catch(error){console.error(error);}});
      });
    };
    document.head.append(script);setTimeout(()=>{if(!ready)loading=false;},18000);
  };
  function notice(form,text){
    let box=form.querySelector('.offline-form-notice');if(!box){box=document.createElement('p');box.className='offline-form-notice';box.setAttribute('role','status');form.append(box);}box.textContent=text;
  }
  document.addEventListener('submit',event=>{
    event.preventDefault();event.stopImmediatePropagation();const form=event.target;
    if(form.matches('.header-search__form')){
      const query=form.querySelector('[name=q]')?.value||'';
      location.href=window.OFFLINE_ROOT+'blog/index.html?offline-search='+encodeURIComponent(query);return;
    }
    const phone=form.querySelector('input[type=tel],input[name*=phone],.js-phone');
    if(phone && phone.value.replace(/\D/g,'').length<11){phone.focus();notice(form,'Введите полный номер телефона. Заявки из локальной копии не отправляются.');return;}
    if(!form.reportValidity())return;
    notice(form,'Это локальная копия. Данные не отправлены. Для записи свяжитесь с автошколой по телефону 8 (495) 149-05-55 или откройте оригинальный сайт.');
  },true);
  // Search suggestions, regional server requests and payment/submission APIs are unavailable locally.
  const nativeFetch=window.fetch.bind(window);
  window.fetch=(input,options)=>{
    const value=typeof input==='string'?input:input.url;let url;try{url=new URL(value,location.href);}catch{return Promise.reject(new Error('Invalid URL'));}
    if(/^https?:$/.test(url.protocol)&&/(^|\.)(yandex\.(ru|net)|yastatic\.net)$/.test(url.hostname))return nativeFetch(input,options);
    return Promise.reject(new Error('Эта функция требует сервера оригинального сайта.'));
  };
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('#ya-map,#ya-map-filial,#js-filials-contact-page-map').forEach(host=>{
      // This outer container can itself contain the inner map: only overlay actual canvases.
      if(host.id==='js-filials-contact-page-map' && host.querySelector('#ya-map-filial'))return;
      host.classList.add('offline-map-host');
      const fallback=document.createElement('div');fallback.className='offline-map-fallback';fallback.innerHTML='<strong>Карта филиалов автошколы «Орлан»</strong><span>Для интерактивной карты нужен интернет.</span><a href="https://yandex.ru/maps/?text=Автошкола%20Орлан%20Москва" target="_blank" rel="noopener">Открыть Яндекс Карты</a><button type="button">Повторить загрузку</button>';host.append(fallback);host.offlineFallback=fallback;
      if(host.offlineMap)window.dispatchEvent(new CustomEvent('offline-map-created',{detail:{host,map:host.offlineMap}}));
      fallback.querySelector('button').addEventListener('click',()=>{
        const map=host.offlineMap;
        if(map){map.container.fitToViewport();map.setCenter(map.getCenter(),map.getZoom());}
        else window.offlineLoadYandex();
      });
    });
  });
  window.addEventListener('offline-map-created',event=>{
    const {host,map}=event.detail;const fallback=host.offlineFallback;if(!fallback)return;host.append(fallback);
    function check(){
      const layers=map.layers.get(0);let container;
      try{container=layers?.get(0)?._tileContainer;}catch{}
      let count=0,ok=true;container?.tiles?.each(tile=>{count++;if(!tile.isReady()||tile._error)ok=false;});
      if(count&&ok)fallback.hidden=true;
    }
    let attached=false;const timer=setInterval(()=>{
      check();if(fallback.hidden){clearInterval(timer);return;}
      if(!attached){try{const c=map.layers.get(0)?.get(0)?._tileContainer;if(c){c.events.add('ready',check);attached=true;}}catch{}}
    },500);setTimeout(()=>clearInterval(timer),20000);
  });
  window.addEventListener('online',()=>window.offlineLoadYandex());
})();
