import moment from "moment";

export const isExpired = item => {
  // eslint-disable-line
  const { limited, stock, expires, deadline } = item.benefit;
  const expiredBy = {};

  if (limited) {
    const remaining = Number(stock) - Number(item.uses);
    expiredBy.stock = remaining <= 0;
  } else {
    expiredBy.stock = false;
  }

  if (expires) {
    expiredBy.time = moment().isAfter(moment(deadline));
  } else {
    expiredBy.time = false;
  }

  expiredBy.overall = expiredBy.stock || expiredBy.time;

  return expiredBy;
};
