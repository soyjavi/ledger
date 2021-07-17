import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

export { CAMERA_PROPS };
