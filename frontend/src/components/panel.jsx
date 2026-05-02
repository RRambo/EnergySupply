import "./style/panel.css";

const Panel = ({ width, height, children }) => {
  const style = {
    width: width,
    height: height,
  };
  return (
    <div className="panel" style={style}>
      {children}
    </div>
  );
};

export default Panel;
