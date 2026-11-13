(function(){
var $=function(s,r){return (r||document).querySelector(s)};
var money=function(n){return "$"+n.toLocaleString("en-US")};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var slug=function(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")};
var rel=function(p){return typeof p==="string"&&p.charAt(0)==="/"&&p.charAt(1)!=="/"?p.slice(1):p};
function run(H){
H=H.filter(function(h){return h.published!==false});
H.forEach(function(h){h.images=(h.images||[]).filter(function(g){return g&&g.src}).map(function(g){return {src:rel(g.src),caption:g.caption||""}});h.id=slug(h.title);h.img=(h.images[0]&&h.images[0].src)||rel(h.img)||"";h.amenities=h.amenities||[];h.long=h.long||h.desc||"";h.desc=h.desc||""});
var c1=$("#count"),c2=$("#hcount");if(c1)c1.textContent=H.length+" home"+(H.length===1?"":"s")+" in inventory";if(c2)c2.textContent=H.length+" home"+(H.length===1?"":"s")+" in inventory";
// mobile menu
var m=$(".menu"),n=$("#nav");
if(m)m.addEventListener("click",function(){var o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)});
function card(h){return '<article class="card"><a href="home.html?id='+h.id+'"><img src="'+h.img+'" alt="'+esc(h.name)+' manufactured home exterior" loading="lazy"></a><div class="body"><div class="row"><span class="brand">'+esc(h.brand)+'</span><span class="price">'+money(h.price)+'</span></div><h3><a href="home.html?id='+h.id+'">'+esc(h.title)+'</a></h3><p>'+esc(h.desc)+'</p><div class="specs"><span>'+h.bd+' bd</span><span>'+h.ba+' ba</span><span>'+h.sqft.toLocaleString("en-US")+' sq ft</span><span>'+h.size+'</span></div><a class="more" href="home.html?id='+h.id+'">View details →</a></div></article>'}
var f=$("#featured");if(f)f.innerHTML=H.slice(0,6).map(card).join("");
// inventory filter
var g=$("#grid");
if(g){var fl=$("#filters"),brands=["All brands","Clayton Homes","TRU","Giles","Kabco"],cur="All brands";
 var draw=function(){var list=H.filter(function(h){return cur==="All brands"||h.brand===cur});g.innerHTML=list.map(card).join("");$("#empty").hidden=list.length>0;
  fl.innerHTML=brands.map(function(b){return '<button class="chip" aria-pressed="'+(b===cur)+'" data-b="'+b+'">'+(b==="Clayton Homes"?"Clayton":b)+'</button>'}).join("")};
 fl.addEventListener("click",function(e){var b=e.target.closest("[data-b]");if(b){cur=b.dataset.b;draw()}});draw()}
// detail page
var d=$("#detail");
if(d){var id=new URLSearchParams(location.search).get("id"),h=H.find(function(x){return x.id===id});
 if(!h){d.innerHTML='<section><h1>Home not found</h1><p class="mut">That listing isn’t available. <a href="inventory.html"><u>Browse all homes</u></a>.</p></section>'}
 else{document.title=h.name+" | Regional Homes of Pearl";
  var gal=h.images&&h.images.length?h.images:[{src:h.img,caption:"Exterior"}],idx=0;
  var rel=H.filter(function(x){return x.id!==h.id&&(x.brand===h.brand||x.bd===h.bd)}).slice(0,3);
  var car='<div class="car" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Photos of '+esc(h.name)+'"><div class="stage"><img id="cimg" src="'+gal[0].src+'" alt=""><button class="cnav prev" aria-label="Previous photo">‹</button><button class="cnav next" aria-label="Next photo">›</button><div class="cap"><span id="ccap"></span><span id="ccount"></span></div></div><div class="thumbs">'+gal.map(function(g,i){return '<button class="th" data-i="'+i+'" aria-label="Show photo '+(i+1)+': '+esc(g.caption)+'"><img src="'+g.src+'" alt=""></button>'}).join("")+'</div></div>';
  var am=(h.amenities||[]).map(function(a){return "<li>"+esc(a)+"</li>"}).join("");
  d.innerHTML='<div class="crumb"><a href="inventory.html">Inventory</a> / '+esc(h.name)+'</div><div class="dgrid">'+car+'<div><div class="tag">'+esc(h.brand)+'</div><h1 style="font-size:clamp(26px,4vw,38px)">'+esc(h.title)+'</h1><div class="dprice">'+money(h.price)+'</div><p class="mut">'+esc(h.long)+'</p><div class="sgrid"><div><b>'+h.bd+'</b><span>Bedrooms</span></div><div><b>'+h.ba+'</b><span>Bathrooms</span></div><div><b>'+h.sqft.toLocaleString("en-US")+'</b><span>Square feet</span></div><div><b>'+h.size+'</b><span>Layout (ft)</span></div></div><div class="cta"><a class="btn" href="contact.html?model='+h.id+'">Request quote for this home</a><a class="btn ghost" href="inventory.html">Back to inventory</a></div><p class="note" style="margin-top:14px">Quote includes the home, options, delivery and setup.</p></div></div>'+
  (am?'<section class="amen"><h2>Amenities included</h2><ul class="checks alist">'+am+'</ul></section>':"")+
  (rel.length?'<section style="padding-top:8px"><div class="head"><h2>Similar homes</h2></div><div class="grid">'+rel.map(card).join("")+'</div></section>':"");
  var ci=$("#cimg"),cc=$("#ccap"),cn=$("#ccount"),ths=d.querySelectorAll(".th"),box=$(".car",d);
  function show(n){idx=(n+gal.length)%gal.length;ci.src=gal[idx].src;ci.alt=h.name+" — "+gal[idx].caption;cc.textContent=gal[idx].caption;cn.textContent=(idx+1)+" / "+gal.length;
   ths.forEach(function(t,k){t.classList.toggle("on",k===idx);if(k===idx)t.setAttribute("aria-current","true");else t.removeAttribute("aria-current")})}
  $(".prev",d).addEventListener("click",function(){show(idx-1)});$(".next",d).addEventListener("click",function(){show(idx+1)});
  ths.forEach(function(t){t.addEventListener("click",function(){show(+t.dataset.i)})});
  box.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")show(idx-1);if(e.key==="ArrowRight")show(idx+1)});
  var x0=null;box.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  box.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(idx+(dx<0?1:-1));x0=null});
  show(0)}}
// contact form
var q=$("#quote");
if(q){var sel=$("#model");H.forEach(function(h){var o=document.createElement("option");o.value=h.id;o.textContent=h.name+" — "+money(h.price);sel.appendChild(o)});
 var o=document.createElement("option");o.value="other";o.textContent="Something else / not sure yet";sel.appendChild(o);
 var pre=new URLSearchParams(location.search).get("model");if(pre)sel.value=pre;
 q.addEventListener("submit",function(e){e.preventDefault();var s=$("#status"),v=new FormData(q);
  if(!q.checkValidity()){s.textContent="Please fill in all required fields.";q.reportValidity();return}
  var h=H.find(function(x){return x.id===v.get("model")}),body="Name: "+v.get("name")+"\nPhone: "+v.get("phone")+"\nEmail: "+v.get("email")+"\nInterested in: "+(h?h.name+" ("+money(h.price)+")":"Something else / not sure yet")+"\nTimeline: "+(v.get("timeline")||"Not specified")+"\n\n"+v.get("message");
  location.href="mailto:pealregionalhomes209@gmail.com?subject="+encodeURIComponent("Product quote request")+"&body="+encodeURIComponent(body);
  s.textContent="Opening your email app… if nothing opens, email pealregionalhomes209@gmail.com directly."})}
}
function boot(d){run(d&&d.listings?d.listings:(window.HOMES||[]))}
if(window.fetch&&location.protocol!=="file:"){fetch("content/listings.json",{cache:"no-cache"}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(boot).catch(function(){boot()})}else boot();
})();
