const SectionHeader = ({ title }) => {
  const textContent = title.text;
  return (
    <div className="section-header">
      <h2>{textContent}</h2>
    </div>
  );
};

export default SectionHeader;
