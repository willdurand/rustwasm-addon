import("../crate/pkg").then(({ Addon }) => {
  const addon = Addon.new();
  addon.init();

  document.getElementById('input-text').addEventListener(
    'input',
    () => {
      const ret = addon.invert_string(event.target.value);
      document.getElementById('result').textContent = ret;
    }
  );
});
