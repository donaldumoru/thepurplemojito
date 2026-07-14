function Text({ type, className, children }) {
  const TextType = type;
  return <TextType className={className}>{children}</TextType>;
}

export default Text;
