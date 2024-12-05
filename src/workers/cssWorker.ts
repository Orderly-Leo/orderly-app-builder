import postcss from "postcss";
import postcssjs from "postcss-js";

// Handle messages from main thread
self.onmessage = async (e) => {
  const { type, data } = e.data;

  switch (type) {
    case "THEME_TO_CSS":
      const root = await postcss().process(data, { parser: postcssjs.parse });
      self.postMessage({ type: "CSS_RESULT", data: root.css });
      break;
  }
};
