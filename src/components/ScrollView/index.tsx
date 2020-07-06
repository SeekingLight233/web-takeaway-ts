/**
 * @description 滚动加载逻辑抽离
 */
import React, { useEffect } from "react";
import "./ScrollView.scss";
import LoadingCircle from "./LoadingCircle";
import { debounce } from "../../utils/homeUtils";

interface IProps {
  isEnd: boolean; // 是否触底
  loadCallBack: () => void;
  loadingText?: string;
}

const ScrollView: React.FC<IProps> = (props) => {
  const { children, isEnd, loadCallBack, loadingText } = props;

  /**
   * @description 滚动加载 核心逻辑
   */
  const onLoadPage = () => {
    const screenHeight = document.documentElement.clientHeight; // 浏览器视窗的高度
    const bodyHeight = document.body.scrollHeight; // 内容的实际高度一般情况是要比屏幕大的
    const scrollHeight = document.documentElement.scrollTop; // 滚动的距离
    const preDistance = 30;
    if (screenHeight + scrollHeight >= bodyHeight - preDistance && !isEnd) {
      loadCallBack();
    }
  };

  /**
   * @description 组件初始化时绑定自定义事件
   */
  useEffect(() => {
    window.addEventListener("scroll", debounce(onLoadPage, 500));
    return () => {
      // 销毁组件解绑自定义事件
      window.removeEventListener("scroll", onLoadPage);
    };
  }, []);

  return (
    <div className="scroll-view">
      {children}
      {isEnd ? (
        <div className="text-wrap">
          <span className="loading-finish">加载完成</span>
        </div>
      ) : (
        <LoadingCircle loadingText={loadingText}></LoadingCircle>
      )}
    </div>
  );
};

export default ScrollView;
