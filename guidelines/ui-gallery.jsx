import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '../ui/components/Button/Button.jsx';
import {DatePicker} from '../ui/components/DatePicker/DatePicker.jsx';
import {Dialog} from '../ui/components/Dialog/Dialog.jsx';
import {Input} from '../ui/components/Input/Input.jsx';
import {VendraProvider} from '../ui/components/VendraProvider/VendraProvider.jsx';

const params = new URLSearchParams(location.search);
const themes = ['clay', 'fern'];
const tenant = themes.includes(params.get('tenant')) ? params.get('tenant') : 'clay';
const fa = params.get('lang') === 'fa';
const lang = fa ? 'fa' : 'en';
const locale = fa ? 'fa-IR' : 'en-US';
Object.assign(document.documentElement, {lang, dir: fa ? 'rtl' : 'ltr'});
Object.assign(document.documentElement.dataset, {lang, tenant});

const copy = fa
  ? {
      title: 'نمایش اجزای وندرا',
      themes: 'پوسته و زبان',
      recipient: 'نام گیرنده',
      date: 'تاریخ تحویل',
      details: 'جزئیات تحویل',
      note: 'یادداشت',
      save: 'ذخیره'
    }
  : {
      title: 'Vendra UI gallery',
      themes: 'Theme and language',
      recipient: 'Recipient name',
      date: 'Delivery date',
      details: 'Delivery details',
      note: 'Note',
      save: 'Save'
    };
document.title = copy.title;

function Gallery() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  return (
    <VendraProvider locale={locale}>
      <main>
        <h1>{copy.title}</h1>
        <nav aria-label={copy.themes}>
          {themes.map(name => (
            <a
              key={name}
              href={`?tenant=${name}&lang=${lang}`}
              aria-current={name === tenant ? 'true' : undefined}
            >
              {name === 'clay' ? 'Clay' : 'Fern'}
            </a>
          ))}
          <a href={`?tenant=${tenant}&lang=${fa ? 'en' : 'fa'}`} lang={fa ? 'en' : 'fa'}>
            {fa ? 'English' : 'فارسی'}
          </a>
        </nav>
        <div className="controls">
          <Input label={copy.recipient} name="recipient" autoComplete="name" />
          <DatePicker label={copy.date} value={date} onChange={setDate} />
          <Button aria-haspopup="dialog" onClick={() => setOpen(true)}>
            {copy.details}
          </Button>
        </div>
        <Dialog
          open={open}
          title={copy.details}
          onClose={() => setOpen(false)}
          footer={<Button onClick={() => setOpen(false)}>{copy.save}</Button>}
        >
          <Input label={copy.note} multiline />
        </Dialog>
      </main>
    </VendraProvider>
  );
}

createRoot(document.getElementById('root')).render(<Gallery />);
