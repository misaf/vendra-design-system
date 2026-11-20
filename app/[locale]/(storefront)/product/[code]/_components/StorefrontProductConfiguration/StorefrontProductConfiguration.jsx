import React from 'react';
import {Checkbox} from '../../../../../../../ui/components/Checkbox/Checkbox.jsx';
import {ChoiceGroup} from '../../../../../../../ui/components/ChoiceGroup/ChoiceGroup.jsx';
import {ChoiceTile} from '../../../../../../../ui/components/ChoiceTile/ChoiceTile.jsx';

export function StorefrontProductConfiguration({
  showSizes,
  sizes,
  size,
  onSizeChange,
  showAddons,
  addons,
  labels
}) {
  return (
    <>
      {showSizes ? (
        <>
          <ChoiceGroup
            className="vf-product-sizes"
            legend={labels.size}
            columns={3}
            value={size}
            onChange={onSizeChange}
          >
            {sizes.map((z, $index) => (
              <React.Fragment key={$index}>
                <ChoiceTile value={z?.value} label={z?.label} description={z?.desc} />
              </React.Fragment>
            ))}
          </ChoiceGroup>
        </>
      ) : null}
      {showAddons ? (
        <fieldset className="vf-product-extras tw:[border:0] tw:p-0 tw:m-0 tw:flex tw:flex-col tw:gap-3">
          <legend className="vf-product-extras-legend tw:text-sm tw:font-medium tw:mb-3 tw:p-0">
            <>{labels.extras}</>
          </legend>
          {addons.map((a, $index) => (
            <React.Fragment key={$index}>
              <Checkbox label={a?.label} checked={a?.on} onChange={a?.toggle} />
            </React.Fragment>
          ))}
        </fieldset>
      ) : null}
    </>
  );
}
