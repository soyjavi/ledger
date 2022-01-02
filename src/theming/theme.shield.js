import { colorOpacity } from '../common/colorOpacity';

const FONT_XXL = 36;
const FONT_XL = 32;
const FONT_L = 20;
const FONT_M = 16;
const FONT_S = 14;
const FONT_XS = 12;
const FONT_XXS = 10;
const LINE_HEIGHT = 1.2;

export const ShieldTheme = {
  $theme: 'shield',

  /* APPEARANCE */
  $colorAppearance_1: '#FFC491',
  $colorAppearance_2: '#FFFD00',
  $colorAppearance_3: '#CBFD50',
  $colorAppearance_4: '#ff8056',
  $colorAppearance_5: '#5BC7BD',
  $colorAppearance_6: '#8469F6',

  /* BORDER */
  $borderRadius: 4,
  $borderSize: 1,
  $borderStyle: 'solid',

  /* COLOR */
  $colorBase: '#191919',
  $colorContent: '#ffffff',
  $colorAccent: '$colorAppearance_1',
  $colorPrimary: '$colorAppearance_1',
  $colorAlert: '#ff5c5c',
  //
  $colorInfo: '#222222',
  $colorGrayscaleXL: '#282828',
  //
  // $colorInfo: '#282828',
  // $colorGrayscaleXL: '#222222',
  //
  $colorGrayscaleL: '#888888',
  // $colorGrayscaleM: '#cfcfcf',
  // $colorGrayscaleS: '#e7e7e7',
  $colorOverlay: colorOpacity('#191919', 0.9),
  // $colorTouchable: 'rgba(255, 255, 255, 0.15)',

  /* ELEVATION */
  // $elevationOffset: { width: 0, height: 8 },
  // $elevationRadius: 18,
  // $elevationOpacityS: 0.075,
  // $elevationOpacityM: 0.15,
  // $elevationColor: 'rgb(0, 0, 0)',
  // $elevationLayerXS: 1,
  // $elevationLayerS: 2,
  // $elevationLayerM: 3,
  // $elevationLayerL: 4,
  // $elevationLayerXL: 5,

  /* FONT */
  $fontMap: {
    Brand: 'font-bold',
    Heading: 'font-bold',
    Body: 'font-default',
    Action: 'font-bold',
    Detail: 'font-default',
  },

  $fontBrand: 'Brand',
  $fontBrandStyle1: 'normal',
  $fontBarance1: ['normal'],
  $fontBrandWeight1: '500',
  $fontBrandSize1: FONT_XXL,
  $fontBrandHeight1: FONT_XXL * LINE_HEIGHT,
  $fontBrandPaddingTop1: 0,
  $fontBrandPaddingRight1: 0,
  $fontBrandPaddingBottom1: 0,
  $fontBrandPaddingLeft1: 0,
  $fontBrandLetterSpacing1: 0,

  $fontHeading: 'Heading',
  $fontHeadingStyle1: 'normal',
  $fontHeadingVariant1: ['normal'],
  $fontHeadingWeight1: '800',
  $fontHeadingSize1: FONT_XL,
  $fontHeadingHeight1: FONT_XL * LINE_HEIGHT,
  $fontHeadingPaddingTop1: 0,
  $fontHeadingPaddingRight1: 0,
  $fontHeadingPaddingBottom1: 0,
  $fontHeadingPaddingLeft1: 0,
  $fontHeadingLetterSpacing1: 0,
  $fontHeadingStyle2: 'normal',
  $fontHeadingVariant2: ['normal'],
  $fontHeadingWeight2: '800',
  $fontHeadingSize2: FONT_L,
  $fontHeadingHeight2: FONT_L * LINE_HEIGHT,
  $fontHeadingPaddingTop2: 0,
  $fontHeadingPaddingRight2: 0,
  $fontHeadingPaddingBottom2: 0,
  $fontHeadingPaddingLeft2: 0,
  $fontHeadingLetterSpacing2: 0,
  $fontHeadingStyle3: 'normal',
  $fontHeadingVariant3: ['normal'],
  $fontHeadingWeight3: '800',
  $fontHeadingSize3: FONT_M,
  $fontHeadingHeight3: FONT_M * LINE_HEIGHT,
  $fontHeadingPaddingTop3: 0,
  $fontHeadingPaddingRight3: 0,
  $fontHeadingPaddingBottom3: 0,
  $fontHeadingPaddingLeft3: 0,
  $fontHeadingLetterSpacing3: 0,

  $fontBody: 'Body',
  $fontBodyStyle1: 'normal',
  $fontBodyVariant1: ['normal'],
  $fontBodyWeight1: '300',
  $fontBodySize1: FONT_XL,
  $fontBodyHeight1: FONT_XL * LINE_HEIGHT,
  $fontBodyPaddingTop1: 0,
  $fontBodyPaddingRight1: 0,
  $fontBodyPaddingBottom1: 0,
  $fontBodyPaddingLeft1: 0,
  $fontBodyLetterSpacing1: 0,
  $fontBodyStyle2: 'normal',
  $fontBodyVariant2: ['normal'],
  $fontBodyWeight2: '300',
  $fontBodySize2: FONT_L,
  $fontBodyHeight2: FONT_L * LINE_HEIGHT,
  $fontBodyPaddingTop2: 0,
  $fontBodyPaddingRight2: 0,
  $fontBodyPaddingBottom2: 0,
  $fontBodyPaddingLeft2: 0,
  $fontBodyLetterSpacing2: 0,
  $fontBodyStyle3: 'normal',
  $fontBodyVariant3: ['normal'],
  $fontBodyWeight3: '300',
  $fontBodySize3: FONT_M,
  $fontBodyHeight3: FONT_M * LINE_HEIGHT,
  $fontBodyPaddingTop3: 0,
  $fontBodyPaddingRight3: 0,
  $fontBodyPaddingBottom3: 0,
  $fontBodyPaddingLeft3: 0,
  $fontBodyLetterSpacing3: 0,

  $fontAction: 'Action',
  $fontActionStyle1: 'normal',
  $fontActionVariant1: ['normal'],
  $fontActionWeight1: '800',
  $fontActionSize1: FONT_S,
  $fontActionHeight1: FONT_S * LINE_HEIGHT,
  $fontActionPaddingTop1: 0,
  $fontActionPaddingRight1: 0,
  $fontActionPaddingBottom1: 0,
  $fontActionPaddingLeft1: 0,
  $fontActionLetterSpacing1: 0,
  $fontActionStyle2: 'normal',
  $fontActionVariant2: ['normal'],
  $fontActionWeight2: '800',
  $fontActionSize2: FONT_XS,
  $fontActionHeight2: FONT_XS * LINE_HEIGHT,
  $fontActionPaddingTop2: 0,
  $fontActionPaddingRight2: 0,
  $fontActionPaddingBottom2: 0,
  $fontActionPaddingLeft2: 0,
  $fontActionLetterSpacing2: 0,
  $fontActionStyle3: 'normal',
  $fontActionVariant3: ['normal'],
  $fontActionWeight3: '800',
  $fontActionSize3: FONT_XXS,
  $fontActionHeight3: FONT_XXS * LINE_HEIGHT,
  $fontActionPaddingTop3: 0,
  $fontActionPaddingRight3: 0,
  $fontActionPaddingBottom3: 0,
  $fontActionPaddingLeft3: 0,
  $fontActionLetterSpacing3: 0,

  $fontDetail: 'Detail',
  $fontDetailStyle1: 'normal',
  $fontDetailVariant1: ['normal'],
  $fontDetailWeight1: '300',
  $fontDetailSize1: FONT_S,
  $fontDetailHeight1: FONT_S * LINE_HEIGHT,
  $fontDetailPaddingTop1: 0,
  $fontDetailPaddingRight1: 0,
  $fontDetailPaddingBottom1: 0,
  $fontDetailPaddingLeft1: 0,
  $fontDetailLetterSpacing1: 0,
  $fontDetailStyle2: 'normal',
  $fontDetailVariant2: ['normal'],
  $fontDetailWeight2: '300',
  $fontDetailSize2: FONT_XS,
  $fontDetailHeight2: FONT_XS * LINE_HEIGHT,
  $fontDetailPaddingTop2: 0,
  $fontDetailPaddingRight2: 0,
  $fontDetailPaddingBottom2: 0,
  $fontDetailPaddingLeft2: 0,
  $fontDetailLetterSpacing2: 0,
  $fontDetailStyle3: 'normal',
  $fontDetailVariant3: ['normal'],
  $fontDetailWeight3: 'normal',
  $fontDetailSize3: FONT_XXS,
  $fontDetailHeight3: FONT_XXS * LINE_HEIGHT,
  $fontDetailPaddingTop3: 0,
  $fontDetailPaddingRight3: 0,
  $fontDetailPaddingBottom3: 0,
  $fontDetailPaddingLeft3: 0,
  $fontDetailLetterSpacing3: 0,

  /* ICON */
  $iconFamily: 'shield-icons',
  $iconGlyphs: require('../../assets/fonts/Shield-Icons.json'),
  $iconSize: 22,

  /* INPUT */
  $fontInput: 'font-bold',
  $fontInputStyle: 'normal',
  $fontInputVariant: ['normal'],
  $fontInputWeight: '800',
  $fontInputSize: FONT_L,
  $fontInputHeight: FONT_L * LINE_HEIGHT,
  $fontInputPaddingTop: 0,
  $fontInputPaddingRight: 16,
  $fontInputPaddingBottom: 0,
  $fontInputPaddingLeft: 16,
  $fontInputLetterSpacing: 0,

  $inputFont: 'Body',
  $inputOptionSize: 20,
  $inputSize: 56,
  $inputSizeSmall: 40,
  $inputSizeLarge: 72,

  /* LAYOUT */
  // $layoutMaxWidth: 1280,

  /* MOTION */
  // $motionCollapse: 250,
  // $motionExpand: 300,
  // $motionSlow: 5000,
  // $motionEasing: {
  //   spring: () => Easing.bezier(0.47, 1.64, 0.41, 0.8),
  //   quad: () => Easing.inOut(Easing.quad),
  // },

  /* SPACING */
  // $spaceXXS: 2,
  // $spaceXS: 4,
  // $spaceS: 8,
  // $spaceM: 16,
  // $spaceL: 24,
  // $spaceXL: 32,
  // $spaceXXL: 40,
  // $spaceXXXL: 48,

  /* LAYOUT */
  // $layoutXXS: 16,
  // $layoutXS: 24,
  // $layoutS: 32,
  // $layoutM: 48,
  // $layoutL: 64,
  // $layoutXL: 80,
  // $layoutXXL: 96,
  // $layoutXXXL: 120,
};
