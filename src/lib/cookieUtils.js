export const setCookie = (name, value, days = 30) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/`;
};

export const getCookie = (name) => {
      const cookies = document.cookie.split("; ").reduce((acc, curr) => {
            const [key, val] = curr.split("=");
            acc[key] = val ? decodeURIComponent(val) : null;
            return acc;
      }, {});
      return cookies[name] ? JSON.parse(cookies[name]) : {};
};