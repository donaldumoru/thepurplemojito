function Text({ type, className, children }) {
  const TextType = type;
  return (
    <TextType className={`${className} dark:text-(--dark-primary)`}>
      {children}
    </TextType>
  );
}

export default Text;
