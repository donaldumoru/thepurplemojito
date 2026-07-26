function TagsContainer({ children, className = '' }) {
  return <ul className={`flex flex-wrap gap-4 ${className}`}>{children}</ul>;
}

export default TagsContainer;
