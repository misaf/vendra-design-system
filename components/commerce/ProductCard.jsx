import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';
// The product name is the one interactive target: <a href> (or <button> without href) with a stretched ::after covering the card.
export function ProductCard({name,subtitle,price,compareAt,image,srcSet,images,sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',badge,badgeTone='neutral',frame='arch',tone,favorite,onFavorite,onClick,href,linkLabel,placeholder='Bouquet photo',favLabel='Save'}){
  const list=(images&&images.length?images:image?[{src:image,srcSet}]:[]).map(x=>typeof x==='string'?{src:x}:x);const [a,b]=list;
  const pic=(x,cls)=><img className={cls} src={x.src} srcSet={x.srcSet} sizes={x.srcSet?sizes:undefined} alt={cls?'':(x.alt||name)} loading="lazy" decoding="async" style={x.crop?{objectPosition:x.crop,transform:'scale(1.6)',transformOrigin:x.crop}:undefined} />;
  const aria=linkLabel??(typeof name==='string'&&typeof price==='string'?name+' — '+price:undefined);
  const linked=!!(href||onClick);
  const title=href?<a href={href} className="ag-product__link" aria-label={aria} onClick={onClick}>{name}</a>
    :onClick?<button type="button" className="ag-product__link" aria-label={aria} onClick={onClick}>{name}</button>:name;
  return <div className={'ag-product'+(linked?' ag-product--link':'')}>
    <div className={'ag-product__media ag-product__media--'+frame+(tone==='product'?' ag-arch--product':'')}>
      {a?pic(a):<div className="ag-product__ph">{placeholder}</div>}
      {b && pic(b,'ag-product__alt')}
      {badge && <Badge tone={badgeTone} className="ag-product__badge">{badge}</Badge>}
      {onFavorite && <IconButton icon="heart" label={favLabel} variant="solid" size="sm" active={favorite} className="ag-product__fav" onClick={e=>{e.stopPropagation();onFavorite();}} />}
    </div>
    <div>
      <h3 className="ag-product__name">{title}</h3>
      <div className="ag-product__meta"><span className="ag-product__sub">{subtitle}</span><span className="ag-product__price">{compareAt && <s>{compareAt}</s>}{price}</span></div>
    </div>
  </div>;
}
