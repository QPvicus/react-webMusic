import React, { memo } from "react";
import TSTopBanner from "./c-cpns/top-banner";
import TSHotRecommend from "./c-cpns/hot-recommend";
import TSNewAlbum from "./c-cpns/new-album";
import TSRanking from "./c-cpns/recommend-ranking";
import TSUserLogin from "./c-cpns/user-login";
import TSHotAnchor from "./c-cpns/hot-anchor";
import TSSetterSinger from "./c-cpns/setter-singer";
import {
	RecommendWrapper,
	Content,
	RecommendLeft,
	RecommendRight
} from "./style";

function TSRecommend(props) {
	return (
		<RecommendWrapper>
			<TSTopBanner />
			<Content className="wrap-v2">
				<RecommendLeft>
					<TSHotRecommend />
					<TSNewAlbum />
					<TSRanking />
				</RecommendLeft>
				<RecommendRight>
					<TSUserLogin />
					<TSSetterSinger />
					<TSHotAnchor />
				</RecommendRight>
			</Content>
		</RecommendWrapper>
	);
}

export default memo(TSRecommend);

/* function TSRecommend(props) {
	const { getBanners, topBanners } = props;
	useEffect(() => {
		getBanners();
	}, [getBanners]);
	return (
		<div>
			<h2>TSRecommend: {topBanners.length}</h2>
		</div>
	);
}

const mapStateToProps = state => ({
	topBanners: state.recommend.topBanners
});

const mapDispatchToProps = dispatch => ({
	getBanners: () => {
		dispatch(getTopBannerAction());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(TSRecommend)); */
