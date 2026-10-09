// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    sent: false,
    email: '',
    apiError: '',
    busy: false,
    name: '',
    phone: '',
    e1: false,
    e2: false,
    guests: '',
    wDate: '',
    notes: '',
    type: '',
    budget: ''
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'weddings');
    const s = this.state;
    const C = vfCopy(S);
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        editMessage: C.labels.returnToForm
      },
      gallery: [1, 2, 3].map(n => ({
        src: (window.VF_ASSET_BASE || '../../') + VF_PRODUCT_PLACEHOLDER,
        alt: C.galleryTitle + ' ' + S.n(n)
      })),
      process: C.steps,
      guests: s.guests,
      setGuests: e =>
        this.setState({
          guests: e.target.value
        }),
      wDate: s.wDate,
      setWDate: v =>
        this.setState({
          wDate: v
        }),
      today: (() => {
        const d = new Date();
        return (
          d.getFullYear() +
          '-' +
          String(d.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(d.getDate()).padStart(2, '0')
        );
      })(),
      services: C.sv.map(x => ({
        icon: x[0],
        title: x[1],
        body: x[2],
        price: x[3]
      })),
      apiError: s.apiError,
      busy: s.busy,
      email: s.email,
      setEmail: e =>
        this.setState({
          email: e.target.value,
          apiError: ''
        }),
      sent: s.sent,
      notSent: !s.sent,
      editMessage: () => {
        this.setState({
          sent: false
        });
        S.focus('vf-wname');
      },
      name: s.name,
      setName: e =>
        this.setState({
          name: e.target.value,
          e1: false
        }),
      nameErr: s.e1 ? C.nameErr : undefined,
      phone: s.phone,
      setPhone: e =>
        this.setState({
          phone: e.target.value,
          e2: false
        }),
      phoneErr: s.e2 ? C.phoneErr : undefined,
      type: s.type,
      budget: s.budget,
      setType: e =>
        this.setState({
          type: e.target.value
        }),
      setBudget: e =>
        this.setState({
          budget: e.target.value
        }),
      notes: s.notes,
      setNotes: e =>
        this.setState({
          notes: e.target.value
        }),
      types: C.types,
      budgets: C.budgets,
      send: () => {
        const e1 = !s.name.trim(),
          e2 = !vfMobile(s.phone);
        if (e1 || e2) {
          this.setState({
            e1,
            e2
          });
          setTimeout(() => {
            const el = document.getElementById(e1 ? 'vf-wname' : 'vf-wphone');
            el && el.focus();
          }, 0);
          return;
        }
        const success = () => {
          this.setState({
            sent: true,
            busy: false,
            apiError: ''
          });
          S.focus('vf-weddings-success');
        };
        if (!window.VF_API.live) {
          success();
          return;
        }
        this.setState({
          busy: true,
          apiError: ''
        });
        return window.VF_API.inquiry({
          name: s.name || '',
          phone: s.phone ? vfMobile(s.phone) : null,
          email: s.email || '',
          message:
            [s.type, s.wDate, s.budget, s.guests, s.notes].filter(Boolean).join(' · ') ||
            'Wedding inquiry',
          occasion: 'weddings',
          preferredLocale: window.VF_API.preferredLocale()
        })
          .then(success)
          .catch(() =>
            this.setState({
              busy: false,
              apiError: C.integrationError
            })
          );
      }
    };
  }
}
