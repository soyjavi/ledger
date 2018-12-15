import { bool, func, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerExpense, bannerIncome } from '../../assets';
import { C, translate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Switch, Text,
} from '../../reactor/components';
import MapStaticImage from '../MapStaticImage';
import { hydrateTransaction } from './modules';

import styles from './DialogTransaction.style';

const { COLORS, TX: { TYPE: { EXPENSE } } } = C;
const BANNERS = [bannerExpense, bannerIncome];

class DialogTransaction extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
    type: number.isRequired,
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
    form: {},
    location: false,
    valid: false,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;
    if (visible === true && visible !== props.visible) this.setState({ form: { title: '' }, location: false });
  }

  _onChange = form => this.setState({ form });

  _onChangeLocation = (location) => {
    this.setState({ location });
  }

  _onValid = valid => this.setState({ valid })

  _onSubmit = async ({ l10n: { CATEGORIES }, store: { onTransaction } }) => {
    const {
      props: { onClose, type, vault },
      state: { form: { category, value, title = '' } },
    } = this;

    this.setState({ busy: true });
    const response = await onTransaction({
      category: category
        ? parseInt(Object.keys(CATEGORIES[type]).find(key => CATEGORIES[type][key] === category), 10)
        : 1,
      title,
      type,
      value: parseFloat(value, 10),
      vault,
    });

    this.setState({ busy: false });
    if (response) onClose();
  }

  render() {
    const {
      _onChange, _onChangeLocation, _onSubmit, _onValid,
      props: { onClose, type, visible },
      state: {
        busy, form, location, valid,
      },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog visible={visible} style={styles.frame} styleContainer={styles.dialog}>
            <Text color={COLORS[type]} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}`}
            </Text>
            <Image source={BANNERS[type]} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              {type === EXPENSE ? l10n.EXPENSE_CAPTION : l10n.INCOME_CAPTION}
            </Text>
            <View style={styles.form}>
              <Form
                attributes={translate(hydrateTransaction({ l10n, type }), l10n)}
                color={COLORS[type]}
                onValid={_onValid}
                onChange={_onChange}
                value={form}
              />
              <Switch label={l10n.SAVE_LOCATION} onChange={_onChangeLocation} value={location} />
              { location && <MapStaticImage latitude={98.9648672} longitude={18.8059893} zoom={12} /> }
            </View>

            <View style={styles.buttons}>
              <Button
                color={COLORS[type]}
                outlined
                onPress={onClose}
                rounded
                style={styles.button}
                title={l10n.CANCEL}
              />
              <Button
                activity={busy}
                color={COLORS[type]}
                disabled={busy || !valid}
                onPress={() => _onSubmit({ l10n, store })}
                rounded
                shadow
                style={styles.button}
                title={l10n.SAVE}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;
