import Mention from "@tiptap/extension-mention";
import { mergeAttributes } from "@tiptap/react";
import { PluginKey } from "prosemirror-state";

const MentionPluginKey = new PluginKey("mention");
const MentionExt = Mention.extend({
  name: "mention",
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("mention-user-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            "mention-user-id": attributes.id,
          };
        },
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("mention-user-full-name"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }
          return {
            "mention-user-full-name": attributes.label,
          };
        },
      },
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute("href"),
        renderHTML: (attributes) => {
          if (!attributes.href) {
            return {};
          }
          return {
            href: attributes.href,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: `a[data-type="${this.name}"]`,
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(
        { "data-type": this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },
});

export { MentionExt, MentionPluginKey, MentionExt as default };
//# sourceMappingURL=tiptap-extension-mention.esm.js.map
