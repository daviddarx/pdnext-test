import { visit } from 'unist-util-visit';
import type { Root, Element, Text } from 'hast';
import { obfuscateEmail } from './email-obfuscation';

const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

export default function rehypeEmailObfuscate() {
  return (tree: Root) => {
    // For plain text nodes: wrap email matches in <span data-obfuscated-email='...'>...</span>
    visit(tree, 'text', (node: Text, index, parent: any) => {
      if (!parent || typeof index !== 'number' || !node.value) return;
      const text = node.value as string;
      const matches = Array.from(text.matchAll(EMAIL_REGEX));
      if (matches.length === 0) return;

      const newChildren: any[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const email = match[0];
        const start = match.index ?? 0;
        const end = start + email.length;

        if (start > lastIndex) {
          newChildren.push({ type: 'text', value: text.slice(lastIndex, start) });
        }

        const obfuscated = obfuscateEmail(email);
        newChildren.push({
          type: 'element',
          tagName: 'span',
          properties: { 'data-obfuscated-email': obfuscated },
          children: [{ type: 'text', value: obfuscated }],
        });

        lastIndex = end;
      }

      if (lastIndex < text.length) {
        newChildren.push({ type: 'text', value: text.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...newChildren);
    });

    // Handle link nodes with mailto: hrefs
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'a' &&
        node.properties &&
        typeof node.properties.href === 'string' &&
        node.properties.href.startsWith('mailto:')
      ) {
        const email = node.properties.href.substring(7); // Remove 'mailto:'
        const obfuscated = obfuscateEmail(email);

        if (!node.properties['data-obfuscated-email']) {
          (node.properties as any)['data-obfuscated-email'] = obfuscated;
        }

        node.properties.href = `mailto:${obfuscated}`;

        if (node.children.length === 1 && node.children[0].type === 'text') {
          const textNode = node.children[0];
          if (textNode.value === email) {
            textNode.value = obfuscated;
          }
        }
      }
    });
  };
}
