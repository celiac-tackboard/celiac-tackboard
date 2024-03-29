module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount != 1) {
      return `${word}s`.toLowerCase();
    }

    return word.toLowerCase();
  },
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
  first: function (index) {
    if (index == 0) {
      return true;
    } else {
      return false;
    }
  },
};
