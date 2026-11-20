// An empty date means the first day still available.
// location is the map pin, {lat, lng}; address holds what a map can't show (plaque, unit, floor).
// noMap is set when the map couldn't load: a typed full address then stands in for the pin.
// sender and senderPhone are the customer's own details, for order texts and the delivery photo.
// Card messages live on each bag line that includes a handwritten card (line.card).
export const VF_DELIVERY = {
  name: '',
  phone: '',
  sender: '',
  senderPhone: '',
  address: '',
  location: null,
  noMap: false,
  zone: 'central',
  date: '',
  slot: null,
  promo: ''
};
