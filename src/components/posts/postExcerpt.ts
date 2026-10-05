import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

import type { Post } from '@/payload-types'

const EXCERPT_LENGTH = 180

export function postExcerpt(content: Post['content']): string {
  if (!content) return ''

  const text = convertLexicalToPlaintext({
    converters: { heading: () => '' },
    data: content as Parameters<typeof convertLexicalToPlaintext>[0]['data'],
  })
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= EXCERPT_LENGTH) return text
  return `${text.slice(0, EXCERPT_LENGTH).replace(/\s+\S*$/, '')}…`
}
