((mhtml-mode
  (eval . (web-mode)))
 (web-mode
  (web-mode-markup-indent-offset . 2)
  (web-mode-css-indent-offset . 2)
  (web-mode-code-indent-offset . 2)
  (web-mode-attr-value-indent-offset . 2)
  (web-mode-script-padding . 0)
  (web-mode-style-padding . 0)
  (eval . (progn
            (prettier-mode 1)
            (lsp))))
 (typescript-mode
  (typescript-indent-level . 2))
 (js-mode
  (indent-tabs-mode . nil)
  (js-indent-level . 2)))
