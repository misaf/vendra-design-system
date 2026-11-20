export function vfCreateCamera(page, findProduct) {
  let active;

  const isCurrent = session =>
    active === session && !page._unmounted && page.state.panel === 'scan';

  function stop() {
    if (!active) return;
    const {stream, video, timer} = active;
    active = null;
    clearTimeout(timer);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (video.srcObject === stream) video.srcObject = null;
    }
  }

  async function start() {
    if (active || page._unmounted || page.state.panel !== 'scan') return;
    const video = /** @type {HTMLVideoElement} */ (
      document.getElementById('vf-presentation-camera')
    );
    if (!video) return;

    const session = {video, stream: null, timer: undefined};
    active = session;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'},
        audio: false
      });
      if (!isCurrent(session)) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      session.stream = stream;
      video.srcObject = stream;
      // Reading starts at once, even if the video has yet to produce its first frame.
      video.play().catch(() => {});
      // @ts-ignore BarcodeDetector is not in the DOM types yet.
      const detector = new window.BarcodeDetector({formats: ['qr_code']});

      const look = async () => {
        try {
          const [code] = await detector.detect(video);
          if (!isCurrent(session)) return;
          if (code) {
            const product = findProduct(code.rawValue);
            if (product) {
              stop();
              page.setState({
                panel: null,
                scanError: '',
                source: 'only',
                only: product.id,
                open: 0
              });
              return;
            }
            page.setState({scanError: 'unknown'});
          }
        } catch {
          // A detector may reject while video frames are unavailable.
        }
        if (isCurrent(session)) session.timer = setTimeout(look, 250);
      };
      look();
    } catch {
      if (!isCurrent(session)) return;
      stop();
      page.setState({scanError: 'blocked'});
    }
  }

  return {start, stop};
}
