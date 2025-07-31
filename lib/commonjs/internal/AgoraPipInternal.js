"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgoraPipInternal = void 0;
exports.processAgoraPipObserver = processAgoraPipObserver;
var _tsInterfaceChecker = require("ts-interface-checker");
var _specs = _interopRequireDefault(require("../specs"));
var _IAgoraPipTi = _interopRequireDefault(require("../ti/IAgoraPip-ti"));
var _IrisApiEngine = require("./IrisApiEngine");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const checkers = (0, _tsInterfaceChecker.createCheckers)(_IAgoraPipTi.default);
function processAgoraPipObserver(handler, event, jsonParams) {
  switch (event) {
    case 'onPipStateChanged':
      if (handler.onPipStateChanged !== undefined) {
        handler.onPipStateChanged(jsonParams.state, jsonParams.error);
      }
      break;
  }
}
class AgoraPipInternal {
  static _agora_pip_observers = [];
  pipIsSupported() {
    return _specs.default.pipIsSupported();
  }
  pipIsAutoEnterSupported() {
    return _specs.default.pipIsAutoEnterSupported();
  }
  isPipActivated() {
    return _specs.default.isPipActivated();
  }
  pipSetup(options) {
    if (typeof options === 'object') {
      return _specs.default.pipSetup(options);
    } else {
      return false;
    }
  }
  pipStart() {
    return _specs.default.pipStart();
  }
  pipStop() {
    _specs.default.pipStop();
  }
  pipDispose() {
    _specs.default.pipDispose();
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
      if (eventProcessor.type(data) !== _IrisApiEngine.EVENT_TYPE.IAgoraPip) {
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
    _IrisApiEngine.DeviceEventEmitter.addListener(eventType, callback);
  }
  removeListener(eventType, listener) {
    _IrisApiEngine.DeviceEventEmitter.removeListener(eventType,
    // @ts-ignore
    (listener === null || listener === void 0 ? void 0 : listener.agoraCallback) ?? listener);
  }
  removeAllListeners(eventType) {
    _IrisApiEngine.DeviceEventEmitter.removeAllListeners(eventType);
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
exports.AgoraPipInternal = AgoraPipInternal;
//# sourceMappingURL=AgoraPipInternal.js.map