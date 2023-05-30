import React from "react";
import MyCurrencyInput from "./MyCurrencyInput";
import axios from "axios";

import styles from "./MyModalConverter.module.scss";

function MyModalConverter() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [amount1, setAmount1] = React.useState(1);
  const [amount2, setAmount2] = React.useState(1);
  const [currency1, setCurrency1] = React.useState("USD");
  const [currency2, setCurrency2] = React.useState("EUR");
  const [rates, setRates] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/fixer/latest?base=USD&apikey=XStDD4huHmQZvY88NxDQtVPGc5tGmJym"
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  React.useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <>
      <img
        src="https://cdn4.iconfinder.com/data/icons/business-1219/24/Exchange_Currency-256.png"
        className={styles.icon}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className={[styles.group, styles.active].join(" ")}>
          <img
            className={styles.close}
            onClick={() => setIsOpen(false)}
            src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_multiplication-multiply-close-remove-orange-256.png"
          />
          <h2 className={styles.h2}>Currency сonverter</h2>
          <MyCurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
            currencies={Object.keys(rates)}
            amount={amount1}
            currency={currency1}
          />
          <MyCurrencyInput
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}
          />
        </div>
      )}
    </>
  );
}

export default MyModalConverter;
