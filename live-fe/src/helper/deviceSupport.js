export const checkDeviceSupport = (context, navigator) => {
  if (context !== 'undefined' && navigator) {
    navigator?.mediaDevices?.enumerateDevices()?.then((device) => {
      if (device?.length) {
        const _device = Array.from(device)
        const res = {
          isLoading: false,
          microphone: _device.some((x) => x?.kind === 'audioinput'),
          camera: _device.some((x) => x?.kind === 'videoinput'),
          speaker: _device.some((x) => x?.kind === 'audiooutput')
        }
        console.log(res)
        return res
      }
    })
  }
  return {
    isLoading: true,
    microphone: false,
    camera: false,
    speaker: false
  }
}
