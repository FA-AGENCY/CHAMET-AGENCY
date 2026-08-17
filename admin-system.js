/* FA-AGENCY™ dynamic public-site catalog */
(function(){
  const KEY='fa_agency_catalog_v2';
  const defaults={
    diamondRates:[['15K','355'],['20K','470'],['25K','590'],['30K','705'],['50K','1175'],['100K','2350']],
    categories:{
      agencies:{title:'Other Agencies',icon:'🌐',description:'More live streaming agencies will be added to the platform soon.',status:'COMING SOON'},
      hosting:{title:'Other App Hosting',icon:'📱',description:'Hosting opportunities for other live streaming applications.',status:'COMING SOON'},
      topups:{title:'Gaming & Other Top Up',icon:'🎮',description:'Other gaming and live streaming top-up services will be available soon.',status:'COMING SOON'}
    }, products:[]
  };
  function clone(x){return JSON.parse(JSON.stringify(x))}
  function load(){try{const d=JSON.parse(localStorage.getItem(KEY)); return d||clone(defaults)}catch(e){return clone(defaults)}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  window.FAAdmin={load,save,KEY,defaults};

  function renderDiamond(){
    const card=document.querySelector('[data-fa-diamond]');
    if(!card)return;
    const btn=card.querySelector('.service-btn');
    if(!btn)return;
    // Diamond Top Up opens its own dedicated page. Nothing opens inside the homepage/card.
    btn.href='pages/diamond-topup.html';
    btn.onclick=null;
  }

  function renderCategories(){
    const d=load();
    Object.keys(d.categories).forEach(cat=>{
      const card=document.querySelector(`[data-fa-category="${cat}"]`); if(!card)return;
      const c=d.categories[cat];
      const products=d.products.filter(p=>p.category===cat&&p.active!==false);
      const icon=card.querySelector('.service-icon'),h=card.querySelector('h3'),p=card.querySelector('p'),badge=card.querySelector('.coming-soon');
      if(icon)icon.textContent=c.icon||'📦';
      if(h)h.textContent=c.title;
      if(p)p.textContent=c.description;
      if(badge)badge.textContent=products.length?`${products.length} SERVICES`:(c.status||'COMING SOON');
      let box=card.querySelector('.fa-products');
      if(!box){box=document.createElement('div');box.className='fa-products';card.appendChild(box)}
      box.innerHTML=products.length?products.map(x=>`<div class="fa-product"><img src="${esc(x.logo||'')}" onerror="this.style.display='none'"><div><strong>${esc(x.name)}</strong><small>${esc(x.description||'')}</small></div>${x.link?`<a href="${esc(x.link)}" target="_blank">ORDER</a>`:''}</div>`).join(''):'';
    });
  }
  function init(){renderDiamond();renderCategories()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
