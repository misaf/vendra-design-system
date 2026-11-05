import React from 'react';

export function BrandLogo({image, name}) {
  const [failed, setFailed] = React.useState('');
  if (!image || failed === image.src) return <>{name}</>;
  return (
    <img
      className="vf-brand-logo"
      src={image.src}
      width={image.width}
      height={image.height}
      alt={name}
      onError={() => setFailed(image.src)}
    />
  );
}
