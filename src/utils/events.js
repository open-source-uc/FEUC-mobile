import moment from "moment";
import get from "lodash/get";
import trim from "lodash/trim";

export const getDateProperties = (event, simple = false) => {
  // eslint-disable-line
  try {
    const start = moment(get(event, "temporality.start")); // required
    const end = moment(get(event, "temporality.end")); // required

    const isSameDay = start.isSame(end, "day");
    const days = isSameDay ? [start] : [start, end];
    const isSameMonth = start.isSame(end, "month");
    const months = isSameMonth ? [start] : [start, end];

    const range =
      isSameDay || simple
        ? `${start.format("HH:mm")} - ${end.format("HH:mm")}`
        : `${start.format("HH:mm")} (${end.diff(start, "days") +
            1} días) - ${end.format("HH:mm")} hrs`;

    const rangeMonth = months
      .map(m => m.format("MMM"))
      .map(m => trim(m, "."))
      .join(" - ")
      .toUpperCase();

    const rangeDays = days.map(m => m.format("D")).join("-").toUpperCase();

    return {
      months,
      days,
      range,
      rangeDays,
      rangeMonth,
      isSameDay,
      isSameMonth,
    };
  } catch (err) {
    return {
      months: 0,
      days: 0,
      range: "Error leyendo la fecha",
      rangeDays: "Error leyendo la fecha",
      rangeMonth: "Error leyendo la fecha",
      isSameDay: true,
      isSameMonth: true,
    };
  }
};
