// Tabs/Timeline binding without inline handlers (CSP-safe)
document.addEventListener('DOMContentLoaded', function(){
  function switchTab(name, btn){
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.tnb').forEach(b=>b.classList.remove('active'));
    var pane=document.getElementById('tab-'+name); if(pane) pane.classList.add('active');
    if(btn) btn.classList.add('active');
    var fab=document.getElementById('add-place-fab'); if(fab) fab.style.display = (name==='food')?'block':'none';
  }
  function navigateTo(loc){
    var map={
      'munich':     { trip:'sec-munich-in',  food:'food-munich',    attractions:'attr-munich',   accom:'accom-otztal' },
      'neus':       { trip:'sec-neus',        food:null,             attractions:'attr-route',    accom:null           },
      'oetz':       { trip:'sec-oetz',        food:'food-otztal',    attractions:'attr-otztal',   accom:'accom-otztal' },
      'zill':       { trip:'sec-zill',        food:'food-zillertal', attractions:'attr-zillertal',accom:'accom-zillertal' },
      'achen':      { trip:'sec-achen',       food:null,             attractions:'attr-zillertal',accom:null           },
      'munich-out': { trip:'sec-munich-out',  food:'food-munich',    attractions:'attr-munich',   accom:null           }
    }[loc];
    if(!map) return;
    var active=document.querySelector('.tab-pane.active');
    var tabId=active?active.id.replace('tab-',''):'trip';
    var targetId=map[tabId]||map.trip; var el=document.getElementById(targetId);
    if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
    else { switchTab('trip', document.querySelector('.tnb')); setTimeout(()=>{ var el2=document.getElementById(map.trip); if(el2) el2.scrollIntoView({behavior:'smooth',block:'start'}); },100); }
  }
  // Bind tabs by data-tab
  document.querySelectorAll('.tnb').forEach(btn=>{
    var tab=btn.dataset.tab; if(tab){ btn.addEventListener('click', ()=>switchTab(tab, btn)); }
  });
  // Bind timeline by data-loc
  document.querySelectorAll('.tls').forEach(el=>{
    var loc=el.dataset.loc; if(loc){ el.addEventListener('click', ()=>navigateTo(loc)); el.style.cursor='pointer'; }
  });
});
