window.onload = (function(){const sub = document.querySelector('#sub');
  const input = document.querySelector('#input');
  const div = document.querySelector('.eventArea');
  const ls = document.querySelector('.listshow');
  const data = JSON.parse(localStorage.getItem('listitem'))||[];
  const finished = JSON.parse(localStorage.getItem('finished'))||[];
  sub.addEventListener('click',addData);
  ls.addEventListener('click',deleteData);
  ls.addEventListener('click',finish);
  function addData(e){
    e.preventDefault();
    if(input.value==''){
      alert('請輸入代辦事項');
      return;
    }
    const todo = {'content':input.value};
    data.push(todo);
    updatelist(data);
    localStorage.setItem('listitem',JSON.stringify(data));
    input.value = '';
  }
  function updatelist(data){
    let str = '';
    for(let i=0; i<data.length; i++){
      str+="<li><input type='checkbox' data-num="+i+">"+(i+1)+"."+"<span>"+data[i].content+"</span>"+"<a href='#' data-num="+i+"><img src='https://image.flaticon.com/icons/svg/1214/1214428.svg' alt='del icon'></a></li>";
    }
    ls.innerHTML = str;
  }
  function deleteData(e){
    if(e.target.tagName !== 'IMG') {
      return;
    }else{
      e.preventDefault();
    }
    const num = e.target.dataset.num;
    data.splice(num,1);
    localStorage.setItem('listitem',JSON.stringify(data));
    updatelist(data);
  }
  function finish(e){
    if(e.target.tagName !== 'INPUT') return;
    const li = document.querySelectorAll('.listshow li');
    const num = e.target.dataset.num;
    if(e.target.checked){
      li[num].style.color = '#fff';
      li[num].style.background = '#62f0e4';
      let txt = document.querySelectorAll('li span')[num].textContent;
      let ix = data.forEach((res,index)=>{
        if(res.finish==txt) return index;
      })
      let obj = {'finish':txt};
      data.splice(ix,1);
      finished.push(obj);
      localStorage.setItem('listitem',JSON.stringify(data));
      localStorage.setItem('finished',JSON.stringify(finished));
    }else{
      li[num].style.color = 'lightcoral';
      li[num].style.background = 'none';
      let txt = document.querySelectorAll('li span')[num].textContent;
      let ix = finished.forEach((res,index)=>{
        if(res.finish==txt) return index;
      })
      let obj = {'content':txt};
      data.splice(num,0,obj);
      finished.splice(ix,1);
      localStorage.setItem('listitem',JSON.stringify(data));
      localStorage.setItem('finished',JSON.stringify(finished));
    }
  }
});
