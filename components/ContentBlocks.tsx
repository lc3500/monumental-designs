type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
      level?: "h2" | "h3" | "h4";
    }
  | {
      type: "list";
      ordered?: boolean;
      items: string[];
    };

type ContentBlockLike = {
  type: string;
  text?: string;
  level?: "h2" | "h3" | "h4";
  ordered?: boolean;
  items?: string[];
};

const headingClasses: Record<string, string> = {
  h2: "text-3xl md:text-4xl font-serif",
  h3: "text-2xl md:text-3xl font-serif",
  h4: "text-xl md:text-2xl font-serif",
};

type ContentBlocksInput = Array<ContentBlock | ContentBlockLike | null | undefined>;

export default function ContentBlocks({ blocks }: { blocks: ContentBlocksInput }) {
  const normalizedBlocks = blocks
    ?.filter((block): block is ContentBlock | ContentBlockLike => Boolean(block))
    .map((block) => block as ContentBlockLike);

  if (!normalizedBlocks?.length) return null;

  return (
    <div className="rich-text">
      {normalizedBlocks.map((block, index) => {
        if (block.type === "paragraph" && block.text) {
          return (
            <p key={`p-${index}`} className="mb-4">
              {block.text}
            </p>
          );
        }

        if (block.type === "heading" && block.text) {
          const level = block.level || "h3";
          const className = headingClasses[level] || headingClasses.h3;
          const HeadingTag = level as "h2" | "h3" | "h4";
          return (
            <HeadingTag key={`h-${index}`} className={`mb-3 ${className}`}>
              {block.text}
            </HeadingTag>
          );
        }

        if (block.type === "list" && block.items?.length) {
          const ListTag = block.ordered ? "ol" : "ul";
          const listClassName = block.ordered ? "list-decimal" : "list-disc";
          return (
            <ListTag key={`l-${index}`} className={`mb-4 ml-5 ${listClassName}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`li-${index}-${itemIndex}`} className="mb-2">
                  {item}
                </li>
              ))}
            </ListTag>
          );
        }

        return null;
      })}
    </div>
  );
}
