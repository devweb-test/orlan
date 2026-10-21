(() => {
  const query=new URLSearchParams(location.search).get('offline-search');
  if(query && !document.querySelector('[data-blog]')){
    const cards=[...document.querySelectorAll('.news__page-block > a')];
    const text=document.createElement('p');text.className='offline-form-notice';text.textContent='Поиск в сохранённой копии: «'+query+'». Для полного поиска по сайту нужен интернет.';
    const main=document.querySelector('.news__page')||document.querySelector('main');main?.prepend(text);
    cards.forEach(card=>card.style.display=card.textContent.toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))?'':'none');
  }
})();
// Hydrate images created by the original branch-card templates.
(() => {
  function hydrate(root){
    if(root.nodeType!==1)return;
    const elements=[...(root.matches?.('[data-local-image]')?[root]:[]),...root.querySelectorAll('[data-local-image]')];
    root.querySelectorAll('img[loading="lazy"]:not(.journal-image)').forEach(image=>image.loading='eager');
    if(root.matches?.('img[loading="lazy"]:not(.journal-image)'))root.loading='eager';
    elements.forEach(image=>{if(image.getAttribute('src')!==image.dataset.localImage)image.src=image.dataset.localImage;});
  }
  hydrate(document.documentElement);
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(hydrate))).observe(document.body,{childList:true,subtree:true});
})();

// Map links still reveal the reserved map box when its provider is unavailable.
document.addEventListener('click',event=>{
 const link=event.target.closest('.show-map');
 const host=document.querySelector('#ya-map-filial');
 if(link&&host&&!host.offlineMap){event.preventDefault();event.stopImmediatePropagation();host.scrollIntoView({behavior:'smooth',block:'center'});}
},true);
