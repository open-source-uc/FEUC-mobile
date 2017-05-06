import React from "react";
import PropTypes from "prop-types";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

const I18n = ({ i18n, children, ...props }) => (
  <I18nextProvider i18n={i18n} {...props}>
    {children}
  </I18nextProvider>
);

I18n.propTypes = {
  children: PropTypes.node,
  i18n: PropTypes.any,
};

I18n.defaultProps = {
  children: null,
  i18n: i18next.init({
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          events: {
            admission: {
              free: "Gratis",
              paid: "Pagado",
              other: "Otro",
            },
          },
        },
      },
    },
  }),
};

export default I18n;
