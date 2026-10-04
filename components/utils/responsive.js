// Breakpoints: mobile < 768, tablet < 1100
window.useBP=function(){
  const get=()=>({w:window.innerWidth,mobile:window.innerWidth<768,tablet:window.innerWidth<1100});
  const [bp,setBp]=React.useState(get);
  React.useEffect(()=>{const on=()=>setBp(get());window.addEventListener('resize',on);return()=>window.removeEventListener('resize',on);},[]);
  return bp;
};