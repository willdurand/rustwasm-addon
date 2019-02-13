#[macro_use]
extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub struct Addon {}

#[wasm_bindgen]
impl Addon {
    pub fn new() -> Addon {
        Addon {}
    }

    pub fn init(&mut self) -> Result<(), JsValue> {
        set_panic_hook();

        let window = web_sys::window().expect("should have a Window");
        let document = window.document().expect("should have a Document");

        let body = document.body().expect("should have a body");
        let body: &web_sys::Node = body.as_ref();

        let p: web_sys::Element = document.create_element("p")?;
        p.set_attribute("id".into(), "result".into());
        body.append_child(&p.into())?;

        Ok(())
    }

    pub fn invert_string(&mut self, str: String) -> String {
        let mut s = String::from(str);
        let bytes = unsafe { s.as_bytes_mut() };
        bytes.reverse();

        String::from_utf8(bytes.to_vec()).unwrap()
    }
}
