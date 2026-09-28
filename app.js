const foods=[
 {id:1,name:'ເຂົ້າຜັດໝູ',price:35000,cat:'main',icon:'🍳',desc:'ເຂົ້າຜັດຫອມໆພ້ອມໝູ'},
 {id:2,name:'ເຂົ້າກະເພົາໄກ່',price:40000,cat:'main',icon:'🍛',desc:'ກະເພົາໄກ່ເຜັດກຳລັງດີ'},
 {id:3,name:'ເຝີຊີ້ນ',price:45000,cat:'noodle',icon:'🍜',desc:'ນ້ຳຊຸບຫອມ ຊີ້ນນຸ່ມ'},
 {id:4,name:'ຜັດໄທກຸ້ງ',price:50000,cat:'noodle',icon:'🍤',desc:'ເສັ້ນຜັດໄທກັບກຸ້ງສົດ'},
 {id:5,name:'ໄກ່ທອດ',price:38000,cat:'main',icon:'🍗',desc:'ໄກ່ທອດກອບໆຮ້ອນໆ'},
 {id:6,name:'ສະຫຼັດຜັກ',price:30000,cat:'main',icon:'🥗',desc:'ຜັກສົດພ້ອມນ້ຳສະຫຼັດ'},
 {id:7,name:'ນ້ຳໂຄກ',price:15000,cat:'drink',icon:'🥤',desc:'ເຢັນໆ ສົດຊື່ນ'},
 {id:8,name:'ຊານົມ',price:25000,cat:'drink',icon:'🧋',desc:'ຊານົມຫວານກຳລັງດີ'},
 {id:9,name:'ກາເຟເຢັນ',price:25000,cat:'drink',icon:'☕',desc:'ກາເຟຫອມກັບນົມ'},
 {id:10,name:'ເຂົ້າຜັດກຸ້ງ',price:48000,cat:'main',icon:'🍚',desc:'ເຂົ້າຜັດກຸ້ງສົດ'},
 {id:11,name:'ກວຍຈັບ',price:40000,cat:'noodle',icon:'🥣',desc:'ນ້ຳຊຸບເຂັ້ມຂົ້ນ'},
 {id:12,name:'ນ້ຳສົ້ມ',price:20000,cat:'drink',icon:'🍊',desc:'ນ້ຳສົ້ມສົດຊື່ນ'}
];
let cart=[];let category='all';
const money=n=>new Intl.NumberFormat('lo-LA').format(n)+' ₭';
const grid=document.getElementById('foodGrid');
function renderFoods(){const q=document.getElementById('search').value.trim().toLowerCase();const list=foods.filter(f=>(category==='all'||f.cat===category)&&(!q||f.name.toLowerCase().includes(q)));grid.innerHTML=list.map(f=>`<article class="food-card" onclick="add(${f.id})"><div class="food-image">${f.icon}</div><div class="food-info"><h3>${f.name}</h3><p>${f.desc}</p><div class="food-bottom"><span class="price">${money(f.price)}</span><button class="add">+</button></div></div></article>`).join('');}
function add(id){const f=foods.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...f,qty:1});renderCart();toast('ເພີ່ມ '+f.name+' ແລ້ວ');}
function change(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart();}
function renderCart(){const box=document.getElementById('cart');const count=cart.reduce((s,i)=>s+i.qty,0);document.getElementById('orderCount').textContent=count+' ລາຍການ';if(!cart.length){box.innerHTML='<div class="empty">🛒<strong>ຍັງບໍ່ມີອໍເດີ</strong><span>ກົດເມນູດ້ານຊ້າຍເພື່ອເພີ່ມອາຫານ</span></div>';}else{box.innerHTML=cart.map(i=>`<div class="cart-item"><div class="mini-img">${i.icon}</div><div><div class="cart-name">${i.name}</div><div class="cart-price">${money(i.price*i.qty)}</div><div class="qty"><button onclick="change(${i.id},-1)">−</button><span>${i.qty}</span><button onclick="change(${i.id},1)">+</button></div></div><button class="clear-btn" onclick="change(${i.id},-${i.qty})">✕</button></div>`).join('');}const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);document.getElementById('subtotal').textContent=money(subtotal);document.getElementById('discount').textContent=money(0);document.getElementById('total').textContent=money(subtotal);}
document.getElementById('search').addEventListener('input',renderFoods);
document.getElementById('categories').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;document.querySelectorAll('.categories button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');category=e.target.dataset.cat;renderFoods();});
document.getElementById('clearBtn').onclick=()=>{if(cart.length){cart=[];renderCart();toast('ລ້າງອໍເດີແລ້ວ');}};
document.getElementById('payBtn').onclick=()=>{if(!cart.length){toast('ກະລຸນາເພີ່ມອາຫານກ່ອນ');return;}const total=cart.reduce((s,i)=>s+i.price*i.qty,0);const table=document.getElementById('table').value;alert(`ໃບບິນ AIY Food POS\n${table}\n--------------------\n${cart.map(i=>`${i.name} x${i.qty} = ${money(i.price*i.qty)}`).join('\n')}\n--------------------\nລວມ: ${money(total)}\n\nຂອບໃຈທີ່ໃຊ້ບໍລິການ ❤️`);cart=[];renderCart();};
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800);}
function clock(){document.getElementById('clock').textContent=new Date().toLocaleTimeString('lo-LA',{hour:'2-digit',minute:'2-digit'});}setInterval(clock,1000);clock();renderFoods();renderCart();
