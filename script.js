const DATA = await fetch('./itinerary.json').then(r=>r.json());
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cls = s => String(s).toLowerCase().replace(/\s+/g,'-');

function badge(status){return `<span class="status ${cls(status)}">${esc(status)}</span>`}
function mapUrl(q){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`}

function renderDays(){
  const q=$('#search').value.trim().toLowerCase();
  const sf=$('#statusFilter').value;
  const cf=$('#cityFilter').value;
  $('#dayList').innerHTML=DATA.days.map(d=>{
    const items=d.items.filter(x=>{
      const hay=(d.theme+' '+d.city+' '+x[1]+' '+x[4]).toLowerCase();
      return (!q||hay.includes(q)) && (!sf||x[2]===sf) && (!cf||d.city.includes(cf));
    });
    if(!items.length)return '';
    return `<article class="day"><div class="day-head"><div><h3>День ${d.day} · ${new Date(d.date+'T12:00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long',weekday:'short'})}</h3><p>${esc(d.city)} · ${esc(d.theme)}</p></div>${badge(items.some(x=>x[2]==='CONFLICT')?'CONFLICT':'USER DATA')}</div><div class="day-body timeline">${items.map(x=>`<div class="event"><div class="time">${esc(x[0])}</div><div><h4>${esc(x[1])} ${badge(x[2])}</h4><p>${esc(x[3])} · ${esc(x[4])}</p><a class="map" target="_blank" rel="noopener" href="${mapUrl(x[1])}">Открыть на карте →</a></div></div>`).join('')}</div></article>`;
  }).join('') || '<div class="card">По заданным фильтрам ничего не найдено.</div>';
}
function renderCities(){
 $('#cityList').innerHTML=DATA.cities.map(c=>`<article class="card"><h3>${esc(c.name)} ${badge(c.status)}</h3><p><b>${esc(c.hotel)}</b></p><p>${esc(c.hotel_address_verified)}</p><p>Исходник: ${esc(c.hotel_address_original)}</p><a class="map" target="_blank" rel="noopener" href="${mapUrl(c.hotel_address_verified)}">Карта →</a><p><a href="${c.hotel_url}" target="_blank" rel="noopener">Официальный сайт →</a></p></article>`).join('');
}
function renderLocations(){
 $('#locationList').innerHTML=DATA.locations.map(l=>`<article class="card"><h3>${esc(l[0])} ${badge(l[3])}</h3><p>${esc(l[1])} · ${esc(l[2])}</p><p><b>Адрес:</b> ${esc(l[4])}</p><p>${esc(l[5])}</p><a class="map" target="_blank" rel="noopener" href="${mapUrl(l[0]+' '+l[4])}">Карта →</a></article>`).join('');
}
function renderTransfers(){
 $('#transferRows').innerHTML=DATA.transfers.map(t=>`<tr><td>${esc(t[0])}</td><td>${esc(t[1])} → ${esc(t[2])}</td><td>${esc(t[3])}</td><td>${esc(t[4])} → ${esc(t[5])}<br>${esc(t[6])}</td><td>${badge(t[7])}</td></tr>`).join('');
}
function renderFood(){
 $('#foodList').innerHTML=DATA.food.map(f=>`<article class="card"><h3>${esc(f[1])} ${badge(f[4])}</h3><p>${esc(f[0])} · ${esc(f[2])}</p><p><b>${esc(f[3])}</b></p><a class="map" target="_blank" rel="noopener" href="${mapUrl(f[1]+' '+f[0])}">Карта →</a></article>`).join('');
}
function renderSources(){
 $('#sourceList').innerHTML=DATA.sources.map(s=>`<div class="source"><div><b>${esc(s[0])}</b><div class="muted">${esc(s[2])}</div></div><a target="_blank" rel="noopener" href="${s[1]}">${esc(s[1])}</a></div>`).join('');
}
function counts(){
 $('#dayCount').textContent=DATA.days.length;
 $('#cityCount').textContent=DATA.cities.length;
 $('#locCount').textContent=DATA.locations.length;
 $('#conflictCount').textContent=DATA.days.flatMap(d=>d.items).filter(x=>x[2]==='CONFLICT').length + DATA.locations.filter(x=>x[3]==='CONFLICT').length;
}
['search','statusFilter','cityFilter'].forEach(id=>$('#'+id).addEventListener('input',renderDays));
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('japan-theme',document.body.classList.contains('dark')?'dark':'light')};
if(localStorage.getItem('japan-theme')==='dark')document.body.classList.add('dark');
counts(); renderDays(); renderCities(); renderLocations(); renderTransfers(); renderFood(); renderSources();
