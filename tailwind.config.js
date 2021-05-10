module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '32%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        '1/7': '10%',
        "85": "22rem",
        "97": "25rem",
        "98": "33rem",
        "99": "34rem",
        "100": "35rem",
        "110": "37rem",
        "120": "80rem"
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
       '3': '3px',
        '4': '4px',
       '6': '6px',
       '8': '8px',
       "9" : "10px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
