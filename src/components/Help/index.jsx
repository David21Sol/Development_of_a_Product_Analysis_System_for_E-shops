import React from "react";
import styles from "./Help.module.scss";

import search from "./img/search.png";
import categories from "./img/categories.png";
import sort from "./img/sorting.png";
import curencyConverter from "./img/currency_converter.png";
import statistic from "./img/statistic.png";

function Help() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <img
        className={styles.help}
        src="https://cdn0.iconfinder.com/data/icons/simply-orange-1/128/questionssvg-256.png"
        height="50px"
        width="50px"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div div className={[styles.group, styles.active].join(" ")}>
          <p className={styles.text}>
            <img
              className={styles.close}
              onClick={() => setIsOpen(false)}
              src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_multiplication-multiply-close-remove-orange-256.png"
            />
            <h3>Welcome!</h3>
            <p>
              This price comparison system can be useful for you if you want to
              save money when shopping for gaming products. On our system, you
              can find gaming-related products, such as video games, gaming
              mouses, keyboards, headsets, monitors, consoles, controllers, and
              so on...
            </p>
            <p>
              To search for the product you need, you must write the name of the
              product in the search bar, which is located here:
            </p>
            <img src={search} width="750px" />
            <p>
              You can also search for products by category. You can select the
              category you want here:
            </p>
            <img src={categories} width="750px" />
            <p>
              Also in our system it is possible to sort goods by low price, high
              price, low rating and high rating. To select the sorting of goods,
              you need to click here:
            </p>
            <img src={sort} width="130px" />
            <p>
              All goods are priced in euro currency. If you are not familiar
              with the euro and you are unable to analyze the goods, you can use
              the currency converter to find out how much the goods cost in your
              usual currency. To use the currency converter you need to click on
              this logo:
            </p>
            <img src={curencyConverter} />
            <p>
              Also is possible to see the statistics of the product, how the
              price changes over time. To see this information, you need to
              click on this logo: <img src={statistic} />
            </p>
            <h3>
              Hope we could help you!
              <img
                height="40px"
                width="40px"
                src="https://cdn4.iconfinder.com/data/icons/smileys-for-fun/128/smiley__18-256.png"
              />
            </h3>
          </p>
        </div>
      )}
    </>
  );
}

export default Help;
