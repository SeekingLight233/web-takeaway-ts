/**
 * @description 加载时旋转的小圆圈
 */
import React from "react";
import "./LoadingCircle.scss";

interface IProps {
  loadingText?: string;
}

const LoadingCircle: React.FC<IProps> = (props) => {
  const { loadingText } = props;
  return (
    <div className="loading-circle">
      <div className="loading-wrap">
        <span className="circle"></span>
        <span className="loading-text">{loadingText}</span>
      </div>
    </div>
  );
};
LoadingCircle.defaultProps = {
  loadingText: "正在加载...",
};

export default LoadingCircle;
