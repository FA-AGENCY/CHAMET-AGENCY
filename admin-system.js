/* FA-AGENCY Admin System - local browser storage edition */
(function(){
  document.head.insertAdjacentHTML('beforeend',`<style id="fa-admin-dynamic">.fa-diamond-panel{margin-top:18px}.fa-panel-inner{padding:16px;border-radius:14px;background:rgba(0,0,0,.22);border:1px solid rgba(117,108,255,.25)}.fa-panel-inner h4{font-size:18px;margin-bottom:12px}.fa-rates{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:15px}.fa-rates div{display:flex;justify-content:space-between;padding:10px 12px;border-radius:9px;background:rgba(255,255,255,.05)}.fa-rates b{color:#8d87ff}.fa-rules{color:#c7cbe0;font-size:13px;margin:12px 0}.fa-rules ul{padding-left:20px;margin:7px 0}.fa-order-btn{display:block;text-align:center;padding:12px;border-radius:9px;background:linear-gradient(135deg,#7067ff,#4c42e8);font-weight:800}.fa-products{margin-top:15px;display:grid;gap:9px}.fa-product{display:flex;align-items:center;gap:10px;padding:9px;border-radius:10px;background:rgba(255,255,255,.04)}.fa-product img{width:42px;height:42px;border-radius:8px;object-fit:cover}.fa-product div{flex:1}.fa-product small{display:block;color:#9ba2bd}.fa-product a{background:#625bff;padding:7px 10px;border-radius:7px;font-size:12px;font-weight:700}@media(max-width:600px){.fa-rates{grid-template-columns:1fr}.fa-product{align-items:flex-start}.fa-product a{margin-left:auto}} </style>`);
  const KEY='fa_agency_catalog_v1';
  const defaultData={
    diamondRates:[['15K','355'],['20K','470'],['25K','590'],['30K','705'],['50K','1175'],['100K','2350']],
    categories:{
      agencies:{title:'Other Agencies',icon:'🌐',description:'More live streaming agencies will be added to the platform soon.',status:'COMING SOON'},
      hosting:{title:'Other App Hosting',icon:'📱',description:'Hosting opportunities for other live streaming applications.',status:'COMING SOON'},
      topups:{title:'Gaming & Other Top Up',icon:'🎮',description:'Other gaming and live streaming top-up services will be available soon.',status:'COMING SOON'}
    },
    products:[]
  };
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||defaultData}catch(e){return defaultData}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
  window.FAAdmin={load,save,KEY};

  function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function renderHome(){
    const d=load();
    const diamond=document.querySelector('.service-card[data-fa-diamond]');
    if(diamond){
      let panel=diamond.querySelector('.fa-diamond-panel');
      if(!panel){panel=document.createElement('div');panel.className='fa-diamond-panel';panel.hidden=true;diamond.appendChild(panel)}
      panel.innerHTML=`<div class="fa-panel-inner"><h4>💎 Diamond Recharge Rates</h4><div class="fa-rates">${d.diamondRates.map(r=>`<div><span>${escapeHtml(r[0])}</span><b>৳${escapeHtml(r[1])}</b></div>`).join('')}</div><div class="fa-rules"><strong>গুরুত্বপূর্ণ নিয়ম</strong><ul><li>সর্বনিম্ন 15K Diamonds থেকে রিচার্জ করা যাবে।</li><li>ভুল User ID দিলে কোনো Refund নেই।</li><li>Purchase সম্পন্ন হলে Refund নেই।</li><li>Purchased Diamonds সরাসরি Cash-out করা যায় না।</li><li>অননুমোদিত source ব্যবহার করলে account ban হতে পারে।</li></ul></div><a class="fa-order-btn" href="pages/signup.html">ORDER NOW</a></div>`;
      const btn=diamond.querySelector('.service-btn'); if(btn){btn.href='#';btn.onclick=e=>{e.preventDefault();panel.hidden=!panel.hidden;btn.textContent=panel.hidden?'Top Up করুন':'Close';};}
    }
    Object.keys(d.categories).forEach(cat=>{
      const card=document.querySelector(`[data-fa-category="${cat}"]`); if(!card)return;
      const c=d.categories[cat]; const products=d.products.filter(p=>p.category===cat&&p.active!==false);
      const icon=card.querySelector('.service-icon'),h=card.querySelector('h3'),p=card.querySelector('p'),badge=card.querySelector('.coming-soon');
      if(icon)icon.textContent=c.icon||'📦'; if(h)h.textContent=c.title; if(p)p.textContent=c.description;
      if(badge)badge.textContent=products.length?`${products.length} SERVICES`:(c.status||'COMING SOON');
      let box=card.querySelector('.fa-products');
      if(!box){box=document.createElement('div');box.className='fa-products';card.appendChild(box)}
      box.innerHTML=products.length?products.map(x=>`<div class="fa-product"><img src="${x.logo||''}" onerror="this.style.display='none'"><div><strong>${escapeHtml(x.name)}</strong><small>${escapeHtml(x.description||'')}</small></div>${x.link?`<a href="${escapeHtml(x.link)}" target="_blank">ORDER</a>`:''}</div>`).join(''):'';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderHome);else renderHome();
})();
