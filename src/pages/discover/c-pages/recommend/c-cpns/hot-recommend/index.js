import React, { memo, useEffect } from "react";
import { HotRecommendWrapper } from "./style";
import { HOT_RECOMMEND_LIMIT } from "@/common/constants";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TSThemeHeaderRCM from "@/components/theme-header-rcm";
import TSSongsCover from "@/components/songs-cover";
import { getHotRecommendsAction } from "../../store/actionCreators";

export default memo(function TSHotRecommend() {
	// redux-hooks
	const dispatch = useDispatch();

	const { hotRecommends } = useSelector(
		state => ({
			hotRecommends: state.getIn(["recommend", "hotRecommends"])
		}),
		shallowEqual
	);
	//hooks
	useEffect(() => {
		dispatch(getHotRecommendsAction(HOT_RECOMMEND_LIMIT));
	}, [dispatch]);
	return (
		<HotRecommendWrapper>
			<TSThemeHeaderRCM
				title="热门推荐"
				keywords={["华语", "流行", "民谣", "电子"]}
			/>
			<div className="recommend-list">
				{hotRecommends.map((item, index) => {
					return <TSSongsCover info={item} key={item.id} />;
				})}
			</div>
		</HotRecommendWrapper>
	);
});
