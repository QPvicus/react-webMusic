import React, { memo, useEffect } from "react";
import { RankingWrapper } from "./style";
import TSTopRanking from "@/components/top-ranking";
import TSThemeHeaderRCM from "@/components/theme-header-rcm";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopListAction } from "../../store/actionCreators";

export default memo(function TSRecommendRanking() {
	const dispatch = useDispatch();
	const { upRanking, newRanking, originRanking } = useSelector(
		state => ({
			upRanking: state.getIn(["recommend", "upRanking"]),
			newRanking: state.getIn(["recommend", "newRanking"]),
			originRanking: state.getIn(["recommend", "originRanking"])
		}),
		shallowEqual
	);
	useEffect(() => {
		dispatch(getTopListAction(0));
		dispatch(getTopListAction(1));
		dispatch(getTopListAction(2));
	}, [dispatch]);

	return (
		<RankingWrapper>
			<TSThemeHeaderRCM title="榜单" />
			<div className="top">
				<TSTopRanking info={upRanking} />
				<TSTopRanking info={newRanking} />
				<TSTopRanking info={originRanking} />
			</div>
		</RankingWrapper>
	);
});
