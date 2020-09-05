import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopBannerAction } from "../../store/actionCreators";
import { Carousel } from "antd";
import { BannerWrapper, BannerRight, BannerLeft, BannerControl } from "./style";

export default memo(function TSTopBanner() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const dispatch = useDispatch();
	// 组件和redux 关联 获取数据和进行操作
	const { topBanners } = useSelector(
		state => ({
			// topBanners: state.get("recommend").get("topBanners")
			topBanners: state.getIn(["recommend", "topBanners"])
		}),
		shallowEqual
	);
	useEffect(() => {
		dispatch(getTopBannerAction());
	}, [dispatch]);
	const bannerRef = useRef();
	const bannerChange = useCallback((from, to) => {
		// console.log(to);
		setCurrentIndex(to);
	}, []);
	// 其他业务
	const bgImage =
		topBanners[currentIndex] &&
		topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";

	return (
		<BannerWrapper bgImage={bgImage}>
			<div className="banner wrap-v2">
				<BannerLeft>
					<Carousel
						effect="fade"
						autoplay
						ref={bannerRef}
						beforeChange={bannerChange}
					>
						{topBanners.map((item, index) => {
							return (
								<div className="banner-item" key={item.targetId}>
									<img
										className="image"
										src={item.imageUrl}
										alt={item.typeTitle}
									/>
								</div>
							);
						})}
					</Carousel>
				</BannerLeft>
				<BannerRight></BannerRight>
				<BannerControl>
					<button
						className="btn left"
						onClick={() => bannerRef.current.prev()}
					></button>
					<button
						className="btn right"
						onClick={() => bannerRef.current.next()}
					></button>
				</BannerControl>
			</div>
		</BannerWrapper>
	);
});
