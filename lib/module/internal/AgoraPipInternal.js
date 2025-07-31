import { createCheckers } from 'ts-interface-checker';
import AgoraRtcNg from '../specs';
import IAgoraPipTI from '../ti/IAgoraPip-ti';
import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';
const checkers = createCheckers(IAgoraPipTI);
export function processAgoraPipObserver(handler, event, jsonParams) {
  switch (event) {
    case 'onPipStateChanged':
      if (handler.onPipStateChanged !== undefined) {
        handler.onPipStateChanged(jsonParams.state, jsonParams.error);
      }
      break;
  }
}
export class AgoraPipInternal {
  static _agora_pip_observers = [];
  pipIsSupported() {
    return AgoraRtcNg.pipIsSupported();
  }
  pipIsAutoEnterSupported() {
    return AgoraRtcNg.pipIsAutoEnterSupported();
  }
  isPipActivated() {
    return AgoraRtcNg.isPipActivated();
  }
  pipSetup(options) {
    if (typeof options === 'object') {
      return AgoraRtcNg.pipSetup(options);
    } else {
      return false;
    }
  }
  pipStart() {
    return AgoraRtcNg.pipStart();
  }
  pipStop() {
    AgoraRtcNg.pipStop();
  }
  pipDispose() {
    AgoraRtcNg.pipDispose();
  }
  release() {
    AgoraPipInternal._agora_pip_observers = [];
    this.removeAllListeners();
    this.pipDispose();
  }
  _addListenerPreCheck(eventType) {
    var _checkers$AgoraPipSta;
    if ((_checkers$AgoraPipSta = checkers.AgoraPipStateChangedObserver) !== null && _checkers$AgoraPipSta !== void 0 && _checkers$AgoraPipSta.strictTest({
      [eventType]: undefined
    })) {
      if (AgoraPipInternal._agora_pip_observers.length === 0) {
        console.error('Please call `registerPipObserver` before you want to receive event by `addListener`');
        return false;
      }
    }
    return true;
  }
  addListener(eventType, listener) {
    this._addListenerPreCheck(eventType);
    const callback = (eventProcessor, data) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IAgoraPip) {
        return;
      }
      eventProcessor.func.map(it => {
        it({
          [eventType]: listener
        }, eventType, data);
      });
    };
    // @ts-ignore
    listener.agoraCallback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }
  removeListener(eventType, listener) {
    DeviceEventEmitter.removeListener(eventType,
    // @ts-ignore
    (listener === null || listener === void 0 ? void 0 : listener.agoraCallback) ?? listener);
  }
  removeAllListeners(eventType) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }
  registerPipStateChangedObserver(observer) {
    if (!AgoraPipInternal._agora_pip_observers.find(value => value === observer)) {
      AgoraPipInternal._agora_pip_observers.push(observer);
    }
  }
  unregisterPipStateChangedObserver(observer) {
    AgoraPipInternal._agora_pip_observers = AgoraPipInternal._agora_pip_observers.filter(value => value !== observer);
  }
}
//# sourceMappingURL=AgoraPipInternal.js.map