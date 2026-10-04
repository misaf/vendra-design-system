import React from 'react';
import { QuantityStepper } from '../forms/QuantityStepper.jsx';
export function LineItem({image,srcSet,name,meta,note,price,quantity,onQuantityChange,onRemove,removeLabel='Remove',quantityLabels,formatQuantity=n=>String(n),size='lg',unavailable,unavailableLabel='No longer available',busy,className=''}){
  const lg=size!=='sm';const tw=lg?88:44;
  return <div className="ag-linewrap"><div className={'ag-line ag-line--'+(lg?'lg':'sm')+(unavailable?' ag-line--unavailable':'')+' '+className} aria-busy={busy||undefined}>
    <span className="ag-line__thumb" style={{width:tw}}>{image?<img src={image} srcSet={srcSet} sizes={srcSet?tw+'px':undefined} alt="" loading="lazy" decoding="async" />:<span className="ag-product__ph"></span>}</span>
    <div className="ag-line__main">
      <div className="ag-line__name">{name}</div>
      {meta && <div className="ag-line__meta">{meta}</div>}
      {note && <div className="ag-line__note">{note}</div>}
      {unavailable && <div className="ag-line__flag">{unavailableLabel}</div>}
      {lg && (onQuantityChange||onRemove) && <div className="ag-line__actions">
        {onQuantityChange && !unavailable && <QuantityStepper value={quantity} disabled={busy} onChange={onQuantityChange} format={formatQuantity} labels={quantityLabels} />}
        {onRemove && <button type="button" className="ag-line__remove" onClick={onRemove}>{removeLabel}</button>}
      </div>}
    </div>
    <div className="ag-line__end">{!lg && quantity!=null && <span className="ag-line__qty">×{formatQuantity(quantity)}</span>}{!unavailable&&<span className="ag-line__price">{price}</span>}</div>
  </div></div>;
}
