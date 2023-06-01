const assign = (target: any, ...args: any[]) => {
  for (var i = 1; i < args.length; i++) {
    var source = args[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
};

const defaultConverter = {
  read: function (value: string) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function (value: string) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent,
    );
  },
};

function init(
  converter: typeof defaultConverter,
  defaultAttributes: any,
): {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, attributes?: { expires?: number }) => void;
} {
  function set(name: string, value: string, attributes: any) {
    if (typeof document === "undefined") {
      return;
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += "; " + attributeName;

      if (attributes[attributeName] === true) {
        continue;
      }

      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }

    return (document.cookie =
      name + "=" + converter.write(value) + stringifiedAttributes);
  }

  function get(name: string) {
    if (typeof document === "undefined" || (arguments.length && !name)) {
      return;
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar: any = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");

      try {
        var found = decodeURIComponent(parts[0]);
        if (!jar[found]) jar[found] = converter.read(value);

        if (name === found) {
          break;
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar;
  }

  return Object.create(
    {
      set,
      get,
      remove: function (name: string, attributes: any) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1,
          }),
        );
      },
      withAttributes: function (attributes: any) {
        return init(
          (this as any).converter,
          assign({}, (this as any).attributes, attributes),
        );
      },
      withConverter: function (converter: typeof defaultConverter) {
        return init(
          assign({}, (this as any).converter, converter),
          (this as any).attributes,
        );
      },
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) },
    },
  );
}

export default init(defaultConverter, { path: "/" });
