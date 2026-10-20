import React from 'react';
import {Dialog, MenuList, NavLink, LanguageSwitch, Button} from '../../ds.js';

export function StorefrontMenu({
  open,
  onClose,
  title,
  closeLabel,
  navigationLabel,
  navigation,
  language,
  onLanguageChange,
  whatsappHref,
  whatsappLabel
}) {
  return (
    <Dialog placement="start" open={open} onClose={onClose} title={title} closeLabel={closeLabel}>
      <MenuList label={navigationLabel}>
        {navigation.map((item, index) => (
          <React.Fragment key={index}>
            <NavLink variant="menu" href={item?.href} current={item?.current} onClick={onClose}>
              <>{item?.label}</>
            </NavLink>
          </React.Fragment>
        ))}
      </MenuList>
      <div className="vf-shell-menu-actions tw:flex tw:flex-col tw:gap-4 tw:mt-5h">
        {language ? (
          <>
            <div className="vf-shell-menu-language tw:flex tw:items-center tw:justify-between tw:gap-3 tw:text-sm tw:text-quiet">
              <span>
                <>{language.label}</>
              </span>
              <LanguageSwitch
                value={language.value}
                onChange={onLanguageChange}
                options={language.options}
                label={language.label}
              />
            </div>
          </>
        ) : null}
        {whatsappHref ? (
          <Button
            variant="secondary"
            iconStart="message-circle"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <>{whatsappLabel}</>
          </Button>
        ) : null}
      </div>
    </Dialog>
  );
}
